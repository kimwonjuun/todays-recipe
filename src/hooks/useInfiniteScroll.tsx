import { useState, useEffect } from 'react';

type InfiniteScrollType = {
  currentPage: number;
  //   setCurrentPage: Function;
  //   loadMorePage: () => void;
};

export const useInfiniteScroll = (): InfiniteScrollType => {
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

  //   return { currentPage, setCurrentPage, loadMorePage };
  return { currentPage };
};

// 기존 컴포넌트에서의 infinite scroll

// // 무한 스크롤
//   // scrollTop: 맨 위 ~ 현재 보이는 부분까지
//   // scrollHeight: 맨 위 ~ 맨 아래
//   // clientHeight: 현재 보이는 부분(border 제외)
//   // offsetHeight: 현재 보이는 부분(border 포함)

//   // 초기 표시할 페이지
//   const [currentPage, setCurrentPage] = useState(1);

//   // 페이지 당 표시할 아이템 수
//   const itemsPerPage = 8;

//   // 함수 호출 시 현재 페이지 +1
//   const loadMorePage = () => {
//     setCurrentPage((prev) => prev + 1);
//   };

//   // 스크롤 이벤트 발생 시, 스크롤 위치 확인. 스크롤이 맨 아래 위치하면 loadMorePage 함수 호출해 페이지 로드
//   const handleScroll = () => {
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollHeight =
//       document.documentElement.scrollHeight || document.body.scrollHeight;

//     if (scrollHeight - scrollTop === window.innerHeight) {
//       loadMorePage();
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // 기존 sortedRecipes(filteredRecipes)에서 slice 메서드를 통해 현재 페이지에 해당하는 레시피를 보여줌
//   const showRecipes = sortedRecipes(filteredRecipes).slice(
//     0,
//     currentPage * itemsPerPage
//   );
