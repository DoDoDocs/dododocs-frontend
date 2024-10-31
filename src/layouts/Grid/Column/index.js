import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RowContext from '../Row/RowContext';

const ColumnLayout = styled.div`
  display: flex;
  ${(props) =>
    props.$span === 0 ? `display: none;` : `flex-basis: ${(100 / 12) * props.$span}%;`}
  box-sizing: border-box;
  flex-wrap: wrap;
  ${(props) => (props.$justify ? `justify-content: ${props.$justify};` : null)};
  ${(props) => (props.$align ? `align-items: ${props.$align};` : null)};
  ${(props) =>
    props.$xs !== undefined
      ? props.$xs === 0
        ? `@media(max-width: 576px){ display: none; } `
        : `@media(max-width: 576px){ flex-basis: ${
            (100 / 12) * props.$xs
          }%; display: flex;}`
      : null}
  ${(props) =>
    props.$sm !== undefined
      ? props.$sm === 0
        ? `@media(min-width: 576px){ display: none; } `
        : `@media(min-width: 576px){ flex-basis: ${
            (100 / 12) * props.$sm
          }%; display: flex;}`
      : null}
${(props) =>
    props.$md !== undefined
      ? props.$md === 0
        ? `@media(min-width: 768px){ display: none; }`
        : `@media(min-width: 768px){ flex-basis: ${
            (100 / 12) * props.$md
          }%; display: flex;}`
      : null}
${(props) =>
    props.$lg !== undefined
      ? props.$lg === 0
        ? `@media(min-width: 992px){ display: none; }`
        : `@media(min-width: 992px){ flex-basis: ${
            (100 / 12) * props.$lg
          }%; display: flex;}`
      : null}
${(props) =>
    props.$xl !== undefined
      ? props.$xl === 0
        ? `@media(min-width: 1200px){ display: none; }`
        : `@media(min-width: 1200px){ flex-basis: ${
            (100 / 12) * props.$xl
          }%; display: flex;}`
      : null}
${(props) =>
    props.$xxl !== undefined
      ? props.$xxl === 0
        ? `@media(min-width: 1600px){ display: none;`
        : `@media(min-width: 1600px){ flex-basis: ${
            (100 / 12) * props.$xxl
          }%; display: flex;}`
      : null}
${(props) =>
    props.$gutter &&
    typeof props.$gutter[0] == 'number' &&
    typeof props.$gutter[1] == 'number'
      ? 'padding: ' + props.$gutter[0] + 'px ' + props.$gutter[1] + 'px;'
      : null}
${(props) =>
    props.$gutter[0].$xs
      ? `@media(max-width: 576px){ padding-top: ${props.$gutter[0].$xs}px; padding-bottom: ${props.$gutter[0].$xs}px;}`
      : null}
${(props) =>
    props.$gutter[1].$xs
      ? `@media(max-width: 576px){ padding-right: ${props.$gutter[1].$xs}px; padding-left: ${props.$gutter[1].$xs}px;}`
      : null}
${(props) =>
    props.$gutter[0].$sm
      ? `@media(min-width: 576px){ padding-top: ${props.$gutter[0].$sm}px; padding-bottom: ${props.$gutter[0].$sm}px;}`
      : null}
${(props) =>
    props.$gutter[1].$sm
      ? `@media(min-width: 576px){ padding-right: ${props.$gutter[1].$sm}px; padding-left: ${props.$gutter[1].$sm}px;}`
      : null}
${(props) =>
    props.$gutter[0].$md
      ? `@media(min-width: 768px){ padding-top: ${props.$gutter[0].$md}px; padding-bottom: ${props.$gutter[0].$md}px;}`
      : null}
${(props) =>
    props.$gutter[1].$md
      ? `@media(min-width: 768px){ padding-right: ${props.$gutter[1].$md}px; padding-left: ${props.$gutter[1].$md}px;}`
      : null}
${(props) =>
    props.$gutter[0].$lg
      ? `@media(min-width: 992px){ padding-top: ${props.$gutter[0].$lg}px; padding-bottom: ${props.$gutter[0].$lg}px;}`
      : null}
${(props) =>
    props.$gutter[1].$lg
      ? `@media(min-width: 992px){ padding-right: ${props.$gutter[1].$lg}px; padding-left: ${props.$gutter[1].$lg}px;}`
      : null}
${(props) =>
    props.$gutter[0].$xl
      ? `@media(min-width: 1200px){ padding-top: ${props.$gutter[0].$xl}px; padding-bottom: ${props.$gutter[0].$xl}px;}`
      : null}
${(props) =>
    props.$gutter[1].$xl
      ? `@media(min-width: 1200px){ padding-right: ${props.$gutter[1].$xl}px; padding-left: ${props.$gutter[1].$xl}px;}`
      : null}
${(props) =>
    props.$gutter[0].$xxl
      ? `@media(min-width: 1600px){ padding-top: ${props.$gutter[0].$xxl}px; padding-bottom: ${props.$gutter[0].$xxl}px;}`
      : null}
${(props) =>
    props.$gutter[1].$xxl
      ? `@media(min-width: 1600px){ padding-right: ${props.$gutter[1].$xxl}px; padding-left: ${props.$gutter[1].$xxl}px;}`
      : null}
${(props) => (props.$offset ? 'margin-left: ' + (100 / 12) * props.$offset + '%' : null)}
`;

/**
 *
 * @param {Col} span - 총 12칸으로 되있음 원하는 만큼 span 입력
 * @param {Col} xs - screen < 576px 모바일
 * @param {Col} sm -screen ≥ 576px 테블릿
 * @param {Col} md  -screen ≥ 768px 노트북
 * @param {Col} lg - screen ≥ 992px 데스크탑
 * @param {Col} xl -screen ≥ 1200px
 * @param {Col} xxl - screen ≥ 1600px
 */
const Col = ({
  span = 1,
  style,
  justify,
  align,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  children,
  offset,
  colRef,
}) => {
  return (
    <RowContext.Consumer>
      {(value) => (
        <ColumnLayout
          ref={colRef}
          style={style}
          $justify={justify}
          $align={align}
          $span={span}
          $gutter={value}
          $offset={offset}
          $xs={xs}
          $sm={sm}
          $md={md}
          $lg={lg}
          $xl={xl}
          $xxl={xxl}
        >
          {children}
        </ColumnLayout>
      )}
    </RowContext.Consumer>
  );
};
Col.propTypes = {
  style: PropTypes.object,
  colRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  justify: PropTypes.string,
  align: PropTypes.string,
  span: PropTypes.number,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  xxl: PropTypes.number,
  children: PropTypes.node,
  offset: PropTypes.number,
};

export default memo(Col);
