export const getCompletionRate = (
    taskId: number,
    entries: Record<string, boolean>,
    days: {
        formatted: string
    }[]
) => {
    let completed = 0;

    days.forEach((day) => {
        const key = `${taskId}-${day.formatted}`;
        if (entries[key]) {
            completed++;
        }
    });

    return Math.round((completed / days.length) * 100);
};