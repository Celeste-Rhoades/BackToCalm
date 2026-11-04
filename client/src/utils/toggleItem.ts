export const toggleItem = (list: string[], item: string): string[] =>
  list.includes(item) ? list.filter(i => i !== item) : [...list, item];
