export const TripController = `
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
  - \`TripController\`: 여행 관련 API를 처리합니다.
- **공통 처리 로직**: 요청 매핑, 응답 생성 및 상태 코드 반환.

### Service Layer
- **비즈니스 로직 구조**: 비즈니스 로직을 처리하며, 데이터 접근을 위한 리포지토리와 상호작용합니다.
- **주요 서비스 목록**:
  - \`TripService\`: 여행 관련 비즈니스 로직을 처리합니다.
- **트랜잭션 경계**: @Transactional 어노테이션을 사용하여 트랜잭션을 관리합니다.

## API 문서

### Trip API

#### 개요
- **컨트롤러 설명**: 여행 관련 API를 제공하는 컨트롤러입니다.
- **기본 URL 경로**: \`/api/trip\`
- **공통 요청/응답 형식**: JSON 형식의 요청 및 응답을 사용합니다.

#### API 엔드포인트

### 1. Create Trip
**POST** \`/api/trip\`

#### 설명
여행지를 생성합니다.

#### 요청
##### Request Body
\`\`\`json
{
    "name": "여행지 이름",
    "placeName": "여행지 장소명",
    "contentId": 123,
    "description": "여행지 설명",
    "tripImageUrl": "이미지 URL"
}
\`\`\`

#### 응답
##### Success Response
- Status: 204 No Content

##### Error Response
- Status: 400 Bad Request
\`\`\`json
{
    "error": "여행지 이름은 공백일 수 없습니다."
}
\`\`\`

### 2. Find Top Trips
**GET** \`/api/trip/find/interested\`

#### 설명
방문 수에 따라 상위 30개의 여행지를 조회합니다.

#### 응답
##### Success Response
- Status: 200 OK
\`\`\`json
{
    "findTripResponses": [
        {
            "trip": {
                "id": 1,
                "name": "여행지 이름",
                "placeName": "여행지 장소명",
                "contentId": 123,
                "description": "여행지 설명",
                "tripImageUrl": "이미지 URL"
            },
            "keywords": ["키워드1", "키워드2"]
        }
    ]
}
\`\`\`

### 3. Find Trip with Similar Trips
**GET** \`/api/trip/find/{tripId}\`

#### 설명
특정 여행지와 유사한 여행지를 조회합니다.

#### 요청
##### Path Variables
| 이름 | 타입 | 필수 여부 | 설명 |
|------|------|-----------|------|
| tripId | long | Required | 여행지 ID |

##### Headers
| 이름 | 필수 여부 | 설명 |
|------|-----------|------|
| Authorization | Required | Bearer {token} |

#### 응답
##### Success Response
- Status: 200 OK
\`\`\`json
{
    "findTripResponse": {
        "trip": {
            "id": 1,
            "name": "여행지 이름",
            "placeName": "여행지 장소명",
            "contentId": 123,
            "description": "여행지 설명",
            "tripImageUrl": "이미지 URL"
        },
        "keywords": ["키워드1", "키워드2"]
    },
    "similarTripResponses": {
        "trips": [
            {
                "id": 2,
                "name": "유사 여행지 이름",
                "placeName": "유사 여행지 장소명"
            }
        ]
    }
}
\`\`\`

### 4. Create Member Trip
**POST** \`/api/trip/member/{tripId}\`

#### 설명
특정 여행지를 회원의 여행 목록에 추가합니다.

#### 요청
##### Path Variables
| 이름 | 타입 | 필수 여부 | 설명 |
|------|------|-----------|------|
| tripId | long | Required | 여행지 ID |

##### Headers
| 이름 | 필수 여부 | 설명 |
|------|-----------|------|
| Authorization | Required | Bearer {token} |

#### 응답
##### Success Response
- Status: 204 No Content

##### Error Response
- Status: 404 Not Found
\`\`\`json
{
    "error": "여행지가 존재하지 않습니다."
}
\`\`\`

## SUMMARY

### Component Overview
- **주요 책임 및 목적**: 각 레이어는 명확한 책임을 가지고 있으며, 클라이언트의 요청을 처리하고 비즈니스 로직을 실행합니다.
- **주요 기능 및 역량**: 여행지 생성, 조회, 추천 기능을 포함합니다.

### Architecture & Implementation
- **주요 구성 요소 및 역할**: 
  - \`TripController\`: API 요청 처리
  - \`TripService\`: 비즈니스 로직 처리
  - \`TripRepository\`: 데이터 접근
- **구성 요소 상호 작용 및 종속성**: 컨트롤러는 서비스에 의존하고, 서비스는 리포지토리에 의존합니다.
- **주요 흐름 및 프로세스**: 클라이언트 요청 -> 컨트롤러 -> 서비스 -> 리포지토리 -> 데이터베이스.

`;
