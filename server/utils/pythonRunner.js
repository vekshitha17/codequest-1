import { execFileSync } from 'child_process';

/**
 * Executes user's Python code against a specific test case input
 * with timeout and isolation to prevent hangs.
 */
export function runPythonTestCase(userCode, inputStr, expectedOutputStr) {
  const runnerScript = `
import sys
import json

raw_user_code = ${JSON.stringify(userCode)}
raw_input = ${JSON.stringify(inputStr)}

# Prepare execution namespace
ns = {}
try:
    exec(raw_user_code, ns)
except Exception as e:
    print(json.dumps({"error": f"Compilation/Syntax Error: {str(e)}", "passed": False}))
    sys.exit(0)

# Discover the defined user function (ignoring imported or builtins)
user_fns = [val for name, val in ns.items() if callable(val) and not name.startswith("__") and not isinstance(val, type)]
# Also check if a class or general callable was defined
if not user_fns:
    user_fns = [val for name, val in ns.items() if callable(val) and not name.startswith("__")]

if not user_fns:
    print(json.dumps({"error": "No function or class found in submitted code.", "passed": False}))
    sys.exit(0)

fn = user_fns[0]

# Parse arguments from raw_input safely
args = []
kwargs = {}
parsed_successfully = False

if raw_input:
    clean_inp = raw_input.strip()
    try:
        # Try evaluating as python expression or tuple
        evaluated = eval(f"({clean_inp})", {"__builtins__": None}, {})
        if isinstance(evaluated, tuple):
            args = list(evaluated)
        else:
            args = [evaluated]
        parsed_successfully = True
    except Exception:
        pass

    if not parsed_successfully:
        # Fallback 1: split by space for space-separated numbers or strings
        tokens = clean_inp.split()
        converted = []
        for t in tokens:
            try:
                converted.append(int(t))
            except ValueError:
                try:
                    converted.append(float(t))
                except ValueError:
                    converted.append(t)
        args = converted

# Execute function with parsed arguments
try:
    if args:
        result = fn(*args)
    else:
        result = fn()
    
    actual_str = str(result)
    expected_clean = ${JSON.stringify(expectedOutputStr.trim())}
    
    # Normalize comparison (e.g. True vs true, float format, quotes in lists)
    is_match = (
        actual_str.strip() == expected_clean or
        actual_str.strip().lower() == expected_clean.lower() or
        actual_str.replace(" ", "") == expected_clean.replace(" ", "") or
        actual_str.replace('"', "'") == expected_clean.replace('"', "'")
    )

    print(json.dumps({
        "actualOutput": actual_str,
        "passed": bool(is_match)
    }))
except Exception as e:
    print(json.dumps({
        "actualOutput": f"Runtime Error: {str(e)}",
        "passed": False
    }))
`;

  try {
    const stdout = execFileSync('python3', ['-c', runnerScript], {
      timeout: 3000,
      encoding: 'utf8',
      maxBuffer: 1024 * 1024,
    });
    const parsed = JSON.parse(stdout.trim());
    return {
      passed: Boolean(parsed.passed),
      actualOutput: parsed.actualOutput || parsed.error || 'Execution failed',
    };
  } catch (err) {
    if (err.code === 'ETIMEDOUT') {
      return {
        passed: false,
        actualOutput: 'Time Limit Exceeded (> 3000ms). Check for infinite loops.',
      };
    }
    return {
      passed: false,
      actualOutput: `Execution error: ${err.message}`,
    };
  }
}
