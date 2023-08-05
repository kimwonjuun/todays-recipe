import { useState, useEffect } from 'react';
import { dbService } from '../apis/firebase';
import { Recipe } from '../types/Recipe';
import { collection, getDocs } from 'firebase/firestore';
import { RecipeDataState } from '../recoil/recipeState';
import { useSetRecoilState } from 'recoil';

export const useRecipeData = () => {
  // 기존 useState
  // const [recipeData, setRecipeData] = useState<Recipe[]>([]);

  // recoil 도입
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
  }, []);

  // 기존
  // return recipeData;
};
