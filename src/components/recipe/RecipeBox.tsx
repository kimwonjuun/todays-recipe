import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import RecipeCard from '../common/RecipeCard';
import { doc, getDoc } from 'firebase/firestore';
import { authService, dbService } from '../../api/firebase';
import { User } from 'firebase/auth';
import CategoriesBox from './CategoriesBox';

interface RecipeProps {
  recipeData: Recipe[];
}

const RecipeBox = ({ recipeData }: RecipeProps) => {
  const [user, setUser] = useState<User | null>(null);
  const currentUserUid = user?.uid ?? undefined;

  // 마이페이지에서 나의 냉장고에 입력한 재료들
  const [myIngredients, setMyIngredients] = useState([]);

  useEffect(() => {
    // user 객체 존재 시 setUser 업데이트
    const handleAuthStateChange = authService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => {
      handleAuthStateChange();
    };
  }, []);

  // 내가 입력한 재료 출력
  const getMyIngredients = useCallback(async () => {
    if (!currentUserUid) {
      return;
    }

    // 문서 참조
    const docSnap = await getDoc(doc(dbService, 'users', currentUserUid));

    // 문서 존재 시 재료 상태 업데이트
    if (docSnap.exists()) setMyIngredients(docSnap.data()['user-ingredients']);
  }, [currentUserUid]);

  useEffect(() => {
    getMyIngredients();
  }, [currentUserUid]);

  // 내 냉장고 재료들로 만들 수 있는 레시피들
  const canMakeRecipe = useCallback(
    (recipeIngredients: string, myIngredients: string[]): boolean => {
      return myIngredients.every((ingredient) =>
        recipeIngredients.includes(ingredient)
      );
    },
    []
  );

  // 초기 카테고리
  const initialCategory = () => {
    const savedCategory = sessionStorage.getItem('selected_category');
    return savedCategory ? savedCategory : '전체 레시피';
  };

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // 분류 선택 여닫기 후 선택하기. 세션에 선택된 분류 저장
  const handleCategoryButton = useCallback((category: string) => {
    setSelectedCategory(category);
    sessionStorage.setItem('selected_category', category);
  }, []);

  // 필터링된 레시피 뿌려주기 (나의 냉장고 기능 추가 후 추가 코드 업데이트)
  const filteredRecipes =
    selectedCategory && selectedCategory !== '전체 레시피'
      ? recipeData.filter((recipe: Recipe) => {
          if (selectedCategory === '나의 냉장고' && myIngredients.length > 0) {
            return canMakeRecipe(recipe.ingredients, myIngredients);
          }
          return recipe.type === selectedCategory;
        })
      : recipeData;

  // 나의 재료들로 만들 수 있는 레시피가 없을 때 나타낼 조건부 메시지
  const noRecipeMessage =
    selectedCategory === '나의 냉장고' && filteredRecipes.length === 0
      ? user
        ? '냉장고가 비었거나 냉장고에 보관된 재료들을 전부 포함해서 만들 수 있는 레시피가 없어요. 🫤'
        : '로그인 후 냉장고에 재료들을 넣어주세요. 🫤'
      : null;

  // 저칼로리 순/가나다 순 전 기존 정렬 상태
  const [sortType, setSortType] = useState<string>(
    () => sessionStorage.getItem('selected_sort_type') || '기존 정렬 상태'
  );

  // 소팅 상태 전환
  const handleSortType = (changeSortType: string) => {
    sessionStorage.setItem('scroll_top', window.scrollY.toString());
    sessionStorage.setItem('selected_sort_type', changeSortType);
    setSortType(changeSortType);
  };

  // 저칼로리 순/가나다 순 소팅 전환
  const sortedRecipes = useCallback(
    (recipes: Recipe[]): Recipe[] => {
      if (sortType === '가나다 순') {
        return [...recipes].sort((a: Recipe, b: Recipe) =>
          a.name.localeCompare(b.name)
        );
      } else if (sortType === '저칼로리 순') {
        return [...recipes].sort(
          (a: Recipe, b: Recipe) =>
            parseFloat(a.calorie) - parseFloat(b.calorie)
        );
      }
      return recipes;
    },
    [sortType]
  );

  // 무한 스크롤
  const { currentPage } = useInfiniteScroll();
  const showRecipes = sortedRecipes(filteredRecipes).slice(0, currentPage * 8);

  // 컴포넌트 마운트 시 이전 스크롤 위치를 기억해 이동하는 useEffect
  useEffect(() => {
    const lastScrollTop = Number(sessionStorage.getItem('scroll_top'));
    if (lastScrollTop) {
      window.scrollTo(0, lastScrollTop);
    }
  }, [sortType]);

  // 컴포넌트 언마운트 시 현재 스크롤 위치를 세션에 저장하는 useEffect
  useEffect(() => {
    return () => {
      sessionStorage.setItem('scroll_top', window.scrollY.toString());
    };
  }, []);

  return (
    <>
      <CategoriesBox
        selectedCategory={selectedCategory}
        handleCategoryButton={handleCategoryButton}
        sortType={sortType}
        handleSortType={handleSortType}
      />
      <RecipeBoxWrapper>
        {showRecipes.map((recipe: Recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
        {showRecipes.length === 0 && noRecipeMessage && (
          <NoRecipeMessage>{noRecipeMessage}</NoRecipeMessage>
        )}
      </RecipeBoxWrapper>
    </>
  );
};

export default React.memo(RecipeBox);

const RecipeBoxWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
  margin: 0 auto;
  padding: 5rem 0;
  overflow: hidden;
`;

const NoRecipeMessage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 33rem);
  background-color: ${COLORS.backGround};
`;
