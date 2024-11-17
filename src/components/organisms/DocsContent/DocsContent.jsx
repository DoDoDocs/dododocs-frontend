import React, { useState, useEffect } from 'react';
import { Typo, Button } from "../../index.js"
import FlexSplitter from './FlexSplitter.jsx';
import MarkdownFile from "./test.md"
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
## 2. Strategy Pattern Implementation

### Strategy Pattern Overview

The strategy pattern is implemented through the use of interfaces for OAuth clients and URI providers, allowing for different implementations based on the OAuth provider.

### Strategy Interface and Concrete Classes

- **OAuthClient**: Interface for OAuth clients that defines methods for retrieving OAuth member information.
- **OAuthMember**: Interface representing an OAuth member with methods to get social login ID, email, and profile image URL.
- **OAuthProvider**: Interface that provides methods to get specific OAuth clients and URI providers based on the provider name.
- **OAuthUriProvider**: Interface for generating OAuth URIs.

### Context Class

- **AuthService**: Acts as the context that uses the strategy interfaces to perform authentication tasks.

### Class Diagram

\`\`\`mermaid
classDiagram
    class OAuthClient {
        +getOAuthMember(code: String): OAuthMember
        +isSame(oAuthProviderName: String): boolean
    }

    class OAuthMember {
        +getSocialLoginId(): String
        +getEmail(): String
        +getProfileImageUrl(): String
    }

    class OAuthProvider {
        +getOauthClient(providerName: String): OAuthClient
        +getOAuthUriProvider(providerName: String): OAuthUriProvider
        +getSocialType(provider: String): SocialType
    }

    class OAuthUriProvider {
        +generateUri(): String
        +isSame(provider: String): boolean
    }

    class AuthService {
        +generateTokenWithCode(code: String, providerName: String): MemberToken
        +generateUri(providerName: String): String
    }

    AuthService --> OAuthProvider
    OAuthProvider --> OAuthClient
    OAuthProvider --> OAuthUriProvider
    OAuthClient --> OAuthMember
\`\`\`
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
