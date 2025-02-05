export const MemberLiveInformationController = `
# 시스템 아키텍처 문서

## 전체 구조
\`\`\`mermaid
graph TD
    A[Client] --> B[Controller Layer]
    B --> C[Service Layer]
    C --> D[Repository Layer]
    D --> E[Database]
\`\`\`

## 시스템 흐름
\`\`\`mermaid
sequenceDiagram
    Client->>Controller: Request
    Controller->>Service: Process
    Service->>Repository: Data Access
    Repository->>Database: Query
\`\`\`

## 주요 컴포넌트 설명

### Controller Layer
- **역할과 책임**: 클라이언트의 요청을 처리하고, 서비스 레이어와 상호작용하여 비즈니스 로직을 실행합니다.
- **주요 컨트롤러 목록**:
  - \`MemberLiveInformationController\`: 회원의 생활 정보를 조회하고 업데이트합니다.
- **공통 처리 로직**: 인증 정보(\`Accessor\`)를 요청 매개변수로 받아 사용합니다.

### Service Layer
- **비즈니스 로직 구조**: 비즈니스 로직을 처리하고, 데이터베이스와의 상호작용을 관리합니다.
- **주요 서비스 목록**:
  - \`MemberLiveInformationService\`: 회원의 생활 정보를 관리합니다.
- **트랜잭션 경계**: 데이터 업데이트 시 트랜잭션을 관리합니다.

### Repository Layer
- **역할과 책임**: 데이터베이스와의 상호작용을 담당하며, CRUD 작업을 수행합니다.
- **주요 리포지토리 목록**:
  - \`MemberLiveInformationRepository\`
  - \`LiveInformationRepository\`
  - \`MemberRepository\`

### Database
- **역할과 책임**: 모든 데이터의 영속성을 보장합니다.

## API 문서

### MemberLiveInformationController

#### 개요
- **컨트롤러 설명**: 회원의 생활 정보를 조회하고 업데이트하는 API를 제공합니다.
- **기본 URL 경로**: \`/api/live/info/member\`
- **공통 요청/응답 형식**: JSON 형식

#### API 엔드포인트

### 1. Find Member Live Information
**GET** \`/api/live/info/member\`

#### 설명
회원의 선택된 생활 정보를 조회합니다.

#### 요청
##### Parameters
| 이름      | 타입   | 필수 여부 | 설명                |
|-----------|--------|-----------|---------------------|
| accessor  | Accessor | Required | 인증된 회원 정보   |

##### Headers
| 이름          | 필수 여부 | 설명                     |
|---------------|-----------|--------------------------|
| Authorization | Required  | Bearer {token}           |

#### 응답
##### Success Response
- Status: 200 OK
\`\`\`json
{
    "liveInfoResponses": [
        {
            "id": 1,
            "name": "Live Info 1",
            "selected": true
        },
        {
            "id": 2,
            "name": "Live Info 2",
            "selected": false
        }
    ]
}
\`\`\`

##### Error Response
- Status: 404 Not Found
\`\`\`json
{
    "error": "존재하지 않는 회원입니다."
}
\`\`\`

### 2. Update Member Live Information
**PUT** \`/api/live/info/member\`

#### 설명
회원의 생활 정보를 업데이트합니다.

#### 요청
##### Parameters
| 이름      | 타입   | 필수 여부 | 설명                |
|-----------|--------|-----------|---------------------|
| accessor  | Accessor | Required | 인증된 회원 정보   |

##### Request Body
\`\`\`json
{
    "liveInfoIds": [1, 2, 3]
}
\`\`\`

#### 응답
##### Success Response
- Status: 204 No Content

##### Error Response
- Status: 400 Bad Request
\`\`\`json
{
    "error": "업데이트 할 생활정보는 비어있을 수 없습니다."
}
\`\`\`
- Status: 404 Not Found
\`\`\`json
{
    "error": "존재하지 않는 회원입니다."
}
\`\`\`

## SUMMARY

### Component Overview
- **주요 책임 및 목적**: 클라이언트 요청을 처리하고, 비즈니스 로직을 실행하며, 데이터베이스와의 상호작용을 관리합니다.
- **주요 기능 및 역량**: 회원의 생활 정보를 조회하고 업데이트하는 기능을 제공합니다.

### Architecture & Implementation
- **주요 구성 요소 및 역할**:
  - \`MemberLiveInformationController\`: 클라이언트 요청을 처리합니다.
  - \`MemberLiveInformationService\`: 비즈니스 로직을 처리합니다.
  - \`MemberLiveInformationRepository\`, \`LiveInformationRepository\`, \`MemberRepository\`: 데이터베이스와의 상호작용을 담당합니다.
- **구성 요소 상호 작용 및 종속성**: 컨트롤러는 서비스에 의존하고, 서비스는 리포지토리에 의존합니다.
- **주요 흐름 및 프로세스**: 클라이언트 요청 → 컨트롤러 → 서비스 → 리포지토리 → 데이터베이스.

`;
