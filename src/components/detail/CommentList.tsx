import React from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { formatDate } from '../../utils/date';

interface CommentListProps {
  commentsList: UserCommentProps[];
  currentUserUid: string | undefined;
  isEditing: boolean;
  editTarget: UserCommentProps | null;
  handleCommentUpdate: () => void;
  handleCommentDelete: (comment: UserCommentProps) => void;
  setIsEditing: (value: boolean) => void;
  setEditTarget: (item: UserCommentProps | null) => void;
  setEditedComment: (comment: string) => void;
  editedComment: string;
}

const CommentList = ({
  commentsList,
  currentUserUid,
  isEditing,
  editTarget,
  handleCommentUpdate,
  handleCommentDelete,
  setIsEditing,
  setEditTarget,
  setEditedComment,
  editedComment,
}: CommentListProps) => {
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
