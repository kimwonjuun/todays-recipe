import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { dbService } from '../firebase';

interface addIngredientProps {
  currentUserUid: string | undefined;
  inputValue: string;
}

interface deleteIngredientProps {
  currentUserUid: string | undefined;
  ingredient: string;
}

// 재료 create
export const addIngredient = async ({
  currentUserUid,
  inputValue,
}: addIngredientProps) => {
  if (!currentUserUid || !inputValue.trim()) {
    throw new Error('유저 정보가 없거나 입력값이 비어있습니다.');
  }

  // 문서 참조
  const userRef = doc(dbService, 'users', currentUserUid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const ingredients = userDoc.data()['user-ingredients'] || [];

    if (ingredients.length >= 20) {
      throw new Error('냉장고에는 최대 20개의 재료만 추가할 수 있습니다.');
    }

    if (!ingredients.includes(inputValue)) {
      ingredients.push(inputValue);
    } else {
      throw new Error('이미 등록된 재료입니다.');
    }

    await updateDoc(userRef, { 'user-ingredients': ingredients });
  }

  if (!userDoc.exists()) {
    // 문서가 존재하지 않으면 새 문서를 생성 후 재료 추가
    const ingredients = [inputValue];

    await setDoc(userRef, { 'user-ingredients': ingredients });
  }
};

// 재료 read
export const getIngredient = async (currentUserUid: string) => {
  if (!currentUserUid) {
    return [];
  }

  // users 컬렉션 참조
  const usersRef = collection(dbService, 'users');
  const querySnapshot = await getDocs(usersRef);

  let ingredientsList: any[] = [];

  querySnapshot.forEach((doc) => {
    if (doc.id === currentUserUid) {
      const userData = doc.data();
      const userIngredients = userData['user-ingredients'] || [];

      userIngredients.forEach((ingredient: string) => {
        ingredientsList.push(ingredient);
      });
    }
  });

  return ingredientsList;
};

// 재료 delete
export const deleteIngredient = async ({
  currentUserUid,
  ingredient,
}: deleteIngredientProps) => {
  if (!currentUserUid) {
    throw new Error('유저 정보가 없습니다.');
  }

  // users 컬렉션 참조
  const userRef = doc(dbService, 'users', currentUserUid);
  const userDoc = await getDoc(userRef);

  const ingredients = userDoc.data()?.['user-ingredients'] || [];

  // 선택한 재료 필터링
  const updatedIngredients = ingredients.filter(
    (item: string) => item !== ingredient
  );

  // 선택한 재료만 필터링 후 업데이트
  await updateDoc(userRef, { 'user-ingredients': updatedIngredients });
};
