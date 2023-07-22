import { useState, useEffect } from 'react';
import { dbService } from '../apis/firebase';
import { Recipe } from '../pages/Admin';
import { collection, getDocs } from 'firebase/firestore';

const useRecipeData = () => {
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);

  // 파이어베이스에서 Recipe-list 데이터 가져오기
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

  return recipeData;
};
