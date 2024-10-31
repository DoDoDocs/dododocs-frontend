import React, { memo } from "react"
import styled from "styled-components"
import PropTypes from 'prop-types';
import RowContext from "./RowContext";

const RowLayout = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    
    ${props => props.$justify && `justify-content: ${props.$justify};`}
    ${props => props.$align && `align-items: ${props.$align};`}
    ${props => props.$border && `
        border-top: 1px solid #ccd4e0;
        border-bottom: 1px solid #ccd4e0;
    `}
`

/**
 * @param {string} justify - 수평 배열 === justify-content
 * @param {string} align - 수직 배열  === align-items
 * @param {Array} gutter - 그리드 사이의 간격 [수평 , 수직 ]
 * @param {boolean} border - 테두리 표시 여부
 */
const Row = ({
    style,
    justify = "start",
    align = "start",
    border = false,
    gutter = [0, 0],
    children
}) => (
    <RowContext.Provider value={gutter}>
        <RowLayout
            style={style}
            $justify={justify}
            $align={align}
            $border={border}
        >
            {children}
        </RowLayout>
    </RowContext.Provider>
)

Row.propTypes = {
    style: PropTypes.object,
    justify: PropTypes.string,
    align: PropTypes.string,
    gutter: PropTypes.arrayOf(PropTypes.number),
    border: PropTypes.bool,
    children: PropTypes.node
}

export default memo(Row)