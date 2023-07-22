import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import RecipeBox from '../components/recipe/RecipeBox';
import { collection, getDocs } from 'firebase/firestore';
import { dbService } from '../apis/firebase';
import { Recipe } from '../types/Recipe';

const RecipePage = () => {
  // 레시피 데이터
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);

  // 파이어스토어에서 레시피 데이터 가져오기
  const getRecipeData = async () => {
    const querySnapshot = await getDocs(collection(dbService, 'recipe-list'));
    const recipeDataBase: Recipe[] = [];

    querySnapshot.forEach((doc) => {
      // 일단 any 처리
      const newRecipe: any = {
        id: doc.id,
        ...doc.data(),
      };
      recipeDataBase.push(newRecipe);
    });
    setRecipeData(recipeDataBase);
  };

  useEffect(() => {
    getRecipeData();
  }, []);

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <RecipeBox recipeData={recipeData} />
        </BoxWrapper>
      </PageWrapper>
    </>
  );
};

export default RecipePage;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 12.8rem);
  background-color: ${COLORS.backGround};
`;

const BoxWrapper = styled.div`
  width: 90rem;
  /* height: inherit; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  margin-top: 8rem;
`;
