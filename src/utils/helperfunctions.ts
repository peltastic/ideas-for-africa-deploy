export function truncateStr(
  word: string,
  length: number
): {
  text: string;
  status: boolean;
} {
  const str = word.substring(0, length);
  if (word.length <= length) {
    return { text: word, status: false };
  }
  return { text: str, status: true };
}

export function formDataHandler<T extends object>(body: T) {
  const formData = new FormData();
  for (const key in body) {
    if (body.hasOwnProperty(key)) {
      formData.append(key, body[key as keyof typeof body] as string);
    }
  }
  return formData;
}

export function replacePTags(inputString: string) {
  // Use regular expressions to replace <p></p> with <br/>
  return inputString.replace(/<p><\/p>/g, "<br/>");
}

export function formatNameRoute(name: string) {
  let str = "";
  str = name.replace(/\s+/g, "-").toLowerCase();
  return str;
}

export function getRandomColor() {
  const modifyIdeasColorPallet = [
    {
      light: "#8d493a2f",
      dark: "#8D493A",
    },
    {
      light: "#7569b62e",
      dark: "#7469B6",
    },
    {
      light: "#0042253c",
      dark: "#004225",
    },
    {
      light: "#9a031f20",
      dark: "#9A031E",
    },
    {
      light: "#f7c46630",
      dark: "#815607",
    },
  ];
  const index = Math.floor(Math.random() * (5 - 1) + 1);
  console.log(index);

  return {
    dark: modifyIdeasColorPallet[index].dark,
    light: modifyIdeasColorPallet[index].light,
  };
}
