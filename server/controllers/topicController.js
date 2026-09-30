import Topic from '../models/Topic.js';
import User from '../models/User.js';

// @desc    Get all topics (optionally filtered by world)
// @route   GET /api/topics
// @access  Public (or semi-private to calculate unlock states)
export const getTopics = async (req, res, next) => {
  try {
    const { world } = req.query;
    const query = {};
    if (world) query.world = world;

    const topics = await Topic.find(query);
    // Sort by order or level
    topics.sort((a, b) => (a.order || 0) - (b.order || 0));

    // If request has authenticated user, compute unlock status
    let user = null;
    if (req.user) {
      user = await User.findById(req.user.id || req.user._id);
    }

    const completedTopicIds = new Set(user ? user.completedTopics || [] : []);

    const enrichedTopics = topics.map((topic, index) => {
      const topicId = String(topic._id || topic.id);
      const isCompleted = completedTopicIds.has(topicId);

      // Topic 1 of any world (order === 1 or index === 0 for that world) is always unlocked.
      // Subsequent topics unlock only if previous topic in that world is completed!
      let isLocked = false;
      if (topic.order > 1) {
        // Find previous topic in the same world
        const prevTopic = topics.find(
          t => t.world === topic.world && t.order === topic.order - 1
        );
        if (prevTopic) {
          const prevId = String(prevTopic._id || prevTopic.id);
          isLocked = !completedTopicIds.has(prevId);
        }
      }

      // Admin always has all topics unlocked
      if (req.user && req.user.role === 'admin') {
        isLocked = false;
      }

      return {
        ...topic,
        isCompleted,
        isLocked,
      };
    });

    res.status(200).json({
      success: true,
      count: enrichedTopics.length,
      topics: enrichedTopics,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single topic by ID
// @route   GET /api/topics/:id
// @access  Public / Private
export const getTopicById = async (req, res, next) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found with specified identifier',
      });
    }

    let isCompleted = false;
    let isLocked = false;

    if (req.user) {
      const user = await User.findById(req.user.id || req.user._id);
      if (user) {
        const completedTopicIds = new Set(user.completedTopics || []);
        isCompleted = completedTopicIds.has(String(topic._id || topic.id));

        if (topic.order > 1 && user.role !== 'admin') {
          const allWorldTopics = await Topic.find({ world: topic.world });
          allWorldTopics.sort((a, b) => a.order - b.order);
          const prevTopic = allWorldTopics.find(t => t.order === topic.order - 1);
          if (prevTopic) {
            isLocked = !completedTopicIds.has(String(prevTopic._id || prevTopic.id));
          }
        }
      }
    }

    res.status(200).json({
      success: true,
      topic: {
        ...topic,
        isCompleted,
        isLocked,
      },
    });
  } catch (error) {
    next(error);
  }
};
