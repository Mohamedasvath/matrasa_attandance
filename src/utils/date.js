export const getCurrentMonthInfo = () => {
  const now = new Date();

  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  const daysInMonth = new Date(
    year,
    now.getMonth() + 1,
    0
  ).getDate();

  return { month, year, daysInMonth };
};
