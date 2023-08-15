import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { dbService } from '../../api/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import RecipeCard from '../common/RecipeCard';
import MyRefrigeratorBox from './MyRefrigeratorBox';

interface UserAccountBoxProps {
  currentUserUid: string | undefined;
}

const UserAccountBox = ({ currentUserUid }: UserAccountBoxProps) => {
  // 내가 찜한 레시피
  const [likedRecipes, setLikedRecipes] = useState([]);

  // 탭
  const [currentTab, setCurrentTab] = useState<string>('나의 냉장고');
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };

  // 내가 찜한 레시피 불러오기
  const getMyLikedRecipes = async () => {
    if (!currentUserUid) {
      return;
    }
    const docSnap = await getDoc(doc(dbService, 'users', currentUserUid));
    if (docSnap.exists()) {
      const likedRecipesData = docSnap.data();
      if (likedRecipesData && likedRecipesData['user-likes']) {
        setLikedRecipes(likedRecipesData['user-likes']);
      }
    }
  };
  useEffect(() => {
    getMyLikedRecipes();
  }, [currentUserUid]);

  return (
    <>
      <UserAccounttWrapper>
        <UserItem>
          <CategoriesWrapper>
            <Category
              onClick={() => handleTabChange('나의 냉장고')}
              data-is-selected={currentTab === '나의 냉장고'}
            >
              나의 냉장고
            </Category>
            <Category
              onClick={() => handleTabChange('찜한 레시피')}
              data-is-selected={currentTab === '찜한 레시피'}
            >
              찜한 레시피
            </Category>
          </CategoriesWrapper>
          {currentTab === '나의 냉장고' && (
            <MyRefrigeratorBox currentUserUid={currentUserUid} />
          )}
          {currentTab === '찜한 레시피' && (
            <MyLikesWrapper>
              <MyLikes>
                {likedRecipes.length > 0 ? (
                  likedRecipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                  ))
                ) : (
                  <p>아직 보관한 레시피가 없습니다! 🫤</p>
                )}
              </MyLikes>
            </MyLikesWrapper>
          )}
        </UserItem>
      </UserAccounttWrapper>
    </>
  );
};

export default UserAccountBox;

const UserAccounttWrapper = styled.div`
  width: 75rem;
  height: 40rem;

  background-color: #fff;
  border-radius: 1rem;

  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.5rem;
`;

const UserItem = styled.div`
  width: 70rem;
  height: 35rem;

  display: flex;
  flex-direction: column;
`;

const CategoriesWrapper = styled.div`
  height: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const FormWarpper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Category = styled.div<{ 'data-is-selected': boolean }>`
  position: relative;
  height: 2rem;
  cursor: pointer;
  color: ${({ 'data-is-selected': isSelected }) =>
    isSelected ? COLORS.blue2 : 'inherit'};
  &:hover {
    color: ${COLORS.blue2};
  }
`;

const MyRefrigeratorWrapper = styled.div`
  height: 35rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const MyRefrigerator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 45rem;
`;

const MyIngredients = styled.div`
  width: 32.5rem;
  height: 17.5rem;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  padding: 1.25rem;
  gap: 1rem;

  border-radius: 1rem;
  border: 0.2rem solid ${COLORS.blue1};
  > p {
    width: 100%;
    text-align: center;
  }
`;

const IngredientItem = styled.div`
  padding: 0.75rem 1rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: ${COLORS.blue1};
  &:hover {
    background-color: ${COLORS.blue2};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  overflow: hidden;
  color: #fff;
  cursor: pointer;
`;

const Img = styled.div`
  width: 25rem;
  display: flex;
  align-items: center;
  justify-content: end;

  img {
    width: 100%;
    height: 100%;
  }
`;

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
