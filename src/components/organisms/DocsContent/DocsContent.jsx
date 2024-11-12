import React, { useState } from 'react';
import { Typo, Button } from "../../index.js"
import FlexSplitter from './FlexSplitter.jsx';
import {
  ContentStyle,
  LeftPanelContent, RightPanelContent,
  Item,
  Title,
  Content,
  RightTitle, RightContent, RightContentWrapper
} from "./DocsContent.styles.js"

import ReactMarkdown from 'react-markdown'


const markdownText = `
# 안녕하세요!
저는 현재 리액트에서 \`react-markdown\`를 이용하여 **마크다운**을 랜더링하고 있습니다.
`;

const DocsContent = () => {

  return (
    <>
      <ContentStyle>
        <div style={{ height: '98%', width: '98% ', paddingTop: '1.5dvh', display: 'flex', justifyContent: "space-between", gap: '1rem' }}>
          <FlexSplitter>
            <LeftPanelContent>
              <RightTitle>왼쪽 패널</RightTitle>
              <RightContentWrapper>
                <RightContent>
                  {Array.from({ length: 25 }).map((_, i) => (
                    <Item key={i}>
                      항목 {i + 1}
                    </Item>
                  ))}
                </RightContent>
              </RightContentWrapper>
            </LeftPanelContent>

            <RightPanelContent>
              <RightTitle>오른쪽 패널</RightTitle>
              <RightContentWrapper>
                <RightContent>
                  {/* {Array.from({ length: 25 }).map((_, i) => (
                    <Content key={i}>
                      콘텐츠 {i + 1}
                    </Content>
                  ))} */}
                  <ReactMarkdown>
                    {markdownText}
                  </ReactMarkdown>

                </RightContent>
              </RightContentWrapper>
            </RightPanelContent>
          </FlexSplitter>

          <FlexSplitter position={'right'}>
            <LeftPanelContent>
              <RightTitle>왼쪽 패널</RightTitle>
              <RightContentWrapper>
                <RightContent>
                  {Array.from({ length: 25 }).map((_, i) => (
                    <Item key={i}>
                      항목 {i + 1}
                    </Item>
                  ))}
                </RightContent>
              </RightContentWrapper>
            </LeftPanelContent>

            <RightPanelContent>
              <RightTitle>오른쪽 패널</RightTitle>
              <RightContentWrapper>
                <RightContent>
                  {Array.from({ length: 25 }).map((_, i) => (
                    <Content key={i}>
                      콘텐츠 {i + 1}
                    </Content>
                  ))}
                </RightContent>
              </RightContentWrapper>
            </RightPanelContent>
          </FlexSplitter>
        </div>
      </ContentStyle>
    </>
  )
}

export default DocsContent;
