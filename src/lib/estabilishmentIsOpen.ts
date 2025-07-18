export function isWithinWorkingHours(startHour = 5, endHour = 20): boolean {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= startHour && currentHour < endHour;
}
