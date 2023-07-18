import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { getRecipeData } from '../apis/api';
import RecipeBox from '../components/recipe/RecipeBox';

const Recipe = () => {
  const [recipeData, setRecipeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipeData();
        setRecipeData(data);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <TypeWrapper>
            <p>분류</p>
            <p>좋아요 많은 순</p>
            <p>가나다 순</p>
          </TypeWrapper>
          <RecipeWrapper>
            {recipeData.map((recipe: any) => (
              <RecipeBox recipe={recipe} />
            ))}
          </RecipeWrapper>
        </BoxWrapper>
      </PageWrapper>
    </>
  );
};

export default Recipe;

const PageWrapper = styled.div`
  /* background-color: yellow; */
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 12.7rem);
`;

const BoxWrapper = styled.div`
  width: 95rem;
  /* height: 25rem; */
  /* display: flex; */
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  margin-top: 8rem;
`;

const TypeWrapper = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;
  & > p {
    margin-right: 5rem;
    cursor: pointer;
    &:hover {
      color: ${COLORS.blue1};
    }
  }
`;

const RecipeWrapper = styled.div`
  /* background-color: red; */
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 5rem 0;
  overflow: hidden;
`;
