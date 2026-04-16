# getCompletionRate Function Documentation

## Function Overview
Calculates the completion rate percentage for a specific task across given days. Returns a whole number percentage (0-100).

**Example:** If task 123 was completed on 3 out of 7 days, returns `43`.

## Code with Line-by-Line Explanation

```typescript
export const getCompletionRate = (
    taskId: number,
    entries: Record<string, boolean>,
    days: {
        formatted: string
    }[]
) => {
```

**Line 1-8: Function Declaration**
- `export const` - Exports function for use in other files
- `getCompletionRate` - Function name
- **Parameters:**
  | Parameter | Type | Description |
  |-----------|------|-------------|
  | `taskId` | `number` | Unique task ID (e.g., 123) |
  | `entries` | `Record<string, boolean>` | Completion tracking object |
  | `days` | `Array<{formatted: string}>` | Days array with formatted dates |

---

```typescript
    let completed = 0;
```

**Line 10: Initialize Counter**
- `let completed = 0` - Counter starts at 0, tracks completed days
- `let` used because value will change during loop

---

```typescript
    days.forEach((day) => {
        const key = `${taskId}-${day.formatted}`;
        if (entries[key]) {
            completed++;
        }
    });
```

**Lines 12-17: Loop Through Days**
- `days.forEach((day) => {` - Loops each day object
- `const key = `${taskId}-${day.formatted}`;` - Creates key like `"123-2026-04-16"`
- `if (entries[key]) {` - Checks if task completed on this day
- `completed++;` - Increments counter if `true`
- `});` - Ends loop

---

```typescript
    return Math.round((completed / days.length) * 100);
};
```

**Lines 19-20: Calculate & Return Percentage**
- `completed / days.length` - Gets decimal ratio (e.g., 3/7 = 0.428)
- `* 100` - Converts to percentage (42.8%)
- `Math.round()` - Rounds to nearest whole number (43%)
- `return` - Returns final percentage

## Usage Example

```typescript
const entries = {
    "123-2026-04-16": true,
    "123-2026-04-17": true,
    "123-2026-04-18": true
};

const days = [
    { formatted: "2026-04-16" },
    { formatted: "2026-04-17" },
    { formatted: "2026-04-18" },
    { formatted: "2026-04-19" },
    { formatted: "2026-04-20" },
    { formatted: "2026-04-21" },
    { formatted: "2026-04-22" }
];

const rate = getCompletionRate(123, entries, days); // Returns 43
```

## Input/Output

| Input | Description | Example |
|-------|-------------|---------|
| **taskId** | Task identifier | `123` |
| **entries** | Completion records | `{"123-2026-04-16": true}` |
| **days** | Date range | `[{formatted: "2026-04-16"}]` |

**Output:** `number` (0-100) - Completion percentage

## Key Logic Flow
1. Start counter at 0
2. For each day:
↳ Create key: "taskId-date"
↳ If entries[key] = true → completed++
3. Calculate: (completed ÷ totalDays) × 100
4. Round & return percentage

# getMissedDays Function Documentation

## Function Overview
This function calculates how many days a specific task was **missed**. A day is counted as missed when there is no completed entry for that task on that date.

## Code Snippet

```typescript
export const getMissedDays = (
    taskId: number,
    entries: Record<string, boolean>,
    days: { formatted: string }[]
) => {
    let missed = 0;
    days.forEach((day) => {
        const key = `${taskId}-${day.formatted}`;
        if (!entries[key]) {
            missed++;
        }
    });

    return missed;
};
```

## Line-by-Line Explanation

### Part 1: Function Declaration

```typescript
export const getMissedDays = (
    taskId: number,
    entries: Record<string, boolean>,
    days: { formatted: string }[]
) => {
```

- `export const` means this function is created and exported so it can be used in other files.
- `getMissedDays` is the name of the function.
- `taskId: number` means the function expects a numeric task ID.
- `entries: Record<string, boolean>` means `entries` is an object where:
  - the key is a string,
  - the value is either `true` or `false`.
- `days: { formatted: string }[]` means `days` is an array of objects, and each object has a `formatted` date string.
- `=> {` starts the arrow function body.

### Part 2: Missed Counter

```typescript
let missed = 0;
```

- A variable named `missed` is created.
- It starts with value `0`.
- This variable will count how many days the task was not completed.

### Part 3: Loop Through Each Day

```typescript
days.forEach((day) => {
```

- `days.forEach(...)` loops through every item in the `days` array.
- `day` represents the current day object in each loop.
- This allows the function to check each date one by one.

### Part 4: Create a Unique Key

```typescript
const key = `${taskId}-${day.formatted}`;
```

- A new string called `key` is created.
- It combines the task ID and the formatted date.
- Example: if `taskId` is `5` and `day.formatted` is `2026-04-16`, the key becomes:
  - `5-2026-04-16`
- This key is used to look up the task entry in the `entries` object.

### Part 5: Check If the Day Was Missed

```typescript
if (!entries[key]) {
    missed++;
}
```

