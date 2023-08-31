import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from '../apis/firebase';

// 냉장고에 넣은 재료들이 필요한 페이지에 사용할 훅

const useMyIngredients = (currentUserUid?: string) => {
  // 나의 냉장고에 입력한 재료들
  const [myIngredients, setMyIngredients] = useState<string[]>([]);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 내가 입력한 재료 출력
  const getMyIngredients = async () => {
    if (!currentUserUid) {
      return;
    }
    setIsLoading(true);

    // 문서 참조
    const docSnap = await getDoc(doc(dbService, 'users', currentUserUid));

    // 문서 존재 시 재료 상태 업데이트
    if (docSnap.exists()) setMyIngredients(docSnap.data()['user-ingredients']);
    setIsLoading(false);
  };

  useEffect(() => {
    getMyIngredients();
  }, [currentUserUid]);

  return { myIngredients, getMyIngredients, isLoading };
};

export default useMyIngredients;
