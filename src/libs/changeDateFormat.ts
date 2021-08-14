// ソートするために時刻をformatする関数
export const changeDateFormat = (createdAt: string): string => {
  const parsedTimestamp = Date.parse(createdAt);
  const newDate = new Date(parsedTimestamp);
  const newHours = newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
  const newMinutes = newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes();
  const fixedDate = `${newDate.getFullYear()}-${newHours}-${newMinutes}`;

  return fixedDate;
};
