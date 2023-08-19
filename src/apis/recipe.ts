import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { RecipeDataState } from '../recoil/atoms';
import { collection, getDocs } from 'firebase/firestore';
import { dbService } from './firebase';

// 파이어스토어에 업로드한 가공한 데이터 받아오기
export const ProcessedRecipeData = () => {
  // Recoil: RecipeDataState
  const setRecipeData = useSetRecoilState(RecipeDataState);

  // 파이어베이스에서 Recipe-list 데이터 가져오기
  const getRecipeData = async () => {
    const querySnapshot = await getDocs(collection(dbService, 'recipe-list'));
    const recipeDataBase: Recipe[] = [];

    querySnapshot.forEach((doc) => {
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
    console.log('recipe data 들어옴 !');
  }, []);
};
