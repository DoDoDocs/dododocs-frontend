export const LiveInformationController = `
# 시스템 아키텍처 문서

## 전체 구조
\`\`\`mermaid
graph TD
    A[Client] --> B[LiveInformationController]
    B --> C[LiveInformationService]
    C --> D[LiveInformationRepository]
    C --> E[TripLiveInformationRepository]
    C --> F[TripRepository]
    D --> G[Database]
    E --> G
    F --> G
\`\`\`

## 시스템 흐름
\`\`\`mermaid
sequenceDiagram
    Client->>LiveInformationController: GET /api/live/info/all
    LiveInformationController->>LiveInformationService: findAllLiveInformation()
    LiveInformationService->>LiveInformationRepository: findAll()
    LiveInformationRepository-->>LiveInformationService: List<LiveInformation>
    LiveInformationService-->>LiveInformationController: FindAllLiveInformationResponse
    LiveInformationController-->>Client: 200 OK

    Client->>LiveInformationController: POST /api/live/info
    LiveInformationController->>LiveInformationService: createLiveInformation(request)
    LiveInformationService->>LiveInformationRepository: save(liveInformation)
    LiveInformationRepository-->>LiveInformationService: LiveInformation
    LiveInformationService-->>LiveInformationController: void
    LiveInformationController-->>Client: 204 No Content

    Client->>LiveInformationController: POST /api/live/info/trip/{tripId}/{liveInfoId}
    LiveInformationController->>LiveInformationService: createTripLiveInformation(tripId, liveInfoId)
    LiveInformationService->>TripRepository: findById(tripId)
    TripRepository-->>LiveInformationService: Trip
    LiveInformationService->>LiveInformationRepository: findById(liveInfoId)
    LiveInformationRepository-->>LiveInformationService: LiveInformation
    LiveInformationService->>TripLiveInformationRepository: save(new TripLiveInformation(liveInformation, trip))
    TripLiveInformationRepository-->>LiveInformationService: void
    LiveInformationService-->>LiveInformationController: void
    LiveInformationController-->>Client: 204 No Content
\`\`\`

## 주요 컴포넌트 설명

### LiveInformationController
- 역할과 책임: 클라이언트의 요청을 처리하고, 서비스 계층과 상호작용하여 응답을 반환합니다.
- 주요 메서드:
  - \`findAllLiveInformation()\`: 모든 생활 정보를 조회합니다.
  - \`createLiveInformation()\`: 새로운 생활 정보를 생성합니다.
  - \`createTripLiveInformation()\`: 여행지와 생활 정보를 연결합니다.

### LiveInformationService
- 비즈니스 로직을 처리하며, 데이터베이스와의 상호작용을 관리합니다.
- 주요 메서드:
  - \`findAllLiveInformation()\`: 모든 생활 정보를 조회하여 응답 객체를 생성합니다.
  - \`createLiveInformation()\`: 새로운 생활 정보를 생성하고 저장합니다.
  - \`createTripLiveInformation()\`: 여행지와 생활 정보를 연결하여 저장합니다.
  - \`findByName()\`: 이름으로 생활 정보를 조회합니다.

### LiveInformationRepository
- 데이터베이스와의 CRUD 작업을 수행합니다.

### TripLiveInformationRepository
- 여행지와 생활 정보 간의 관계를 관리합니다.

### TripRepository
- 여행지에 대한 CRUD 작업을 수행합니다.

## API 엔드포인트

### Find All Live Information
**GET** \`/api/live/info/all\`

#### 설명
모든 생활 정보를 조회합니다.

#### 요청
- Headers: 없음

#### 응답
##### Success Response
- Status: 200 OK
\`\`\`json
{
    "liveInformationResponses": [
        {
            "name": "생활정보1"
        },
        {
            "name": "생활정보2"
        }
    ]
}
\`\`\`

##### Error Response
- Status: 500 Internal Server Error
\`\`\`json
{
    "error": "서버 오류 메시지"
}
\`\`\`

### Create Live Information
**POST** \`/api/live/info\`

#### 설명
새로운 생활 정보를 생성합니다.

#### 요청
##### Request Body
\`\`\`json
{
    "name": "새로운 생활정보"
}
\`\`\`

#### 응답
##### Success Response
- Status: 204 No Content

##### Error Response
- Status: 400 Bad Request
\`\`\`json
{
    "error": "생활정보 이름은 공백일 수 없습니다."
}
\`\`\`

### Create Trip Live Information
**POST** \`/api/live/info/trip/{tripId}/{liveInfoId}\`

#### 설명
여행지와 생활 정보를 연결합니다.

#### 요청
- Path Variables:
  - \`tripId\`: 여행지 ID
  - \`liveInfoId\`: 생활 정보 ID

#### 응답
##### Success Response
- Status: 204 No Content

##### Error Response
- Status: 404 Not Found
\`\`\`json
{
    "error": "존재하지 않는 여행지입니다."
}
\`\`\`json
{
    "error": "존재하지 않는 생활정보입니다."
}
\`\`\`

## SUMMARY

### Component Overview
- **LiveInformationController**: 클라이언트 요청을 처리하고 서비스 계층과 상호작용.
- **LiveInformationService**: 비즈니스 로직 처리 및 데이터베이스와의 상호작용.
- **Repositories**: 데이터베이스 CRUD 작업 수행.

### Architecture & Implementation
- **구성 요소 상호 작용**: Controller는 Service를 호출하고, Service는 Repository를 통해 데이터베이스와 상호작용.
- **주요 흐름**: 클라이언트 요청 -> Controller -> Service -> Repository -> Database.

`;
