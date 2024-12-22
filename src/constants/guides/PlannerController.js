export const PlannerController = `
# 시스템 아키텍처

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
- **역할과 책임**: 클라이언트의 요청을 처리하고, 서비스 레이어와의 상호작용을 통해 비즈니스 로직을 수행합니다.
- **주요 컨트롤러 목록**:
  - \`PlannerController\`: 여행 일정 관련 API를 제공합니다.
- **공통 처리 로직**: \`@Authentication\` 어노테이션을 통해 인증된 사용자의 정보를 가져옵니다.

### Service Layer
- **비즈니스 로직 구조**: 비즈니스 로직을 구현하며, 데이터베이스와의 상호작용을 위한 리포지토리 호출을 포함합니다.
- **주요 서비스 목록**:
  - \`PlannerService\`: 여행 일정 관련 비즈니스 로직을 처리합니다.
- **트랜잭션 경계**: \`@Transactional\` 어노테이션을 사용하여 트랜잭션을 관리합니다.

## API 문서

# Planner API

## 개요
- **컨트롤러 설명**: 여행 일정 관련 API를 제공하는 컨트롤러입니다.
- **기본 URL 경로**: \`/api/planner\`
- **공통 요청/응답 형식**: JSON 형식의 요청 및 응답을 사용합니다.

## API 엔드포인트

### 최근 여행 일정 조회
**GET** \`/api/planner/recent\`

#### 설명
최근 여행 일정을 조회합니다.

#### 요청
##### Parameters
| 이름 | 타입 | 필수 여부 | 설명 |
|------|------|-----------|------|
| 없음 | - | - | - |

##### Headers
| 이름 | 필수 여부 | 설명 |
|------|-----------|------|
| Authorization | Required | Bearer {token} |

#### 응답
##### Success Response
- Status: 200 OK
\`\`\`json
{
    "tripSchedules": [
        {
            "id": 1,
            "name": "여행 일정 1",
            "startDate": "2023-10-01",
            "endDate": "2023-10-05"
        }
    ]
}
\`\`\`

##### Error Response
- Status: 401 Unauthorized
\`\`\`json
{
    "error": "인증이 필요합니다."
}
\`\`\`

### 여행 일정 이름으로 조회
**GET** \`/api/planner/name\`

#### 설명
이름으로 여행 일정을 조회합니다.

#### 요청
##### Parameters
| 이름 | 타입 | 필수 여부 | 설명 |
|------|------|-----------|------|
| 없음 | - | - | - |

##### Headers
| 이름 | 필수 여부 | 설명 |
|------|-----------|------|
| Authorization | Required | Bearer {token} |

#### 응답
##### Success Response
- Status: 200 OK
\`\`\`json
{
    "tripSchedules": [
        {
            "id": 2,
            "name": "여행 일정 2",
            "startDate": "2023-10-10",
            "endDate": "2023-10-15"
        }
    ]
}
\`\`\`

##### Error Response
- Status: 404 Not Found
\`\`\`json
{
    "error": "여행 일정을 찾을 수 없습니다."
}
\`\`\`

### 여행 일정 업데이트
**PUT** \`/api/planner/schedule\`

#### 설명
여행 일정을 업데이트합니다.

#### 요청
##### Parameters
| 이름 | 타입 | 필수 여부 | 설명 |
|------|------|-----------|------|
| 없음 | - | - | - |

##### Headers
| 이름 | 필수 여부 | 설명 |
|------|-----------|------|
| Authorization | Required | Bearer {token} |

##### Request Body
\`\`\`json
{
    "scheduleId": 1,
    "scheduleName": "업데이트된 여행 일정",
    "startDate": "2023-10-01",
    "endDate": "2023-10-05"
}
\`\`\`

#### 응답
##### Success Response
- Status: 204 No Content

##### Error Response
- Status: 400 Bad Request
\`\`\`json
{
    "error": "잘못된 요청입니다."
}
\`\`\`

### 여행 일정 삭제
**DELETE** \`/api/planner/schedule/{scheduleId}\`

#### 설명
여행 일정을 삭제합니다.

#### 요청
##### Parameters
| 이름 | 타입 | 필수 여부 | 설명 |
|------|------|-----------|------|
| scheduleId | Long | Required | 삭제할 여행 일정의 ID |

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
    "error": "존재하지 않는 여행 일정입니다."
}
\`\`\`

## SUMMARY

### Component Overview
- **주요 책임 및 목적**: 클라이언트의 요청을 처리하고, 비즈니스 로직을 수행하여 데이터베이스와 상호작용합니다.
- **주요 기능 및 역량**: 여행 일정의 생성, 조회, 업데이트, 삭제 기능을 제공합니다.

### Architecture & Implementation
- **주요 구성 요소 및 역할**:
  - \`PlannerController\`: API 요청을 처리합니다.
  - \`PlannerService\`: 비즈니스 로직을 구현합니다.
  - \`TripScheduleRepository\`: 데이터베이스와의 상호작용을 담당합니다.
- **구성 요소 상호 작용 및 종속성**: 컨트롤러는 서비스에 의존하며, 서비스는 리포지토리에 의존합니다.
- **주요 흐름 및 프로세스**: 클라이언트 요청 -> 컨트롤러 처리 -> 서비스 로직 실행 -> 데이터베이스 쿼리 -> 응답 반환.

`;
