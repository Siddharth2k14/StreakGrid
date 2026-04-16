export const getMissedDays = ( taskId: number, entries: Record<string, boolean>, days: { formatted: string }[] ) => {
    let missed = 0;
    days.forEach((day) => {
        const key = `${taskId}-${day.formatted}`;
        if (!entries[key]) {
            missed++;
        }
    });

    return missed;
};