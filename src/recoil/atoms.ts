import { atom } from 'recoil';
import { Recipe } from '../types/Recipe';

export const RecipeDataState = atom<Recipe[]>({
  key: 'recipeDataState',
  default: [],
});

// export const UserDataState = atom([
// key : 'userDataState',
// default: {},

// ]);
