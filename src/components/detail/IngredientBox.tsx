import { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Recipe } from '../../types/Recipe';
import { authService, dbService } from '../../apis/firebase';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';

interface RecipeProps {
  recipe: Recipe;
}

export const IngredientBox = ({ recipe }: RecipeProps) => {
  // 좋아요
  const currentUserUid = authService.currentUser?.uid;
  const [like, setLike] = useState(false);

  const handleLikeButtonClick = async () => {
    // 로그인 체크
    if (!currentUserUid) {
      alert('로그인이 필요합니다.');
      return;
    }
    // !좋아요인 경우
    if (!like) {
      await setDoc(doc(dbService, 'likes', currentUserUid), {
        userId: currentUserUid, // user id
        docId: recipe.id, // filed id
        name: recipe.name, // 레시피명
        type: recipe.type, // 레시피 종류
      });
      setLike(true);
      console.log('좋아요 추가');
      alert('레시피 찜 완료!');
    } else {
      // 이미 좋아요가 되어 있는 상태이면 삭제
      const isLiked = doc(dbService, 'likes', currentUserUid);
      deleteDoc(isLiked);
      // 다시 좋아요할 수 있는 상태
      setLike(false);
      console.log('좋아요 취소');
      alert('찜 목록에서 삭제했어요.');
    }
  };

  // 좋아요 내역 출력하기
  const getLike = async () => {
    if (!currentUserUid) {
      return;
    }
    const docSnap = await getDoc(doc(dbService, 'likes', currentUserUid));
    if (docSnap.exists()) {
      const likeData = docSnap.data();
      if (likeData && likeData.docId === recipe.id) {
        setLike(true);
      }
    }
  };
  useEffect(() => {
    getLike();
  }, [getLike]);

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
                <img src={require('../../assets/heart.png')} />
              ) : (
                <img src={require('../../assets/empty-heart.png')} />
              )}
            </Like>
          </LikeWrapper>
        </CardWrapper>
        <IngredientWrapper>
          <Ingredient>
            <h1>성분</h1>
            <List>
              <Item>
                <img src={require('../../assets/ring1.png')} />
                <ItemText>
                  <p>열량</p>
                  <p>{recipe.calorie}kcal</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/ring2.png')} />
                <ItemText>
                  <p>탄수화물</p>
                  <p>{recipe.carbohydrate}g</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/ring1.png')} />
                <ItemText>
                  <p>단백질</p>
                  <p>{recipe.protein}g</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/ring2.png')} />
                <ItemText>
                  <p>지방</p>
                  <p>{recipe.fat}g</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/ring1.png')} />
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
    </>
  );
};

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  /* gap: 1rem; */
  margin-bottom: 1rem;

  /* background-color: blue; */
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
  /* align-items: center; */
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
  /* margin: 1rem 0; */
  /* display: flex; */
  flex-direction: column;
  /* justify-content: center; */
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

  /* &:nth-child(2) {
    height: 19rem;
  } */

  h1 {
    margin-bottom: 1.5rem;
  }
`;

const List = styled.div`
  width: 100%;
  height: 9rem;

  display: flex;
  justify-content: space-between;

  /* background-color: yellow; */
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
