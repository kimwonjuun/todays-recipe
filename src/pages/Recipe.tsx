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
                  <RecipeTextWrapper>
                    <p>{recipe.RCP_PAT2}</p>
                    <h1>{recipe.RCP_NM}</h1>
                  </RecipeTextWrapper>
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
  /* background-color: yellow; */
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 12.7rem);
`;

const BoxWrapper = styled.div`
  width: 90rem;
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

const RecipeBox = styled.div`
  border-radius: 1rem;
  border: 0.2rem solid ${COLORS.blue2};
  min-width: 28rem;
  min-height: 30rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: color 300ms ease-in-out;
  &:hover {
    color: ${COLORS.blue1};
  }
  margin-bottom: 3rem;

  align-items: center;
  justify-content: center;
`;

const RecipeImgWrapper = styled.div`
  width: 100%;
  height: 22rem;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  /* transition: transform 100ms ease-in-out; */
  transition: -webkit-transform 0.4s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const RecipeTextWrapper = styled.div`
  width: 100%;
  height: 8rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`;

const Title = styled.h1`
  /* width: 100%;
  font-size: 20px;
  font-weight: bold;
  line-height: 25px; */
`;

const Text = styled.p``;
