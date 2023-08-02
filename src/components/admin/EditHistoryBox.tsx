import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { dbService } from '../../apis/firebase';
import { useEffect } from 'react';
import { formatDate } from '../../utils/date';

interface EditHistory {
  description: string;
  updatedAt: string;
}

export const EditHistoryBox = () => {
  const [editHistoryList, setEditHistoryList] = useState<EditHistory[]>([]);

  // 수정 사항 가져오기
  const getEditDataHistory = async () => {
    const querySnapshot = await getDocs(
      collection(dbService, 'edit-data-history')
    );
    const historyList: any = [];

    querySnapshot.forEach((doc) => {
      const newRecipe: any = {
        id: doc.id,
        ...doc.data(),
      };
      historyList.unshift(newRecipe);
    });
    historyList.reverse();
    setEditHistoryList(historyList);
  };
  useEffect(() => {
    getEditDataHistory();
  }, []);

  return (
    <>
      <BoxWrapper>
        <Title>수정 내역</Title>
        <Contents>
          {editHistoryList.map((history, index) => (
            <History>
              <p style={{ width: '1rem' }}>{index + 1}.</p>
              <p>{history.description}</p>
              <p style={{ width: '11rem' }}>{formatDate(history.updatedAt)}</p>
            </History>
          ))}
        </Contents>
      </BoxWrapper>
    </>
  );
};

const BoxWrapper = styled.div`
  width: 45rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items: center;
  /* p {
    &:hover {
      color: ${COLORS.blue1};
      cursor: pointer;
    }
  } */
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
`;

const Title = styled.div`
  width: inherit;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
`;

const Contents = styled.div`
  /* width: inherit; */
  margin: 1rem 0;
  height: 27rem;
  display: flex;
  align-items: center;
  /* justify-content: space-evenly; */
  flex-direction: column;
`;

const History = styled.div`
  width: 38rem;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  font-size: 1.25rem;

  & > p:last-child {
    margin-left: auto;
  }
`;
