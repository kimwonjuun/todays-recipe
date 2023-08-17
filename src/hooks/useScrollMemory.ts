import { useEffect } from 'react';

// 뒤로 가기 등 타 페이지 방문 후 다시 돌아왔을 때 마지막 스크롤 위치 기억해야하는 페이지에서 사용할 훅

const useMemoScrollPosition = () => {
  // 컴포넌트 마운트 시 이전 스크롤 위치를 기억해 이동하는 useEffect
  useEffect(() => {
    const lastScrollTop = Number(sessionStorage.getItem('scroll_top'));
    if (lastScrollTop) {
      window.scrollTo(0, lastScrollTop);
    }
  }, []);

  // 컴포넌트 언마운트 시 현재 스크롤 위치를 세션에 저장하는 useEffect
  useEffect(() => {
    return () => {
      sessionStorage.setItem('scroll_top', window.scrollY.toString());
    };
  }, []);
};

export default useMemoScrollPosition;
