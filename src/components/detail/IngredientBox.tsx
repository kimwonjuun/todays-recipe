import { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Recipe } from '../../types/Recipe';
import { authService, dbService } from '../../apis/firebase';
import { updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { AlertModal } from '../common/AlertModal';

interface RecipeProps {
  recipe: Recipe;
}

export const IngredientBox = ({ recipe }: RecipeProps) => {
  const user = authService.currentUser;
  const currentUserUid = user?.uid;
  const [like, setLike] = useState(false);

  // 얼럿 모달
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState('');

  // 얼럿 모달 열기
  const openAlertModal = (message: string) => {
    setAlertModalOpen(true);
    setAlertModalMessage(message);
  };

  // 얼럿 모달 닫기
  const closeAlertModal = () => {
    setAlertModalOpen(false);
  };

  // 좋아요
  const handleLikeButtonClick = async () => {
    // 로그인 체크
    if (!currentUserUid) {
      openAlertModal('로그인이 필요합니다.');
      return;
    }

    try {
      // 문서 가져오기
      const userRef = doc(dbService, 'users', currentUserUid);

      // 문서 데이터 가져오기
      const userDoc = await getDoc(userRef);

      // 문서가 존재하면 기존 데이터에 레시피명 추가 또는 삭제
      if (userDoc.exists()) {
        const likes = userDoc.data()['users-likes'] || [];

        if (!like) {
          // 좋아요일 경우
          const updatedLikes = [
            ...likes,
            // RecipeCard에 필요한 정보들
            {
              id: recipe.id,
              type: recipe.type,
              name: recipe.name,
              image: recipe.image,
            },
          ];
          await updateDoc(userRef, { 'users-likes': updatedLikes });
          setLike(true);
          console.log('좋아요 추가');
          openAlertModal('레시피 찜 완료!');
        } else {
          // 좋아요 취소
          const updatedLikes = likes.filter(
            (item: Recipe) => item.name !== recipe.name
          );
          await updateDoc(userRef, { 'users-likes': updatedLikes });
          setLike(false);
          console.log('좋아요 취소');
          openAlertModal('찜 목록에서 삭제했어요.');
        }
      } else {
        // 문서가 존재하지 않으면 새 문서 생성 후 레시피명 추가
        const likes = [recipe.name];
        await setDoc(userRef, { 'users-likes': likes });
        setLike(true);
      }
    } catch (error) {
      console.error('레시피 찜에 실패했습니다.', error);
      openAlertModal('레시피 찜에 실패했습니다.');
    }
  };

  // 디테일 페이지에서 좋아요 내역 출력하기
  const getLike = async () => {
    if (!currentUserUid) {
      return;
    }
    // 문서 가져오기
    const userRef = doc(dbService, 'users', currentUserUid);

    // 문서 데이터 가져오기
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const likes = userDoc.data()['users-likes'] || [];
      if (likes.some((item: Recipe) => item.id === recipe.id)) {
        setLike(true);
      }
    }
  };

  useEffect(() => {
    getLike();
  }, []);

  return (
    <>
      <TopWrapper>
        <CardWrapper>
          <Img>
            <img src={recipe.image} alt={recipe.name} />
          </Img>
          <Title>{recipe.name}</Title>
          <LikeWrapper>
            <Like onClick={handleLikeButtonClick}>
              {like ? (
                <img src={require('../../assets/detail/heart.png')} />
              ) : (
                <img src={require('../../assets/detail/empty-heart.png')} />
              )}
            </Like>
          </LikeWrapper>
        </CardWrapper>
        <IngredientWrapper>
          <Ingredient>
            <h1>성분</h1>
            <List>
              <Item>
                <img src={require('../../assets/detail/ring1.png')} />
                <ItemText>
                  <p>열량</p>
                  <p>{recipe.calorie}kcal</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/detail/ring2.png')} />
                <ItemText>
                  <p>탄수화물</p>
                  <p>{recipe.carbohydrate}g</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/detail/ring1.png')} />
                <ItemText>
                  <p>단백질</p>
                  <p>{recipe.protein}g</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/detail/ring2.png')} />
                <ItemText>
                  <p>지방</p>
                  <p>{recipe.fat}g</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/detail/ring1.png')} />
                <ItemText>
                  <p>나트륨</p>
                  <p>{recipe.sodium}mg</p>
                </ItemText>
              </Item>
            </List>
          </Ingredient>
          <Ingredient>
            <h1>재료</h1>
            <p>{recipe.ingredients}</p>
          </Ingredient>
        </IngredientWrapper>
      </TopWrapper>
      {alertModalOpen && (
        <AlertModal message={alertModalMessage} onClose={closeAlertModal} />
      )}
    </>
  );
};

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CardWrapper = styled.div`
  width: 25rem;
  height: 35rem;
  background-color: #fff;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
  border-radius: 1rem;
  position: relative;
`;

const Img = styled.div`
  width: inherit;
  height: 25rem;
  overflow: hidden;

  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.div`
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const LikeWrapper = styled.div`
  height: 5.5rem;
  display: flex;
  justify-content: center;
`;

const Like = styled.div`
  width: 4.75rem;
  height: 4.75rem;
  cursor: pointer;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const IngredientWrapper = styled.div`
  width: 53.5rem;
  height: 35rem;
  flex-direction: column;
`;

const Ingredient = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: 17rem;
  padding: 1.25rem;
  border-radius: 1rem;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
  &:first-child {
    margin-bottom: 1rem;
  }

  h1 {
    margin-bottom: 1.5rem;
  }
`;

const List = styled.div`
  width: 100%;
  height: 9rem;

  display: flex;
  justify-content: space-between;
`;

const Item = styled.div`
  width: 9rem;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const ItemText = styled.div`
  width: 7.5rem;
  height: 3.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.25rem;

  p {
    margin-bottom: 0.5rem;
  }

  p:last-child {
    font-size: 1.4rem;
    font-weight: bold;
  }
`;
