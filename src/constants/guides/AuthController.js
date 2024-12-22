export const AuthController = `
# 시스템 아키텍처 문서

## 전체 구조
\`\`\`mermaid
graph TD
    A[Client] --> B[AuthController]
    B --> C[AuthService]
    C --> D[TokenManager]
    C --> E[MemberService]
    D --> F[Database]
    E --> F
\`\`\`

## 시스템 흐름
\`\`\`mermaid
sequenceDiagram
    Client->>AuthController: Request for OAuth URI
    AuthController->>AuthService: generateUri(providerName)
    AuthService->>OAuthProvider: getOAuthUriProvider(providerName)
    OAuthProvider->>AuthService: Return OAuth URI
    AuthService->>AuthController: Return OAuth URI
    AuthController->>Client: Return OAuth URI

    Client->>AuthController: Login with code
    AuthController->>AuthService: generateTokenWithCode(code, providerName)
    AuthService->>OAuthClient: getOAuthMember(code)
    OAuthClient->>AuthService: Return OAuthMember
    AuthService->>MemberService: findOrCreateMember(oAuthMember, providerName)
    MemberService->>AuthService: Return Member
    AuthService->>TokenManager: createMemberToken(memberId)
    TokenManager->>AuthService: Return MemberToken
    AuthService->>AuthController: Return MemberToken
    AuthController->>Client: Return Access Token and Set Refresh Token Cookie

    Client->>AuthController: Extend login with refresh token
    AuthController->>AuthService: generateRenewalAccessToken(refreshToken)
    AuthService->>TokenManager: generateRenewalAccessToken(refreshToken)
    TokenManager->>AuthService: Return RenewalToken
    AuthService->>AuthController: Return RenewalAccessTokenResponse
    AuthController->>Client: Return New Access Token

    Client->>AuthController: Logout
    AuthController->>AuthService: removeRefreshToken(refreshToken)
    AuthService->>TokenManager: removeRefreshToken(refreshToken)
    AuthController->>Client: No Content
\`\`\`

## 주요 컴포넌트 설명

### AuthController
- **역할과 책임**: 클라이언트의 요청을 처리하고, AuthService와 상호작용하여 인증 관련 작업을 수행합니다.
- **주요 메서드**:
  - \`generateUri\`: OAuth URI를 생성합니다.
  - \`login\`: 로그인 요청을 처리하고, 액세스 토큰과 리프레시 토큰을 반환합니다.
  - \`extendLogin\`: 리프레시 토큰을 사용하여 액세스 토큰을 갱신합니다.
  - \`logout\`: 로그아웃 요청을 처리합니다.

### AuthService
- **역할과 책임**: 인증 관련 비즈니스 로직을 처리합니다. OAuth 인증, 토큰 생성 및 갱신, 회원 관리 등을 담당합니다.
- **주요 메서드**:
  - \`generateTokenWithCode\`: OAuth 코드를 사용하여 토큰을 생성합니다.
  - \`generateUri\`: OAuth URI를 생성합니다.
  - \`generateRenewalAccessToken\`: 리프레시 토큰을 사용하여 액세스 토큰을 갱신합니다.
  - \`removeRefreshToken\`: 로그아웃 시 리프레시 토큰을 제거합니다.

### TokenManager
- **역할과 책임**: 토큰 생성 및 관리 기능을 제공합니다. 액세스 토큰과 리프레시 토큰을 생성하고 검증합니다.

### MemberService
- **역할과 책임**: 회원 관련 데이터 접근 및 관리 기능을 제공합니다. 회원의 존재 여부를 확인하고, 회원 정보를 저장합니다.

## API 엔드포인트

### Generate OAuth URI
**GET** \`/api/auth/{oAuthProvider}/link\`

#### 설명
주어진 OAuth 공급자에 대한 인증 URI를 생성합니다.

#### 요청
##### Parameters
| 이름         | 타입   | 필수 여부 | 설명                       |
|--------------|--------|-----------|----------------------------|
| oAuthProvider| string | Required  | OAuth 공급자의 이름       |

#### 응답
##### Success Response
- Status: 200 OK
\`\`\`json
{
    "oAuthUri": "https://example.com/oauth/authorize?client_id=xxx&redirect_uri=xxx"
}
\`\`\`

### Login
**POST** \`/api/auth/{oAuthProvider}/login\`

#### 설명
주어진 OAuth 공급자와 함께 로그인합니다.

#### 요청
##### Parameters
| 이름         | 타입   | 필수 여부 | 설명                       |
|--------------|--------|-----------|----------------------------|
| oAuthProvider| string | Required  | OAuth 공급자의 이름       |

##### Request Body
\`\`\`json
{
    "code": "authorization_code"
}
\`\`\`

#### 응답
##### Success Response
- Status: 201 Created
\`\`\`json
{
    "accessToken": "access_token_value"
}
\`\`\`

### Extend Login
**POST** \`/api/auth/extend/login\`

#### 설명
리프레시 토큰을 사용하여 액세스 토큰을 갱신합니다.

#### 요청
##### Request Body
\`\`\`json
{
    "refreshToken": "refresh_token_value"
}
\`\`\`

#### 응답
##### Success Response
- Status: 201 Created
\`\`\`json
{
    "accessToken": "new_access_token_value"
}
\`\`\`

### Logout
**DELETE** \`/api/auth/logout\`

#### 설명
사용자를 로그아웃합니다.

#### 요청
##### Headers
| 이름           | 필수 여부 | 설명                       |
|----------------|-----------|----------------------------|
| Cookie         | Required  | 리프레시 토큰이 포함된 쿠키 |

#### 응답
##### Success Response
- Status: 204 No Content

## SUMMARY

### Component Overview
- **AuthController**: 클라이언트 요청을 처리하고 응답을 반환하는 역할.
- **AuthService**: 인증 및 회원 관리 비즈니스 로직을 처리.
- **TokenManager**: 토큰 생성 및 검증 기능 제공.
- **MemberService**: 회원 데이터 접근 및 관리.

### Architecture & Implementation
- **구성 요소 상호 작용**: 클라이언트는 AuthController에 요청을 보내고, AuthController는 AuthService와 상호작용하여 비즈니스 로직을 처리합니다. AuthService는 TokenManager와 MemberService를 통해 토큰 관리 및 회원 정보를 처리합니다.
- **주요 흐름 및 프로세스**: 클라이언트의 요청은 AuthController를 통해 AuthService로 전달되고, 필요한 데이터는 TokenManager와 MemberService를 통해 처리됩니다. 최종적으로 응답은 클라이언트에게 반환됩니다.
`;
