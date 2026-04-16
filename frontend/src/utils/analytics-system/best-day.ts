export const getBestDay = ( taskId: number, entries: Record<string, boolean> ) => {
    const daysMap: Record<string, number> = {};

    Object.keys(entries).forEach((key) => {
        if (!key.startsWith(`${taskId}-`)) {
            return;
        }

        if (!entries[key]) {
            return;
        }

        const date = key.split("-").slice(1).join("-");
        const day = new Date(date).toLocaleDateString("en-US", { weekday: "short" });

        daysMap[day] = (daysMap[day] || 0) + 1;
    });

    let bestDay = "-";
    let max = 0;

    for (let day in daysMap) {
        if (daysMap[day] > max) {
            max = daysMap[day];
            bestDay = day;
        }
    }

    return bestDay;
};