import styled from 'styled-components';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from '../../apis/firebase';
import RecipeCard from '../common/RecipeCard';
import { useEffect, useState } from 'react';

interface MyLikesBoxProps {
  currentUserUid: string | undefined;
}

const MyLikesBox = ({ currentUserUid }: MyLikesBoxProps) => {
  // 내가 찜한 레시피
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 내가 찜한 레시피 불러오기
  const getMyLikedRecipes = async () => {
    if (!currentUserUid) {
      return;
    }
    setIsLoading(true);

    // 문서 참조
    const docSnap = await getDoc(doc(dbService, 'users', currentUserUid));

    // 문서 존재 시 레시피 상태 업데이트
    if (docSnap.exists()) setLikedRecipes(docSnap.data()['user-likes']);

    setIsLoading(false);
  };
  useEffect(() => {
    getMyLikedRecipes();
  }, [currentUserUid]);

  return (
    <>
      <MyLikesWrapper>
        <MyLikes>
          {isLoading ? (
            <p>찜한 레시피를 불러오는 중 😎</p>
          ) : likedRecipes.length > 0 ? (
            likedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p>아직 보관한 레시피가 없습니다! 🫤</p>
          )}
        </MyLikes>
      </MyLikesWrapper>
    </>
  );
};

export default MyLikesBox;

const MyLikesWrapper = styled.div`
  width: 70rem;
  height: 35rem;
  display: flex;
  justify-content: center;
  overflow-y: auto;
`;

const MyLikes = styled.div`
  width: 70rem;
  display: flex;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  padding: 0 1.25rem;

  > p {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
