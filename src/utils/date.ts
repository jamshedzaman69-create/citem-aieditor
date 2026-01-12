export function getFutureDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  
  // Add ordinal suffix
  const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 ? 0 : day % 10)] || 'th';
  return `${day}${suffix} ${month}`;
}