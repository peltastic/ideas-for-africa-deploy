export function truncateStr(word: string, length: number): string {
    const str = word.substring(0, length);
    if (word.length <= length) {
      return word
    }
    return str + "...";
  }

  export function formDataHandler<T extends object>(body: T) {
    const formData = new FormData()
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(key, body[key as keyof typeof body] as string)
      }
    }
    return formData
  }