export const getConsistencyScore = ( taskId: number, entries: Record<string, boolean>, days: { formatted: string }[] ) => {
    let score = 0;
    
    days.forEach((day) => {
        const key = `${taskId}-${day.formatted}`;
        if (entries[key]) {
            score++;
        }
    });

    return Math.round((score / days.length) * 100);
}