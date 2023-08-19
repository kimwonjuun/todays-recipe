import { useState, useEffect } from 'react';

// 무한스크롤 사용하는 페이지에 적용할 훅

const useInfiniteScroll = () => {
  // 로딩 상태
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 초기 페이지를 세션에서 가져옴. 없으면 1로 설정.
  const initialPage = () => {
    const savedPage = sessionStorage.getItem('last_page');
    return savedPage ? Number(savedPage) : 1;
  };

  // 현재 페이지를 저장하는 state. 초기값은 initial page
  const [currentPage, setCurrentPage] = useState(initialPage);

  // 함수 호출 시 현재 페이지 +1. 세션에 저장.
  const loadMorePage = () => {
    // 로딩 시작 전에 로딩 상태를 'false'로 변경
    setIsLoading(false);
    setCurrentPage((prev) => {
      sessionStorage.setItem('last_page', (prev + 1).toString());
      return prev + 1;
    });
    setIsLoading(true);
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

  // 컴포넌트 마운트될 때 이벤트 리스너 등록, 언마운트 시 제거
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { currentPage, setCurrentPage, loadMorePage, isLoading };
};

export default useInfiniteScroll;
