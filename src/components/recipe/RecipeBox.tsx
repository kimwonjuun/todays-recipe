import { useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import RecipeCard from '../common/RecipeCard';
import Categories from './Categories';
import { useRecoilValue } from 'recoil';
import { RecipeDataState } from '../../recoil/atoms';
import useScrollMemory from '../../hooks/useScrollMemory';
import useMyIngredients from '../../hooks/useMyIngredients';
import useUser from '../../hooks/useUser';

const RecipeBox = () => {
  // Recoil: RecipeDataState
  const recipeData = useRecoilValue(RecipeDataState);

  // 페이지 스크롤 상태 기억: useScrollMemory hook
  useScrollMemory();

  // 유저 상태 업데이트: useUser hook
  const { user, currentUserUid } = useUser();

  // 마이페이지에서 나의 냉장고에 입력한 재료들: useMyIngredients hook
  const { myIngredients } = useMyIngredients(currentUserUid);

  // 내 냉장고 재료들로 만들 수 있는 레시피들
  const canMakeRecipe = (
    recipeIngredients: string,
    myIngredients: string[]
  ): boolean => {
    return myIngredients.every((ingredient) =>
      recipeIngredients.includes(ingredient)
    );
  };

  // 초기 카테고리
  const initialCategory = () => {
    const savedCategory = sessionStorage.getItem('selected_category');
    return savedCategory ? savedCategory : '전체 레시피';
  };
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

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

  // 저칼로리 순, 가나다 순 전 기존 정렬 상태
  const [sortType, setSortType] = useState<string>(
    () => sessionStorage.getItem('selected_sort_type') || '기존 정렬 상태'
  );

  // 저칼로리 순, 가나다 순 소팅 전환
  const sortedRecipes = (recipes: Recipe[]): Recipe[] => {
    if (sortType === '가나다 순') {
      return [...recipes].sort((a: Recipe, b: Recipe) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortType === '저칼로리 순') {
      return [...recipes].sort(
        (a: Recipe, b: Recipe) => parseFloat(a.calorie) - parseFloat(b.calorie)
      );
    }
    return recipes;
  };

  // infinity scroll hook
  const { currentPage } = useInfiniteScroll();
  const showRecipes = sortedRecipes(filteredRecipes).slice(0, currentPage * 8);

  return (
    <>
      <BoxWrapper>
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortType={sortType}
          setSortType={setSortType}
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
