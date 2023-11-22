import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { dbService } from '../../apis/firebase';
import { updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import useAlert from '../../hooks/useAlert';
import AlertModal from '../common/AlertModal';
import useUser from '../../hooks/useUser';

const IngredientBox = ({ recipe }: RecipeProps) => {
  // 유저 상태 업데이트: useUser hook
  const { user, currentUserUid } = useUser();

  // 좋아요 상태
  const [like, setLike] = useState<boolean | null>(null);

  // custom alert modal
  const {
    openAlert,
    closeAlert,
    isOpen: isAlertOpen,
    alertMessage,
  } = useAlert();

  // 레시피 찜
  const handleLikeButtonClick = () => {
    // 로그인 체크
    if (!currentUserUid) {
      openAlert('로그인이 필요합니다.');
      return;
    }

    // 문서 참조
    const userRef = doc(dbService, 'users', currentUserUid);

    // 문서 데이터 가져오기
    getDoc(userRef)
      .then((userDoc) => {
        // 문서가 존재하면 기존 데이터에 레시피명 추가 또는 삭제
        if (userDoc.exists()) {
          const likes = userDoc.data()['user-likes'] || [];

          if (!like) {
            // 레시피 찜
            const updatedLikes = [
              ...likes,
              // 마이페이지 RecipeCard 출력에 필요한 정보들
              {
                id: recipe.id,
                type: recipe.type,
                name: recipe.name,
                image: recipe.image,
              },
            ];
            return updateDoc(userRef, { 'user-likes': updatedLikes });
          } else {
            // 레시피 찜 취소
            const updatedLikes = likes.filter(
              (item: any) => item.name !== recipe.name
            );
            return updateDoc(userRef, { 'user-likes': updatedLikes });
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
          return setDoc(userRef, { 'user-likes': likes });
        }
      })
      .then(() => {
        setLike(!like);
        openAlert(like ? '찜 목록에서 삭제했어요.' : '레시피 찜 완료!');
      })
      .catch((error) => {
        openAlert('레시피 찜에 실패했습니다.');
      });
  };

  // 디테일 페이지에서 좋아요 내역 출력하기
  const getLike = async () => {
    if (!currentUserUid) {
      return;
    }
    // 문서 참조
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
          <Title fontSize={recipe.name.length >= 22 ? '1.25rem' : '1.5rem'}>
            {recipe.name}
          </Title>
          <LikeWrapper>
            <Like onClick={handleLikeButtonClick}>
              {like ? (
                <img
                  src={require('../../assets/detail/heart.webp')}
                  alt="like button"
                />
              ) : (
                <img
                  src={require('../../assets/detail/empty-heart.webp')}
                  alt="unlike button"
                />
              )}
            </Like>
          </LikeWrapper>
        </CardWrapper>
        <IngredientWrapper>
          <Ingredient>
            <h1>성분</h1>
            <List>
              <Item>
                <img
                  src={require('../../assets/detail/ring1.webp')}
                  alt="ingredients ring"
                />
                <ItemText>
                  <p>열량</p>
                  <p>{recipe.calorie}kcal</p>
                </ItemText>
              </Item>
              <Item>
                <img
                  src={require('../../assets/detail/ring2.webp')}
                  alt="ingredients ring"
                />
                <ItemText>
                  <p>탄수화물</p>
                  <p>{recipe.carbohydrate}g</p>
                </ItemText>
              </Item>
              <Item>
                <img
                  src={require('../../assets/detail/ring1.webp')}
                  alt="ingredients ring"
                />
                <ItemText>
                  <p>단백질</p>
                  <p>{recipe.protein}g</p>
                </ItemText>
              </Item>
              <Item>
                <img
                  src={require('../../assets/detail/ring2.webp')}
                  alt="ingredients ring"
                />
                <ItemText>
                  <p>지방</p>
                  <p>{recipe.fat}g</p>
                </ItemText>
              </Item>
              <Item>
                <img
                  src={require('../../assets/detail/ring1.webp')}
                  alt="ingredients ring"
                />
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

  @media (max-width: 675px) {
    width: 30rem;
  }
`;

const CardWrapper = styled.div`
  width: 25rem;
  height: 35rem;
  background-color: #fff;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
  border-radius: 1rem;
  position: relative;

  @media (max-width: 1300px) {
    width: 20rem;
    height: 27.5rem;
  }
  @media (max-width: 1150px) {
    width: 16rem;
    height: 20rem;
  }
  @media (max-width: 850px) {
    width: 12rem;
    height: 18rem;
  }
  @media (max-width: 675px) {
    width: 8rem;
    height: 12rem;
  }
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

  @media (max-width: 1300px) {
    height: 20rem;
  }
  @media (max-width: 1150px) {
    height: 14rem;
  }
  @media (max-width: 850px) {
    height: 12rem;
  }
  @media (max-width: 675px) {
    height: 8rem;
  }
`;

const Title = styled.div<{ fontSize: string }>`
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.fontSize};
  font-weight: bold;

  @media (max-width: 1300px) {
    height: 3.5rem;
  }
  @media (max-width: 1150px) {
    height: 2.5rem;
    font-size: 1rem;
  }
  @media (max-width: 675px) {
    height: 1.75rem;
    font-size: 0.75rem;
  }
`;

const LikeWrapper = styled.div`
  height: 5.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1300px) {
    height: 4rem;
  }
  @media (max-width: 1150px) {
    height: 3.5rem;
  }
  @media (max-width: 675px) {
    height: 2.25rem;
  }
`;

const Like = styled.div`
  width: 4.75rem;
  height: 4.75rem;
  cursor: pointer;

  & > img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1300px) {
    width: 3rem;
    height: 3rem;
  }
  @media (max-width: 1150px) {
    width: 2rem;
    height: 2rem;
  }
  @media (max-width: 675px) {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

const IngredientWrapper = styled.div`
  width: 53.5rem;
  height: 35rem;
  flex-direction: column;

  @media (max-width: 1300px) {
    width: 47.5rem;
    height: 27.5rem;
  }
  @media (max-width: 1150px) {
    width: 42.5rem;
    height: 20rem;
  }
  @media (max-width: 1000px) {
    width: 32.5rem;
    height: 20rem;
  }
  @media (max-width: 850px) {
    width: 27rem;
    height: 16rem;
  }
  @media (max-width: 675px) {
    width: 20rem;
    height: 12rem;
  }
`;

const Ingredient = styled.div`
  width: inherit;
  height: 17rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

  @media (max-width: 1300px) {
    height: 13.25rem;
  }
  @media (max-width: 1150px) {
    height: 9.5rem;
    font-size: 1rem;
    h1 {
      margin-bottom: 1.25rem;
    }
  }
  @media (max-width: 850px) {
    height: 8.5rem;
    h1 {
      margin-bottom: 1.25rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
  @media (max-width: 675px) {
    font-size: 0.75rem;
    height: 5.5rem;
    h1 {
      margin-bottom: 0.6rem;
    }
    p {
      font-size: 0.6rem;
    }
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

  @media (max-width: 1150px) {
    width: 6rem;
  }
  @media (max-width: 675px) {
    width: 3rem;
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

  @media (max-width: 1150px) {
    width: 5rem;
    height: 2.5rem;
    font-size: 0.9rem;

    p {
      margin-bottom: 0.25rem;
    }
    p:last-child {
      font-size: 1.1rem;
      font-weight: bold;
    }
  }
  @media (max-width: 850px) {
    width: 3rem;
    height: 2.5rem;

    p {
      margin-bottom: 0.25rem;
    }
    p:last-child {
      font-size: 0.85rem;
      font-weight: bold;
    }
  }
  @media (max-width: 675px) {
    width: 2rem;
    height: 1.5rem;
    font-size: 0.75rem;

    p {
      font-size: 0.55rem;
      margin-bottom: 0.15rem;
    }
    p:last-child {
      font-size: 0.55rem;
      font-weight: bold;
    }
  }
`;
