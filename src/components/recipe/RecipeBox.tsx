import { useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import RecipeCard from '../common/RecipeCard';
import Categories from './Categories';
import { useRecoilValue } from 'recoil';
import { RecipeDataState } from '../../recoil/atoms';
import useMyIngredients from '../../hooks/useMyIngredients';
import useUser from '../../hooks/useUser';
import useMemoScrollPosition from '../../hooks/useScrollMemory';
import useRecipeFilters from '../../hooks/useRecipeFilters';

const RecipeBox = () => {
  // Recoil: RecipeDataState
  const recipeData = useRecoilValue(RecipeDataState);

  // 페이지 스크롤 상태 기억: useScrollMemory hook
  useMemoScrollPosition();

  // 유저 상태 업데이트: useUser hook
  const { user, currentUserUid } = useUser();

  // 마이페이지에서 나의 냉장고에 입력한 재료들: useMyIngredients hook
  const { myIngredients } = useMyIngredients(currentUserUid);

  // 카테고리, 소팅 필터링: useRecipeFilters hook
  const {
    selectedCategory,
    sortType,
    handleCategoryType,
    handleSortType,
    noRecipeMessage,
    sortedRecipes,
    filteredRecipes,
  } = useRecipeFilters(recipeData, myIngredients, user);

  // infinity scroll hook
  const { currentPage } = useInfiniteScroll();
  const showRecipes = sortedRecipes(filteredRecipes).slice(0, currentPage * 8);

  return (
    <>
      <BoxWrapper>
        <Categories
          selectedCategory={selectedCategory}
          sortType={sortType}
          handleCategoryType={handleCategoryType}
          handleSortType={handleSortType}
        />
        <Recipes>
          {showRecipes.map((recipe: Recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
          {showRecipes.length === 0 && noRecipeMessage && (
            <NoRecipeMessage>{noRecipeMessage}</NoRecipeMessage>
          )}
        </Recipes>
      </BoxWrapper>
    </>
  );
};

export default RecipeBox;

const BoxWrapper = styled.div`
  width: 90rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  margin-top: 8rem;
`;

const Recipes = styled.div`
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
