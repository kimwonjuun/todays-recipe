import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { authService, dbService } from '../../api/firebase';
import { updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import useAlert from '../../hooks/useAlert';
import AlertModal from '../common/AlertModal';

const IngredientBox = ({ recipe }: RecipeProps) => {
  const [user, setUser] = useState<User | null>(null);
  const currentUserUid = user?.uid ?? undefined;
  const [like, setLike] = useState<boolean | null>(null);

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

  // custom modal
  const {
    openAlert,
    closeAlert,
    isOpen: isAlertOpen,
    alertMessage,
  } = useAlert();

  // 레시피 찜
  const handleLikeButtonClick = async () => {
    // 로그인 체크
    if (!currentUserUid) {
      openAlert('로그인이 필요합니다.');
      return;
    }

    try {
      // 문서 가져오기
      const userRef = doc(dbService, 'users', currentUserUid);

      // 문서 데이터 가져오기
      const userDoc = await getDoc(userRef);

      // 문서가 존재하면 기존 데이터에 레시피명 추가 또는 삭제
      if (userDoc.exists()) {
        const likes = userDoc.data()['user-likes'] || [];

        if (!like) {
          // 레시피 찜
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
          await updateDoc(userRef, { 'user-likes': updatedLikes });
          setLike(true);
          openAlert('레시피 찜 완료!');
        } else {
          // 레시피 찜 취소
          const updatedLikes = likes.filter(
            (item: Recipe) => item.name !== recipe.name
          );
          await updateDoc(userRef, { 'user-likes': updatedLikes });
          setLike(false);
          openAlert('찜 목록에서 삭제했어요.');
        }
      } else {
        // 문서가 존재하지 않으면 새 문서 생성 후 레시피명 추가
        const likes = [
          {
            id: recipe.id,
            type: recipe.type,
            name: recipe.name,
            image: recipe.image,
          },
        ];
        await setDoc(userRef, { 'user-likes': likes });
        setLike(true);
        openAlert('레시피 찜 완료!');
      }
    } catch (error) {
      console.error('레시피 찜에 실패했습니다.', error);
      openAlert('레시피 찜에 실패했습니다.');
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
      const likes = userDoc.data()['user-likes'] || [];
      if (likes.some((item: Recipe) => item.id === recipe.id)) {
        setLike(true);
      } else {
        setLike(false);
      }
    }
  };

  useEffect(() => {
    if (currentUserUid) {
      getLike();
    }
  }, [currentUserUid]);

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
      <AlertModal
        message={alertMessage}
        isOpen={isAlertOpen}
        onClose={closeAlert}
      />
    </>
  );
};

export default IngredientBox;

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
