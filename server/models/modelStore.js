import mongoose from 'mongoose';

// Global memory store for when MongoDB Atlas credentials are not set or during offline preview
const memoryCollections = {
  users: new Map(),
  topics: new Map(),
  games: new Map(),
  quizzes: new Map(),
  codingchallenges: new Map(),
  progresses: new Map(),
  achievements: new Map(),
};

function matchesQuery(doc, query) {
  if (!query || Object.keys(query).length === 0) return true;
  for (const [key, val] of Object.entries(query)) {
    if (key === '$or' && Array.isArray(val)) {
      const matchAny = val.some(subQuery => matchesQuery(doc, subQuery));
      if (!matchAny) return false;
      continue;
    }

    const docVal = doc[key];
    if (val && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
      // Handle operators like $in, $ne
      if (val.$in && Array.isArray(val.$in)) {
        if (!val.$in.includes(docVal)) return false;
      } else if (val.$ne !== undefined) {
        if (docVal === val.$ne) return false;
      }
    } else if (String(docVal) !== String(val)) {
      return false;
    }
  }
  return true;
}

export function createDualModel(modelName, schema, collectionKey) {
  // Real Mongoose Model
  const MongooseModel = mongoose.models[modelName] || mongoose.model(modelName, schema);

  const getCollection = () => {
    if (!memoryCollections[collectionKey]) {
      memoryCollections[collectionKey] = new Map();
    }
    return memoryCollections[collectionKey];
  };

  const isAtlasReady = () => mongoose.connection.readyState === 1;

  return {
    mongooseModel: MongooseModel,

    async find(query = {}) {
      if (isAtlasReady()) {
        try {
          return await MongooseModel.find(query).lean();
        } catch (e) {
          console.warn(`Atlas query failed for ${modelName}, using local store:`, e.message);
        }
      }
      const col = getCollection();
      const results = [];
      for (const doc of col.values()) {
        if (matchesQuery(doc, query)) {
          results.push({ ...doc, _id: doc._id || doc.id });
        }
      }
      return results;
    },

    async findOne(query = {}) {
      if (isAtlasReady()) {
        try {
          return await MongooseModel.findOne(query).lean();
        } catch (e) {
          console.warn(`Atlas query failed for ${modelName}, using local store:`, e.message);
        }
      }
      const col = getCollection();
      for (const doc of col.values()) {
        if (matchesQuery(doc, query)) {
          return { ...doc, _id: doc._id || doc.id };
        }
      }
      return null;
    },

    async findById(id) {
      if (!id) return null;
      if (isAtlasReady()) {
        try {
          if (mongoose.Types.ObjectId.isValid(id)) {
            const found = await MongooseModel.findById(id).lean();
            if (found) return found;
          }
          const found = await MongooseModel.findOne({
            $or: [{ id: String(id) }, { key: String(id) }, { topicId: String(id) }],
          }).lean();
          if (found) return found;
        } catch (e) {
          // Fall back cleanly to memory collection
        }
      }
      const col = getCollection();
      const doc = col.get(String(id));
      if (!doc) {
        // try finding by _id, custom id, key, or topicId
        for (const item of col.values()) {
          if (
            String(item._id) === String(id) ||
            String(item.id) === String(id) ||
            String(item.key) === String(id) ||
            String(item.topicId) === String(id)
          ) {
            return { ...item, _id: item._id || item.id };
          }
        }
        return null;
      }
      return { ...doc, _id: doc._id || doc.id };
    },

    async create(data) {
      const col = getCollection();

      if (isAtlasReady()) {
        try {
          const mongooseData = { ...data };
          // Ensure id is explicitly preserved
          if (!mongooseData.id && data.id) {
            mongooseData.id = String(data.id);
          }
          // If _id is not a valid ObjectId (e.g. synthetic or prefixed like cq_, g_, c_, etc.), preserve it in id and let Mongoose generate a valid ObjectId
          if (mongooseData._id && (!mongoose.Types.ObjectId.isValid(mongooseData._id) || String(mongooseData._id).startsWith('cq_'))) {
            if (!mongooseData.id) {
              mongooseData.id = String(mongooseData._id);
            }
            delete mongooseData._id;
          }
          if (mongooseData.id && String(mongooseData.id).startsWith('cq_')) {
            delete mongooseData.id;
          }

          let created;
          try {
            const res = await MongooseModel.insertMany([mongooseData]);
            created = res[0];
          } catch (insertErr) {
            created = await MongooseModel.create(mongooseData);
          }

          const docObj = created.toObject ? created.toObject() : created;
          const realId = String(created._id);
          const finalDoc = {
            ...docObj,
            _id: realId,
            id: data.id || data._id || realId,
          };
          col.set(realId, finalDoc);
          if (data.id || data._id) {
            col.set(String(data.id || data._id), finalDoc);
          }
          return finalDoc;
        } catch (e) {
          console.warn(`Atlas create failed for ${modelName}:`, e.message);
        }
      }

      const id = data._id || data.id || `cq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
      const newDoc = {
        ...data,
        _id: String(id),
        id: String(id),
        createdAt: data.createdAt || new Date(),
        updatedAt: new Date(),
      };
      col.set(String(id), newDoc);

      return newDoc;
    },

    async findByIdAndUpdate(id, updates, options = {}) {
      const col = getCollection();
      let doc = col.get(String(id));
      if (!doc) {
        for (const item of col.values()) {
          if (String(item._id) === String(id) || String(item.id) === String(id)) {
            doc = item;
            break;
          }
        }
      }

      if (!doc) return null;

      const updated = {
        ...doc,
        ...updates,
        updatedAt: new Date(),
      };
      col.set(String(doc._id || id), updated);

      if (isAtlasReady()) {
        try {
          if (mongoose.Types.ObjectId.isValid(id)) {
            await MongooseModel.findByIdAndUpdate(id, updates, { new: true });
          } else {
            await MongooseModel.findOneAndUpdate(
              { $or: [{ id: String(id) }, { key: String(id) }, { topicId: String(id) }] },
              updates,
              { new: true }
            );
          }
        } catch (e) {
          console.warn(`Atlas update failed for ${modelName}:`, e.message);
        }
      }

      return updated;
    },

    async findByIdAndDelete(id) {
      const col = getCollection();
      let deleted = null;
      if (col.has(String(id))) {
        deleted = col.get(String(id));
        col.delete(String(id));
      } else {
        for (const [key, item] of col.entries()) {
          if (String(item._id) === String(id) || String(item.id) === String(id)) {
            deleted = item;
            col.delete(key);
            break;
          }
        }
      }

      if (isAtlasReady()) {
        try {
          await MongooseModel.findByIdAndDelete(id);
        } catch (e) {
          console.warn(`Atlas delete failed for ${modelName}:`, e.message);
        }
      }

      return deleted;
    },

    async countDocuments(query = {}) {
      if (isAtlasReady()) {
        try {
          return await MongooseModel.countDocuments(query);
        } catch (e) {
          console.warn(`Atlas count failed for ${modelName}:`, e.message);
        }
      }
      const col = getCollection();
      let count = 0;
      for (const doc of col.values()) {
        if (matchesQuery(doc, query)) count++;
      }
      return count;
    },

    async deleteMany(query = {}) {
      const col = getCollection();
      if (!query || Object.keys(query).length === 0) {
        col.clear();
      } else {
        for (const [key, doc] of col.entries()) {
          if (matchesQuery(doc, query)) {
            col.delete(key);
          }
        }
      }
      if (isAtlasReady()) {
        try {
          await MongooseModel.deleteMany(query);
        } catch (e) {}
      }
    }
  };
}