- `entries[key]` checks whether the task has an entry for that date.
- `!entries[key]` means “if there is no truthy value for this key”.
- If the task is not marked as completed for that date, the day is considered missed.
- `missed++` increases the missed count by 1.

### Part 6: End the Loop

```typescript
});
```

- This closes the `forEach` loop.
- At this point, all days have been checked.

### Part 7: Return the Result

```typescript
return missed;
};
```

- `return missed;` sends the final missed count back.
- `};` closes the function.

## Simple Example

```typescript
const entries = {
    "1-2026-04-14": true,
    "1-2026-04-15": false,
    "1-2026-04-16": true
};

const days = [
    { formatted: "2026-04-14" },
    { formatted: "2026-04-15" },
    { formatted: "2026-04-16" },
    { formatted: "2026-04-17" }
];

const result = getMissedDays(1, entries, days);
```

### What happens here?

- `1-2026-04-14` is `true`, so it is **not missed**.
- `1-2026-04-15` is `false`, so it is **missed**.
- `1-2026-04-16` is `true`, so it is **not missed**.
- `1-2026-04-17` does not exist in `entries`, so it is also **missed**.

So the function returns:

```typescript
2
```

## Final Output

The function returns a **number**:

- `0` means no days were missed.
- Any number greater than `0` means that many days were missed.


# getBestDay Function Documentation

## Function Overview
This function finds the **day of the week** (Mon, Tue, Wed, etc.) when a specific task was completed **most frequently**. It analyzes completion records and returns the best performing day.

**Example:** If task 123 was completed 8 times on Wednesday but only 5 times on other days, it returns `"Wed"`.

## Code with Line-by-Line Explanation

### Part 1: Function Declaration

```typescript
export const getBestDay = (
    taskId: number,
    entries: Record<string, boolean>
) => {
```

**Lines 1-5: Function setup**
- `export const` - Makes function available to other files
- `getBestDay` - Function name
- **Parameters:**
  | Parameter | Type | Description |
  |-----------|------|-------------|
  | `taskId` | `number` | Task ID to analyze (e.g., `123`) |
  | `entries` | `Record<string, boolean>` | Completion records object |

---

### Part 2: Create Tracking Object

```typescript
const daysMap: Record<string, number> = {};
```

**Line 7: Initialize day counter**
- `daysMap` - Empty object to track counts for each day
- Keys will be day names like `"Mon"`, `"Tue"`
- Values will be completion counts like `5`, `8`
- **Example:** `{"Mon": 3, "Wed": 8}`

---

### Part 3: Loop Through All Entries

```typescript
Object.keys(entries).forEach((key) => {
```

**Line 9: Get all entry keys**
- `Object.keys(entries)` - Gets array of all keys like `["123-2026-04-16", "123-2026-04-17"]`
- `forEach((key) =>` - Loops through each entry key one by one

---

### Part 4: Filter by Task ID

```typescript
if (!key.startsWith(`${taskId}-`)) {
    return;
}
```

**Lines 10-13: Check if entry belongs to this task**
- `` `${taskId}-` `` creates prefix like `"123-"`
- `key.startsWith()` - Only processes entries for this task
- **Example:** `key = "123-2026-04-16"` → `true` (keep it)
- **Example:** `key = "456-2026-04-16"` → `false` (skip it)
- `return` - Skips to next entry if wrong task

---

### Part 5: Skip Uncompleted Days

```typescript
if (!entries[key]) {
    return;
}
```

**Lines 15-17: Only count completed tasks**
- `entries[key]` - Gets completion status (`true` or `false`)
- `!entries[key]` - Skip if task wasn't completed
- **Example:** `entries["123-2026-04-16"] = false` → skip this day

---

### Part 6: Extract Date & Get Day Name

```typescript
const date = key.split("-").slice(1).join("-");
const day = new Date(date).toLocaleDateString("en-US", { weekday: "short" });
```

**Lines 19-20: Convert date string to day name**
- `key.split("-")` → `["123", "2026", "04", "16"]`
- `.slice(1)` → `["2026", "04", "16"]` (removes task ID)
- `.join("-")` → `"2026-04-16"`
- `new Date(date)` → Creates date object
- `toLocaleDateString("en-US", { weekday: "short" })` → `"Thu"`

---

### Part 7: Count This Day

```typescript
daysMap[day] = (daysMap[day] || 0) + 1;
```

**Line 22: Increment day counter**
- `daysMap[day] || 0` - Gets current count or `0` if new day
- `+ 1` - Adds one completion
- **Example:** `daysMap["Wed"]` goes from `7` → `8`
- **Example:** First `"Wed"` → `0 + 1 = 1`

---

### Part 8: Find Day with Most Completions

```typescript
});

let bestDay = "-";
let max = 0;

for (let day in daysMap) {
    if (daysMap[day] > max) {
        max = daysMap[day];
        bestDay = day;
    }
}
```

**Lines 24-32: Find winner**
- `});` - Ends the entries loop
- `bestDay = "-"` - Default if no completions
- `max = 0` - Track highest count
- `for (let day in daysMap)` - Loop through day names
- `daysMap[day] > max` - Is this day better?
- Update `max` and `bestDay` if yes

