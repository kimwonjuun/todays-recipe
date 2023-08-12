import { useState, useEffect } from 'react';

interface useInfiniteScrollProps {
  currentPage: number;
  setCurrentPage: Function;
  loadMorePage: () => void;
}

export const useInfiniteScroll = (): useInfiniteScrollProps => {
  // 초기 표시할 페이지
  const [currentPage, setCurrentPage] = useState(1);

  // 함수 호출 시 현재 페이지 +1
  const loadMorePage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // 스크롤 이벤트 발생 시, 스크롤 위치 확인. 스크롤이 맨 아래 위치하면 loadMorePage 함수 호출해 페이지 로드
  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (scrollHeight - scrollTop === window.innerHeight) {
      loadMorePage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { currentPage, setCurrentPage, loadMorePage };
};
