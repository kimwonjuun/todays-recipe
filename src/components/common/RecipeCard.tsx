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
          <img src={recipe.image} alt={recipe.name} loading="lazy" />
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
  margin: 0 2.25rem 4.5rem 2.25rem;

  cursor: pointer;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: color 300ms ease-in-out;
  &:hover {
    color: ${COLORS.blue2};
  }
  background-color: #fff;

  @media (max-width: 700px) {
    width: 12.5rem;
    height: 21rem;
  }
  @media (max-width: 550px) {
    width: 10rem;
    height: 18rem;
  }
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

  @media (max-width: 700px) {
    height: 14rem;
  }
  @media (max-width: 550px) {
    height: 12rem;
  }
`;

const RecipeTextWrapper = styled.div`
  width: 100%;
  height: 10rem;
  padding: 1rem;

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

  @media (max-width: 700px) {
    height: 8rem;

    & > p,
    h1 {
      font-size: 1.1rem;
    }
  }
  @media (max-width: 550px) {
    height: 7rem;

    & > p,
    h1 {
      font-size: 1rem;
    }
  }
`;
