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

interface RecipeProps {
  recipe: Recipe;
}

// interface ModalTypes {
//   message?: string;
//   onClose?: () => void;
//   alertModal: React.ReactNode;
//   openAlertModal: (message: string) => void;
//   closeAlertModal: () => void;
// }
