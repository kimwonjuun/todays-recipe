import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import Loading from '../components/common/Loading';
import IngredientBox from '../components/detail/IngredientBox';
import StepsBox from '../components/detail/StepsBox';
import { RecipeDataState } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';
import { authService } from '../api/firebase';
import useAlert from '../hooks/useAlert';
import { User } from 'firebase/auth';
import AlertModal from '../components/common/AlertModal';
import CommentBox from '../components/detail/CommentBox';
import useInput from '../hooks/useInput';

const Detail = () => {
  // Recipe/RecipeBox, Search에서 받아온 각 레시피가 가지고 있는 고유한 id
  const { id } = useParams<{ id: string }>();

  // recoil 도입
  const recipeData = useRecoilValue(RecipeDataState);

  // 선택한 레시피를 담아줄 state
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  // 로딩 상태
  const [loading, setLoading] = useState<boolean>(true);

  // 유저
  const [user, setUser] = useState<User | null>(null);
  const currentUserUid = user?.uid ?? undefined;

  useEffect(() => {
    // user 객체 존재 시 setUser 업데이트
    const handleAuthStateChange = authService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    return () => {
      handleAuthStateChange();
    };
  }, []);

  // 전체 레시피와 선택한 레시피의 고유한 id가 같다면 출력
  useEffect(() => {
    const selectedRecipe = recipeData.find(
      (recipe: Recipe) => recipe.id === id
    );
    if (selectedRecipe) {
      setRecipe(selectedRecipe);
      setLoading(false);
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
        {loading || !recipe ? (
          <Loading />
        ) : (
          <BoxWrapper>
            <IngredientBox recipe={recipe} />
            <StepsBox recipe={recipe} />
            <CommentBox
              recipe={recipe}
              user={user}
              currentUserUid={currentUserUid}
              id={id}
              openAlert={openAlert}
            />
          </BoxWrapper>
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

const BoxWrapper = styled.div`
  width: 80rem;
  display: flex;
  flex-direction: column;

  font-size: 1.5rem;
  position: relative;
  margin: 4rem 0;
  overflow: hidden;
`;
