export const markdownText = `

# Project Name
moheng

## Table of Contents
[ 📝 Overview](#📝-overview)  
[ 📁 Project Structure](#📁-project-structure)  
[ 🚀 Getting Started](#🚀-getting-started)  
[ 💡 Motivation](#💡-motivation)  
[ 🎬 Demo](#🎬-demo)  
[ 🌐 Deployment](#🌐-deployment)  
[ 🤝 Contributing](#🤝-contributing)  
[ ❓ Troubleshooting & FAQ](#❓-troubleshooting-&-faq)  
[ 📈 Performance](#📈-performance)  

## 📝 Overview
이 프로젝트는 여행 계획 및 추천 시스템을 구축하기 위한 것입니다. 사용자는 여행지에 대한 정보를 입력하고, 시스템은 사용자의 선호도에 따라 맞춤형 여행지를 추천합니다.

### Main Purpose
- 사용자가 선호하는 여행지를 기반으로 추천 시스템을 제공
- 여행 계획을 쉽게 할 수 있도록 도와주는 기능 제공
- 사용자 경험을 향상시키기 위한 다양한 기능 포함

### Key Features
- 소셜 로그인 기능 (Kakao, Google)
- 사용자 맞춤형 여행지 추천
- 여행 일정 관리 기능
- 실시간 여행 정보 제공

### Core Technology Stack
- Frontend: React, Vite
- Backend: Spring Boot
- Database: MySQL
- Others: Python (AI 모델)

## 📁 Project Structure
\`\`\`
moheng
├── 📁 ai
│   ├── 📁 model_serving
│   │   ├── 📁 application
│   │   ├── 📁 domain
│   │   ├── 📁 infra
│   │   ├── 📁 interface
│   │   └── ...
│   └── ...
├── 📁 frontend
│   ├── 📁 src
│   │   ├── 📁 api
│   │   ├── 📁 components
│   │   └── ...
│   └── ...
├── 📁 moheng
│   ├── 📁 auth
│   ├── 📁 member
│   ├── 📁 planner
│   ├── 📁 trip
│   └── ...
└── ...
\`\`\`

## 🚀 Getting Started
### Prerequisites
- 지원되는 운영 체제
  * Windows, macOS, Linux
- 필요한 소프트웨어
  * Java 11 이상
  * Node.js 14 이상
  * MySQL
- 시스템 의존성
  * Docker (선택 사항)

- First level
  - Second level
    - Third level
### Installation
\`\`\`bash
# 저장소 클론
git clone https://github.com/kakao-25/moheng.git
cd moheng

# 필요한 패키지 설치
cd frontend
npm install

# 백엔드 설정
cd ../moheng
./gradlew build
\`\`\`

### Usage
\`\`\`bash
# 프론트엔드 실행
cd frontend
npm run dev

# 백엔드 실행
cd ../moheng
./gradlew bootRun
\`\`\`

## 💡 Motivation
이 프로젝트는 여행 계획을 보다 쉽게 만들고, 사용자에게 맞춤형 추천을 제공하기 위해 시작되었습니다. 개인적인 여행 경험에서 영감을 받아, 더 나은 여행 경험을 제공하고자 합니다.

## 🎬 Demo
![Demo Video or Screenshot](path/to/demo.mp4)

## 🌐 Deployment
- AWS, Heroku와 같은 클라우드 플랫폼에 배포 가능
- 배포 단계 및 환경별 설정은 README에 추가 예정

## 🤝 Contributing
- 기여 방법: 이슈를 통해 피드백 및 제안
- 코드 표준: Java 및 JavaScript 코딩 표준 준수
- Pull Request 프로세스: Fork 후 변경 사항을 커밋하고 Pull Request 제출

## ❓ Troubleshooting & FAQ
- **문제:** 로그인 시 오류 발생
  - **해결:** 소셜 로그인 설정을 확인하세요.
- **문제:** 추천 여행지가 나타나지 않음
  - **해결:** 사용자 선호도를 확인하고 다시 시도하세요.

## 📈 Performance
- 성능 벤치마크 및 최적화 기법은 추후 추가 예정
- 시스템의 확장성 고려하여 설계됨

이 README는 프로젝트의 개요와 사용 방법을 설명합니다. 추가적인 정보는 각 디렉토리 내의 문서에서 확인할 수 있습니다.
`;