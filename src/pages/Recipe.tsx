import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { getRecipeData } from '../apis/api';

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
              <>
                <RecipeBox>
                  <RecipeImgWrapper>
                    <Img src={recipe.ATT_FILE_NO_MK} />
                  </RecipeImgWrapper>
                  <RecipeTitleWrapper>
                    <Title>{recipe.RCP_NM}</Title>
                  </RecipeTitleWrapper>
                </RecipeBox>
              </>
            ))}
          </RecipeWrapper>
        </BoxWrapper>
      </PageWrapper>
    </>
  );
};

export default Recipe;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 12.7rem);
`;

const BoxWrapper = styled.div`
  width: 100rem;
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
      color: ${COLORS.violet1};
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
`;

const RecipeBox = styled.div`
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue2};
  min-width: 20rem;
  min-height: 25rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: color 300ms ease-in-out;
  &:hover {
    color: ${COLORS.violet1};
  }
`;
const RecipeImgWrapper = styled.div`
  width: inherit;
  height: 230px;
  overflow: hidden;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  transition: transform 300ms ease-in-out;
  transition: -webkit-transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
const RecipeTitleWrapper = styled.div`
  width: 100%;
  height: 25%;
  border-radius: 0px 0px 10px 10px;
  background-color: white;
  box-sizing: border-box;
  padding: 30px 0 50px;
  text-align: center;
`;
const Title = styled.h1`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  line-height: 25px;
`;
