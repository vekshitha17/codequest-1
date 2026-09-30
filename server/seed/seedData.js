import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Topic from '../models/Topic.js';
import Game from '../models/Game.js';
import Quiz from '../models/Quiz.js';
import CodingChallenge from '../models/CodingChallenge.js';
import Achievement from '../models/Achievement.js';
import { allCodingChallenges } from './challengesData.js';

export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting CodeQuest database seed...');

    // 1. Seed Achievements
    const achievementsCount = await Achievement.countDocuments();
    if (achievementsCount === 0) {
      const achievements = [
        {
          key: 'welcome_badge',
          title: 'Welcome Adventurer',
          description: 'Joined the CodeQuest coding academy',
          icon: 'Sparkles',
          category: 'mastery',
          xpBonus: 10,
        },
        {
          key: 'first_topic',
          title: 'First Step',
          description: 'Completed your very first topic lesson!',
          icon: 'CheckCircle',
          category: 'mastery',
          xpBonus: 25,
        },
        {
          key: 'quiz_whiz',
          title: 'Quiz Whiz',
          description: 'Aced 3 quizzes with flying colors!',
          icon: 'Award',
          category: 'mastery',
          xpBonus: 50,
        },
        {
          key: 'game_knight',
          title: 'Arcade Knight',
          description: 'Conquered 3 interactive minigames!',
          icon: 'Gamepad2',
          category: 'mastery',
          xpBonus: 50,
        },
        {
          key: 'python_pioneer',
          title: 'Python Pioneer',
          description: 'Completed 5 Python world topics!',
          icon: 'Code',
          category: 'python',
          xpBonus: 75,
        },
        {
          key: 'dsa_explorer',
          title: 'DSA Explorer',
          description: 'Navigated 5 Data Structure topics!',
          icon: 'Layers',
          category: 'dsa',
          xpBonus: 75,
        },
        {
          key: 'xp_centurion',
          title: 'XP Centurion',
          description: 'Amassed over 500 total XP points!',
          icon: 'Trophy',
          category: 'streak',
          xpBonus: 100,
        },
      ];
      for (const ach of achievements) {
        await Achievement.create(ach);
      }
      console.log('✅ Seeded Achievements');
    }

    // 2. Seed Admin & Student Users
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (!existingAdmin) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@codequest.dev';
      const adminPass = process.env.ADMIN_PASSWORD || 'Admin@CodeQuest2026';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPass, salt);

      await User.create({
        username: 'QuestMaster',
        email: adminEmail.toLowerCase(),
        password: hashedPassword,
        role: 'admin',
        avatar: 'robot_avatar_admin',
        xp: 2500,
        level: 6,
        completedTopics: ['py_1', 'py_2', 'dsa_1'],
        completedGames: ['g_1'],
        completedQuizzes: ['q_1'],
        completedChallenges: ['c_1'],
        achievements: ['welcome_badge', 'first_topic', 'quiz_whiz', 'game_knight', 'xp_centurion'],
      });
      console.log('✅ Seeded Admin Account: ' + adminEmail);
    }

    const existingStudent = await User.findOne({ email: 'coder@codequest.dev' });
    if (!existingStudent) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Student@CodeQuest2026', salt);
      await User.create({
        username: 'PixelCoder',
        email: 'coder@codequest.dev',
        password: hashedPassword,
        role: 'student',
        avatar: 'robot_avatar_1',
        xp: 120,
        level: 2,
        completedTopics: ['py_1'],
        completedGames: ['g_1'],
        completedQuizzes: ['q_1'],
        completedChallenges: [],
        achievements: ['welcome_badge', 'first_topic'],
      });
      console.log('✅ Seeded Demo Student Account: coder@codequest.dev');
    }

    // 3. Seed Games
    const gamesData = [
      {
        id: 'g_1',
        title: 'List Treasure Hunt',
        world: 'python',
        topicId: 'py_1',
        type: 'list-treasure-hunt',
        instructions: 'Index through the Python list to extract the hidden diamond!',
        questions: [
          {
            id: 'g1_q1',
            prompt: 'Given chest = ["gold", "ruby", "diamond", "emerald"], which index retrieves "diamond"?',
            codeSnippet: 'chest = ["gold", "ruby", "diamond", "emerald"]\nitem = chest[?]',
            options: ['0', '1', '2', '3'],
            correctAnswer: '2',
            hint: 'Python lists use zero-based indexing: index 0 is first, index 1 is second.',
            explanation: 'chest[2] evaluates to "diamond" because index 0 is "gold", index 1 is "ruby", and index 2 is "diamond".',
          },
          {
            id: 'g1_q2',
            prompt: 'How do you extract the very last item in a Python list without knowing its length?',
            codeSnippet: 'last_treasure = chest[?]',
            options: ['chest[last]', 'chest[-1]', 'chest[end]', 'chest[0]'],
            correctAnswer: 'chest[-1]',
            hint: 'Negative indices wrap around from the end of the sequence.',
            explanation: 'Negative indexing starts from -1, representing the last element.',
          },
          {
            id: 'g1_q3',
            prompt: 'What slicing syntax extracts the first three elements ["gold", "ruby", "diamond"]?',
            codeSnippet: 'top_three = chest[?]',
            options: ['chest[0:2]', 'chest[1:3]', 'chest[:3]', 'chest[3:]'],
            correctAnswer: 'chest[:3]',
            hint: 'The stop index in slicing is exclusive.',
            explanation: 'chest[:3] slices from index 0 up to index 3 (exclusive), retrieving indices 0, 1, and 2.',
          }
        ],
        xpReward: 20,
      },
      {
        id: 'g_2',
        title: 'Guess the Output Mystery',
        world: 'python',
        topicId: 'py_2',
        type: 'guess-output',
        instructions: 'Predict what the Python interpreter will print when executing the code!',
        questions: [
          {
            id: 'g2_q1',
            prompt: 'What is the output of print(2 ** 3 + 4 // 2)?',
            codeSnippet: 'x = 2 ** 3\ny = 4 // 2\nprint(x + y)',
            options: ['8', '10', '12', '16'],
            correctAnswer: '10',
            hint: '2 ** 3 is exponentiation (8), and 4 // 2 is integer floor division (2).',
            explanation: '2 ** 3 = 8. 4 // 2 = 2. 8 + 2 = 10.',
          },
          {
            id: 'g2_q2',
            prompt: 'What is the output of bool("False")?',
            codeSnippet: 'print(bool("False"))',
            options: ['False', 'True', 'None', 'Error'],
            correctAnswer: 'True',
            hint: 'Any non-empty string in Python evaluates to True in a boolean context!',
            explanation: 'bool("False") is True because the string is non-empty. Only bool("") is False.',
          }
        ],
        xpReward: 20,
      },
      {
        id: 'g_3',
        title: 'Fix the Code Bug Quest',
        world: 'python',
        topicId: 'py_3',
        type: 'fix-code',
        instructions: 'Spot the bug and select the correct fix to restore power to the robot!',
        questions: [
          {
            id: 'g3_q1',
            prompt: 'Why does this conditional raise a SyntaxError?',
            codeSnippet: 'score = 85\nif score >= 80\n    print("Grade A")',
            options: ['Missing parentheses around condition', 'Missing colon (:) after the condition', 'Incorrect indentation', 'Variable name is invalid'],
            correctAnswer: 'Missing colon (:) after the condition',
            hint: 'Every if, elif, else, for, while, def statement must terminate with a specific punctuation mark.',
            explanation: 'Python requires a colon (:) at the end of the if statement line.',
          }
        ],
        xpReward: 20,
      },
      {
        id: 'g_4',
        title: 'Stack Tower Operator',
        world: 'dsa',
        topicId: 'dsa_5',
        type: 'stack-tower',
        instructions: 'Operate the LIFO stack to balance the magical runes in order!',
        questions: [
          {
            id: 'g4_q1',
            prompt: 'Elements [10, 20, 30] are pushed onto an empty stack in order. Which element will be popped first?',
            codeSnippet: 'stack.push(10)\nstack.push(20)\nstack.push(30)\nstack.pop()',
            options: ['10', '20', '30', 'None'],
            correctAnswer: '30',
            hint: 'A stack follows Last-In, First-Out (LIFO).',
            explanation: '30 was the last item pushed, so it is the first item removed by pop().',
          },
          {
            id: 'g4_q2',
            prompt: 'After pushing A, B and then popping once, what is on top of the stack?',
            codeSnippet: 's.push("A"); s.push("B"); s.pop();',
            options: ['B', 'A', 'Empty', 'None'],
            correctAnswer: 'A',
            hint: 'B was popped, leaving the previous item.',
            explanation: 'Pushing A then B makes B the top. Popping removes B, leaving A as the top element.',
          }
        ],
        xpReward: 20,
      },
      {
        id: 'g_5',
        title: 'Queue Line Organizer',
        world: 'dsa',
        topicId: 'dsa_6',
        type: 'queue-line',
        instructions: 'Manage the FIFO queue at the kingdom gate!',
        questions: [
          {
            id: 'g5_q1',
            prompt: 'Adventurers [Warrior, Mage, Rogue] enter a queue in that order. Who exits first upon dequeue?',
            codeSnippet: 'q.enqueue("Warrior")\nq.enqueue("Mage")\nq.enqueue("Rogue")\nq.dequeue()',
            options: ['Warrior', 'Mage', 'Rogue', 'Random'],
            correctAnswer: 'Warrior',
            hint: 'A queue follows First-In, First-Out (FIFO).',
            explanation: 'Warrior entered first, so Warrior leaves first.',
          }
        ],
        xpReward: 20,
      },
      {
        id: 'g_6',
        title: 'Binary Search Step Guesser',
        world: 'dsa',
        topicId: 'dsa_1',
        type: 'binary-search',
        instructions: 'Target: Find 42 in sorted array [10, 20, 30, 42, 50, 60, 70]. What is the first midpoint inspected?',
        questions: [
          {
            id: 'g6_q1',
            prompt: 'Array length is 7 (indices 0..6). What is midpoint index (0 + 6) // 2 and its value?',
            codeSnippet: 'arr = [10, 20, 30, 42, 50, 60, 70]\nmid = (0 + 6) // 2\n# mid = 3, arr[3] = ?',
            options: ['Index 2: 30', 'Index 3: 42', 'Index 4: 50', 'Index 5: 60'],
            correctAnswer: 'Index 3: 42',
            hint: 'mid = 3. arr[3] is the 4th element.',
            explanation: 'arr[3] is 42! The target is found on the very first inspection step!',
          }
        ],
        xpReward: 20,
      },
      {
        id: 'g_7',
        title: 'Algorithm Speed Match',
        world: 'dsa',
        topicId: 'dsa_2',
        type: 'sorting-match',
        instructions: 'Match each algorithm with its typical average time complexity!',
        questions: [
          {
            id: 'g7_q1',
            prompt: 'What is the average time complexity of Merge Sort on an array of size n?',
            codeSnippet: 'def merge_sort(arr): ...',
            options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
            correctAnswer: 'O(n log n)',
            hint: 'Divide takes O(log n) levels, and merging takes O(n) per level.',
            explanation: 'Merge sort always divides the array into halves and merges in linear time, yielding O(n log n).',
          }
        ],
        xpReward: 20,
      },
      {
        id: 'g_8',
        title: 'Memory Syntax Matcher',
        world: 'python',
        topicId: 'py_4',
        type: 'memory',
        instructions: 'Identify which loop syntax creates an inclusive sequence from 1 to 5!',
        questions: [
          {
            id: 'g8_q1',
            prompt: 'Which range() invocation generates numbers 1, 2, 3, 4, 5?',
            codeSnippet: 'for i in range(?):\n    print(i)',
            options: ['range(1, 5)', 'range(1, 6)', 'range(5)', 'range(0, 5)'],
            correctAnswer: 'range(1, 6)',
            hint: 'The stop parameter in range(start, stop) is exclusive.',
            explanation: 'range(1, 6) starts at 1 and stops before 6, producing 1, 2, 3, 4, 5.',
          }
        ],
        xpReward: 20,
      },
    ];

    for (const g of gamesData) {
      const exists = await Game.findById(g.id);
      if (!exists) {
        await Game.create({ ...g, _id: g.id });
      }
    }
    console.log('✅ Seeded Interactive Games');

    // 4. Seed Quizzes
    const quizzesData = [
      {
        id: 'q_1',
        title: 'Python Essentials Quiz',
        world: 'python',
        topicId: 'py_1',
        passingPercentage: 70,
        xpReward: 20,
        questions: [
          {
            id: 'q1_1',
            question: 'What is the correct syntax to output "Hello World" in Python 3?',
            options: [
              'echo("Hello World")',
              'print("Hello World")',
              'Console.WriteLine("Hello World")',
              'System.out.println("Hello World")',
            ],
            correctAnswer: 1,
            explanation: 'print() is Python built-in standard output function.',
          },
          {
            id: 'q1_2',
            question: 'Which of the following is an immutable data type in Python?',
            options: ['List', 'Dictionary', 'Tuple', 'Set'],
            correctAnswer: 2,
            explanation: 'Tuples cannot be altered once instantiated in Python.',
          },
          {
            id: 'q1_3',
            question: 'How do you insert comments in Python code?',
            options: ['// this is a comment', '/* this is a comment */', '# this is a comment', '<!-- comment -->'],
            correctAnswer: 2,
            explanation: 'Python uses the hash (#) character for single-line comments.',
          },
          {
            id: 'q1_4',
            question: 'What is the type of variable x = 3.14?',
            options: ['int', 'float', 'decimal', 'double'],
            correctAnswer: 1,
            explanation: 'Numbers with fractional points in Python are of type float.',
          },
        ],
      },
      {
        id: 'q_2',
        title: 'Control Flow & Logic Quiz',
        world: 'python',
        topicId: 'py_3',
        passingPercentage: 70,
        xpReward: 20,
        questions: [
          {
            id: 'q2_1',
            question: 'Which keyword is used for "else if" in Python?',
            options: ['else if', 'elseif', 'elif', 'elsif'],
            correctAnswer: 2,
            explanation: 'Python uses elif as shorthand for else if.',
          },
          {
            id: 'q2_2',
            question: 'What statement terminates the current loop immediately?',
            options: ['continue', 'break', 'exit', 'pass'],
            correctAnswer: 1,
            explanation: 'break immediately exits the enclosing for or while loop.',
          },
          {
            id: 'q2_3',
            question: 'What does the "pass" keyword do in Python?',
            options: ['Stops the program', 'Skips to next iteration', 'Acts as a null statement / placeholder', 'Passes a parameter'],
            correctAnswer: 2,
            explanation: 'pass is a null operation; nothing happens when it executes.',
          },
          {
            id: 'q2_4',
            question: 'What will print(10 > 5 and 3 < 1) output?',
            options: ['True', 'False', 'None', 'Error'],
            correctAnswer: 1,
            explanation: 'True and False evaluates to False in boolean logic.',
          },
        ],
      },
      {
        id: 'q_3',
        title: 'Lists and Dictionaries Quiz',
        world: 'python',
        topicId: 'py_6',
        passingPercentage: 70,
        xpReward: 20,
        questions: [
          {
            id: 'q3_1',
            question: 'Which method adds an element to the end of a list in Python?',
            options: ['push()', 'add()', 'append()', 'insertEnd()'],
            correctAnswer: 2,
            explanation: 'list.append(x) places x at the tail of the list.',
          },
          {
            id: 'q3_2',
            question: 'How do you access value associated with key "hero" in dict d?',
            options: ['d.hero', 'd["hero"]', 'd->hero', 'd(hero)'],
            correctAnswer: 1,
            explanation: 'Square bracket notation d["hero"] or d.get("hero") is standard.',
          },
          {
            id: 'q3_3',
            question: 'What does len([1, 2, [3, 4]]) return?',
            options: ['4', '3', '2', 'Error'],
            correctAnswer: 1,
            explanation: 'The list contains 3 elements: 1, 2, and the nested list [3, 4].',
          },
          {
            id: 'q3_4',
            question: 'What is the result of [x * 2 for x in [1, 2, 3]]?',
            options: ['[1, 2, 3, 1, 2, 3]', '[2, 4, 6]', '[2, 2, 2]', '[6]'],
            correctAnswer: 1,
            explanation: 'List comprehension multiplies each element by 2, giving [2, 4, 6].',
          },
        ],
      },
      {
        id: 'q_4',
        title: 'Algorithm Complexity & Big-O Quiz',
        world: 'dsa',
        topicId: 'dsa_1',
        passingPercentage: 70,
        xpReward: 20,
        questions: [
          {
            id: 'q4_1',
            question: 'What is the time complexity of accessing an array element by index?',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
            correctAnswer: 1,
            explanation: 'Direct index access is constant time O(1) in contiguous memory.',
          },
          {
            id: 'q4_2',
            question: 'What is the worst-case time complexity of Binary Search on a sorted array?',
            options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
            correctAnswer: 2,
            explanation: 'Binary Search halves the search space each step: O(log n).',
          },
          {
            id: 'q4_3',
            question: 'Which of the following growth rates is the slowest (most efficient)?',
            options: ['O(n)', 'O(n^2)', 'O(log n)', 'O(2^n)'],
            correctAnswer: 2,
            explanation: 'Logarithmic O(log n) grows much slower than linear or polynomial.',
          },
          {
            id: 'q4_4',
            question: 'What does Big-O notation primarily describe?',
            options: ['Exact execution milliseconds', 'Upper bound on growth rate as input size approaches infinity', 'Minimum memory required in bytes', 'Compiler version'],
            correctAnswer: 1,
            explanation: 'Big-O denotes asymptotic upper bound on algorithm resource growth.',
          },
        ],
      },
      {
        id: 'q_5',
        title: 'Stacks & Queues Quiz',
        world: 'dsa',
        topicId: 'dsa_5',
        passingPercentage: 70,
        xpReward: 20,
        questions: [
          {
            id: 'q5_1',
            question: 'Which principle governs the behavior of a Stack?',
            options: ['FIFO', 'LIFO', 'Priority first', 'Random access'],
            correctAnswer: 1,
            explanation: 'Stacks operate under Last-In First-Out (LIFO).',
          },
          {
            id: 'q5_2',
            question: 'Which data structure is ideal for Breadth-First Search (BFS)?',
            options: ['Stack', 'Queue', 'Binary Heap', 'Hash Table'],
            correctAnswer: 1,
            explanation: 'BFS explores layer by layer using a FIFO Queue.',
          },
          {
            id: 'q5_3',
            question: 'What happens when popping an element from an empty stack?',
            options: ['Underflow', 'Overflow', 'Deadlock', 'Garbage collection'],
            correctAnswer: 0,
            explanation: 'Attempting to pop an empty structure triggers Stack Underflow.',
          },
          {
            id: 'q5_4',
            question: 'Which classic problem is directly solved using a stack?',
            options: ['Shortest path in weighted graph', 'Matching balanced parentheses', 'Minimum spanning tree', 'Array sorting'],
            correctAnswer: 1,
            explanation: 'Balanced parentheses checking is a quintessential stack problem.',
          },
        ],
      },
      {
        id: 'q_6',
        title: 'Trees & Traversal Quiz',
        world: 'dsa',
        topicId: 'dsa_7',
        passingPercentage: 70,
        xpReward: 20,
        questions: [
          {
            id: 'q6_1',
            question: 'In a Binary Search Tree (BST), where are keys smaller than the root stored?',
            options: ['Right subtree', 'Left subtree', 'At the parent', 'In a separate leaf'],
            correctAnswer: 1,
            explanation: 'By BST property, all keys in the left subtree are smaller than the node key.',
          },
          {
            id: 'q6_2',
            question: 'Which tree traversal visits nodes in non-decreasing sorted order for a BST?',
            options: ['Preorder (Root, Left, Right)', 'Inorder (Left, Root, Right)', 'Postorder (Left, Right, Root)', 'Level-order'],
            correctAnswer: 1,
            explanation: 'Inorder traversal of a BST yields elements in strictly sorted order.',
          },
          {
            id: 'q6_3',
            question: 'What is the maximum number of children a node can have in a binary tree?',
            options: ['1', '2', '3', 'Unlimited'],
            correctAnswer: 1,
            explanation: 'A binary tree node can have at most 2 child nodes (left and right).',
          },
          {
            id: 'q6_4',
            question: 'What is the height of a balanced binary tree with N nodes?',
            options: ['O(N)', 'O(log N)', 'O(N^2)', 'O(1)'],
            correctAnswer: 1,
            explanation: 'A balanced binary tree has height bounded by O(log N).',
          },
        ],
      },
      {
        id: 'q_7',
        title: 'Sorting Algorithms Quiz',
        world: 'dsa',
        topicId: 'dsa_9',
        passingPercentage: 70,
        xpReward: 20,
        questions: [
          {
            id: 'q7_1',
            question: 'Which sorting algorithm has a worst-case time complexity of O(n log n)?',
            options: ['Quick Sort', 'Merge Sort', 'Bubble Sort', 'Insertion Sort'],
            correctAnswer: 1,
            explanation: 'Merge Sort guarantees O(n log n) even in worst-case scenarios.',
          },
          {
            id: 'q7_2',
            question: 'What is the worst-case time complexity of standard Quick Sort with poor pivot choice?',
            options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)'],
            correctAnswer: 2,
            explanation: 'If the pivot is always the extreme element, Quick Sort degrades to O(n^2).',
          },
          {
            id: 'q7_3',
            question: 'Which sorting algorithm is known for being in-place and having O(n) best-case on nearly sorted data?',
            options: ['Merge Sort', 'Insertion Sort', 'Heap Sort', 'Radix Sort'],
            correctAnswer: 1,
            explanation: 'Insertion sort runs in O(n) on pre-sorted or nearly-sorted arrays.',
          },
          {
            id: 'q7_4',
            question: 'Is Merge Sort a stable sorting algorithm?',
            options: ['Yes', 'No', 'Only for numbers', 'Depends on CPU'],
            correctAnswer: 0,
            explanation: 'Merge sort maintains the relative order of duplicate elements, making it stable.',
          },
        ],
      },
      {
        id: 'q_8',
        title: 'Adventure Hybrid Mastery Quiz',
        world: 'adventure',
        topicId: 'adv_1',
        passingPercentage: 70,
        xpReward: 20,
        questions: [
          {
            id: 'q8_1',
            question: 'How do you sort a Python list of tuples by their second element?',
            options: [
              'items.sort(key=lambda x: x[1])',
              'items.sort(index=2)',
              'items.sort_by(1)',
              'sort(items, column=1)',
            ],
            correctAnswer: 0,
            explanation: 'key=lambda x: x[1] provides the custom comparison key function.',
          },
          {
            id: 'q8_2',
            question: 'Which recursion base condition prevents infinite recursion stack overflow?',
            options: ['A condition that returns without a recursive call', 'Calling the function twice', 'A while loop inside', 'import sys'],
            correctAnswer: 0,
            explanation: 'The base case terminates the recursive descent and unrolls the call stack.',
          },
          {
            id: 'q8_3',
            question: 'In Python, collections.deque provides O(1) time operations for which methods?',
            options: ['append() and popleft()', 'insert at index 5', 'sorting', 'binary search'],
            correctAnswer: 0,
            explanation: 'deque is implemented as a doubly linked list, enabling O(1) append and pop on both ends.',
          },
          {
            id: 'q8_4',
            question: 'What algorithm strategy does Dijkstra use to find shortest paths?',
            options: ['Divide and Conquer', 'Greedy with Priority Queue', 'Backtracking', 'Random Walk'],
            correctAnswer: 1,
            explanation: 'Dijkstra greedily chooses the unvisited vertex with smallest tentative distance.',
          },
        ],
      },
    ];

    for (const q of quizzesData) {
      const exists = await Quiz.findById(q.id);
      if (!exists) {
        await Quiz.create({ ...q, _id: q.id });
      }
    }
    console.log('✅ Seeded Topic Quizzes');

    // 5. Seed Coding Challenges (30 distinct, topic-specific challenges)
    const validChallengeIds = allCodingChallenges.map(c => c.id);
    try {
      if (mongoose.connection && mongoose.connection.readyState === 1) {
        const rawCol = mongoose.connection.collection("codingchallenges");
        await rawCol.deleteMany({
          $or: [
            { id: { $nin: validChallengeIds } },
            { id: { $exists: false } },
            { id: null },
          ],
        });
      }
    } catch (e) {
      console.warn("Cleanup of obsolete challenges failed:", e.message);
    }

    for (const c of allCodingChallenges) {
      const exists = await CodingChallenge.findOne({
        $or: [{ id: c.id }, { topicId: c.topicId }, { title: c.title }],
      });
      if (!exists) {
        await CodingChallenge.create({ ...c, _id: c.id, id: c.id });
      } else {
        if (CodingChallenge.mongooseModel) {
          await CodingChallenge.mongooseModel.updateOne(
            { _id: exists._id },
            { $set: { ...c, id: c.id, topicId: c.topicId } }
          );
        }
        await CodingChallenge.findByIdAndUpdate(exists._id || exists.id, { ...c, id: c.id });
      }
    }
    console.log(`✅ Seeded ${allCodingChallenges.length} Unique Topic-Specific Coding Challenges`);

    // 6. Seed Topics (12 Python, 12 DSA, 6 Adventure)
    const topicsData = [
      // --- PYTHON WORLD ---
      {
        id: 'py_1',
        title: 'Introduction to Python & Variables',
        slug: 'intro-python-variables',
        world: 'python',
        level: 1,
        order: 1,
        difficulty: 'Beginner',
        description: 'Discover the syntax, philosophy, and basic variable containers in Python.',
        objectives: [
          'Understand Python syntax and indentation rules',
          'Declare and assign variables dynamically',
          'Learn basic primitive types: int, float, str, bool',
          'Print outputs to the terminal with print()',
        ],
        explanation: 'Python is a high-level, interpreted programming language prized for readability. Variables are created the moment you first assign a value to them without explicit type declarations.',
        syntax: 'variable_name = value\nprint(variable_name)',
        examples: [
          {
            title: 'Variable Assignment & Printing',
            code: 'hero_name = "Aria"\nlevel = 1\nxp = 100.5\nis_ready = True\n\nprint(f"Hero {hero_name} is level {level} with {xp} XP!")',
            output: 'Hero Aria is level 1 with 100.5 XP!',
            notes: 'f-strings allow inline interpolation of expressions.',
          },
        ],
        keyPoints: [
          'Python is dynamically typed and garbage collected.',
          'Variable names are case-sensitive and must not start with digits.',
          'Indentation indicates blocks of code (4 spaces standard).',
        ],
        commonMistakes: [
          'Mixing tabs and spaces causing IndentationError.',
          'Using reserved keywords (class, def, if, return) as variable names.',
        ],
        gameId: 'g_1',
        quizId: 'q_1',
        challengeId: 'c_py_1',
        xpReward: 20,
      },
      {
        id: 'py_2',
        title: 'Operators & Type Conversion',
        slug: 'operators-type-conversion',
        world: 'python',
        level: 1,
        order: 2,
        difficulty: 'Beginner',
        description: 'Master arithmetic, comparison, logical operators, and explicit type casting.',
        objectives: [
          'Apply arithmetic operators (+, -, *, /, //, %, **)',
          'Evaluate boolean comparison and logical statements',
          'Convert types using int(), float(), str(), bool()',
        ],
        explanation: 'Operators perform operations on variables and values. Python provides floor division (//) for integer results and exponentiation (**) natively.',
        syntax: 'result = a ** b + c // d\nconverted = int("42")',
        examples: [
          {
            title: 'Arithmetic & Casting',
            code: 'items = "5"\ntotal = int(items) * 10\npower = 2 ** 4\nprint("Total:", total, "Power:", power)',
            output: 'Total: 50 Power: 16',
            notes: 'int("5") parses the string into an integer before multiplication.',
          },
        ],
        keyPoints: [
          'Division with / always produces a float.',
          'Floor division // truncates towards negative infinity.',
        ],
        commonMistakes: [
          'Adding a string and an int directly ("5" + 5 causes TypeError).',
        ],
        gameId: 'g_2',
        quizId: 'q_1',
        challengeId: 'c_py_2',
        xpReward: 20,
      },
      {
        id: 'py_3',
        title: 'Conditionals (if, elif, else)',
        slug: 'conditionals-if-else',
        world: 'python',
        level: 2,
        order: 3,
        difficulty: 'Beginner',
        description: 'Guide your program execution flow using branch conditions and boolean logic.',
        objectives: [
          'Structure if, elif, and else decision trees',
          'Combine conditions with and, or, and not',
          'Use nested conditions cleanly',
        ],
        explanation: 'Conditionals let your code make decisions based on runtime values. Python evaluates conditions truthfulness and executes the first indented block matching True.',
        syntax: 'if condition:\n    # action\nelif another_condition:\n    # action\nelse:\n    # fallback',
        examples: [
          {
            title: 'Health Status Evaluator',
            code: 'hp = 45\nif hp > 70:\n    print("Healthy")\nelif hp > 30:\n    print("Caution: Drink potion")\nelse:\n    print("Critical danger!")',
            output: 'Caution: Drink potion',
            notes: 'elif is evaluated only if the preceding if condition was False.',
          },
        ],
        keyPoints: [
          'Colons (:) terminate each condition header.',
          'Truthy values include non-zero numbers and non-empty collections.',
        ],
        commonMistakes: [
          'Using single equals (=) instead of double equals (==) for comparison.',
        ],
        gameId: 'g_3',
        quizId: 'q_2',
        challengeId: 'c_py_3',
        xpReward: 20,
      },
      {
        id: 'py_4',
        title: 'Loops (for, while, control)',
        slug: 'loops-for-while',
        world: 'python',
        level: 2,
        order: 4,
        difficulty: 'Beginner',
        description: 'Automate repetitive tasks using bounded for-loops and condition-driven while-loops.',
        objectives: [
          'Iterate through sequences using for...in range()',
          'Run continuous workflows with while condition',
          'Use break, continue, and else clauses on loops',
        ],
        explanation: 'for loops in Python are iterator-based. range(start, stop, step) generates sequences on the fly with minimal memory footprint.',
        syntax: 'for i in range(start, stop, step):\n    if cond: continue\n    if done: break',
        examples: [
          {
            title: 'Counting with Range',
            code: 'for step in range(1, 4):\n    print(f"Quest Step {step} Complete!")',
            output: 'Quest Step 1 Complete!\nQuest Step 2 Complete!\nQuest Step 3 Complete!',
            notes: 'range(1, 4) produces 1, 2, 3.',
          },
        ],
        keyPoints: [
          'continue skips the rest of the current iteration.',
          'break exits the entire loop immediately.',
        ],
        commonMistakes: [
          'Forgetting to increment the loop counter inside a while loop, creating an infinite loop.',
        ],
        gameId: 'g_8',
        quizId: 'q_2',
        challengeId: 'c_py_4',
        xpReward: 20,
      },
      {
        id: 'py_5',
        title: 'Strings & String Manipulation',
        slug: 'strings-manipulation',
        world: 'python',
        level: 3,
        order: 5,
        difficulty: 'Intermediate',
        description: 'Transform, slice, format, and search textual data with powerful string methods.',
        objectives: [
          'Slice strings with [start:stop:step]',
          'Use built-in methods: upper, lower, strip, split, join',
          'Format text with modern f-strings',
        ],
        explanation: 'Strings in Python are immutable sequences of Unicode characters. Slicing with [::-1] easily reverses a string.',
        syntax: 's[start:end:step]\njoined = ",".join(list_of_strings)',
        examples: [
          {
            title: 'Slicing & Splitting',
            code: 'scroll = "Fire,Ice,Lightning"\nelements = scroll.split(",")\nreversed_first = elements[0][::-1]\nprint(elements, reversed_first)',
            output: "['Fire', 'Ice', 'Lightning'] eriF",
            notes: 'split() creates a list, while [::-1] reverses.',
          },
        ],
        keyPoints: [
          'Strings cannot be modified in-place; modifications create new strings.',
          'Indexing starts at 0, negative indexing starts at -1.',
        ],
        commonMistakes: [
          'Trying to assign to an index: s[0] = "a" raises TypeError.',
        ],
        gameId: 'g_1',
        quizId: 'q_2',
        challengeId: 'c_py_5',
        xpReward: 20,
      },
      {
        id: 'py_6',
        title: 'Lists & List Comprehension',
        slug: 'lists-comprehension',
        world: 'python',
        level: 3,
        order: 6,
        difficulty: 'Intermediate',
        description: 'Work with mutable ordered sequences and write elegant list comprehensions.',
        objectives: [
          'Create, append, pop, and sort lists',
          'Apply list slicing and concatenation',
          'Write concise list comprehensions [expr for item in iterable if cond]',
        ],
        explanation: 'Lists are mutable ordered collections that can hold mixed data types. List comprehensions provide a concise way to create lists without boilerplate loops.',
        syntax: 'squares = [x**2 for x in numbers if x % 2 == 0]',
        examples: [
          {
            title: 'List Comprehension Magic',
            code: 'numbers = [1, 2, 3, 4, 5]\nevens = [n for n in numbers if n % 2 == 0]\nprint("Even numbers:", evens)',
            output: 'Even numbers: [2, 4]',
            notes: 'Filters and maps in a single readable line.',
          },
        ],
        keyPoints: [
          'Lists are mutable: items can be changed, added, or removed.',
          'append() runs in O(1) amortized time.',
        ],
        commonMistakes: [
          'Copying a list with list2 = list1 copies reference, not contents. Use list1.copy() or list1[:].',
        ],
        gameId: 'g_1',
        quizId: 'q_3',
        challengeId: 'c_py_6',
        xpReward: 20,
      },
      {
        id: 'py_7',
        title: 'Tuples & Sets',
        slug: 'tuples-and-sets',
        world: 'python',
        level: 3,
        order: 7,
        difficulty: 'Intermediate',
        description: 'Explore immutable tuples for fixed data and hash-based sets for unique collections.',
        objectives: [
          'Store fixed coordinate records in tuples',
          'Unpack tuples cleanly into variables',
          'Use sets for O(1) membership testing and union/intersection',
        ],
        explanation: 'Tuples are immutable sequences, while Sets are unordered collections of unique elements backed by hash tables.',
        syntax: 'coord = (10, 20)\nunique_keys = {1, 2, 3, 2} # {1, 2, 3}',
        examples: [
          {
            title: 'Set Deduplication',
            code: 'inventory = ["potion", "shield", "potion", "sword"]\nunique_items = set(inventory)\nprint("Distinct gear:", sorted(list(unique_items)))',
            output: "Distinct gear: ['potion', 'shield', 'sword']",
            notes: 'Duplicate "potion" is automatically eliminated by the set.',
          },
        ],
        keyPoints: [
          'Sets cannot contain duplicate elements.',
          'Set lookup "x in s" is O(1) average time.',
        ],
        commonMistakes: [
          'Using {} to create an empty set creates an empty dict instead. Use set().',
        ],
        gameId: 'g_2',
        quizId: 'q_3',
        challengeId: 'c_py_7',
        xpReward: 20,
      },
      {
        id: 'py_8',
        title: 'Dictionaries & Key-Value Storage',
        slug: 'dictionaries-hash-maps',
        world: 'python',
        level: 3,
        order: 8,
        difficulty: 'Intermediate',
        description: 'Harness the power of hash maps for O(1) associative key-value mapping.',
        objectives: [
          'Define dictionaries with keys and values',
          'Access and safeguard lookups using .get(key, default)',
          'Iterate over keys, values, and .items()',
        ],
        explanation: 'Dictionaries map unique hashable keys to arbitrary values. They maintain insertion order starting in Python 3.7+.',
        syntax: 'd = {"name": "Bot", "xp": 100}\nval = d.get("missing", 0)',
        examples: [
          {
            title: 'Dictionary Operations',
            code: 'stats = {"atk": 15, "def": 10}\nstats["speed"] = 8\nfor k, v in stats.items():\n    print(f"{k}: {v}")',
            output: 'atk: 15\ndef: 10\nspeed: 8',
            notes: '.items() yields (key, value) pairs.',
          },
        ],
        keyPoints: [
          'Keys must be hashable and immutable (strings, numbers, tuples).',
          'Average lookup, insertion, and deletion is O(1).',
        ],
        commonMistakes: [
          'Accessing d["unknown"] raises KeyError. Use d.get("unknown") instead.',
        ],
        gameId: 'g_3',
        quizId: 'q_3',
        challengeId: 'c_py_8',
        xpReward: 20,
      },
      {
        id: 'py_9',
        title: 'Functions & Scope',
        slug: 'functions-parameters-scope',
        world: 'python',
        level: 4,
        order: 9,
        difficulty: 'Intermediate',
        description: 'Organize logic into modular, reusable functions with default and keyword arguments.',
        objectives: [
          'Define functions with def and return values',
          'Use positional, default, and *args / **kwargs',
          'Understand LEGB scope rules (Local, Enclosing, Global, Built-in)',
        ],
        explanation: 'Functions bundle statements into reusable procedures. Without an explicit return statement, a Python function returns None.',
        syntax: 'def calculate_damage(base, multiplier=1.5):\n    return base * multiplier',
        examples: [
          {
            title: 'Function with Default Argument',
            code: 'def craft_potion(herb, quantity=1):\n    return f"Crafted {quantity} {herb} potion(s)!"\n\nprint(craft_potion("Mana", 3))\nprint(craft_potion("Health"))',
            output: 'Crafted 3 Mana potion(s)!\nCrafted 1 Health potion(s)!',
            notes: 'quantity falls back to default 1 if not passed.',
          },
        ],
        keyPoints: [
          'Functions are first-class citizens: they can be passed as arguments and stored in variables.',
          'Never use mutable default arguments like def fn(x=[]).',
        ],
        commonMistakes: [
          'Forgetting the return keyword and getting None.',
        ],
        gameId: 'g_2',
        quizId: 'q_1',
        challengeId: 'c_py_9',
        xpReward: 20,
      },
      {
        id: 'py_10',
        title: 'Lambda Functions & Recursion',
        slug: 'lambda-recursion',
        world: 'python',
        level: 4,
        order: 10,
        difficulty: 'Intermediate',
        description: 'Write anonymous inline functions and solve problems through self-referential recursion.',
        objectives: [
          'Construct anonymous functions using lambda',
          'Design recursive functions with solid base cases',
          'Understand the runtime call stack and recursion limits',
        ],
        explanation: 'A lambda function is a small anonymous function defined with `lambda args: expression`. Recursion is a technique where a function calls itself to solve smaller instances of the problem.',
        syntax: 'square = lambda x: x * x\ndef countdown(n):\n    if n <= 0: return\n    countdown(n-1)',
        examples: [
          {
            title: 'Recursive Factorial',
            code: 'def fact(n):\n    if n <= 1: return 1\n    return n * fact(n - 1)\n\nprint("5! =", fact(5))',
            output: '5! = 120',
            notes: 'Base case is n <= 1, preventing infinite recursion.',
          },
        ],
        keyPoints: [
          'Every recursive function MUST have at least one base case.',
          'Lambdas can only contain a single expression.',
        ],
        commonMistakes: [
          'Omitting base case causes RecursionError (maximum recursion depth exceeded).',
        ],
        gameId: 'g_8',
        quizId: 'q_8',
        challengeId: 'c_py_10',
        xpReward: 20,
      },
      {
        id: 'py_11',
        title: 'Exception Handling & File I/O',
        slug: 'exceptions-file-handling',
        world: 'python',
        level: 5,
        order: 11,
        difficulty: 'Advanced',
        description: 'Build fault-tolerant applications using try, except, finally, and context managers.',
        objectives: [
          'Catch specific exceptions with try...except',
          'Execute cleanup code using finally',
          'Read and write files safely with the `with open(...)` context manager',
        ],
        explanation: 'Exceptions handle unexpected runtime anomalies cleanly. The `with` statement guarantees resources are freed automatically even if errors occur.',
        syntax: 'try:\n    risky_operation()\nexcept SpecificError as e:\n    handle_error(e)\nfinally:\n    cleanup()',
        examples: [
          {
            title: 'Safe Division with try/except',
            code: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Cannot divide by zero!"\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))',
            output: '5.0\nCannot divide by zero!',
            notes: 'ZeroDivisionError is gracefully handled.',
          },
        ],
        keyPoints: [
          'Never use a bare except: without exception class.',
          'The with statement calls __enter__ and __exit__ automatically.',
        ],
        commonMistakes: [
          'Swallowing exceptions silently without logging or notifying.',
        ],
        gameId: 'g_3',
        quizId: 'q_2',
        challengeId: 'c_py_11',
        xpReward: 20,
      },
      {
        id: 'py_12',
        title: 'Object-Oriented Programming (Classes & Objects)',
        slug: 'oop-classes-objects',
        world: 'python',
        level: 5,
        order: 12,
        difficulty: 'Advanced',
        description: 'Model real-world entities through classes, instance attributes, methods, and inheritance.',
        objectives: [
          'Instantiate classes and initialize state with __init__',
          'Encapsulate behaviors in instance methods with self',
          'Inherit and override behaviors from parent classes',
        ],
        explanation: 'OOP organizes software design around data objects rather than functions alone. Python supports multiple inheritance and duck typing.',
        syntax: 'class Hero:\n    def __init__(self, name):\n        self.name = name\n    def attack(self):\n        return "Strike!"',
        examples: [
          {
            title: 'Hero Class Hierarchy',
            code: 'class Mage:\n    def __init__(self, name, mana):\n        self.name = name\n        self.mana = mana\n    def cast(self):\n        return f"{self.name} casts Fireball!"\n\nm = Mage("Eldrin", 100)\nprint(m.cast())',
            output: 'Eldrin casts Fireball!',
            notes: 'self references the specific instance of the class.',
          },
        ],
        keyPoints: [
          '__init__ is the initializer method called upon object creation.',
          'self explicitly represents the instance being operated on.',
        ],
        commonMistakes: [
          'Omitting self in method definitions causing TypeError when called.',
        ],
        gameId: 'g_2',
        quizId: 'q_3',
        challengeId: 'c_py_12',
        xpReward: 20,
      },

      // --- DSA WORLD ---
      {
        id: 'dsa_1',
        title: 'Algorithm Complexity & Big-O Notation',
        slug: 'algorithm-complexity-big-o',
        world: 'dsa',
        level: 1,
        order: 1,
        difficulty: 'Beginner',
        description: 'Quantify algorithm efficiency and scalability across time and memory spaces.',
        objectives: [
          'Understand asymptotic analysis (Worst, Average, Best case)',
          'Classify common complexities: O(1), O(log n), O(n), O(n log n), O(n^2)',
          'Analyze space and auxiliary memory complexity',
        ],
        explanation: 'Big-O notation describes the limiting behavior of a function when the argument tends towards a particular value or infinity. It strips away hardware constants to focus on scalability.',
        syntax: 'O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n)',
        examples: [
          {
            title: 'Linear vs Quadratic Comparison',
            code: '# O(n) linear search\ndef search(arr, target):\n    for x in arr:\n        if x == target: return True\n    return False\n\n# O(n^2) nested loop\ndef pairs(arr):\n    return [(x, y) for x in arr for y in arr]',
            output: 'Linear: O(n), Nested: O(n^2)',
            notes: 'Nested loops over the same input n result in quadratic time.',
          },
        ],
        keyPoints: [
          'Drop non-dominant terms and constants (e.g. 3n^2 + 5n -> O(n^2)).',
          'Logarithmic growth O(log n) is the hallmark of divide-and-conquer.',
        ],
        commonMistakes: [
          'Confusing best-case with worst-case performance.',
        ],
        gameId: 'g_6',
        quizId: 'q_4',
        challengeId: 'c_dsa_1',
        xpReward: 20,
      },
      {
        id: 'dsa_2',
        title: 'Arrays & Dynamic Arrays',
        slug: 'arrays-dynamic-arrays',
        world: 'dsa',
        level: 2,
        order: 2,
        difficulty: 'Beginner',
        description: 'Explore contiguous memory layouts, amortized resizing, and two-pointer strategies.',
        objectives: [
          'Understand contiguous RAM storage and pointer arithmetic',
          'Calculate amortized doubling cost of dynamic resizing',
          'Apply the two-pointer technique for in-place array algorithms',
        ],
        explanation: 'Arrays store elements in continuous memory slots, allowing O(1) random indexing. Dynamic arrays double capacity when full, achieving O(1) amortized append.',
        syntax: 'index_address = base_address + index * element_size',
        examples: [
          {
            title: 'Two Pointers In-Place',
            code: 'def reverse_array(arr):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        arr[left], arr[right] = arr[right], arr[left]\n        left += 1\n        right -= 1\n    return arr\n\nprint(reverse_array([1, 2, 3, 4]))',
            output: '[4, 3, 2, 1]',
            notes: 'In-place swap requires O(1) extra auxiliary space.',
          },
        ],
        keyPoints: [
          'Random access is O(1).',
          'Insertions and deletions at arbitrary indices take O(n) due to shifting.',
        ],
        commonMistakes: [
          'Off-by-one errors with array indices leading to IndexError.',
        ],
        gameId: 'g_7',
        quizId: 'q_4',
        challengeId: 'c_dsa_2',
        xpReward: 20,
      },
      {
        id: 'dsa_3',
        title: 'String Algorithms & Sliding Window',
        slug: 'string-algorithms-sliding-window',
        world: 'dsa',
        level: 3,
        order: 3,
        difficulty: 'Intermediate',
        description: 'Solve substring, anagram, and palindrome challenges with the sliding window pattern.',
        objectives: [
          'Implement sliding window for sub-array and substring problems',
          'Track character frequencies with hash tables',
          'Optimize brute-force O(n^2) substring checks down to O(n)',
        ],
        explanation: 'The sliding window technique maintains a window over a data structure that expands or contracts to satisfy problem constraints in linear time.',
        syntax: 'left = 0\nfor right in range(len(s)):\n    update_window(s[right])\n    while invalid():\n        shrink_window(s[left]); left += 1',
        examples: [
          {
            title: 'Max Sum Subarray Window of Size K',
            code: 'def max_sub(arr, k):\n    window = sum(arr[:k])\n    best = window\n    for i in range(k, len(arr)):\n        window += arr[i] - arr[i - k]\n        best = max(best, window)\n    return best\n\nprint(max_sub([2, 1, 5, 1, 3, 2], 3))',
            output: '9',
            notes: 'Subarray [5, 1, 3] gives maximum sum 9 in O(n) time.',
          },
        ],
        keyPoints: [
          'Avoid recalculating from scratch inside loops.',
          'Character counts can be stored in 26-element arrays or dicts.',
        ],
        commonMistakes: [
          'Forgetting to decrement frequency counts when shrinking the left edge.',
        ],
        gameId: 'g_1',
        quizId: 'q_4',
        challengeId: 'c_dsa_3',
        xpReward: 20,
      },
      {
        id: 'dsa_4',
        title: 'Linked Lists (Singly & Doubly)',
        slug: 'linked-lists-nodes',
        world: 'dsa',
        level: 4,
        order: 4,
        difficulty: 'Intermediate',
        description: 'Master pointer-based non-contiguous data structures and node manipulation.',
        objectives: [
          'Construct Node classes with value and next/prev pointers',
          'Perform head/tail insertions and deletions in O(1)',
          'Reverse a singly linked list iteratively in O(n)',
        ],
        explanation: 'Unlike arrays, linked lists store elements non-contiguously in memory where each node points to the next, allowing rapid insertions without memory shifting.',
        syntax: 'class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None',
        examples: [
          {
            title: 'Reversing a Linked List',
            code: 'def reverse_list(head):\n    prev, curr = None, head\n    while curr:\n        next_temp = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_temp\n    return prev',
            output: 'Reverses list in O(n) time and O(1) space',
            notes: 'Tracks three pointers: prev, curr, and next_temp.',
          },
        ],
        keyPoints: [
          'No random access: searching is O(n).',
          'Memory overhead for storing pointer references in each node.',
        ],
        commonMistakes: [
          'Losing reference to the rest of the list before updating next pointer.',
        ],
        gameId: 'g_4',
        quizId: 'q_5',
        challengeId: 'c_dsa_4',
        xpReward: 20,
      },
      {
        id: 'dsa_5',
        title: 'Stacks (LIFO) & Monotonic Stacks',
        slug: 'stacks-lifo-applications',
        world: 'dsa',
        level: 5,
        order: 5,
        difficulty: 'Intermediate',
        description: 'Harness Last-In First-Out structures for expression parsing, history, and undo buffers.',
        objectives: [
          'Push, pop, and peek in O(1) time',
          'Solve balanced bracket and expression evaluation problems',
          'Leverage monotonic stacks for next greater element queries',
        ],
        explanation: 'A stack is a container of objects that are inserted and removed according to the Last-In First-Out (LIFO) principle.',
        syntax: 'stack = []\nstack.append(val)  # Push\ntop = stack.pop()  # Pop',
        examples: [
          {
            title: 'Bracket Matcher with Stack',
            code: 'def is_valid(s):\n    st = []\n    for ch in s:\n        if ch == "(": st.append(ch)\n        elif ch == ")":\n            if not st: return False\n            st.pop()\n    return len(st) == 0\n\nprint(is_valid("(())"))',
            output: 'True',
            notes: 'Every closing parenthesis matches the most recently opened one.',
          },
        ],
        keyPoints: [
          'Python list append and pop operate on the tail in O(1).',
          'Function call execution in programming languages is governed by the Call Stack.',
        ],
        commonMistakes: [
          'Popping from an empty stack causes IndexError. Always check `if stack:`.',
        ],
        gameId: 'g_4',
        quizId: 'q_5',
        challengeId: 'c_dsa_5',
        xpReward: 20,
      },
      {
        id: 'dsa_6',
        title: 'Queues (FIFO) & Deques',
        slug: 'queues-fifo-deques',
        world: 'dsa',
        level: 6,
        order: 6,
        difficulty: 'Intermediate',
        description: 'Process elements in strict arrival order and utilize double-ended queues efficiently.',
        objectives: [
          'Enqueue and dequeue in O(1) time',
          'Implement queues using collections.deque',
          'Apply queues in breadth-first traversal simulations',
        ],
        explanation: 'A queue is a First-In First-Out (FIFO) collection. Using a standard Python list for queues is inefficient because pop(0) takes O(n) time; use `collections.deque` instead.',
        syntax: 'from collections import deque\nq = deque()\nq.append(val)     # enqueue\nval = q.popleft() # dequeue in O(1)',
        examples: [
          {
            title: 'Queue Demonstration',
            code: 'from collections import deque\nq = deque(["Hero", "Mage"])\nq.append("Rogue")\nserved = q.popleft()\nprint("Served:", served, "Remaining in line:", list(q))',
            output: "Served: Hero Remaining in line: ['Mage', 'Rogue']",
            notes: 'popleft() removes the front item in true O(1) time.',
          },
        ],
        keyPoints: [
          'Standard list.pop(0) is O(n). Always prefer deque for queues.',
          'Deques permit O(1) push and pop from both ends.',
        ],
        commonMistakes: [
          'Using list.pop(0) in tight loops destroying algorithm time complexity.',
        ],
        gameId: 'g_5',
        quizId: 'q_5',
        challengeId: 'c_dsa_6',
        xpReward: 20,
      },
      {
        id: 'dsa_7',
        title: 'Binary Trees & BST Traversal',
        slug: 'trees-bst-traversal',
        world: 'dsa',
        level: 7,
        order: 7,
        difficulty: 'Advanced',
        description: 'Navigate hierarchical structures with Inorder, Preorder, Postorder, and BST properties.',
        objectives: [
          'Construct binary tree nodes with left and right children',
          'Execute recursive Preorder, Inorder, and Postorder traversals',
          'Search, insert, and validate Binary Search Trees',
        ],
        explanation: 'In a Binary Search Tree (BST), the left child is always strictly less than the root, and the right child is greater. Inorder traversal on a BST produces sorted values.',
        syntax: 'class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None',
        examples: [
          {
            title: 'Inorder Traversal (Left, Root, Right)',
            code: 'def inorder(root):\n    if not root: return []\n    return inorder(root.left) + [root.val] + inorder(root.right)',
            output: 'Returns sorted list for a valid BST',
            notes: 'Inorder yields strictly ascending order.',
          },
        ],
        keyPoints: [
          'A balanced BST yields O(log n) search, insertion, and deletion.',
          'An unbalanced degenerated BST degrades to an O(n) linked list.',
        ],
        commonMistakes: [
          'Only checking immediate children when validating a BST instead of passing min/max boundaries.',
        ],
        gameId: 'g_6',
        quizId: 'q_6',
        challengeId: 'c_dsa_7',
        xpReward: 20,
      },
      {
        id: 'dsa_8',
        title: 'Graphs (BFS, DFS & Representation)',
        slug: 'graphs-bfs-dfs',
        world: 'dsa',
        level: 8,
        order: 8,
        difficulty: 'Advanced',
        description: 'Model network topologies and explore interconnected nodes via Breadth and Depth First Searches.',
        objectives: [
          'Represent graphs with adjacency lists and matrices',
          'Explore vertices using BFS with a queue',
          'Traverse deeply using DFS with recursion or a stack',
        ],
        explanation: 'Graphs consist of vertices (nodes) connected by edges. BFS finds shortest paths in unweighted graphs, while DFS is ideal for connectivity, topological sorting, and cycle detection.',
        syntax: 'graph = {0: [1, 2], 1: [2], 2: []}\nvisited = set()',
        examples: [
          {
            title: 'BFS Shortest Path Reachability',
            code: 'from collections import deque\ndef bfs(graph, start):\n    visited, queue = {start}, deque([start])\n    order = []\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph.get(node, []):\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    return order',
            output: 'Returns level-order visit sequence',
            notes: 'Uses visited set to prevent infinite cycles.',
          },
        ],
        keyPoints: [
          'Always maintain a visited set in cyclic graphs.',
          'BFS time complexity is O(V + E) where V is vertices and E is edges.',
        ],
        commonMistakes: [
          'Forgetting to mark nodes as visited immediately upon queuing in BFS.',
        ],
        gameId: 'g_7',
        quizId: 'q_6',
        challengeId: 'c_dsa_8',
        xpReward: 20,
      },
      {
        id: 'dsa_9',
        title: 'Elementary Sorting (Bubble, Selection, Insertion)',
        slug: 'sorting-bubble-selection-insertion',
        world: 'dsa',
        level: 9,
        order: 9,
        difficulty: 'Intermediate',
        description: 'Understand quadratic O(n^2) comparison sorting mechanics and in-place swapping.',
        objectives: [
          'Implement Bubble Sort with early exit optimization',
          'Select minimum elements in Selection Sort',
          'Insert cards into sorted partitions with Insertion Sort',
        ],
        explanation: 'Elementary sorts illustrate fundamental sorting principles: partitioning, bubbling, and repeated selection.',
        syntax: 'for i in range(n):\n    for j in range(0, n - i - 1):\n        if arr[j] > arr[j+1]: swap()',
        examples: [
          {
            title: 'Optimized Bubble Sort',
            code: 'def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        swapped = False\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped: break\n    return arr',
            output: 'Sorts array in place with O(n) best-case',
            notes: 'Early exit triggers if no swaps occur.',
          },
        ],
        keyPoints: [
          'Insertion sort is adaptive: O(n) on nearly-sorted data.',
          'Selection sort always executes O(n^2) comparisons regardless of input.',
        ],
        commonMistakes: [
          'Using quadratic sorts on large datasets (n > 10,000).',
        ],
        gameId: 'g_7',
        quizId: 'q_7',
        challengeId: 'c_dsa_9',
        xpReward: 20,
      },
      {
        id: 'dsa_10',
        title: 'Advanced Sorting (Merge Sort & Quick Sort)',
        slug: 'sorting-merge-quick-sort',
        world: 'dsa',
        level: 9,
        order: 10,
        difficulty: 'Advanced',
        description: 'Achieve optimal O(n log n) divide-and-conquer efficiency.',
        objectives: [
          'Divide problem into halves and merge in Merge Sort',
          'Partition around a pivot element in Quick Sort',
          'Compare time, stability, and space tradeoffs',
        ],
        explanation: 'Divide-and-conquer breaks a large array into smaller sub-problems. Merge Sort guarantees O(n log n) with O(n) auxiliary space. Quick Sort is in-place and fast on average.',
        syntax: 'def merge_sort(arr):\n    mid = len(arr)//2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)',
        examples: [
          {
            title: 'Merge Sort Division',
            code: 'print("Merge Sort: guaranteed O(n log n) time and stable!")',
            output: 'Merge Sort: guaranteed O(n log n) time and stable!',
            notes: 'Requires O(n) auxiliary space for merge buffers.',
          },
        ],
        keyPoints: [
          'Merge sort is stable; Quick sort is typically unstable.',
          'Python built-in sort (Timsort) is an adaptive hybrid of Merge and Insertion sort.',
        ],
        commonMistakes: [
          'Quick Sort worst case is O(n^2) when pivot is poorly selected on sorted arrays.',
        ],
        gameId: 'g_7',
        quizId: 'q_7',
        challengeId: 'c_dsa_10',
        xpReward: 20,
      },
      {
        id: 'dsa_11',
        title: 'Greedy Algorithms & Dynamic Programming',
        slug: 'greedy-dynamic-programming',
        world: 'dsa',
        level: 10,
        order: 11,
        difficulty: 'Advanced',
        description: 'Tackle optimization problems with greedy choices and memoized overlapping subproblems.',
        objectives: [
          'Identify the greedy choice property and optimal substructure',
          'Solve overlapping subproblems using memoization (top-down)',
          'Build tabular solutions with bottom-up DP',
        ],
        explanation: 'Dynamic Programming solves complex problems by breaking them down into simpler subproblems and storing their solutions to avoid redundant computations.',
        syntax: 'memo = {}\ndef fib(n):\n    if n in memo: return memo[n]\n    memo[n] = fib(n-1) + fib(n-2); return memo[n]',
        examples: [
          {
            title: 'Memoized Fibonacci',
            code: 'memo = {0: 0, 1: 1}\ndef fib(n):\n    if n not in memo:\n        memo[n] = fib(n - 1) + fib(n - 2)\n    return memo[n]\n\nprint("fib(10) =", fib(10))',
            output: 'fib(10) = 55',
            notes: 'Transforms an O(2^n) exponential tree into linear O(n) time.',
          },
        ],
        keyPoints: [
          'Greedy makes the locally optimal choice at each stage.',
          'DP guarantees global optimality by exploring all non-redundant paths.',
        ],
        commonMistakes: [
          'Applying greedy when local optimum does not yield global optimum (e.g. 0/1 knapsack).',
        ],
        gameId: 'g_6',
        quizId: 'q_8',
        challengeId: 'c_dsa_11',
        xpReward: 20,
      },
      {
        id: 'dsa_12',
        title: 'Shortest Path & Dijkstra Algorithm',
        slug: 'dijkstra-shortest-path',
        world: 'dsa',
        level: 10,
        order: 12,
        difficulty: 'Advanced',
        description: 'Find minimum cost paths in weighted graphs using priority queues (min-heaps).',
        objectives: [
          'Understand edge weights and relaxation steps',
          'Use heapq for O((V + E) log V) Dijkstra execution',
          'Reconstruct the shortest path from origin to destination',
        ],
        explanation: 'Dijkstras algorithm finds shortest paths from a single source node to all other nodes in a graph with non-negative edge weights using a min-heap.',
        syntax: 'import heapq\nheapq.heappush(pq, (dist, node))\n(dist, curr) = heapq.heappop(pq)',
        examples: [
          {
            title: 'Dijkstra Relaxation Concept',
            code: 'print("Dijkstra greedily extracts closest vertex and relaxes edges!")',
            output: 'Dijkstra greedily extracts closest vertex and relaxes edges!',
            notes: 'Requires non-negative edge weights.',
          },
        ],
        keyPoints: [
          'Does not work with negative edge weights (use Bellman-Ford instead).',
          'Heap operations take O(log V) time.',
        ],
        commonMistakes: [
          'Re-visiting already finalized nodes without checking if current distance is stale.',
        ],
        gameId: 'g_7',
        quizId: 'q_8',
        challengeId: 'c_dsa_12',
        xpReward: 20,
      },

      // --- ADVENTURE WORLD ---
      {
        id: 'adv_1',
        title: 'The Enchanted Lists & Array Realm',
        slug: 'adventure-enchanted-lists',
        world: 'adventure',
        level: 1,
        order: 1,
        difficulty: 'Intermediate',
        description: 'Stage 1: Merge Python dynamic lists with DSA array search mechanics to conquer the enchanted glade.',
        objectives: [
          'Apply Python list comprehension to filter noisy sensor signals',
          'Execute linear and binary scans to identify rune positions',
          'Optimize in-place array transformations',
        ],
        explanation: 'In this stage of your quest, you combine high-level Python list operations with theoretical array algorithms to unlock the ancient stone gates.',
        syntax: 'filtered = [x for x in data if is_valid(x)]\npos = binary_search(filtered, key)',
        examples: [
          {
            title: 'Filtering & Sorting Runes',
            code: 'runes = [42, 18, 99, 7, 33]\nclean = sorted([r for r in runes if r > 10])\nprint("Active Runes:", clean)',
            output: 'Active Runes: [18, 33, 42, 99]',
            notes: 'Combines comprehension with built-in Timsort.',
          },
        ],
        keyPoints: [
          'Python lists are internally contiguous C-arrays of object pointers.',
          'Sorting before binary searching is worthwhile if multiple queries occur.',
        ],
        commonMistakes: ['Calling sort() in a tight loop.'],
        gameId: 'g_1',
        quizId: 'q_8',
        challengeId: 'c_adv_1',
        xpReward: 30,
      },
      {
        id: 'adv_2',
        title: 'The Tower of Call Stacks & Recursion',
        slug: 'adventure-recursion-tower',
        world: 'adventure',
        level: 2,
        order: 2,
        difficulty: 'Intermediate',
        description: 'Stage 2: Scale the mystical tower by matching Python recursive functions with system call stack frames.',
        objectives: [
          'Visualize frames pushed onto and popped from the call stack',
          'Implement recursive backtracking to solve tower puzzles',
          'Guard against stack exhaustion with memoization',
        ],
        explanation: 'Every recursive step pushes activation records onto the call stack. Master the relationship between your code and hardware memory.',
        syntax: 'def climb(steps):\n    if steps <= 0: return 0\n    return 1 + climb(steps - 1)',
        examples: [
          {
            title: 'Climbing Ways',
            code: 'def ways(n, memo={}):\n    if n <= 2: return n\n    if n not in memo:\n        memo[n] = ways(n-1, memo) + ways(n-2, memo)\n    return memo[n]\n\nprint("Ways to climb 5 steps:", ways(5))',
            output: 'Ways to climb 5 steps: 8',
            notes: 'Classic climbing stairs problem solved recursively with memoization.',
          },
        ],
        keyPoints: [
          'Python default recursion depth limit is usually 1000.',
          'Tail call optimization is not supported natively in standard CPython.',
        ],
        commonMistakes: ['Missing memo argument initialization.'],
        gameId: 'g_4',
        quizId: 'q_8',
        challengeId: 'c_adv_2',
        xpReward: 30,
      },
      {
        id: 'adv_3',
        title: 'The Forest of Object Trees',
        slug: 'adventure-object-trees',
        world: 'adventure',
        level: 3,
        order: 3,
        difficulty: 'Advanced',
        description: 'Stage 3: Design object-oriented node classes in Python to model branching decision trees.',
        objectives: [
          'Construct custom Python classes for tree nodes with rich methods',
          'Traverse object hierarchies recursively and iteratively',
          'Insert and search dungeon checkpoints in logarithmic time',
        ],
        explanation: 'Here, Python OOP principles merge seamlessly with non-linear tree structures. Model dungeon rooms as interconnected node objects.',
        syntax: 'class RoomNode:\n    def __init__(self, name, loot):\n        self.name = name\n        self.loot = loot\n        self.left = None\n        self.right = None',
        examples: [
          {
            title: 'Dungeon Room Navigation',
            code: 'class Room:\n    def __init__(self, name):\n        self.name = name\n        self.next_rooms = []\n\nr1 = Room("Entrance")\nr2 = Room("Treasure")\nr1.next_rooms.append(r2)\nprint("Connected:", r1.next_rooms[0].name)',
            output: 'Connected: Treasure',
            notes: 'Graph-like node connection using Python object attributes.',
          },
        ],
        keyPoints: [
          'Object attributes allow storing rich arbitrary game state per node.',
        ],
        commonMistakes: ['Circular references without garbage collection precautions.'],
        gameId: 'g_6',
        quizId: 'q_6',
        challengeId: 'c_adv_3',
        xpReward: 30,
      },
      {
        id: 'adv_4',
        title: 'The Labyrinth of Graph BFS & DFS',
        slug: 'adventure-graph-labyrinth',
        world: 'adventure',
        level: 4,
        order: 4,
        difficulty: 'Advanced',
        description: 'Stage 4: Navigate winding maze corridors using Python deques for BFS and recursive DFS paths.',
        objectives: [
          'Transform 2D game grids into adjacency graphs',
          'Find the shortest escape path with BFS',
          'Explore all secrets using DFS backtracking',
        ],
        explanation: 'Mazes and maps are natural graph structures. Learn how pathfinding engines in commercial games route characters around obstacles.',
        syntax: 'directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]',
        examples: [
          {
            title: 'Grid Neighbor Expansion',
            code: 'def get_neighbors(r, c, rows, cols):\n    for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:\n        nr, nc = r + dr, c + dc\n        if 0 <= nr < rows and 0 <= nc < cols:\n            yield (nr, nc)',
            output: 'Yields valid adjacent coordinates on the grid',
            notes: 'Uses generator yield for memory efficiency.',
          },
        ],
        keyPoints: [
          'Breadth-first search guarantees shortest path on unweighted grids.',
        ],
        commonMistakes: ['Searching out-of-bounds cells causing IndexError.'],
        gameId: 'g_5',
        quizId: 'q_8',
        challengeId: 'c_adv_4',
        xpReward: 30,
      },
      {
        id: 'adv_5',
        title: 'The Citadel of Custom Sorting',
        slug: 'adventure-custom-sorting',
        world: 'adventure',
        level: 5,
        order: 5,
        difficulty: 'Advanced',
        description: 'Stage 5: Sort complex player items using Python lambda comparators, Merge Sort, and Heap invariants.',
        objectives: [
          'Write custom multi-criteria sorting keys with lambdas',
          'Implement merge routines for sorted inventory streams',
          'Maintain real-time leaderboards with Python heapq',
        ],
        explanation: 'Real games continuously sort loot, scores, and render order. Harness Python keys and divide-and-conquer merges.',
        syntax: 'inventory.sort(key=lambda item: (-item.rarity, item.price))',
        examples: [
          {
            title: 'Multi-Key Sorting',
            code: 'gear = [("Sword", 3, 100), ("Bow", 5, 80), ("Dagger", 3, 150)]\n# Sort by rarity descending, then price ascending\ngear.sort(key=lambda x: (-x[1], x[2]))\nprint(gear)',
            output: "[('Bow', 5, 80), ('Sword', 3, 100), ('Dagger', 3, 150)]",
            notes: 'Negative sign inverses sort direction for numeric fields.',
          },
        ],
        keyPoints: [
          'Python Timsort is stable: equal keys retain their original relative order.',
        ],
        commonMistakes: ['Passing un-hashable or incomparable types in tuples.'],
        gameId: 'g_7',
        quizId: 'q_7',
        challengeId: 'c_adv_5',
        xpReward: 30,
      },
      {
        id: 'adv_6',
        title: 'The Dragon Vault: Algorithmic Synthesis',
        slug: 'adventure-final-conquest',
        world: 'adventure',
        level: 6,
        order: 6,
        difficulty: 'Advanced',
        description: 'Final Stage: The ultimate boss fight combining Python syntax, Data Structures, and Dynamic Programming.',
        objectives: [
          'Synthesize all previous concepts into cohesive problem-solving',
          'Solve the Dragon Vault Riddle using memoized state transitions',
          'Unlock the Grand Champion of CodeQuest achievement',
        ],
        explanation: 'Congratulations on reaching the summit of CodeQuest. Here, every tool in your algorithmic belt is tested in unison.',
        syntax: 'dp = [[0] * (capacity + 1) for _ in range(n + 1)]',
        examples: [
          {
            title: '0/1 Knapsack Treasure Looting',
            code: 'def knapsack(weights, values, W):\n    n = len(weights)\n    dp = [0] * (W + 1)\n    for i in range(n):\n        for w in range(W, weights[i] - 1, -1):\n            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])\n    return dp[W]\n\nprint("Max loot value:", knapsack([2, 3, 4], [3, 4, 5], 5))',
            output: 'Max loot value: 7',
            notes: 'Optimized 1D array space for 0/1 knapsack.',
          },
        ],
        keyPoints: [
          'Mastery comes from practicing pattern recognition across Python and DSA.',
        ],
        commonMistakes: ['Iterating forwards in 1D knapsack causing unbounded reuse.'],
        gameId: 'g_8',
        quizId: 'q_8',
        challengeId: 'c_adv_6',
        xpReward: 50,
      },
    ];

    for (const t of topicsData) {
      const exists = await Topic.findOne({
        $or: [{ id: t.id }, { slug: t.slug }, { title: t.title }],
      });
      if (!exists) {
        await Topic.create({ ...t, _id: t.id, id: t.id });
      } else {
        if (Topic.mongooseModel) {
          await Topic.mongooseModel.updateOne(
            { _id: exists._id },
            { $set: { ...t, id: t.id, challengeId: t.challengeId } }
          );
        }
        await Topic.findByIdAndUpdate(exists._id || exists.id, { ...t, id: t.id });
      }
    }
    console.log('✅ Seeded Topics (12 Python, 12 DSA, 6 Adventure)');

    console.log('🎉 CodeQuest database successfully seeded with all initial data!');
    return { success: true };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return { success: false, error: error.message };
  }
};
