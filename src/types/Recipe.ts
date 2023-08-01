// types/Recipe.ts
export interface Recipe {
  id: string;
  image: string;
  name: string;
  type: string;
  calorie: string;
  carbohydrate: string | null;
  protein: string | null;
  fat: string | null;
  sodium: string | null;
  ingredients: string;
  tip: string;
  make: Array<string>;
  makeImage: Array<string>;
}
