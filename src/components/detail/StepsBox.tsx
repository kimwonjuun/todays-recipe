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
`;

const StepsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StepWrapper = styled.div`
  width: calc(50% - 2.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 30rem;
  margin-bottom: 1rem;
`;

const StepsImg = styled.div`
  width: 20em;
  height: 20rem;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
  }
`;

const StepsText = styled.div`
  width: 30rem;
  height: 8rem;
  display: flex;
  text-align: left;
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
`;
