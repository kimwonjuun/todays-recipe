import { doc, getDoc } from 'firebase/firestore';
import { dbService } from '../firebase';

// 좋아요 read
export const getMyLikedRecipes = async (currentUserUid: string | undefined) => {
  if (!currentUserUid) {
    return [];
  }
  // 문서 참조
  const docSnap = await getDoc(doc(dbService, 'users', currentUserUid));
  // 문서 존재 시 레시피 반환
  return docSnap.exists() ? docSnap.data()['user-likes'] : [];
};
