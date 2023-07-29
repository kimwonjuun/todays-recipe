import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Recipe } from '../../types/Recipe';
import { authService, dbService } from '../../apis/firebase';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';

interface RecipeProps {
  recipe: Recipe;
}

export const IngredientBox = ({ recipe }: RecipeProps) => {
  const navigate = useNavigate();

  // 재료 정규식
  const ingredients = recipe.RCP_PARTS_DTLS.replace('재료', '')
    .replace('[소스소개', '')
    .split(',')
    .join(', ');

  // 좋아요
  const currentUserUid = authService.currentUser?.uid;
  const [like, setLike] = useState(false);
  const handleLikeButtonClick = async () => {
    // 로그인 체크
    if (!currentUserUid) {
      alert('로그인이 필요합니다.');
      return;
    }

    // 북마크가 체크되어있지 않다면?
    if (!like) {
      await setDoc(doc(dbService, 'likes', currentUserUid), {
        userId: currentUserUid, // user id
        docId: recipe.RCP_SEQ, // filed id
        RCP_NM: recipe.RCP_NM, // 레시피명
        RCP_PAT2: recipe.RCP_PAT2, // 레시피 종류
      });

      // true가 되면서 북마크 더이상 못하게 막기
      setLike(true);
      console.log('좋아요 추가');
    } else {
      // 이미 좋아요가 되어 있는 상태이면 삭제
      const isLiked = doc(dbService, 'likes', currentUserUid);
      deleteDoc(isLiked);
      // 다시 좋아요할 수 있는 상태
      setLike(false);
      console.log('좋아요 취소');
    }
  };

  return (
    <>
      <TopWrapper>
        <CardWrapper>
          <Img>
            <img src={recipe.ATT_FILE_NO_MK} alt={recipe.RCP_NM} />
          </Img>
          <Title>{recipe.RCP_NM}</Title>
          <LikeWrapper>
            <Like onClick={handleLikeButtonClick}>
              <img src={require('../../assets/empty-heart.png')} />
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
                  <p>{recipe.INFO_ENG}kcal</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/ring2.png')} />
                <ItemText>
                  <p>탄수화물</p>
                  <p>{recipe.INFO_CAR}g</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/ring1.png')} />
                <ItemText>
                  <p>단백질</p>
                  <p>{recipe.INFO_PRO}g</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/ring2.png')} />
                <ItemText>
                  <p>지방</p>
                  <p>{recipe.INFO_FAT}g</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/ring1.png')} />
                <ItemText>
                  <p>나트륨</p>
                  <p>{recipe.INFO_NA} mg</p>
                </ItemText>
              </Item>
            </List>
          </Ingredient>
          <Ingredient>
            <h1>재료</h1>
            <p>{ingredients}</p>
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
  font-size: 1.75rem;
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
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
