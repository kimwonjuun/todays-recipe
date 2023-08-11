// Date.now()를 포맷해주는 유틸
export const formatDate = (time: number): string => {
  return new Date(time).toLocaleString();
};
