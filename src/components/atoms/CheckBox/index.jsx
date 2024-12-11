import { Check } from 'lucide-react';
import styled from 'styled-components';
const CheckboxWrapper = styled.label`
 display: flex;
 align-items: center;
 gap: 8px;
 cursor: pointer;
 color: ${props => props.checked ? '#ffffff' : '#71717a'};
`;

const CheckboxInput = styled.div`
 width: 20px;
 height: 20px;
 border: 2px solid ${props => props.checked ? '#10B981' : '#3F3F46'};
 border-radius: 4px;
 background: ${props => props.checked ? '#10B981' : 'transparent'};
 cursor: pointer;
 position: relative;
 transition: all 0.2s ease;

 &:hover {
   border-color: ${props => props.checked ? '#10B981' : '#6B7280'};
 }
`;

const IconWrapper = styled.div`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 line-height: 0;
 color: white;
`;

const Checkbox = ({ checked, onChange, children }) => {
  return (
    <CheckboxWrapper checked={checked}>
      <CheckboxInput
        checked={checked}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <IconWrapper>
            <Check size={14} />
          </IconWrapper>
        )}
      </CheckboxInput>
      {children}
    </CheckboxWrapper>
  );
};

export default Checkbox;
