import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { RecipeDataState } from '../recoil/atoms';
import { collection, getDocs } from 'firebase/firestore';
import { dbService } from './firebase';

// 식품의약안전처로부터 받은 데이터
export const fetchRecipes = async () => {
  const serviceKey = process.env.REACT_APP_FOODSAFETYKOREA_API_KEY;
  const urls = [
    `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1/1000`,
    `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1001/2000`,
  ];

  // 각 URL에서 데이터 가져오기 (fetch 실행)
  const responses = await Promise.all(urls.map((url) => fetch(url)));

  // 각 응답에서 JSON 데이터 추출
  const jsonData = await Promise.all(responses.map((res) => res.json()));

  // 두 개의 JSON 데이터를 더하여 전체 레시피정보 반환
  const result = jsonData[0].COOKRCP01.row.concat(jsonData[1].COOKRCP01.row);

  return result;
};

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
