import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../../styles/colors';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/detail/${recipe.id}`);
  };

  return (
    <>
      <RecipeCardWrapper onClick={handleCardClick}>
        <RecipeImgWrapper>
          <img src={recipe.image} alt={recipe.name} />
        </RecipeImgWrapper>
        <RecipeTextWrapper>
          <p>{recipe.type}</p>
          <h1>{recipe.name}</h1>
        </RecipeTextWrapper>
      </RecipeCardWrapper>
    </>
  );
};

export default React.memo(RecipeCard);

const RecipeCardWrapper = styled.div`
  border-radius: 1rem;
  border: 0.3rem solid ${COLORS.blue1};

  width: 17.5rem;
  height: 30rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: color 300ms ease-in-out;
  &:hover {
    color: ${COLORS.blue2};
  }
  margin: 0 2.25rem 4.5rem 2.25rem;
  background-color: #fff;

  align-items: center;
  justify-content: center;
`;

const RecipeImgWrapper = styled.div`
  width: inherit;
  height: 20rem;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease-in-out;
  }

  &:hover > img {
    transform: scale(1.1);
  }
`;

const RecipeTextWrapper = styled.div`
  width: 100%;
  height: 10rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  flex-direction: column;
  & > p {
    font-size: 1.5rem;
  }
  & > h1 {
    font-size: 1.6rem;
  }
  padding: 1rem;
`;
