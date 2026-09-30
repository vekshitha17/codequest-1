// All 30 Distinct, Topic-Specific Coding Challenges for CodeQuest
// Every single topic in Python, DSA, and Adventure worlds has its own unique coding challenge.

export const allCodingChallenges = [
  // ==========================================
  // PYTHON WORLD (12 TOPICS -> 12 CHALLENGES)
  // ==========================================

  // 1. Topic: Introduction to Python & Variables (py_1)
  {
    id: 'c_py_1',
    title: 'Hero Stat Variable Calculator',
    topicId: 'py_1',
    world: 'python',
    difficulty: 'Easy',
    problem: 'Create a function `calculate_power(base_attack, bonus_stat)` that computes and returns the hero total combat power by calculating `base_attack * 2 + bonus_stat`.',
    inputFormat: 'Two integers: base_attack and bonus_stat separated by space.',
    outputFormat: 'Single integer representing total combat power.',
    constraints: '0 <= base_attack, bonus_stat <= 1000',
    starterCode: 'def calculate_power(base_attack, bonus_stat):\n    # Calculate and return total hero combat power\n    pass',
    solutionCode: 'def calculate_power(base_attack, bonus_stat):\n    return base_attack * 2 + bonus_stat',
    testCases: [
      { id: 'c_py1_t1', input: '10 5', expectedOutput: '25', description: 'Standard warrior stats' },
      { id: 'c_py1_t2', input: '50 20', expectedOutput: '120', description: 'Advanced knight stats' },
      { id: 'c_py1_t3', input: '0 15', expectedOutput: '15', description: 'Zero base power', hidden: true },
    ],
    xpReward: 50,
  },

  // 2. Topic: Operators & Type Conversion (py_2)
  {
    id: 'c_py_2',
    title: 'Crystal Shard Converter & Modulo',
    topicId: 'py_2',
    world: 'python',
    difficulty: 'Easy',
    problem: 'Write a function `convert_shards(raw_str, bundle_size)` that converts string `raw_str` into an integer count of shards, and returns a tuple `(bundles, remainder)` where `bundles` is integer division `// bundle_size` and `remainder` is modulo `% bundle_size`.',
    inputFormat: 'String raw_str and integer bundle_size separated by space.',
    outputFormat: 'A tuple (bundles, remainder) formatted as (x, y).',
    constraints: 'raw_str is a non-empty string of digits. bundle_size >= 1.',
    starterCode: 'def convert_shards(raw_str, bundle_size):\n    # Convert raw_str to int, return (shards // bundle_size, shards % bundle_size)\n    pass',
    solutionCode: 'def convert_shards(raw_str, bundle_size):\n    val = int(raw_str)\n    return (val // bundle_size, val % bundle_size)',
    testCases: [
      { id: 'c_py2_t1', input: '45 10', expectedOutput: '(4, 5)', description: '45 shards into bundles of 10' },
      { id: 'c_py2_t2', input: '100 25', expectedOutput: '(4, 0)', description: 'Exact multiple with 0 remainder' },
      { id: 'c_py2_t3', input: '7 8', expectedOutput: '(0, 7)', description: 'Less shards than bundle size', hidden: true },
    ],
    xpReward: 50,
  },

  // 3. Topic: Conditionals (if, elif, else) (py_3)
  {
    id: 'c_py_3',
    title: 'Adventurer Rank Gatekeeper',
    topicId: 'py_3',
    world: 'python',
    difficulty: 'Easy',
    problem: 'Write a function `assign_rank(score)` that returns rank based on score:\n- score >= 90: "Diamond"\n- score >= 75: "Gold"\n- score >= 50: "Silver"\n- Otherwise: "Bronze"',
    inputFormat: 'Single integer score.',
    outputFormat: 'String rank name.',
    constraints: '0 <= score <= 100',
    starterCode: 'def assign_rank(score):\n    # Use if, elif, else to return the rank string\n    pass',
    solutionCode: 'def assign_rank(score):\n    if score >= 90:\n        return "Diamond"\n    elif score >= 75:\n        return "Gold"\n    elif score >= 50:\n        return "Silver"\n    else:\n        return "Bronze"',
    testCases: [
      { id: 'c_py3_t1', input: '95', expectedOutput: 'Diamond', description: 'Top score' },
      { id: 'c_py3_t2', input: '80', expectedOutput: 'Gold', description: 'Gold boundary' },
      { id: 'c_py3_t3', input: '62', expectedOutput: 'Silver', description: 'Silver tier' },
      { id: 'c_py3_t4', input: '35', expectedOutput: 'Bronze', description: 'Novice score', hidden: true },
    ],
    xpReward: 50,
  },

  // 4. Topic: Loops (for, while, control) (py_4)
  {
    id: 'c_py_4',
    title: 'Mana Battery Step Multiplier',
    topicId: 'py_4',
    world: 'python',
    difficulty: 'Easy',
    problem: 'Write a function `sum_even_mana(limit)` that uses a loop to sum all positive even integers from 2 up to `limit` inclusive (e.g. 2, 4, 6... <= limit) and returns the total.',
    inputFormat: 'Single integer limit.',
    outputFormat: 'Single integer representing the sum.',
    constraints: '1 <= limit <= 1000',
    starterCode: 'def sum_even_mana(limit):\n    # Loop and accumulate even numbers\n    pass',
    solutionCode: 'def sum_even_mana(limit):\n    total = 0\n    for i in range(2, limit + 1, 2):\n        total += i\n    return total',
    testCases: [
      { id: 'c_py4_t1', input: '6', expectedOutput: '12', description: '2 + 4 + 6 = 12' },
      { id: 'c_py4_t2', input: '10', expectedOutput: '30', description: '2 + 4 + 6 + 8 + 10 = 30' },
      { id: 'c_py4_t3', input: '1', expectedOutput: '0', description: 'Limit below first even', hidden: true },
    ],
    xpReward: 50,
  },

  // 5. Topic: Strings & String Manipulation (py_5)
  {
    id: 'c_py_5',
    title: 'Rune Inscription Vowel Counter',
    topicId: 'py_5',
    world: 'python',
    difficulty: 'Easy',
    problem: 'Write a function `count_runic_vowels(inscription)` that counts and returns how many vowels (a, e, i, o, u, case-insensitive) appear in the given string `inscription`.',
    inputFormat: 'String inscription.',
    outputFormat: 'Integer count of vowels.',
    constraints: '1 <= len(inscription) <= 500',
    starterCode: 'def count_runic_vowels(inscription):\n    # Count vowels a, e, i, o, u in inscription\n    pass',
    solutionCode: 'def count_runic_vowels(inscription):\n    vowels = set("aeiouAEIOU")\n    return sum(1 for ch in inscription if ch in vowels)',
    testCases: [
      { id: 'c_py5_t1', input: 'CodeQuest', expectedOutput: '4', description: 'Vowels: o, e, u, e' },
      { id: 'c_py5_t2', input: 'Python Island', expectedOutput: '3', description: 'Vowels: o, I, a' },
      { id: 'c_py5_t3', input: 'rhythm', expectedOutput: '0', description: 'No vowels', hidden: true },
    ],
    xpReward: 50,
  },

  // 6. Topic: Lists & List Comprehension (py_6)
  {
    id: 'c_py_6',
    title: 'Loot Filter & Square Multiplier',
    topicId: 'py_6',
    world: 'python',
    difficulty: 'Easy',
    problem: 'Write a function `filter_and_square(numbers)` that takes a list of integers and uses list comprehension to return a new list containing the squares (`x * x`) of only the positive odd integers.',
    inputFormat: 'A list of integers.',
    outputFormat: 'A list of squared odd positive numbers.',
    constraints: 'List length <= 100',
    starterCode: 'def filter_and_square(numbers):\n    # Return [x**2 for x in numbers if x > 0 and x % 2 != 0]\n    pass',
    solutionCode: 'def filter_and_square(numbers):\n    return [x * x for x in numbers if x > 0 and x % 2 != 0]',
    testCases: [
      { id: 'c_py6_t1', input: '[1, 2, 3, 4, 5]', expectedOutput: '[1, 9, 25]', description: 'Squares of 1, 3, 5' },
      { id: 'c_py6_t2', input: '[-3, -1, 0, 2, 4]', expectedOutput: '[]', description: 'No positive odds' },
      { id: 'c_py6_t3', input: '[7, 8, 9]', expectedOutput: '[49, 81]', description: '7^2=49, 9^2=81', hidden: true },
    ],
    xpReward: 50,
  },

  // 7. Topic: Tuples & Sets (py_7)
  {
    id: 'c_py_7',
    title: 'Duplicate Relic Purifier',
    topicId: 'py_7',
    world: 'python',
    difficulty: 'Easy',
    problem: 'Write a function `unique_sorted_relics(relics)` that receives a list of relic names, strips duplicates using a set, and returns a sorted tuple containing all unique relic names in alphabetical order.',
    inputFormat: 'A list of string relic names.',
    outputFormat: 'A tuple of sorted unique string names.',
    constraints: '1 <= len(relics) <= 200',
    starterCode: 'def unique_sorted_relics(relics):\n    # Remove duplicates with set and return sorted tuple\n    pass',
    solutionCode: 'def unique_sorted_relics(relics):\n    return tuple(sorted(set(relics)))',
    testCases: [
      { id: 'c_py7_t1', input: '["gem", "scroll", "gem", "potion"]', expectedOutput: "('gem', 'potion', 'scroll')", description: 'Purges duplicate gem' },
      { id: 'c_py7_t2', input: '["ruby", "ruby", "ruby"]', expectedOutput: "('ruby',)", description: 'All identical' },
      { id: 'c_py7_t3', input: '["alpha", "beta", "alpha"]', expectedOutput: "('alpha', 'beta')", description: 'Alphabetical order', hidden: true },
    ],
    xpReward: 50,
  },

  // 8. Topic: Dictionaries & Key-Value Storage (py_8)
  {
    id: 'c_py_8',
    title: 'Inventory Item Frequency Tallier',
    topicId: 'py_8',
    world: 'python',
    difficulty: 'Easy',
    problem: 'Write a function `count_inventory(items)` that takes a list of collected item names and returns a dictionary where keys are item names and values are their occurrence counts.',
    inputFormat: 'A list of string item names.',
    outputFormat: 'A dictionary with item counts.',
    constraints: '1 <= len(items) <= 1000',
    starterCode: 'def count_inventory(items):\n    # Build and return dict mapping item -> count\n    pass',
    solutionCode: 'def count_inventory(items):\n    counts = {}\n    for item in items:\n        counts[item] = counts.get(item, 0) + 1\n    return counts',
    testCases: [
      { id: 'c_py8_t1', input: '["sword", "shield", "sword", "potion"]', expectedOutput: "{'sword': 2, 'shield': 1, 'potion': 1}", description: '2 swords, 1 shield, 1 potion' },
      { id: 'c_py8_t2', input: '["torch", "torch", "torch"]', expectedOutput: "{'torch': 3}", description: '3 torches' },
    ],
    xpReward: 50,
  },

  // 9. Topic: Functions & Scope (py_9)
  {
    id: 'c_py_9',
    title: 'Potion Brewing Custom Compounder',
    topicId: 'py_9',
    world: 'python',
    difficulty: 'Easy',
    problem: 'Write a function `brew_potion(herb, water=10, booster=1)` that calculates potency with the formula: `(len(herb) * 3 + water) * booster` and returns the resulting integer potency.',
    inputFormat: 'herb (string), water (int), booster (int).',
    outputFormat: 'Single integer potion potency.',
    constraints: 'herb length >= 1, water >= 0, booster >= 1',
    starterCode: 'def brew_potion(herb, water=10, booster=1):\n    # Return (len(herb) * 3 + water) * booster\n    pass',
    solutionCode: 'def brew_potion(herb, water=10, booster=1):\n    return (len(herb) * 3 + water) * booster',
    testCases: [
      { id: 'c_py9_t1', input: '"lotus", 10, 1', expectedOutput: '25', description: '(5*3 + 10)*1 = 25' },
      { id: 'c_py9_t2', input: '"sage", 5, 2', expectedOutput: '34', description: '(4*3 + 5)*2 = 34' },
      { id: 'c_py9_t3', input: '"moss", 0, 3', expectedOutput: '36', description: '(4*3 + 0)*3 = 36', hidden: true },
    ],
    xpReward: 50,
  },

  // 10. Topic: Lambda Functions & Recursion (py_10)
  {
    id: 'c_py_10',
    title: 'Recursive Fibonacci Crystal Generator',
    topicId: 'py_10',
    world: 'python',
    difficulty: 'Easy',
    problem: 'Write a recursive function `fibonacci_crystal(n)` that returns the n-th Fibonacci number, where F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2).',
    inputFormat: 'Single non-negative integer n.',
    outputFormat: 'The n-th Fibonacci integer.',
    constraints: '0 <= n <= 20',
    starterCode: 'def fibonacci_crystal(n):\n    # Recursive Fibonacci function\n    pass',
    solutionCode: 'def fibonacci_crystal(n):\n    if n <= 0:\n        return 0\n    if n == 1:\n        return 1\n    return fibonacci_crystal(n - 1) + fibonacci_crystal(n - 2)',
    testCases: [
      { id: 'c_py10_t1', input: '0', expectedOutput: '0', description: 'Base case 0' },
      { id: 'c_py10_t2', input: '6', expectedOutput: '8', description: 'F(6) = 8' },
      { id: 'c_py10_t3', input: '10', expectedOutput: '55', description: 'F(10) = 55', hidden: true },
    ],
    xpReward: 50,
  },

  // 11. Topic: Exception Handling & File I/O (py_11)
  {
    id: 'c_py_11',
    title: 'Safe Spell Divisor Guard',
    topicId: 'py_11',
    world: 'python',
    difficulty: 'Easy',
    problem: 'Write a function `safe_divide_mana(numerator, denominator)` that attempts to divide `numerator / denominator`. If a `ZeroDivisionError` occurs, catch it and return "Error: Mana Depleted". Otherwise return the rounded float result to 2 decimal places.',
    inputFormat: 'Two numbers: numerator and denominator.',
    outputFormat: 'Float rounded to 2 places, or string "Error: Mana Depleted".',
    constraints: '-10^5 <= numerator, denominator <= 10^5',
    starterCode: 'def safe_divide_mana(numerator, denominator):\n    # Use try-except ZeroDivisionError\n    pass',
    solutionCode: 'def safe_divide_mana(numerator, denominator):\n    try:\n        return round(numerator / denominator, 2)\n    except ZeroDivisionError:\n        return "Error: Mana Depleted"',
    testCases: [
      { id: 'c_py11_t1', input: '10, 2', expectedOutput: '5.0', description: '10 / 2 = 5.0' },
      { id: 'c_py11_t2', input: '7, 0', expectedOutput: 'Error: Mana Depleted', description: 'Zero division caught' },
      { id: 'c_py11_t3', input: '10, 3', expectedOutput: '3.33', description: 'Rounded to 2 decimals', hidden: true },
    ],
    xpReward: 50,
  },

  // 12. Topic: Object-Oriented Programming (Classes & Objects) (py_12)
  {
    id: 'c_py_12',
    title: 'Companion Pet Class Architect',
    topicId: 'py_12',
    world: 'python',
    difficulty: 'Intermediate',
    problem: 'Create a class `Pet` with constructor `__init__(self, name, species, level=1)`. It must have a method `level_up(self)` that increments level by 1, and a method `get_info(self)` returning the string `"{name} the {species} is Level {level}"`. Also write a helper function `create_and_train_pet(name, species)` that instantiates Pet, calls `level_up()` once, and returns `pet.get_info()`.',
    inputFormat: 'name (str) and species (str).',
    outputFormat: 'String formatted pet info.',
    constraints: 'Non-empty name and species.',
    starterCode: 'class Pet:\n    # Define __init__, level_up, and get_info\n    pass\n\ndef create_and_train_pet(name, species):\n    # Instantiate Pet, level_up, and return pet.get_info()\n    pass',
    solutionCode: 'class Pet:\n    def __init__(self, name, species, level=1):\n        self.name = name\n        self.species = species\n        self.level = level\n    def level_up(self):\n        self.level += 1\n    def get_info(self):\n        return f"{self.name} the {self.species} is Level {self.level}"\n\ndef create_and_train_pet(name, species):\n    pet = Pet(name, species)\n    pet.level_up()\n    return pet.get_info()',
    testCases: [
      { id: 'c_py12_t1', input: '"Pip", "Dragon"', expectedOutput: 'Pip the Dragon is Level 2', description: 'Dragon pet trained to Level 2' },
      { id: 'c_py12_t2', input: '"Luna", "Wolf"', expectedOutput: 'Luna the Wolf is Level 2', description: 'Wolf companion' },
    ],
    xpReward: 50,
  },

  // ==========================================
  // DSA WORLD (12 TOPICS -> 12 CHALLENGES)
  // ==========================================

  // 13. Topic: Algorithm Complexity & Big-O Notation (dsa_1)
  {
    id: 'c_dsa_1',
    title: 'Big-O Growth Rate Comparator',
    topicId: 'dsa_1',
    world: 'dsa',
    difficulty: 'Easy',
    problem: 'Write a function `classify_complexity(ops_for_n_10)` that classifies algorithm complexity given the number of operations performed for input size n=10:\n- ops <= 1: "O(1)"\n- ops <= 15: "O(log n)"\n- ops <= 50: "O(n)"\n- ops <= 200: "O(n^2)"\n- Otherwise: "O(2^n)"',
    inputFormat: 'Single integer operations count.',
    outputFormat: 'String complexity notation.',
    constraints: 'ops >= 0',
    starterCode: 'def classify_complexity(ops_for_n_10):\n    # Classify Big-O complexity\n    pass',
    solutionCode: 'def classify_complexity(ops_for_n_10):\n    if ops_for_n_10 <= 1:\n        return "O(1)"\n    elif ops_for_n_10 <= 15:\n        return "O(log n)"\n    elif ops_for_n_10 <= 50:\n        return "O(n)"\n    elif ops_for_n_10 <= 200:\n        return "O(n^2)"\n    else:\n        return "O(2^n)"',
    testCases: [
      { id: 'c_dsa1_t1', input: '1', expectedOutput: 'O(1)', description: 'Constant time' },
      { id: 'c_dsa1_t2', input: '10', expectedOutput: 'O(log n)', description: 'Logarithmic or small linear' },
      { id: 'c_dsa1_t3', input: '100', expectedOutput: 'O(n^2)', description: 'Quadratic' },
      { id: 'c_dsa1_t4', input: '1024', expectedOutput: 'O(2^n)', description: 'Exponential', hidden: true },
    ],
    xpReward: 50,
  },

  // 14. Topic: Arrays & Dynamic Arrays (dsa_2)
  {
    id: 'c_dsa_2',
    title: 'Array In-Place Left Rotator',
    topicId: 'dsa_2',
    world: 'dsa',
    difficulty: 'Easy',
    problem: 'Write a function `rotate_array_left(nums, k)` that rotates array `nums` to the left by `k` steps and returns the transformed array.',
    inputFormat: 'Array of integers nums, integer k.',
    outputFormat: 'Rotated array of integers.',
    constraints: '1 <= len(nums) <= 10^4, k >= 0',
    starterCode: 'def rotate_array_left(nums, k):\n    # Rotate nums left by k positions\n    pass',
    solutionCode: 'def rotate_array_left(nums, k):\n    if not nums:\n        return nums\n    k = k % len(nums)\n    return nums[k:] + nums[:k]',
    testCases: [
      { id: 'c_dsa2_t1', input: '[1, 2, 3, 4, 5], 2', expectedOutput: '[3, 4, 5, 1, 2]', description: 'Rotate left by 2' },
      { id: 'c_dsa2_t2', input: '[10, 20, 30], 1', expectedOutput: '[20, 30, 10]', description: 'Rotate left by 1' },
      { id: 'c_dsa2_t3', input: '[7, 8, 9], 3', expectedOutput: '[7, 8, 9]', description: 'Full cycle rotation', hidden: true },
    ],
    xpReward: 50,
  },

  // 15. Topic: String Algorithms & Sliding Window (dsa_3)
  {
    id: 'c_dsa_3',
    title: 'Max Sum Subarray Sliding Window',
    topicId: 'dsa_3',
    world: 'dsa',
    difficulty: 'Medium',
    problem: 'Given an array of integers `nums` and window size `k`, write `max_sub_sum(nums, k)` that returns the maximum sum of any contiguous subarray of length `k` using the sliding window pattern in O(n) time.',
    inputFormat: 'Array nums and integer k.',
    outputFormat: 'Single integer maximum sum.',
    constraints: '1 <= k <= len(nums) <= 10^5',
    starterCode: 'def max_sub_sum(nums, k):\n    # Use sliding window to find max sum of window size k\n    pass',
    solutionCode: 'def max_sub_sum(nums, k):\n    if len(nums) < k or k <= 0:\n        return 0\n    curr_sum = sum(nums[:k])\n    max_val = curr_sum\n    for i in range(k, len(nums)):\n        curr_sum += nums[i] - nums[i - k]\n        max_val = max(max_val, curr_sum)\n    return max_val',
    testCases: [
      { id: 'c_dsa3_t1', input: '[2, 1, 5, 1, 3, 2], 3', expectedOutput: '9', description: 'Window [5, 1, 3] sum is 9' },
      { id: 'c_dsa3_t2', input: '[1, 4, 2, 10, 23, 3, 1, 0, 20], 4', expectedOutput: '39', description: 'Window [4, 2, 10, 23] sum is 39' },
      { id: 'c_dsa3_t3', input: '[100, 200, 300], 1', expectedOutput: '300', description: 'Window of size 1', hidden: true },
    ],
    xpReward: 50,
  },

  // 16. Topic: Linked Lists (Singly & Doubly) (dsa_4)
  {
    id: 'c_dsa_4',
    title: 'Linked List Middle Node Finder',
    topicId: 'dsa_4',
    world: 'dsa',
    difficulty: 'Medium',
    problem: 'Write a function `find_middle_node(values)` that takes a list of values representing a linked list from head to tail, and finds the value of the middle node using slow and fast two-pointer technique. If there are two middle nodes, return the second middle node.',
    inputFormat: 'List of node values.',
    outputFormat: 'Value of middle node.',
    constraints: '1 <= len(values) <= 1000',
    starterCode: 'def find_middle_node(values):\n    # Find middle element using fast and slow pointers\n    pass',
    solutionCode: 'def find_middle_node(values):\n    slow = 0\n    fast = 0\n    while fast < len(values) and fast + 1 < len(values):\n        slow += 1\n        fast += 2\n    return values[slow]',
    testCases: [
      { id: 'c_dsa4_t1', input: '[1, 2, 3, 4, 5]', expectedOutput: '3', description: 'Middle of 5 nodes is 3' },
      { id: 'c_dsa4_t2', input: '[10, 20, 30, 40, 50, 60]', expectedOutput: '40', description: 'Even nodes returns second middle' },
      { id: 'c_dsa4_t3', input: '[42]', expectedOutput: '42', description: 'Single node list', hidden: true },
    ],
    xpReward: 50,
  },

  // 17. Topic: Stacks (LIFO) & Monotonic Stacks (dsa_5)
  {
    id: 'c_dsa_5',
    title: 'Balanced Brackets Stack Verifier',
    topicId: 'dsa_5',
    world: 'dsa',
    difficulty: 'Medium',
    problem: 'Write a function `is_balanced_brackets(expression)` using a stack (LIFO) to verify if all parentheses `()`, brackets `[]`, and curly braces `{}` in the string are properly balanced and nested.',
    inputFormat: 'String expression containing brackets.',
    outputFormat: 'Boolean True or False.',
    constraints: '0 <= len(expression) <= 10^4',
    starterCode: 'def is_balanced_brackets(expression):\n    # Use a stack to validate matching pairs\n    pass',
    solutionCode: 'def is_balanced_brackets(expression):\n    stack = []\n    mapping = {")": "(", "]": "[", "}": "{"}\n    for char in expression:\n        if char in mapping.values():\n            stack.append(char)\n        elif char in mapping:\n            if not stack or stack.pop() != mapping[char]:\n                return False\n    return len(stack) == 0',
    testCases: [
      { id: 'c_dsa5_t1', input: '"{[()()]}"', expectedOutput: 'True', description: 'Perfect nested brackets' },
      { id: 'c_dsa5_t2', input: '"([)]"', expectedOutput: 'False', description: 'Interleaved invalid brackets' },
      { id: 'c_dsa5_t3', input: '""', expectedOutput: 'True', description: 'Empty string is balanced', hidden: true },
    ],
    xpReward: 50,
  },

  // 18. Topic: Queues (FIFO) & Deques (dsa_6)
  {
    id: 'c_dsa_6',
    title: 'FIFO Task Order Simulator',
    topicId: 'dsa_6',
    world: 'dsa',
    difficulty: 'Medium',
    problem: 'Write a function `simulate_queue(operations)` that processes a sequence of instructions on a FIFO queue: "ENQUEUE item" adds item to the back, "DEQUEUE" removes from front. Return the list of elements dequeued in order.',
    inputFormat: 'List of string operations.',
    outputFormat: 'List of dequeued items.',
    constraints: 'Operations list length <= 500',
    starterCode: 'def simulate_queue(operations):\n    # Simulate FIFO queue and return dequeued elements in order\n    pass',
    solutionCode: 'def simulate_queue(operations):\n    queue = []\n    dequeued = []\n    for op in operations:\n        parts = op.split()\n        if parts[0] == "ENQUEUE":\n            queue.append(parts[1])\n        elif parts[0] == "DEQUEUE":\n            if queue:\n                dequeued.append(queue.pop(0))\n    return dequeued',
    testCases: [
      { id: 'c_dsa6_t1', input: '["ENQUEUE A", "ENQUEUE B", "DEQUEUE", "ENQUEUE C", "DEQUEUE"]', expectedOutput: "['A', 'B']", description: 'FIFO order A then B' },
      { id: 'c_dsa6_t2', input: '["ENQUEUE 1", "DEQUEUE", "DEQUEUE"]', expectedOutput: "['1']", description: 'Handles empty dequeue' },
    ],
    xpReward: 50,
  },

  // 19. Topic: Binary Trees & BST Traversal (dsa_7)
  {
    id: 'c_dsa_7',
    title: 'BST Inorder Sorted Traversal',
    topicId: 'dsa_7',
    world: 'dsa',
    difficulty: 'Medium',
    problem: 'Given a nested dictionary representing a Binary Search Tree node: `{"val": int, "left": node, "right": node}` (or None), write a function `inorder_traversal(root)` that returns a list of node values visited in sorted Inorder (Left -> Root -> Right).',
    inputFormat: 'Nested dictionary root representing tree.',
    outputFormat: 'List of integers in inorder sequence.',
    constraints: 'Tree contains up to 1000 nodes.',
    starterCode: 'def inorder_traversal(root):\n    # Return values in Left -> Root -> Right order\n    pass',
    solutionCode: 'def inorder_traversal(root):\n    result = []\n    def dfs(node):\n        if not node:\n            return\n        dfs(node.get("left"))\n        result.append(node["val"])\n        dfs(node.get("right"))\n    dfs(root)\n    return result',
    testCases: [
      { id: 'c_dsa7_t1', input: '{"val": 2, "left": {"val": 1, "left": None, "right": None}, "right": {"val": 3, "left": None, "right": None}}', expectedOutput: '[1, 2, 3]', description: 'Inorder of root 2 with children 1 and 3' },
      { id: 'c_dsa7_t2', input: '{"val": 10, "left": None, "right": {"val": 20, "left": None, "right": None}}', expectedOutput: '[10, 20]', description: 'Right skew tree' },
    ],
    xpReward: 50,
  },

  // 20. Topic: Graphs (BFS, DFS & Representation) (dsa_8)
  {
    id: 'c_dsa_8',
    title: 'Graph Connected Path Explorer',
    topicId: 'dsa_8',
    world: 'dsa',
    difficulty: 'Medium',
    problem: 'Given an undirected graph represented as an adjacency dictionary `graph = {"A": ["B", "C"], ...}`, write a function `has_path(graph, start, target)` using BFS or DFS that returns True if a valid path exists from `start` to `target`, or False otherwise.',
    inputFormat: 'graph (dict), start (str), target (str).',
    outputFormat: 'Boolean True or False.',
    constraints: 'Graph has <= 50 nodes.',
    starterCode: 'def has_path(graph, start, target):\n    # Explore graph with BFS or DFS to check connectivity\n    pass',
    solutionCode: 'def has_path(graph, start, target):\n    if start == target:\n        return True\n    visited = set([start])\n    queue = [start]\n    while queue:\n        curr = queue.pop(0)\n        if curr == target:\n            return True\n        for neighbor in graph.get(curr, []):\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    return False',
    testCases: [
      { id: 'c_dsa8_t1', input: '{"A": ["B"], "B": ["C"], "C": []}, "A", "C"', expectedOutput: 'True', description: 'Path exists A -> B -> C' },
      { id: 'c_dsa8_t2', input: '{"A": ["B"], "B": [], "C": []}, "A", "C"', expectedOutput: 'False', description: 'Disconnected component' },
    ],
    xpReward: 50,
  },

  // 21. Topic: Elementary Sorting (Bubble, Selection, Insertion) (dsa_9)
  {
    id: 'c_dsa_9',
    title: 'Bubble Sort Inversion Counter',
    topicId: 'dsa_9',
    world: 'dsa',
    difficulty: 'Easy',
    problem: 'Write a function `bubble_sort_swaps(arr)` that sorts a copy of `arr` in ascending order using Bubble Sort, and returns a tuple `(sorted_arr, swap_count)` where `swap_count` is the total number of adjacent swaps performed.',
    inputFormat: 'List of numbers.',
    outputFormat: 'Tuple of (sorted_list, swap_count).',
    constraints: 'List length <= 500',
    starterCode: 'def bubble_sort_swaps(arr):\n    # Sort with Bubble Sort and count swaps\n    pass',
    solutionCode: 'def bubble_sort_swaps(arr):\n    a = list(arr)\n    n = len(a)\n    swaps = 0\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if a[j] > a[j + 1]:\n                a[j], a[j + 1] = a[j + 1], a[j]\n                swaps += 1\n    return (a, swaps)',
    testCases: [
      { id: 'c_dsa9_t1', input: '[4, 3, 2, 1]', expectedOutput: '([1, 2, 3, 4], 6)', description: 'Reverse array requires 6 swaps' },
      { id: 'c_dsa9_t2', input: '[1, 2, 3]', expectedOutput: '([1, 2, 3], 0)', description: 'Already sorted requires 0 swaps' },
    ],
    xpReward: 50,
  },

  // 22. Topic: Advanced Sorting (Merge Sort & Quick Sort) (dsa_10)
  {
    id: 'c_dsa_10',
    title: 'Divide & Conquer Merge Step',
    topicId: 'dsa_10',
    world: 'dsa',
    difficulty: 'Hard',
    problem: 'Write a function `merge_sorted_arrays(left, right)` that takes two already-sorted arrays `left` and `right` and merges them into a single sorted array in O(n + m) linear time without using `.sort()`.',
    inputFormat: 'Two sorted lists: left and right.',
    outputFormat: 'One sorted combined list.',
    constraints: '0 <= len(left), len(right) <= 10^5',
    starterCode: 'def merge_sorted_arrays(left, right):\n    # Merge two sorted lists in linear time\n    pass',
    solutionCode: 'def merge_sorted_arrays(left, right):\n    res = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            res.append(left[i])\n            i += 1\n        else:\n            res.append(right[j])\n            j += 1\n    res.extend(left[i:])\n    res.extend(right[j:])\n    return res',
    testCases: [
      { id: 'c_dsa10_t1', input: '[1, 3, 5], [2, 4, 6]', expectedOutput: '[1, 2, 3, 4, 5, 6]', description: 'Interleaved sorted merge' },
      { id: 'c_dsa10_t2', input: '[10, 20], [30, 40]', expectedOutput: '[10, 20, 30, 40]', description: 'Sequential merge' },
      { id: 'c_dsa10_t3', input: '[], [1, 2]', expectedOutput: '[1, 2]', description: 'Empty list with populated list', hidden: true },
    ],
    xpReward: 50,
  },

  // 23. Topic: Greedy Algorithms & Dynamic Programming (dsa_11)
  {
    id: 'c_dsa_11',
    title: 'Climbing Steps Dynamic Programming',
    topicId: 'dsa_11',
    world: 'dsa',
    difficulty: 'Medium',
    problem: 'You are climbing a staircase with `n` steps. Each time you can either take 1 step or 2 steps. Write `climb_stairs(n)` using dynamic programming to return how many distinct ways you can reach the top.',
    inputFormat: 'Positive integer n.',
    outputFormat: 'Integer number of distinct ways.',
    constraints: '1 <= n <= 45',
    starterCode: 'def climb_stairs(n):\n    # Dynamic programming memoization for step counts\n    pass',
    solutionCode: 'def climb_stairs(n):\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b',
    testCases: [
      { id: 'c_dsa11_t1', input: '2', expectedOutput: '2', description: '1+1 or 2' },
      { id: 'c_dsa11_t2', input: '3', expectedOutput: '3', description: '1+1+1, 1+2, 2+1' },
      { id: 'c_dsa11_t3', input: '5', expectedOutput: '8', description: '5 steps has 8 ways', hidden: true },
    ],
    xpReward: 50,
  },

  // 24. Topic: Shortest Path & Dijkstra Algorithm (dsa_12)
  {
    id: 'c_dsa_12',
    title: 'Shortest Distance Dijkstra Solver',
    topicId: 'dsa_12',
    world: 'dsa',
    difficulty: 'Hard',
    problem: 'Given a weighted graph represented as `{u: [(v, weight), ...]}`, write `dijkstra_shortest_distance(graph, start, end)` returning the minimum total weight to reach `end` from `start`, or -1 if unreachable.',
    inputFormat: 'graph (dict), start (str), end (str).',
    outputFormat: 'Integer minimum distance, or -1.',
    constraints: 'Non-negative edge weights.',
    starterCode: 'def dijkstra_shortest_distance(graph, start, end):\n    # Return minimum weighted distance from start to end\n    pass',
    solutionCode: 'def dijkstra_shortest_distance(graph, start, end):\n    import heapq\n    pq = [(0, start)]\n    distances = {start: 0}\n    while pq:\n        dist, u = heapq.heappop(pq)\n        if u == end:\n            return dist\n        if dist > distances.get(u, float("inf")):\n            continue\n        for v, weight in graph.get(u, []):\n            new_dist = dist + weight\n            if new_dist < distances.get(v, float("inf")):\n                distances[v] = new_dist\n                heapq.heappush(pq, (new_dist, v))\n    return -1',
    testCases: [
      { id: 'c_dsa12_t1', input: '{"A": [("B", 1), ("C", 4)], "B": [("C", 2)], "C": []}, "A", "C"', expectedOutput: '3', description: 'Path A->B->C (cost 1+2=3) beats A->C (cost 4)' },
      { id: 'c_dsa12_t2', input: '{"A": [("B", 5)], "B": [], "C": []}, "A", "C"', expectedOutput: '-1', description: 'Unreachable vertex' },
    ],
    xpReward: 50,
  },

  // ==========================================
  // ADVENTURE REALM (6 TOPICS -> 6 CHALLENGES)
  // ==========================================

  // 25. Topic: The Enchanted Lists & Array Realm (adv_1)
  {
    id: 'c_adv_1',
    title: 'Glade Rune Sensor Filter & Scan',
    topicId: 'adv_1',
    world: 'adventure',
    difficulty: 'Intermediate',
    problem: 'Stage 1 Challenge: Write a function `filter_and_find_rune(runes, threshold, target)` that first filters `runes` keeping only values `>= threshold`, sorts the filtered list, and returns the 0-based index of `target` in the sorted list, or -1 if target is not present.',
    inputFormat: 'runes (list of int), threshold (int), target (int).',
    outputFormat: 'Integer index or -1.',
    constraints: 'Runes list <= 1000 items.',
    starterCode: 'def filter_and_find_rune(runes, threshold, target):\n    # Filter >= threshold, sort, and return index of target or -1\n    pass',
    solutionCode: 'def filter_and_find_rune(runes, threshold, target):\n    filtered = sorted([r for r in runes if r >= threshold])\n    try:\n        return filtered.index(target)\n    except ValueError:\n        return -1',
    testCases: [
      { id: 'c_adv1_t1', input: '[42, 18, 99, 7, 33], 10, 42', expectedOutput: '2', description: 'Filtered: [18, 33, 42, 99]. Target 42 is at index 2.' },
      { id: 'c_adv1_t2', input: '[5, 8, 12], 10, 8', expectedOutput: '-1', description: 'Target 8 filtered out below threshold 10' },
    ],
    xpReward: 50,
  },

  // 26. Topic: The Tower of Call Stacks & Recursion (adv_2)
  {
    id: 'c_adv_2',
    title: 'Tower of Call Stacks Combinator',
    topicId: 'adv_2',
    world: 'adventure',
    difficulty: 'Intermediate',
    problem: 'Stage 2 Challenge: Write a recursive function `tower_ways(n, max_jump)` that returns how many distinct ways an adventurer can climb an `n`-step spire if they can take any number of steps from `1` up to `max_jump` at each stride.',
    inputFormat: 'Two integers: n and max_jump.',
    outputFormat: 'Integer distinct combinations count.',
    constraints: '1 <= n <= 20, 1 <= max_jump <= 5',
    starterCode: 'def tower_ways(n, max_jump):\n    # Recursive calculation of jump combinations\n    pass',
    solutionCode: 'def tower_ways(n, max_jump):\n    memo = {}\n    def climb(steps_left):\n        if steps_left == 0:\n            return 1\n        if steps_left < 0:\n            return 0\n        if steps_left in memo:\n            return memo[steps_left]\n        total = 0\n        for j in range(1, max_jump + 1):\n            total += climb(steps_left - j)\n        memo[steps_left] = total\n        return total\n    return climb(n)',
    testCases: [
      { id: 'c_adv2_t1', input: '4, 2', expectedOutput: '5', description: 'Standard 4 steps with max jump 2 has 5 ways' },
      { id: 'c_adv2_t2', input: '3, 3', expectedOutput: '4', description: '3 steps with max jump 3 has 4 ways' },
    ],
    xpReward: 50,
  },

  // 27. Topic: The Forest of Object Trees (adv_3)
  {
    id: 'c_adv_3',
    title: 'Forest Dungeon Room Loot Aggregator',
    topicId: 'adv_3',
    world: 'adventure',
    difficulty: 'Advanced',
    problem: 'Stage 3 Challenge: A dungeon room tree node is represented as `{"name": str, "loot": int, "children": [node1, node2, ...]}`. Write a function `sum_dungeon_loot(root_room)` that traverses the tree recursively and computes the total loot gold of the entire room hierarchy.',
    inputFormat: 'Nested dictionary root_room.',
    outputFormat: 'Total integer gold sum.',
    constraints: 'Hierarchy depth <= 50',
    starterCode: 'def sum_dungeon_loot(root_room):\n    # Traverse object tree and accumulate loot\n    pass',
    solutionCode: 'def sum_dungeon_loot(root_room):\n    if not root_room:\n        return 0\n    total = root_room.get("loot", 0)\n    for child in root_room.get("children", []):\n        total += sum_dungeon_loot(child)\n    return total',
    testCases: [
      { id: 'c_adv3_t1', input: '{"name": "Hall", "loot": 50, "children": [{"name": "Vault", "loot": 200, "children": []}, {"name": "Crypt", "loot": 75, "children": []}]}', expectedOutput: '325', description: '50 + 200 + 75 = 325' },
      { id: 'c_adv3_t2', input: '{"name": "Gate", "loot": 10, "children": []}', expectedOutput: '10', description: 'Single room' },
    ],
    xpReward: 50,
  },

  // 28. Topic: The Labyrinth of Graph BFS & DFS (adv_4)
  {
    id: 'c_adv_4',
    title: 'Labyrinth Shortest Escape Step Counter',
    topicId: 'adv_4',
    world: 'adventure',
    difficulty: 'Advanced',
    problem: 'Stage 4 Challenge: Given a 2D grid matrix of 0s (walkable path) and 1s (stone walls), write `escape_labyrinth_steps(grid)` that uses BFS to find the minimum number of steps to walk from top-left `(0, 0)` to bottom-right `(rows-1, cols-1)`. Return -1 if no escape path exists.',
    inputFormat: 'grid: 2D list of 0s and 1s.',
    outputFormat: 'Integer minimum steps, or -1.',
    constraints: 'Grid dimensions up to 20x20.',
    starterCode: 'def escape_labyrinth_steps(grid):\n    # Use BFS queue to find shortest path from (0,0) to exit\n    pass',
    solutionCode: 'def escape_labyrinth_steps(grid):\n    if not grid or grid[0][0] == 1:\n        return -1\n    R, C = len(grid), len(grid[0])\n    if R == 1 and C == 1:\n        return 0\n    queue = [(0, 0, 0)]\n    visited = {(0, 0)}\n    while queue:\n        r, c, steps = queue.pop(0)\n        if r == R - 1 and c == C - 1:\n            return steps\n        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 0 and (nr, nc) not in visited:\n                visited.add((nr, nc))\n                queue.append((nr, nc, steps + 1))\n    return -1',
    testCases: [
      { id: 'c_adv4_t1', input: '[[0, 0, 0], [1, 1, 0], [0, 0, 0]]', expectedOutput: '4', description: 'Around wall: 4 steps' },
      { id: 'c_adv4_t2', input: '[[0, 1], [1, 0]]', expectedOutput: '-1', description: 'Blocked exit' },
    ],
    xpReward: 50,
  },

  // 29. Topic: The Citadel of Custom Sorting (adv_5)
  {
    id: 'c_adv_5',
    title: 'Custom Multi-Key Gear Sorter',
    topicId: 'adv_5',
    world: 'adventure',
    difficulty: 'Advanced',
    problem: 'Stage 5 Challenge: Write a function `sort_player_gear(gear_list)` that receives a list of tuples `(item_name, rarity_tier, price)` and sorts them primarily by `rarity_tier` descending (higher rarity first), and secondarily by `price` ascending (cheaper first). Return the sorted list of names.',
    inputFormat: 'List of tuples: [(name, rarity, price), ...].',
    outputFormat: 'List of string item names.',
    constraints: '1 <= len(gear_list) <= 500',
    starterCode: 'def sort_player_gear(gear_list):\n    # Sort by -rarity, then price, return item names\n    pass',
    solutionCode: 'def sort_player_gear(gear_list):\n    sorted_gear = sorted(gear_list, key=lambda x: (-x[1], x[2]))\n    return [item[0] for item in sorted_gear]',
    testCases: [
      { id: 'c_adv5_t1', input: '[("Iron Sword", 1, 50), ("Mythic Bow", 5, 500), ("Steel Dagger", 2, 80), ("Elder Staff", 5, 300)]', expectedOutput: "['Elder Staff', 'Mythic Bow', 'Steel Dagger', 'Iron Sword']", description: 'Elder Staff has rarity 5 price 300 ahead of Mythic Bow rarity 5 price 500' },
      { id: 'c_adv5_t2', input: '[("A", 2, 10), ("B", 2, 5)]', expectedOutput: "['B', 'A']", description: 'Tie-break on price' },
    ],
    xpReward: 50,
  },

  // 30. Topic: The Dragon Vault: Algorithmic Synthesis (adv_6)
  {
    id: 'c_adv_6',
    title: 'Dragon Vault Knapsack Optimization',
    topicId: 'adv_6',
    world: 'adventure',
    difficulty: 'Hard',
    problem: 'Final Conquest Boss: Write `maximize_vault_loot(weights, values, capacity)` to solve the 0/1 Knapsack problem. Given item `weights`, item `values`, and backpack `capacity`, find the maximum total value of treasures you can pack without exceeding capacity.',
    inputFormat: 'weights (list of int), values (list of int), capacity (int).',
    outputFormat: 'Single integer maximum loot value.',
    constraints: '1 <= len(weights) <= 100, capacity <= 1000',
    starterCode: 'def maximize_vault_loot(weights, values, capacity):\n    # 0/1 Knapsack dynamic programming solver\n    pass',
    solutionCode: 'def maximize_vault_loot(weights, values, capacity):\n    n = len(weights)\n    dp = [0] * (capacity + 1)\n    for i in range(n):\n        w = weights[i]\n        v = values[i]\n        for cap in range(capacity, w - 1, -1):\n            dp[cap] = max(dp[cap], dp[cap - w] + v)\n    return dp[capacity]',
    testCases: [
      { id: 'c_adv6_t1', input: '[2, 3, 4], [3, 4, 5], 5', expectedOutput: '7', description: 'Weights 2+3 give values 3+4=7 within capacity 5' },
      { id: 'c_adv6_t2', input: '[1, 2, 3], [10, 15, 40], 6', expectedOutput: '65', description: 'All items fit: 10+15+40=65' },
      { id: 'c_adv6_t3', input: '[10], [50], 5', expectedOutput: '0', description: 'Too heavy for capacity', hidden: true },
    ],
    xpReward: 50,
  },
];
