export const MemberController = `
# 시스템 아키텍처 문서

## 전체 구조
\`\`\`mermaid
graph TD
    A[Client] --> B[MemberController]
    B --> C[MemberService]
    C --> D[MemberRepository]
    C --> E[LiveInformationRepository]
    C --> F[MemberLiveInformationService]
    C --> G[TripService]
    C --> H[RecommendTripService]
    D --> I[Database]
    E --> I
    F --> I
    G --> I
    H --> I
\`\`\`

## 시스템 흐름
\`\`\`mermaid
sequenceDiagram
    Client->>MemberController: Request
    MemberController->>MemberService: Process
    MemberService->>MemberRepository: Data Access
    MemberService->>LiveInformationRepository: Data Access
    MemberService->>MemberLiveInformationService: Data Access
    MemberService->>TripService: Data Access
    MemberService->>RecommendTripService: Data Access
    MemberRepository->>Database: Query
    LiveInformationRepository->>Database: Query
    MemberLiveInformationService->>Database: Query
    TripService->>Database: Query
    RecommendTripService->>Database: Query
\`\`\`

## 주요 컴포넌트 설명

### MemberController
- 역할과 책임: 클라이언트의 요청을 처리하고, 적절한 서비스 메소드를 호출하여 응답을 반환합니다.
- 주요 메소드:
  - \`getUserInfo()\`: 현재 사용자 정보를 조회합니다.
  - \`signupProfile()\`: 프로필 정보를 등록합니다.
  - \`signupLiveInfo()\`: 생활 정보를 등록합니다.
  - \`signupInterestTrip()\`: 관심 여행지를 등록합니다.
  - \`checkDuplicateNickname()\`: 닉네임 중복 여부를 확인합니다.
  - \`updateMemberProfile()\`: 사용자 프로필을 업데이트합니다.
  - \`findMemberAuthorityAndProfileImg()\`: 사용자 권한 및 프로필 이미지를 조회합니다.

### MemberService
- 비즈니스 로직을 처리하며, 데이터베이스와의 상호작용을 관리합니다.
- 주요 메소드:
  - \`findById()\`: ID로 회원을 조회합니다.
  - \`signUpByProfile()\`: 프로필 정보를 등록합니다.
  - \`signUpByLiveInfo()\`: 생활 정보를 등록합니다.
  - \`signUpByInterestTrips()\`: 관심 여행지를 등록합니다.
  - \`updateByProfile()\`: 프로필 정보를 업데이트합니다.
  - \`checkIsAlreadyExistNickname()\`: 닉네임 중복 여부를 확인합니다.
  - \`findMemberAuthorityAndProfileImg()\`: 사용자 권한 및 프로필 이미지를 조회합니다.

### MemberRepository
- 회원 정보를 데이터베이스에 저장하고 조회하는 역할을 합니다.

### LiveInformationRepository
- 생활 정보 데이터를 데이터베이스에 저장하고 조회하는 역할을 합니다.

### MemberLiveInformationService
- 회원의 생활 정보를 관리하는 서비스입니다.

### TripService
- 여행 관련 데이터를 관리하는 서비스입니다.

### RecommendTripService
- 추천 여행지 관련 데이터를 관리하는 서비스입니다.

## API 엔드포인트

### 사용자 정보 조회
**GET** \`/api/member/me\`

#### 설명
현재 로그인한 사용자의 정보를 조회합니다.

#### 요청
##### Parameters
| 이름 | 타입 | 필수 여부 | 설명 |
|------|------|-----------|------|
| - | - | - | - |

##### Headers
| 이름 | 필수 여부 | 설명 |
|------|-----------|------|
| Authorization | Required | Bearer {token} |

#### 응답
##### Success Response
- Status: 200 OK
\`\`\`json
{
    "id": 1,
    "profileImageUrl": "http://example.com/image.jpg",
    "nickname": "user123",
    "birthday": "1990-01-01",
    "genderType": "MALE"
}
\`\`\`

##### Error Response
- Status: 404 Not Found
\`\`\`json
{
    "error": "존재하지 않는 회원입니다."
}
\`\`\`

### 프로필 등록
**POST** \`/api/member/signup/profile\`

#### 설명
사용자의 프로필 정보를 등록합니다.

#### 요청
##### Parameters
| 이름 | 타입 | 필수 여부 | 설명 |
|------|------|-----------|------|
| - | - | - | - |

##### Headers
| 이름 | 필수 여부 | 설명 |
|------|-----------|------|
| Authorization | Required | Bearer {token} |

##### Request Body
\`\`\`json
{
    "nickname": "user123",
    "birthday": "1990-01-01",
    "genderType": "MALE"
}
\`\`\`

#### 응답
##### Success Response
- Status: 204 No Content

##### Error Response
- Status: 400 Bad Request
\`\`\`json
{
    "error": "중복되는 닉네임이 존재합니다."
}
\`\`\`

### 닉네임 중복 확인
**POST** \`/api/member/check/nickname\`

#### 설명
닉네임의 중복 여부를 확인합니다.

#### 요청
##### Parameters
| 이름 | 타입 | 필수 여부 | 설명 |
|------|------|-----------|------|
| - | - | - | - |

##### Headers
| 이름 | 필수 여부 | 설명 |
|------|-----------|------|
| Authorization | Required | Bearer {token} |

##### Request Body
\`\`\`json
{
    "nickname": "user123"
}
\`\`\`

#### 응답
##### Success Response
- Status: 200 OK
\`\`\`json
{
    "message": "사용 가능한 닉네임입니다."
}
\`\`\`

##### Error Response
- Status: 409 Conflict
\`\`\`json
{
    "error": "중복되는 닉네임이 존재합니다."
}
\`\`\`

## SUMMARY

### Component Overview
- **MemberController**: 클라이언트 요청을 처리하고, 서비스 메소드를 호출하여 응답을 반환합니다.
- **MemberService**: 비즈니스 로직을 처리하고, 데이터베이스와의 상호작용을 관리합니다.
- **Repositories**: 데이터베이스와의 CRUD 작업을 수행합니다.
- **DTOs**: 데이터 전송 객체로, 클라이언트와 서버 간의 데이터 전송을 담당합니다.

### Architecture & Implementation
- **구성 요소 상호 작용**: 클라이언트는 \`MemberController\`에 요청을 보내고, \`MemberController\`는 \`MemberService\`를 호출하여 비즈니스 로직을 처리합니다. \`MemberService\`는 필요한 데이터를 \`MemberRepository\`, \`LiveInformationRepository\` 등에서 조회합니다.
- **주요 흐름 및 프로세스**: 클라이언트의 요청이 들어오면, 해당 요청에 맞는 메소드가 호출되고, 필요한 데이터가 처리된 후 응답이 반환됩니다.

`;
