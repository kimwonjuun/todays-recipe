import { User } from 'firebase/auth';
import { useState } from 'react';

// 레시피 페이지에서 레시피 필터링해주는 hook

const useRecipeCategoryFilters = (
  recipeData: Recipe[],
  myIngredients: string[],
  user: User | null
) => {
  // 초기 카테고리
  const initialCategory = () => {
    const savedCategory = sessionStorage.getItem('selected_category_type');
    return savedCategory ? savedCategory : '나의 냉장고';
  };

  // 선택된 카테고리 상태 (out)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // 저칼로리 순, 가나다 순 전 기존 정렬 상태
  const [sortType, setSortType] = useState<string>(
    () => sessionStorage.getItem('selected_sort_type') || '기존 정렬 상태'
  );

  // 레시피 분류 선택하기. 세션에 선택한 분류 저장
  const handleCategoryType = (changeCategoryType: string) => {
    setSelectedCategory(changeCategoryType);
    sessionStorage.setItem('selected_category_type', changeCategoryType);
  };

  // 소팅 상태 전환. 세션에 선택한 소팅 상태 저장
  const handleSortType = (changeSortType: string) => {
    setSortType(changeSortType);
    sessionStorage.setItem('selected_sort_type', changeSortType);
  };

  // 내 냉장고 재료들로 만들 수 있는 레시피들
  const canMakeRecipe = (
    recipeIngredients: string,
    myIngredients: string[]
  ): boolean => {
    return myIngredients.every((ingredient) =>
      recipeIngredients.includes(ingredient)
    );
  };

  // 필터링된 레시피 뿌려주기 (나의 냉장고 기능 추가 후 추가 코드 업데이트)
  const filteredRecipes =
    selectedCategory && selectedCategory !== '전체 레시피'
      ? recipeData.filter((recipe: Recipe) => {
          if (
            selectedCategory === '나의 냉장고' &&
            myIngredients &&
            myIngredients.length > 0
          ) {
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

  return {
    selectedCategory,
    sortType,
    handleCategoryType,
    handleSortType,
    noRecipeMessage,
    sortedRecipes,
    filteredRecipes,
  };
};

export default useRecipeCategoryFilters;
