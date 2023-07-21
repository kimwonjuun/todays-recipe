import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { Recipe } from '../pages/Admin';
import RecipeBox from '../components/recipe/RecipeBox';
import { collection, getDocs } from 'firebase/firestore';
import { dbService } from '../apis/firebase';

const RecipePage = () => {
  // 레시피 데이터
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);
  // 데이터 뿌려주기
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getRecipeData();
  //       setRecipeData(data);
  //     } catch (error) {
  //       console.error('데이터 불러오기 실패:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  const getRecipeData = async () => {
    const querySnapshot = await getDocs(collection(dbService, 'recipe-list'));
    const recipeDataBase: any = [];
    querySnapshot.forEach((doc) => {
      const newRecipe = {
        id: doc.id,
        ...doc.data(),
      };
      recipeDataBase.push(newRecipe);
    });
    setRecipeData(recipeDataBase);
  };

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
  min-height: calc(100vh - 12.7rem);
  background-color: ${COLORS.backGround};
`;

const BoxWrapper = styled.div`
  width: 90rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  margin-top: 8rem;
`;
