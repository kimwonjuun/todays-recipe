import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import Loading from '../components/common/Loading';
import IngredientBox from '../components/detail/IngredientBox';
import StepsBox from '../components/detail/StepsBox';
import { RecipeDataState } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';
import useAlert from '../hooks/useAlert';
import AlertModal from '../components/common/AlertModal';
import CommentBox from '../components/detail/CommentBox';
import useUser from '../hooks/useUser';

const Detail = () => {
  // 레시피, 서치, 마이페이지에서 받아온 각 레시피가 가지고 있는 고유한 id
  const { id } = useParams<{ id: string }>();

  // recoil 도입
  const recipeData = useRecoilValue(RecipeDataState);

  // 선택한 레시피를 담아줄 state
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  // 유저 상태 업데이트: useUser hook
  const { user, currentUserUid } = useUser();

  // 전체 레시피와 선택한 레시피의 고유한 id가 같다면 출력
  useEffect(() => {
    const selectedRecipe = recipeData.find(
      (recipe: Recipe) => recipe.id === id
    );
    if (selectedRecipe) {
      setRecipe(selectedRecipe);
    }
  }, [recipeData, id]);

  // custom alert modal
  const {
    openAlert,
    closeAlert,
    isOpen: isAlertOpen,
    alertMessage,
  } = useAlert();

  return (
    <>
      <PageWrapper>
        {!recipe ? (
          <Loading />
        ) : (
          <DetailBoxWrapper>
            <IngredientBox recipe={recipe} />
            <StepsBox recipe={recipe} />
            <CommentBox
              recipe={recipe}
              user={user}
              currentUserUid={currentUserUid}
              id={id}
              openAlert={openAlert}
            />
          </DetailBoxWrapper>
        )}
        <AlertModal
          message={alertMessage}
          isOpen={isAlertOpen}
          onClose={closeAlert}
        />
      </PageWrapper>
    </>
  );
};

export default Detail;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.backGround};
`;

const DetailBoxWrapper = styled.div`
  width: 80rem;
  display: flex;
  flex-direction: column;

  font-size: 1.5rem;
  position: relative;
  margin: 4rem 0;
  overflow: hidden;
`;
