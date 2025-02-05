export const RecommendTripController = `
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
- **역할과 책임**: 클라이언트의 요청을 처리하고, 서비스 계층과의 상호작용을 통해 비즈니스 로직을 수행합니다.
- **주요 컨트롤러 목록**:
  - \`RecommendTripController\`: 추천 여행지 생성 및 조회 기능을 제공합니다.
- **공통 처리 로직**: 인증 정보를 처리하기 위해 \`@Authentication\` 어노테이션을 사용합니다.

### Service Layer
- **비즈니스 로직 구조**: 추천 여행지 생성 및 필터링 전략을 통해 여행지를 추천하는 비즈니스 로직을 포함합니다.
- **주요 서비스 목록**:
  - \`RecommendTripService\`: 추천 여행지 저장 및 생성 기능을 제공합니다.
- **트랜잭션 경계**: \`@Transactional\` 어노테이션을 사용하여 데이터베이스 트랜잭션을 관리합니다.

### Repository Layer
- **역할과 책임**: 데이터베이스와의 상호작용을 통해 데이터를 저장하고 조회합니다.
- **주요 리포지토리 목록**:
  - \`RecommendTripRepository\`: 추천 여행지 관련 데이터 접근을 담당합니다.
  - \`MemberRepository\`: 회원 관련 데이터 접근을 담당합니다.
  - \`TripRepository\`: 여행지 관련 데이터 접근을 담당합니다.
  - \`TripKeywordRepository\`: 여행지 키워드 관련 데이터 접근을 담당합니다.

### Domain Layer
- **역할과 책임**: 비즈니스 도메인 모델을 정의하고, 필터링 전략 및 추천 로직을 구현합니다.
- **주요 도메인 클래스**:
  - \`RecommendTrip\`: 추천 여행지 정보를 담고 있는 엔티티입니다.
  - \`PreferredLocationsFilterInfo\`: 선호하는 위치에 대한 필터 정보를 담고 있습니다.
  - \`TripFilterStrategy\`: 여행지 필터링 전략의 인터페이스입니다.

## API 문서

### 추천 여행지 생성 API
**POST** \`/api/recommend\`

#### 설명
추천 여행지를 생성합니다.

#### 요청
##### Parameters
| 이름 | 타입 | 필수 여부 | 설명 |
|------|------|-----------|------|
| accessor | Accessor | Required | 인증된 사용자 정보 |

##### Headers
| 이름 | 필수 여부 | 설명 |
|------|-----------|------|
| Authorization | Required | Bearer {token} |

##### Request Body
\`\`\`json
{
    "tripId": 1
}
\`\`\`

#### 응답
##### Success Response
- Status: 204 No Content

##### Error Response
- Status: 400 Bad Request
\`\`\`json
{
    "error": "Null 일 수 없습니다."
}
\`\`\`
- Status: 404 Not Found
\`\`\`json
{
    "error": "존재하지 않는 회원입니다."
}
\`\`\`

### 추천 여행지 조회 API
**GET** \`/api/recommend\`

#### 설명
사용자의 선호 위치에 따라 추천 여행지를 조회합니다.

#### 요청
##### Parameters
| 이름 | 타입 | 필수 여부 | 설명 |
|------|------|-----------|------|
| accessor | Accessor | Required | 인증된 사용자 정보 |

##### Headers
| 이름 | 필수 여부 | 설명 |
|------|-----------|------|
| Authorization | Required | Bearer {token} |

#### 응답
##### Success Response
- Status: 200 OK
\`\`\`json
{
    "findTripResponses": [
        {
            "trip": {
                "id": 1,
                "name": "여행지 이름"
            },
            "keywords": ["키워드1", "키워드2"]
        }
    ]
}
\`\`\`

##### Error Response
- Status: 404 Not Found
\`\`\`json
{
    "error": "추천 여행지를 찾을 수 없습니다."
}
\`\`\`

## SUMMARY

### Component Overview
- **주요 책임 및 목적**: 사용자 인증을 통해 추천 여행지를 생성하고 조회하는 기능을 제공합니다.
- **주요 기능 및 역량**: 추천 여행지 생성, 사용자 선호 기반 여행지 필터링 및 조회 기능을 포함합니다.

### Architecture & Implementation
- **주요 구성 요소 및 역할**:
  - \`RecommendTripController\`: 클라이언트 요청을 처리하고, 서비스 계층과 상호작용합니다.
  - \`RecommendTripService\`: 비즈니스 로직을 처리합니다.
  - \`TripFilterStrategyProvider\`: 필터링 전략을 제공하고 실행합니다.
  - \`TripsWithKeywordProvider\`: 추천 여행지와 관련된 키워드를 조회합니다.
- **구성 요소 상호 작용 및 종속성**: 컨트롤러는 서비스에 의존하고, 서비스는 여러 리포지토리와 필터링 전략 제공자에 의존합니다.
- **주요 흐름 및 프로세스**: 클라이언트 요청 → 컨트롤러 → 서비스 → 리포지토리 → 데이터베이스 쿼리.

`;