---

### Part 9: Return Result

```typescript
return bestDay;
};
```

**Lines 34-35: Send result back**
- Returns day name like `"Wed"` or `"-"` if no completions
- `};` - Closes function

---

## Complete Usage Example

```typescript
const entries = {
    "123-2026-04-13": true,  // Mon
    "123-2026-04-14": true,  // Tue  
    "123-2026-04-15": true,  // Wed
    "123-2026-04-16": true,  // Thu
    "123-2026-04-22": true,  // Wed
    "123-2026-04-23": false, // Thu (skipped)
    "456-2026-04-16": true   // Wrong task (skipped)
};

const result = getBestDay(123, entries);
console.log(result); // "Wed" (2 Wednesdays completed)
```

## Input/Output Summary

| Input | Description | Example |
|-------|-------------|---------|
| `taskId` | Task number | `123` |
| `entries` | All completion records | `{"123-2026-04-16": true}` |

**Output:** `string`
- Day name: `"Mon"`, `"Tue"`, `"Wed"`, etc.
- `"-"` if no completions found

## Key Logic Flow
1. Create empty daysMap = {}
2. For each entry key:
↳ Skip if wrong task ID
↳ Skip if not completed
↳ Extract date → get day name ("Wed")
↳ daysMap["Wed"] += 1
3. Find day with highest count
4. Return that day name


# getConsistencyScore Function Documentation

## Function Overview
Calculates the **consistency score** (percentage) for a task across a specific range of days. Shows what percentage of days the task was completed.

**Example:** If task 123 was completed on 4 out of 7 days, returns `57`.

## Code with Line-by-Line Explanation

### Part 1: Function Declaration

```typescript
export const getConsistencyScore = (
    taskId: number,
    entries: Record<string, boolean>,
    days: { formatted: string }[]
) => {
```

**Lines 1-6: Function setup**
- `export const` - Makes function available for import
- `getConsistencyScore` - Function name
- **Parameters:**
  | Parameter | Type | Description |
  |-----------|------|-------------|
  | `taskId` | `number` | Task ID (e.g., `123`) |
  | `entries` | `Record<string, boolean>` | Completion records |
  | `days` | `Array<{formatted: string}>` | Days to check |

---

### Part 2: Initialize Score Counter

```typescript
let score = 0;
```

**Line 8: Create score tracker**
- `let score = 0` - Counter starts at 0
- Will count completed days
- `let` used because value changes during loop

---

### Part 3: Loop Through Each Day

```typescript
days.forEach((day) => {
    const key = `${taskId}-${day.formatted}`;
```

**Lines 10-11: Process each day**
- `days.forEach()` - Loops through every day
- `const key = `${taskId}-${day.formatted}`` - Creates lookup key
- **Example:** `key = "123-2026-04-16"`

---

### Part 4: Check Completion Status

```typescript
if (entries[key]) {
    score++;
}
```

**Lines 12-13: Count completed days**
- `entries[key]` - Looks up completion status
- `if (entries[key])` - Only true if completed
- `score++` - Adds 1 to score for completed days

---

### Part 5: Calculate & Return Percentage

```typescript
});

return Math.round((score / days.length) * 100);
}
```

**Lines 15-17: Final calculation**
- `});` - Ends loop
- `score / days.length` - Gets decimal ratio (e.g., `4/7 = 0.571`)
- `* 100` - Converts to percentage (`57.1%`)
- `Math.round()` - Rounds to whole number (`57`)
- `return` - Sends result back

---

## Complete Usage Example

```typescript
const entries = {
    "123-2026-04-16": true,
    "123-2026-04-17": true,
    "123-2026-04-18": false,
    "123-2026-04-19": true,
    "123-2026-04-20": true,
    "123-2026-04-21": false,
    "123-2026-04-22": false
};

const days = [
    { formatted: "2026-04-16" },
    { formatted: "2026-04-17" },
    { formatted: "2026-04-18" },
    { formatted: "2026-04-19" },
    { formatted: "2026-04-20" },
    { formatted: "2026-04-21" },
    { formatted: "2026-04-22" }
];

const result = getConsistencyScore(123, entries, days);
// Returns: 57 (4 completed out of 7 days)
```

## Comparison with getCompletionRate

| Function | Same Logic | Returns |
|----------|------------|---------|
| `getCompletionRate` | ✅ **Identical** | Percentage (0-100) |
| `getConsistencyScore` | ✅ **Identical** | Percentage (0-100) |

**Note:** This function appears to be **identical** to `getCompletionRate` from previous documentation.

## Input/Output

| Input | Description | Example |
|-------|-------------|---------|
| `taskId` | Task identifier | `123` |
| `entries` | Completion records | `{"123-2026-04-16": true}` |
| `days` | Date range to analyze | `[{formatted: "2026-04-16"}]` |

**Output:** `number` (0-100) - Consistency percentage

## Key Logic Flow
1. score = 0
2. For each day:
↳ key = "taskId-date"
↳ if entries[key] = true → score++
3. Return: round((score ÷ totalDays) × 100)