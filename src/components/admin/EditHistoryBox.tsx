import styled from 'styled-components';
import { useState } from 'react';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { dbService } from '../../api/firebase';
import { useEffect } from 'react';
import { formatDate } from '../../utils/date';

interface EditHistory {
  description: string;
  updatedAt: number;
}

const EditHistoryBox = () => {
  const [editHistoryList, setEditHistoryList] = useState<EditHistory[]>([]);

  // 수정 사항 read
  const getEditDataHistory = async () => {
    // edit-data-history 컬렉션 참조
    const editHistoryRef = collection(dbService, 'edit-data-history');

    // 수정된 날짜 순 정렬
    const sortedEditHistory = query(
      editHistoryRef,
      orderBy('updatedAt', 'asc')
    );

    // edit-data-history 컬렉션을 돌며 수정된 날짜 순으로 추가
    onSnapshot(sortedEditHistory, (querySnapshot) => {
      const historyList: EditHistory[] = [];

      querySnapshot.forEach((doc) => {
        const list: any = {
          id: doc.id,
          ...doc.data(),
        };
        historyList.push(list);
      });

      setEditHistoryList(historyList);
    });
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

export default EditHistoryBox;

const BoxWrapper = styled.div`
  width: 45rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin: 3.5rem 0;
  height: 27rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const History = styled.div`
  width: 38rem;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  font-size: 1rem;

  & > p:last-child {
    margin-left: auto;
  }
`;
