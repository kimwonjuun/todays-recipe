import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import Loading from '../components/common/Loading';
import IngredientBox from '../components/detail/IngredientBox';
import StepsBox from '../components/detail/StepsBox';
import { RecipeDataState } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';

const Detail = () => {
  // Recipe/RecipeBox, Search에서 받아온 각 레시피가 가지고 있는 고유한 id
  const { id } = useParams<{ id: string }>();

  // recoil 도입
  const recipeData = useRecoilValue(RecipeDataState);

  // 선택한 레시피를 담아줄 state
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  // 로딩 상태
  const [loading, setLoading] = useState<boolean>(true);

  // 전체 레시피와 선택한 레시피의 고유한 id가 같다면 출력
  useEffect(() => {
    const selectedRecipe = recipeData.find(
      (recipe: Recipe) => recipe.id === id
    );
    if (selectedRecipe) {
      setRecipe(selectedRecipe);
      setLoading(false);
    }
  }, [recipeData]);

  return (
    <>
      <PageWrapper>
        {loading || !recipe ? (
          <Loading />
        ) : (
          <BoxWrapper>
            <IngredientBox recipe={recipe} />
            <StepsBox recipe={recipe} />
            <CommentBox>
              <CommentTitle>댓글</CommentTitle>
              <CommentForm>
                <CommentInput
                  type="text"
                  placeholder="댓글을 입력해주세요..."
                />
                <CommentButton type="submit">댓글 작성</CommentButton>
              </CommentForm>
              <CommentList>
                <CommentItem>
                  <UserName>사용자 이름</UserName>
                  <CommentText>
                    댓글 내용 예시입니다. 여기에 댓글이 표시됩니다.
                  </CommentText>
                </CommentItem>
              </CommentList>
            </CommentBox>
          </BoxWrapper>
        )}
      </PageWrapper>
    </>
  );
};

export default Detail;

const CommentBox = styled.div`
  background-color: #fff;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
  border-radius: 1rem;
  text-align: center;
  padding: 2rem;
`;
const CommentTitle = styled.h2`
  margin-bottom: 1rem;
`;

const CommentForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-bottom: 0.2rem solid ${COLORS.blue2};
  border-radius: 0rem;
  outline: none;
  background: transparent;
  font-size: 1.25rem;

  &:focus {
    border-color: ${COLORS.blue1};
    /* border-bottom: 0.25rem solid ${COLORS.blue1}; */
  }
`;

const CommentButton = styled.button`
  background-color: ${COLORS.blue2};
  font-size: 1.25rem;
  color: #fff;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.blue1};
  }
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CommentItem = styled.li`
  border-bottom: 1px solid ${COLORS.blue1};
  padding: 1rem 0;

  &:last-child {
    border-bottom: none;
  }
`;

const UserName = styled.p`
  font-weight: bold;
`;

const CommentText = styled.p`
  margin: 0;
  padding: 0;
`;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.backGround};
`;

const BoxWrapper = styled.div`
  width: 80rem;
  display: flex;
  flex-direction: column;

  font-size: 1.5rem;
  position: relative;
  margin: 4rem 0;
  overflow: hidden;
`;
