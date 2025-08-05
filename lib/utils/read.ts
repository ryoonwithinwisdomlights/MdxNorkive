export const getReadingTime = (title: string, description: string) => {
  return Math.ceil((title.length + description.length) / 200);
};

export const getWordCount = (title: string, description: string) => {
  return title.length + description.length;
};
