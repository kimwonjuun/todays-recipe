import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { formatDate } from '../../utils/date';
import { dbService } from '../../api/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

interface CommentListProps {
  commentsList: UserCommentProps[];
  currentUserUid: string | undefined;
  openAlert: (message: string) => void;
}

const CommentList = ({
  commentsList,
  currentUserUid,
  openAlert,
}: CommentListProps) => {
  // 댓글 update
  const [isEditing, setIsEditing] = useState(false);
  const [editTarget, setEditTarget] = useState<UserCommentProps | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

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
    <List>
      {commentsList && commentsList.length > 0 ? (
        commentsList.map((item: UserCommentProps) => (
          <CommentItem key={item.updatedAt}>
            <CommentItemInnerWrapper>
              <UserProfileImg src={item.profilePic} alt="Profile" />
              <CommentContentWrapper>
                <CommentTopContent>
                  <UserName>{item.nickname}</UserName>
                  <UploadedAt>{formatDate(item.updatedAt)}</UploadedAt>
                  {currentUserUid === item.uid && (
                    <>
                      {isEditing && editTarget === item ? (
                        <>
                          <CancelButton
                            onClick={() => {
                              setIsEditing(false);
                              setEditTarget(null);
                            }}
                          >
                            취소
                          </CancelButton>
                          <EditSaveButton onClick={handleCommentUpdate}>
                            완료
                          </EditSaveButton>
                        </>
                      ) : (
                        <>
                          <EditButton
                            onClick={() => {
                              setIsEditing(true);
                              setEditTarget(item);
                              setEditedComment(item.comment);
                            }}
                          >
                            수정
                          </EditButton>
                          <DeleteButton
                            onClick={() => handleCommentDelete(item)}
                          >
                            삭제
                          </DeleteButton>
                        </>
                      )}
                    </>
                  )}
                </CommentTopContent>
                {isEditing && editTarget === item ? (
                  <div>
                    <CommentInput
                      ref={inputRef}
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <CommentUserText style={{ display: 'none' }}>
                      {item.comment}
                    </CommentUserText>
                  </div>
                ) : (
                  <CommentUserText>{item.comment}</CommentUserText>
                )}
              </CommentContentWrapper>
            </CommentItemInnerWrapper>
          </CommentItem>
        ))
      ) : (
        <EmptyCommentsMessage>
          댓글이 없습니다. 첫 댓글을 남겨보세요! 😎
        </EmptyCommentsMessage>
      )}
    </List>
  );
};

export default CommentList;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const UserProfileImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-right: 1rem;
  object-fit: cover;
`;

const CommentInput = styled.input`
  width: 60rem;
  padding: 0.5rem;
  border: none;
  border-bottom: 0.2rem solid ${COLORS.blue2};
  border-radius: 0rem;
  outline: none;
  margin-left: 1rem;
  font-size: 1.25rem;

  &:focus {
    border-color: ${COLORS.blue1};
  }
`;

const CommentItemInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CommentContentWrapper = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const CommentTopContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CommentUserText = styled.div`
  display: flex;
`;

const EmptyCommentsMessage = styled.div`
  margin: 5rem 0 2.5rem 0;
`;

const CommentItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0;
  width: 100%;
`;

const UploadedAt = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
  color: ${COLORS.gray};
`;

const EditButton = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
  color: ${COLORS.gray};
  cursor: pointer;
`;

const DeleteButton = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
  color: ${COLORS.gray};
  cursor: pointer;
`;

const UserName = styled.p`
  font-weight: bold;
  margin-right: 1rem;
`;

const EditSaveButton = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
  color: ${COLORS.gray};
  cursor: pointer;
`;

const CancelButton = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
  color: ${COLORS.gray};
  cursor: pointer;
`;
