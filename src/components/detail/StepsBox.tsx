import styled from 'styled-components';
import COLORS from '../../styles/colors';

const StepsBox = ({ recipe }: RecipeProps) => {
  return (
    <>
      <MiddleWrapper>
        <h1>조리 순서</h1>
        <StepsWrapper>
          {recipe.make &&
            recipe.make.map((step, index) => {
              if (!step) {
                return null;
              }
              return (
                <StepWrapper key={index}>
                  <StepsImg>
                    <img
                      src={recipe.makeImage[index]}
                      alt="cooking process image"
                    />
                  </StepsImg>
                  <StepsText>{step}</StepsText>
                </StepWrapper>
              );
            })}
        </StepsWrapper>
        {recipe.tip && (
          <TipWrapper>
            <h1>저감 조리법 TIP</h1>
            <p>{recipe.tip}</p>
          </TipWrapper>
        )}
      </MiddleWrapper>
    </>
  );
};

export default StepsBox;

const MiddleWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
  border-radius: 1rem;
  text-align: center;
  padding: 2rem;
  margin-bottom: 1rem;

  h1 {
    margin-bottom: 2.5rem;
  }

  @media (max-width: 850px) {
    h1 {
      font-size: 1rem;
    }
  }

  @media (max-width: 675px) {
    width: 30rem;
    padding: 0;
    h1 {
      font-size: 0.8rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
`;

const StepsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 675px) {
    justify-content: space-around;
  }
`;

const StepWrapper = styled.div`
  height: 30rem;

  width: calc(50% - 2.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1rem;

  @media (max-width: 850px) {
    height: 20rem;
  }
  @media (max-width: 675px) {
    height: 12.5rem;
    margin-bottom: 0.25rem;
  }
`;

const StepsImg = styled.div`
  width: 20em;
  height: 20rem;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
  }

  @media (max-width: 1150px) {
    width: 18rem;
    height: 18rem;
  }
  @media (max-width: 1000px) {
    width: 16rem;
    height: 16rem;
  }
  @media (max-width: 850px) {
    width: 13rem;
    height: 13rem;
  }
  @media (max-width: 675px) {
    width: 10rem;
    height: 8rem;
  }
`;

const StepsText = styled.div`
  width: 30rem;
  height: 8rem;
  display: flex;
  text-align: left;

  @media (max-width: 1150px) {
    width: 22.5rem;
    height: 6rem;
  }
  @media (max-width: 1000px) {
    width: 20rem;
    height: 4rem;
  }
  @media (max-width: 850px) {
    width: 15rem;
    height: 4rem;
    font-size: 1rem;
  }
  @media (max-width: 675px) {
    width: 10rem;
    height: 3rem;
    font-size: 0.7rem;
  }
`;

const TipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  border-radius: 1rem;
  background-color: #fff;
  margin-bottom: 0;
  font-size: 1.25rem;
  h1 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }

  @media (max-width: 850px) {
    font-size: 1rem;
    border: 0.15rem solid ${COLORS.blue1};
    h1 {
      margin-bottom: 1rem;
      font-size: 1rem;
    }
  }
  @media (max-width: 675px) {
    width: 26.5rem;
    font-size: 0.7rem;
    padding: 0.5rem;
    margin: 0.5rem auto;

    border: 0.15rem solid ${COLORS.blue1};
  }
  h1 {
    margin-bottom: 0.5rem;
    font-size: 0.7rem;
  }
`;
