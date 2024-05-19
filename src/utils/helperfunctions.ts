export function truncateStr(word: string, length: number): string {
    const str = word.substring(0, length);
    if (word.length <= length) {
      return word
    }
    return str + "...";
  }