import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import useClickAway from '../../../hooks/useClickAway.js';

export const SelectContainer = styled.div.attrs({ className: 'select-container' })`
 position: relative;
 width: 100%;
`;

export const SelectButton = styled.div`
 width: 100%;
 padding: 12px 16px;
 border: 1px solid #e5e7eb;
 border-radius: 8px;
 background: white;
 display: flex;
 align-items: center;
 justify-content: space-between;
 cursor: pointer;

 &:hover {
   border-color: #8b5cf6;
 }

 &:focus {
   outline: none;
   border-color: #8b5cf6;
   box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
 }
`;

export const Dropdown = styled.div`
 position: absolute;
 top: calc(100% + 4px);
 left: 0;
 right: 0;
 background: white;
 border: 1px solid #e5e7eb;
 border-radius: 8px;
 max-height: 300px;
 overflow-y: auto;
 box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
 z-index: 10;
`;

export const SearchInput = styled.input`
 width: 100%;
 padding: 12px 16px;
 border: none;
 border-bottom: 1px solid #e5e7eb;

 &:focus {
   outline: none;
   background: #f9fafb;
 }
`;

export const Option = styled.div`
 padding: 12px 16px;
 cursor: pointer;

 &:hover {
   background: #f3f4f6;
 }
`;



const Select = ({ options, value, onChange }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);

  useClickAway(containerRef, () => setIsSelectOpen(false));

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SelectContainer ref={containerRef}>
      <SelectButton onClick={() => setIsSelectOpen(!isSelectOpen)}>
        <span>{value || '레포지토리'}</span>
        <ChevronDown size={20} />
      </SelectButton>

      {isSelectOpen && (
        <Dropdown>
          <SearchInput
            placeholder="레포지토리 이름으로 검색"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            autoFocus
          />
          {filteredOptions.map(option => (
            <Option
              key={option}
              onClick={() => {
                onChange(option);
                setIsSelectOpen(false);
              }}
            >
              {option}
            </Option>
          ))}
        </Dropdown>
      )}
    </SelectContainer>
  );
};

export default Select;



// import React, { useState } from 'react';
// import { ChevronDown } from 'lucide-react';
// import styled from '@emotion/styled';

// const SelectWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   max-width: 300px;
// `;

// const SelectButton = styled.div`
//   width: 100%;
//   padding: 0.75rem 1rem;
//   background: white;
//   border: 1px solid #e2e8f0;
//   border-radius: 0.5rem;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   cursor: pointer;
//   transition: all 0.2s;

//   &:hover {
//     border-color: #cbd5e0;
//   }

//   &:focus {
//     outline: none;
//     border-color: #3b82f6;
//     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//   }
// `;

// const OptionsContainer = styled.div`
//   position: absolute;
//   top: calc(100% + 0.5rem);
//   left: 0;
//   right: 0;
//   background: white;
//   border: 1px solid #e2e8f0;
//   border-radius: 0.5rem;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//   max-height: 200px;
//   overflow-y: auto;
//   z-index: 10;
// `;

// const Option = styled.div`
//   padding: 0.75rem 1rem;
//   cursor: pointer;
//   transition: background 0.2s;

//   &:hover {
//     background: #f7fafc;
//   }
// `;

// const Select = ({ options, value, onChange }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleSelect = (option) => {
//     onChange(option);
//     setIsOpen(false);
//   };

//   return (
//     <SelectWrapper>
//       <SelectButton onClick={() => setIsOpen(!isOpen)}>
//         <span>{value?.label || '선택하세요'}</span>
//         <ChevronDown
//           className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
//           size={20}
//         />
//       </SelectButton>

//       {isOpen && (
//         <OptionsContainer>
//           {options.map((option) => (
//             <Option
//               key={option.value}
//               onClick={() => handleSelect(option)}
//             >
//               {option.label}
//             </Option>
//           ))}
//         </OptionsContainer>
//       )}
//     </SelectWrapper>
//   );
// };
// export default Select;