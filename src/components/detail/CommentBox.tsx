import styled from 'styled-components';
import { User } from 'firebase/auth';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import useInput from '../../hooks/useInput';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { addComment, getComment } from '../../apis/detail/detail';

interface CommentBoxProps {
  recipe: Recipe;
  user: User | null;
  currentUserUid: string | undefined;
  id: string | undefined;
  openAlert: (message: string) => void;
}

const CommentBox = ({
  recipe,
  user,
  currentUserUid,
  id,
  openAlert,
}: CommentBoxProps) => {
  const queryClient = useQueryClient();

  // 댓글 인풋: useInput
  const { inputValue, setInputValue, handleInputChange } = useInput('');

  // 댓글 create API
  const addCommentMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['userComments', id]);
      setInputValue('');
    },
    onError: () => {
      openAlert('댓글 저장에 실패했습니다.');
    },
  });

  // 댓글 create 버튼
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 제출 중이면 반환하여 중복 제출 방지
    if (addCommentMutation.isLoading) {
      return;
    }

    if (!currentUserUid) {
      openAlert('댓글은 로그인 후 작성이 가능합니다.');
      return;
    }

    if (!inputValue || !inputValue.trim()) {
      openAlert('댓글을 입력해주세요.');
      return;
    }

    addCommentMutation.mutate({
      currentUserUid,
      user,
      recipe,
      inputValue,
    });
  };

  // 댓글 read API
  const { data: commentsList } = useQuery({
    queryKey: ['userComments', id],
    queryFn: () => getComment(id),
    enabled: !!id,
  });

  return (
    <>
      <BottomWrapper>
        <CommentTitle>
          {commentsList && commentsList.length}개의 댓글
        </CommentTitle>
        <CommentForm
          user={user}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSubmit={handleCommentSubmit}
        />
        <CommentList
          commentsList={commentsList || []}
          currentUserUid={currentUserUid}
          id={id}
          openAlert={openAlert}
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
