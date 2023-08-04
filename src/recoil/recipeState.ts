import { atom, selectorFamily } from 'recoil';
import { dbService } from '../apis/firebase';
import { Recipe } from '../types/Recipe';
import { collection, getDocs } from 'firebase/firestore';

export const RecipeDataAtom = atom<Recipe[]>({
  key: 'recipeDataState',
  default: [],
});

export const UserDataAtom = atom<Recipe[]>({
  key: 'userDataState',
  default: [],
});

// export const fetchRecipeData = selectorFamily<Recipe[], null>({
//   key: 'fetchRecipeData',
//   get:
//     () =>
//     async ({ get }) => {
//       // 이전 값 확인: 캐싱된 데이터가 있는 경우 사용
//       const previousData = get(RecipeDataAtom);
//       if (previousData.length > 0) {
//         return previousData;
//       }

//       // 파이어베이스에서 Recipe-list 데이터 가져오기
//       const querySnapshot = await getDocs(collection(dbService, 'recipe-list'));
//       const recipeDataBase: Recipe[] = [];

//       querySnapshot.forEach((doc) => {
//         const newRecipe: any = {
//           id: doc.id,
//           ...doc.data(),
//         };
//         recipeDataBase.push(newRecipe);
//       });

//       return recipeDataBase;
//     },
// });
