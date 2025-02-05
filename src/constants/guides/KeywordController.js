export const KeywordController = `
# 시스템 아키텍처 문서

## 전체 구조
\`\`\`mermaid
graph TD
    A[Client] --> B[KeywordController]
    B --> C[KeywordService]
    C --> D[KeywordRepository]
    C --> D2[TripKeywordRepository]
    C --> D3[TripRepository]
    C --> E[TripsByStatisticsFinder]
    C --> E2[RandomKeywordGeneratable]
    D --> F[Database]
    D2 --> F
    D3 --> F
\`\`\`

## 시스템 흐름
\`\`\`mermaid
sequenceDiagram
    Client->>KeywordController: Request
    KeywordController->>KeywordService: Process
    KeywordService->>KeywordRepository: Data Access
    KeywordService->>TripKeywordRepository: Data Access
    KeywordService->>TripRepository: Data Access
    KeywordService->>TripsByStatisticsFinder: Process Statistics
    KeywordService->>RandomKeywordGeneratable: Generate Random Keyword
\`\`\`

## 주요 컴포넌트 설명

### KeywordController
- 역할과 책임: API 요청을 처리하고, 서비스 계층과의 상호작용을 통해 클라이언트에게 응답을 반환합니다.
- 주요 컨트롤러 목록:
  - \`recommendTripsByKeywords\`
  - \`findAllKeywords\`
  - \`createKeyword\`
  - \`createTripKeyword\`
  - \`findTripsByRandomKeyword\`
- 공통 처리 로직: 모든 요청에 대해 인증을 수행합니다.

### KeywordService
- 비즈니스 로직 구조: 키워드 관련 비즈니스 로직을 처리합니다.
- 주요 서비스 목록:
  - \`findAllKeywords\`
  - \`createKeyword\`
  - \`findRecommendTripsByKeywords\`
  - \`findRecommendTripsByRandomKeyword\`
- 트랜잭션 경계: 데이터베이스 변경이 필요한 메서드는 \`@Transactional\` 어노테이션을 사용하여 트랜잭션을 관리합니다.

## API 엔드포인트

### 추천 여행지 조회
**POST** \`/api/keyword/trip/recommend\`

#### 설명
주어진 키워드에 따라 추천 여행지를 조회합니다.

#### 요청
##### Parameters
| 이름 | 타입 | 필수 여부 | 설명 |
|------|------|-----------|------|
| accessor | Accessor | Required | 인증 정보 |

##### Request Body
\`\`\`json
{
    "keywordIds": [1, 2, 3]
}
\`\`\`

#### 응답
##### Success Response
- Status: 200 OK
\`\`\`json
{
    "findTripResponses": [
        {
            "trip": {
                "id": 1,
                "name": "Trip Name"
            },
            "keywords": ["Keyword1", "Keyword2"]
        }
    ]
}
\`\`\`

##### Error Response
- Status: 400 Bad Request
\`\`\`json
{
    "error": "일부 키워드가 존재하지 않습니다."
}
\`\`\`

### 모든 키워드 조회
**GET** \`/api/keyword\`

#### 설명
모든 키워드를 조회합니다.

#### 요청
##### Parameters
| 이름 | 타입 | 필수 여부 | 설명 |
|------|------|-----------|------|
| accessor | Accessor | Required | 인증 정보 |

#### 응답
##### Success Response
- Status: 200 OK
\`\`\`json
{
    "findAllKeywordResponses": [
        {
            "keyword": "Keyword1"
        },
        {
            "keyword": "Keyword2"
        }
    ]
}
\`\`\`

### 키워드 생성
**POST** \`/api/keyword\`

#### 설명
새로운 키워드를 생성합니다.

#### 요청
##### Request Body
\`\`\`json
{
    "keyword": "New Keyword"
}
\`\`\`

#### 응답
##### Success Response
- Status: 204 No Content

### 여행지 키워드 생성
**POST** \`/api/keyword/trip\`

#### 설명
여행지에 키워드를 추가합니다.

#### 요청
##### Request Body
\`\`\`json
{
    "tripId": 1,
    "keywordId": 2
}
\`\`\`

#### 응답
##### Success Response
- Status: 204 No Content

### 랜덤 키워드로 여행지 조회
**GET** \`/api/keyword/random/trip\`

#### 설명
랜덤 키워드를 사용하여 추천 여행지를 조회합니다.

#### 응답
##### Success Response
- Status: 200 OK
\`\`\`json
{
    "keywordName": "Random Keyword",
    "findTripResponses": [
        {
            "trip": {
                "id": 1,
                "name": "Trip Name"
            },
            "keywords": ["Keyword1", "Keyword2"]
        }
    ]
}
\`\`\`

## SUMMARY

### Component Overview
- 주요 책임 및 목적: 키워드와 관련된 데이터의 생성, 조회 및 추천 기능을 제공합니다.
- 주요 기능 및 역량: 키워드 관리, 여행지 추천, 통계 기반 추천 기능을 포함합니다.

### Architecture & Implementation
- 주요 구성 요소 및 역할: 
  - \`KeywordController\`: API 요청 처리
  - \`KeywordService\`: 비즈니스 로직 처리
  - \`KeywordRepository\`, \`TripKeywordRepository\`, \`TripRepository\`: 데이터 접근
  - \`TripsByStatisticsFinder\`, \`RandomKeywordGeneratable\`: 통계 및 랜덤 키워드 생성
- 구성 요소 상호 작용 및 종속성: 컨트롤러는 서비스에 의존하고, 서비스는 여러 리포지토리에 의존합니다.
- 주요 흐름 및 프로세스: 클라이언트 요청 -> 컨트롤러 -> 서비스 -> 리포지토리 -> 데이터베이스.
`;
