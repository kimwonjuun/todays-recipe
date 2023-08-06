import { atom } from 'recoil';
import { Recipe } from '../types/Recipe';
import { User } from 'firebase/auth';

export const RecipeDataState = atom<Recipe[]>({
  key: 'recipeDataState',
  default: [],
});

export const UserState = atom<User | null>({
  key: 'UserState',
  default: null,
});
