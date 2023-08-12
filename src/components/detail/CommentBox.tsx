import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { User } from 'firebase/auth';
import { dbService } from '../../apis/firebase';
import {
  updateDoc,
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface UserCommentProps {
  uid: string;
  nickname: string;
  profilePic: string;
  name: string;
  id: string;
  comment: string;
  updatedAt: number;
}

interface CommentBoxProps {
  recipe: Recipe;
  user: User | null;
  currentUserUid: string | undefined;
  id: string | undefined;
  openAlert: (message: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const CommentBox = ({
  user,
  currentUserUid,
  recipe,
  id,
  openAlert,
  inputValue,
  setInputValue,
}: CommentBoxProps) => {
  // 댓글 리스트
  const [commentsList, setCommentsList] = useState<any>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 댓글 create
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!currentUserUid) {
        openAlert('댓글은 로그인 후 작성이 가능합니다.');
        return;
      }

      if (!inputValue || !inputValue.trim()) {
        openAlert('댓글을 입력해주세요.');
        return;
      }

      // 문서 가져오기
      const userDocRef = doc(dbService, 'users', currentUserUid);

      // 문서 데이터 가져오기
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      // 댓글 객체를 생성
      const newComment = {
        uid: currentUserUid,
        nickname: user?.displayName,
        profilePic: user?.photoURL,
        name: recipe?.name,
        id: recipe?.id,
        comment: inputValue,
        updatedAt: Date.now(),
      };

      // 'user-comments' 필드에 존재하는 배열에 새 댓글을 추가하고 문서 업데이트
      if (userData) {
        const userComments = userData['user-comments'] ?? [];
        await updateDoc(userDocRef, {
          'user-comments': [...userComments, newComment],
        });
      } else {
        // 문서가 존재하지 않으면 새 문서를 생성 후 댓글 추가
        const newUserDoc = {
          'user-comments': [newComment],
        };

        await setDoc(userDocRef, newUserDoc);
      }
      setInputValue('');
    } catch (error) {
      console.error('댓글 저장에 실패했습니다.', error);
    }
  };

  // 댓글 read
  const getComments = () => {
    // users 컬렉션 참조
    const usersRef = collection(dbService, 'users');

    // users 컬렉션을 돌며 user-comments에 저장된 댓글 중 레시피 id와 일치하는 댓글을 comments에 추가
    onSnapshot(usersRef, (querySnapshot) => {
      const comments: UserCommentProps[] = [];

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const userComments = userData['user-comments'] || [];

        userComments.forEach((comment: any) => {
          if (comment.id === id) {
            comments.push(comment);
          }
        });
      });

      // 댓글 업데이트 시간 순 정렬
      comments.sort((a, b) => a.updatedAt - b.updatedAt);
      setCommentsList(comments);
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  // 댓글 update
  const [isEditing, setIsEditing] = useState(false);
  const [editTarget, setEditTarget] = useState<UserCommentProps | null>(null);

  // 수정 대상 댓글
  const [editedComment, setEditedComment] = useState(''); // 수정된 댓글

  const handleCommentEdit = async (comment: UserCommentProps) => {
    try {
      if (!currentUserUid) {
        openAlert('로그인 후 댓글을 수정할 수 있습니다.');
        return;
      }

      // 문서 가져오기
      const userDocRef = doc(dbService, 'users', currentUserUid);

      // 문서 데이터 가져오기
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (userData) {
        const userComments = userData['user-comments'] ?? [];
        const updatedComments = userComments.map((item: UserCommentProps) =>
          item.updatedAt === comment.updatedAt
            ? { ...item, comment: editedComment }
            : item
        );

        // 'user-comments' 필드의 배열에서 수정된 댓글로 업데이트
        await updateDoc(userDocRef, { 'user-comments': updatedComments });

        // 수정 상태 변경
        setIsEditing(false);
      }
    } catch (error) {
      console.error('댓글 수정 실패', error);
    }
  };
  const handleCommentUpdate = async () => {
    if (editTarget) {
      await handleCommentEdit(editTarget);
    }
  };

  // 댓글 delete
  const handleCommentDelete = async (comment: UserCommentProps) => {
    try {
      if (!currentUserUid) {
        openAlert('로그인 후 댓글을 삭제할 수 있습니다.');
        return;
      }

      // 문서 가져오기
      const userDocRef = doc(dbService, 'users', currentUserUid);

      // 문서 데이터 가져오기
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (userData) {
        const userComments = userData['user-comments'] ?? [];
        const updatedComments = userComments.filter(
          (item: UserCommentProps) => item.updatedAt !== comment.updatedAt
        );

        // 'user-comments' 필드의 배열에서 삭제된 댓글을 제거한 후 문서 업데이트
        await updateDoc(userDocRef, { 'user-comments': updatedComments });

        openAlert('댓글이 삭제되었습니다.');
      }
    } catch (error) {
      console.error('댓글 삭제 실패', error);
    }
  };

  return (
    <>
      <BottomWrapper>
        <CommentTitle>{commentsList.length} 개의 댓글</CommentTitle>
        <CommentForm
          user={user}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSubmit={handleCommentSubmit}
        />
        <CommentList
          commentsList={commentsList}
          currentUserUid={currentUserUid}
          isEditing={isEditing}
          editTarget={editTarget}
          handleCommentUpdate={handleCommentUpdate}
          handleCommentDelete={handleCommentDelete}
          setIsEditing={setIsEditing}
          setEditTarget={setEditTarget}
          setEditedComment={setEditedComment}
          editedComment={editedComment}
        />
      </BottomWrapper>
    </>
  );
};

export default CommentBox;

const BottomWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
  border-radius: 1rem;
  text-align: center;
  padding: 2.5rem;
`;

const CommentTitle = styled.h2`
  margin-bottom: 1rem;
`;
