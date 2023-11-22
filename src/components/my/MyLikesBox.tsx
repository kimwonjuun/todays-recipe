import styled from 'styled-components';
import RecipeCard from '../common/RecipeCard';
import { getMyLikedRecipes } from '../../apis/my/likes';
import { useQuery } from 'react-query';

interface MyLikesBoxProps {
  currentUserUid: string | undefined;
}

const MyLikesBox = ({ currentUserUid }: MyLikesBoxProps) => {
  // 좋아요 read API
  const { data: likedRecipes, isLoading } = useQuery({
    queryKey: ['likedRecipes', currentUserUid],
    queryFn: () => getMyLikedRecipes(currentUserUid),
    enabled: !!currentUserUid,
  });

  return (
    <>
      <MyLikesWrapper>
        <MyLikes>
          {isLoading ? (
            <p>찜한 레시피를 불러오는 중 😎</p>
          ) : likedRecipes.length > 0 ? (
            likedRecipes.map((recipe: Recipe) => (
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
