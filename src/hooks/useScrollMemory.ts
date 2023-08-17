import { useEffect } from 'react';

const useScrollMemory = () => {
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

export default useScrollMemory;
