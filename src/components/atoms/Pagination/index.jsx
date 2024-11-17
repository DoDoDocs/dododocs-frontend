// Pagination.styles.js
import styled from 'styled-components';
import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  background: transparent;
  gap: 0.5rem;

  justify-content: center; 
  position : relative;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ButtonBox = styled.div`
 display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center; // 중앙 정렬
  flex: 1; // 남은 공간 차지

  @media (max-width: 768px) {
    order: 1; // 모바일에서 순서 변경
    width: 100%; // 전체 너비 사용
  }
`

export const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$isActive ? '#8b5cf6' : '#2a2b2e'};
  background: ${props => props.$isActive ? '#2a2d3d' : 'transparent'};
  color: ${props => props.$isActive ? '#8b5cf6' : '#e4e5e7'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    border-color: #8b5cf6;
    color: #8b5cf6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

`;


export const PageInfo = styled.span`
  color: #a8a9b3;
  margin: 0 1rem;
  white-space: nowrap;
  flex-shrink: 0; 
  position : absolute;
  left : 0;
    /* 768px 미만에서 숨김 */
    @media (max-width: 768px) {
      position: static;
      order : 2;
      padding-top : 0.5rem;
  }
`;

// Pagination.jsx
const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
  showQuickJumper = true,
  maxPageButtons = 5
}) => {
  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 표시할 페이지 버튼 계산
  const pageButtons = useMemo(() => {
    const buttons = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    // 시작 페이지 재조정
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    // 첫 페이지
    if (startPage > 1) {
      buttons.push(
        <PageButton key="1" onClick={() => onPageChange(1)}>
          1
        </PageButton>
      );
      if (startPage > 2) {
        buttons.push(
          <PageButton key="ellipsis1" disabled>
            ...
          </PageButton>
        );
      }
    }

    // 페이지 버튼
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PageButton
          key={i}
          $isActive={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </PageButton>
      );
    }

    // 마지막 페이지
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <PageButton key="ellipsis2" disabled>
            ...
          </PageButton>
        );
      }
      buttons.push(
        <PageButton
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </PageButton>
      );
    }

    return buttons;
  }, [currentPage, totalPages, maxPageButtons, onPageChange]);

  // 현재 표시되는 아이템 범위 계산
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // 빠른 이동을 위한 핸들러
  const handleQuickJump = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      onPageChange(value);
    }
  };

  return (
    <PaginationWrapper>
      {/* 페이지 정보 */}
      <PageInfo>
        Showing {startItem}-{endItem} of {totalItems} items
      </PageInfo>
      {/* 이전 페이지 버튼 */}
      <ButtonBox>
        <PageButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft style={{ width: '1rem', height: '1rem' }} />
        </PageButton>

        {/* 페이지 버튼들 */}
        {pageButtons}

        {/* 다음 페이지 버튼 */}
        <PageButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight style={{ width: '1rem', height: '1rem' }} />
        </PageButton>
      </ButtonBox>

    </PaginationWrapper>
  );
};

export default React.memo(Pagination);
