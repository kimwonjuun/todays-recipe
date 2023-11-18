import styled from 'styled-components';
import COLORS from '../../styles/colors';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import RecipeCard from '../common/RecipeCard';
import Categories from './Categories';
import { useRecoilValue } from 'recoil';
import { RecipeDataState } from '../../recoil/atoms';
import useMyIngredients from '../../hooks/useMyIngredients';
import useUser from '../../hooks/useUser';
import useMemoScrollPosition from '../../hooks/useMemoScrollPosition';
import useRecipeCategoryFilters from '../../hooks/useRecipeCategoryFilters';

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
  } = useRecipeCategoryFilters(recipeData, myIngredients, user);

  // infinity scroll hook
  const { currentPage, isLoading } = useInfiniteScroll();

  // 나타날 레시피
  const showRecipes = sortedRecipes(filteredRecipes).slice(0, currentPage * 8);
  // 더 이상 나타낼 레시피가 없을 떄
  const noMoreRecipe = currentPage * 8 >= sortedRecipes(filteredRecipes).length;

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
          {!noMoreRecipe && isLoading && !noRecipeMessage && (
            <LoadingMessage>더 많은 레시피를 불러오고 있어요 😎</LoadingMessage>
          )}
          {showRecipes.length === 0 && noRecipeMessage && (
            <NoRecipeView>{noRecipeMessage}</NoRecipeView>
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
  justify-content: space-evenly;
  align-items: center;
  font-size: 2rem;
  margin-top: 8rem;

  @media (max-width: 1450px) {
    margin-top: 7rem;
    width: 67.5rem;
  }
  @media (max-width: 1050px) {
    margin-top: 5.5rem;
    width: 45rem;
  }
  @media (max-width: 700px) {
    margin-top: 4rem;
    width: 35rem;
  }
  @media (max-width: 550px) {
    margin-top: 3rem;
    width: 30rem;
  }
`;

const Recipes = styled.div`
  flex-wrap: wrap;
  display: flex;
  margin: 0 auto;
  padding: 5rem 0;
  overflow: hidden;
  & > p {
    text-align: center;
  }

  @media (max-width: 1050px) {
    padding: 4rem 0;
  }
  @media (max-width: 700px) {
    padding: 3rem 0;
  }
  @media (max-width: 550px) {
    padding: 2rem 0;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  width: 100%;

  @media (max-width: 1050px) {
    font-size: 1.25rem;
  }
  @media (max-width: 700px) {
    font-size: 1.125rem;
  }
  @media (max-width: 550px) {
    font-size: 1rem;
  }
`;

const NoRecipeView = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 33rem);
  background-color: ${COLORS.backGround};

  @media (max-width: 1050px) {
    font-size: 1.25rem;
  }
  @media (max-width: 700px) {
    font-size: 1.125rem;
  }
  @media (max-width: 550px) {
    font-size: 1rem;
  }
`;
