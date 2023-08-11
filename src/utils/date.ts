// new Date().toString()을 포맷하는 함수
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// Date.now()를 포맷해주는 유틸
export const getFormattedDate = (time: number): string => {
  return new Date(time).toLocaleString();
};
