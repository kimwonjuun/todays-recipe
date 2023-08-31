import styled from 'styled-components';
import { formatDate } from '../../utils/date';
import { useQuery } from 'react-query';
import { getEditDataHistory } from '../../apis/admin/admin';

interface DataHistoryBoxProps {
  id: string;
  description?: string;
  updatedAt?: number;
}

const DataHistoryBox = () => {
  // 데이터 수정 내역 read API
  const { data: dataHistory } = useQuery<DataHistoryBoxProps[]>({
    queryKey: ['data-history'],
    queryFn: getEditDataHistory,
  });

  return (
    <>
      <BoxWrapper>
        <Title>수정 내역</Title>
        <Contents>
          {dataHistory &&
            dataHistory.map((history, index) => (
              <History key={history.id}>
                <p style={{ width: '1rem' }}>{index + 1}.</p>
                <p>{history.description}</p>
                <p style={{ width: '12.5rem' }}>
                  {history.updatedAt ? formatDate(history.updatedAt) : ''}
                </p>
              </History>
            ))}
        </Contents>
      </BoxWrapper>
    </>
  );
};

export default DataHistoryBox;

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
