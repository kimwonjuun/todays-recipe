import { User } from 'firebase/auth';
import {
  getDoc,
  updateDoc,
  setDoc,
  doc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { dbService } from '../firebase';

interface addCommentProps {
  currentUserUid: string;
  user: User | null;
  recipe: Recipe;
  inputValue: string;
}

interface updateCommentProps {
  currentUserUid: string;
  editedComment: string;
  targetUpdatedAt: number | undefined;
}

interface deleteCommentProps {
  currentUserUid: string;
  targetUpdatedAt: number | undefined;
}

// 댓글 create
export const addComment = async ({
  currentUserUid,
  user,
  recipe,
  inputValue,
}: addCommentProps) => {
  // users 컬렉션의 참조
  const userDocRef = doc(dbService, 'users', currentUserUid);
  // 현재 사용자의 문서 데이터 가져오기
  const userDoc = await getDoc(userDocRef);
  // 댓글 객체 생성
  const newComment = {
    id: recipe?.id,
    uid: currentUserUid,
    nickname: user?.displayName,
    profilePic: user?.photoURL,
    name: recipe?.name,
    comment: inputValue,
    updatedAt: Date.now(),
  };

  if (userDoc.exists()) {
    // 'user-comments' 필드에 존재하는 배열에 새 댓글 추가하고 문서 업데이트
    const userData = userDoc.data();
    const userComments = userData['user-comments'] ?? [];
    await updateDoc(userDocRef, {
      'user-comments': [...userComments, newComment],
    });
  }
  if (!userDoc.exists()) {
    // 문서가 존재하지 않으면 새 문서 생성 후 댓글 추가
    await setDoc(userDocRef, { 'user-comments': [newComment] });
  }
  return newComment;
};

// 댓글 read
export const getComment = async (id: string | undefined) => {
  // users 컬렉션 참조
  const usersRef = collection(dbService, 'users');
  const querySnapshot = await getDocs(usersRef);

  let comments: UserCommentProps[] = [];

  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    const userComments = userData['user-comments'] || [];

    userComments.forEach((comment: UserCommentProps) => {
      if (comment.id === id) {
        comments.push(comment);
      }
    });
  });

  // 댓글 업데이트 시간 순 정렬
  comments.sort((a, b) => a.updatedAt - b.updatedAt);

  return comments;
};

// 댓글 update
export const updateComment = async ({
  currentUserUid,
  editedComment,
  targetUpdatedAt,
}: updateCommentProps) => {
  // users 컬렉션의 참조
  const userDocRef = doc(dbService, 'users', currentUserUid);
  // 현재 사용자의 문서 데이터 가져오기
  const userDoc = await getDoc(userDocRef);
  const userData = userDoc.data();

  if (userData) {
    const userComments = userData['user-comments'] ?? [];
    const updatedComments = userComments.map((item: UserCommentProps) =>
      item.updatedAt === targetUpdatedAt
        ? { ...item, comment: editedComment }
        : item
    );
    // "user-comments" 필드의 배열에서 수정된 댓글로 업데이트
    return updateDoc(userDocRef, { 'user-comments': updatedComments });
  }
};

// 댓글 delete
export const deleteComment = async ({
  currentUserUid,
  targetUpdatedAt,
}: deleteCommentProps) => {
  // 문서 참조
  const userDocRef = doc(dbService, 'users', currentUserUid);
  // 현재 사용자의 문서 데이터 가져오기
  const userDoc = await getDoc(userDocRef);
  const userData = userDoc.data();

  if (userData) {
    const userComments = userData['user-comments'] ?? [];
    // 선택한 댓글 필터링
    const updatedComments = userComments.filter(
      (item: UserCommentProps) => item.updatedAt !== targetUpdatedAt
    );
    // 'user-comments' 필드의 배열에서 선택한 댓글만 필터링 후 업데이트
    return updateDoc(userDocRef, { 'user-comments': updatedComments });
  }
};
