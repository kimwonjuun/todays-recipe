import { useEffect } from 'react';
import { dbService } from '../api/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { RecipeDataState } from '../recoil/atoms';
import { useSetRecoilState } from 'recoil';

// 파이어스토어로부터 내가 가공한 데이터 가져오는 훅
const useRecipeData = () => {
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

export default useRecipeData;
