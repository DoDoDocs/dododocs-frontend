// src/components/atoms/Select/index.jsx
import styled from 'styled-components';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import useClickAway from '../../../hooks/useClickAway.js';



const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.div`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #27272a;
  border-radius: 8px;
  background: #18181b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: ${props => props.hasValue ? '#fafafa' : '#71717a'};

  &:hover {
    border-color: #8b5cf6;
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }
`;

const Dropdown = styled.div`
  position: fixed;
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 8px;
  overflow-y: auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1100;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #27272a;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4b4b4b;
    border-radius: 8px;
    
    &:hover {
      background: #666;
    }
  }
`;

const SearchInput = styled.div`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-bottom: 1px solid #27272a;
  background: #1f1f23;
    color: #71717a;
`;

const Option = styled.div`
  padding: 12px 16px;
  color: #fafafa;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  background: ${props => props.isSelected ? '#27272a' : 'transparent'};
  color: ${props => props.isSelected ? '#8b5cf6' : '#fafafa'};

  &:hover {
    background: #27272a;
  }

  svg {
    width: 1rem;
    height: 1rem;
    color: #8b5cf6;
    opacity: ${props => props.isSelected ? 1 : 0};
  }
`;

const Select = ({ selectTitle = 'Select option', options, selectedValue, onChange, placeholder = '선택하세요' }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleClickAway = (event) => {
    if (
      dropdownRef.current?.contains(event.target) ||
      buttonRef.current?.contains(event.target)
    ) {
      return;
    }
    setIsSelectOpen(false);
  };

  useClickAway(containerRef, handleClickAway);

  useEffect(() => {
    if (isSelectOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      const dropdownHeight = Math.min(300, options.length * 40);

      let newStyle = {
        width: buttonRect.width,
        left: buttonRect.left,
      };

      if (spaceBelow >= dropdownHeight) {
        newStyle.top = buttonRect.bottom + 4;
        newStyle.maxHeight = Math.min(dropdownHeight, spaceBelow - 10);
      } else if (spaceAbove > spaceBelow) {
        newStyle.bottom = window.innerHeight - buttonRect.top + 4;
        newStyle.maxHeight = Math.min(dropdownHeight, spaceAbove - 10);
      } else {
        newStyle.top = buttonRect.bottom + 4;
        newStyle.maxHeight = Math.max(100, spaceBelow - 10);
      }

      setDropdownStyle(newStyle);
    }
  }, [isSelectOpen, options.length]);



  return (
    <SelectContainer ref={containerRef} className="select-container">
      <SelectButton
        ref={buttonRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsSelectOpen(!isSelectOpen);
        }}
        hasValue={!!selectedValue}
      >
        <span>{selectedValue || placeholder}</span>
        <ChevronDown
          size={20}
          style={{
            transform: isSelectOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s ease'
          }}
        />
      </SelectButton>

      {isSelectOpen && (
        <Dropdown ref={dropdownRef} style={dropdownStyle}>
          <SearchInput> {selectTitle}</SearchInput>
          {
            options.map((option, index) => (
              <Option
                key={option.id}
                onClick={() => {
                  onChange(option);
                  setIsSelectOpen(false);
                }}
                isSelected={selectedValue === option}
              >
                {option}
                <Check />
              </Option>
            ))
          }
        </Dropdown>
      )}
    </SelectContainer>
  );
};

export default Select;

// export const SelectContainer = styled.div.attrs({ className: 'select-container' })`
//  position: relative;
//  width: 100%;
// `;

// export const SelectButton = styled.div`
//  width: 100%;
//  padding: 12px 16px;
//  border: 1px solid #e5e7eb;
//  border-radius: 8px;
//  background: white;
//  display: flex;
//  align-items: center;
//  justify-content: space-between;
//  cursor: pointer;

//  &:hover {
//    border-color: #8b5cf6;
//  }

//  &:focus {
//    outline: none;
//    border-color: #8b5cf6;
//    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
//  }
// `;

// export const Dropdown = styled.div`
//  position: absolute;
//  top: calc(100% + 4px);
//  left: 0;
//  right: 0;
//  background: white;
//  border: 1px solid #e5e7eb;
//  border-radius: 8px;
//  max-height: 300px;
//  overflow-y: auto;
//  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//  z-index: 10;
// `;

// export const SearchInput = styled.input`
//  width: 100%;
//  padding: 12px 16px;
//  border: none;
//  border-bottom: 1px solid #e5e7eb;

//  &:focus {
//    outline: none;
//    background: #f9fafb;
//  }
// `;

// export const Option = styled.div`
//  padding: 12px 16px;
//  cursor: pointer;

//  &:hover {
//    background: #f3f4f6;
//  }
// `;



// const Select = ({ options, value, onChange }) => {
//   const [isSelectOpen, setIsSelectOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const containerRef = useRef(null);

//   useClickAway(containerRef, () => setIsSelectOpen(false));

//   const filteredOptions = options.filter(option =>
//     option.toLowerCase().includes(searchTerm.toLowerCase())
//   );


//   const selectButtonOnClick = (e) => {
//     e.preventDefault(); // 기본 동작 방지
//     e.stopPropagation(); // 이벤트 전파 방지
//     setIsSelectOpen(!isSelectOpen);
//   };

//   return (
//     <SelectContainer ref={containerRef}>
//       <SelectButton onClick={selectButtonOnClick}>
//         <span>{value || '레포지토리'}</span>
//         <ChevronDown size={20} />
//       </SelectButton>

//       {isSelectOpen && (
//         <Dropdown>
//           <SearchInput
//             placeholder="레포지토리 이름으로 검색"
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             autoFocus
//           />
//           {filteredOptions.map(option => (
//             <Option
//               key={option}
//               onClick={() => {
//                 onChange(option);
//                 setIsSelectOpen(false);
//               }}
//             >
//               {option}
//             </Option>
//           ))}
//         </Dropdown>
//       )}
//     </SelectContainer>
//   );
// };

// export default Select;

