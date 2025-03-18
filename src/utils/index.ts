export function capatilizedFirstLetter(str: string) {
  return `${str.charAt(0).toUpperCase() + str.slice(1)}`;
}

export function formatDate(str: string) {
  const date = new Date(str);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
}
