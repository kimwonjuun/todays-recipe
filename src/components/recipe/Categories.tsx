import styled from 'styled-components';
import COLORS from '../../styles/colors';

interface CategoriesProps {
  selectedCategory: string;
  sortType: string;
  handleCategoryType: (category: string) => void;
  handleSortType: (sortType: string) => void;
}

const Categories = ({
  selectedCategory,
  sortType,
  handleCategoryType,
  handleSortType,
}: CategoriesProps) => {
  return (
    <>
      <Wrapper>
        <CategoriesWrapper>
          <CategoryButton
            onClick={() => handleCategoryType('나의 냉장고')}
            data-is-selected={selectedCategory === '나의 냉장고'}
          >
            나의 냉장고
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryType('전체 레시피')}
            data-is-selected={selectedCategory === '전체 레시피'}
          >
            전체 레시피
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryType('밥')}
            data-is-selected={selectedCategory === '밥'}
          >
            밥
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryType('일품')}
            data-is-selected={selectedCategory === '일품'}
          >
            일품
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryType('국&찌개')}
            data-is-selected={selectedCategory === '국&찌개'}
          >
            국&찌개
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryType('반찬')}
            data-is-selected={selectedCategory === '반찬'}
          >
            반찬
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryType('후식')}
            data-is-selected={selectedCategory === '후식'}
          >
            후식
          </CategoryButton>
        </CategoriesWrapper>
        <SortingWrapper>
          <SortButton
            onClick={() =>
              handleSortType(
                sortType === '저칼로리 순' ? '기존 정렬 상태' : '저칼로리 순'
              )
            }
            data-is-selected={sortType === '저칼로리 순'}
          >
            저칼로리 순
          </SortButton>
          <SortButton
            onClick={() =>
              handleSortType(
                sortType === '가나다 순' ? '기존 정렬 상태' : '가나다 순'
              )
            }
            data-is-selected={sortType === '가나다 순'}
          >
            가나다 순
          </SortButton>
        </SortingWrapper>
      </Wrapper>
    </>
  );
};

export default Categories;

const Wrapper = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 1.5rem;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  & > p {
    cursor: pointer;
    &:hover {
      color: ${COLORS.blue2};
    }
  }

  & > p:first-of-type {
    margin-left: 2.25rem;
  }
`;

const SortingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1.5rem;
  & > p {
    cursor: pointer;
    &:hover {
      color: ${COLORS.blue2};
    }
  }

  & > p:last-of-type {
    margin-right: 2.25rem;
  }
`;

const CategoryButton = styled.p<{ 'data-is-selected': boolean }>`
  cursor: pointer;
  color: ${({ 'data-is-selected': isSelected }) =>
    isSelected ? COLORS.blue2 : 'inherit'};
  &:hover {
    color: ${COLORS.blue2};
  }
`;

const SortButton = styled.p<{ 'data-is-selected': boolean }>`
  cursor: pointer;
  color: ${({ 'data-is-selected': isSelected }) =>
    isSelected ? COLORS.blue2 : 'inherit'};
  &:hover {
    color: ${COLORS.blue2};
  }
`;
