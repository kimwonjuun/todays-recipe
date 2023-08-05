import { atom } from 'recoil';
import { Recipe } from '../types/Recipe';
import { User } from 'firebase/auth';

export const RecipeDataState = atom<Recipe[]>({
  key: 'recipeDataState',
  default: [],
});

export const UserDataState = atom<User | null>({
  key: 'userDataState',
  default: null,
});
