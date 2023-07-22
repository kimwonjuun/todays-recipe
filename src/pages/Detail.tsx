import styled from 'styled-components';
import COLORS from '../styles/colors';

const Detail = () => {
  return (
    <>
      <PageWrapper>
        <RCPWrapper>
          <RCPImgWrapper></RCPImgWrapper>
          <RCPingredientWrapper></RCPingredientWrapper>
          <RCPOrderWrapper></RCPOrderWrapper>
        </RCPWrapper>
        <CommynityWrapper>
          <BookmarkWrapper></BookmarkWrapper>
          <CommentWrapper></CommentWrapper>
        </CommynityWrapper>
      </PageWrapper>
    </>
  );
};

export default Detail;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.backGround};
`;

const RCPWrapper = styled.div`
  width: 90rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  position: relative;
  background-color: red;
`;
const RCPImgWrapper = styled.div``;
const RCPingredientWrapper = styled.div``;
const RCPOrderWrapper = styled.div``;
const CommynityWrapper = styled.div``;
const BookmarkWrapper = styled.div``;
const CommentWrapper = styled.div``;
