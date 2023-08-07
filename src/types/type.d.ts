// 초기 호출한 데이터의 타입
interface Recipe {
  id: string;
  image: string;
  name: string;
  type: string;
  calorie: string;
  carbohydrate: string;
  protein: string;
  fat: string;
  sodium: string;
  ingredients: string;
  tip: string;
  make: Array<string>;
  makeImage: Array<string>;
}

// 필터링을 거쳐 하위 컴포넌트로 내려가는 레시피의 타입
interface RecipeProps {
  recipe: Recipe;
}
