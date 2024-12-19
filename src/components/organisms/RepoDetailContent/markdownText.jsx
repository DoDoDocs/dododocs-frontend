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
- 사용자가 선호하는 여행지를 기반으로 맞춤형 추천을 제공하는 시스템입니다.
- 여행 계획을 보다 효율적으로 관리하고, 사용자 경험을 향상시키는 것을 목표로 합니다.
- 여행을 좋아하는 사용자들을 주요 대상으로 합니다.

### Key Features
- 사용자 맞춤형 여행지 추천
- 여행 일정 관리
- 소셜 로그인 기능
- 다양한 여행지 정보 제공

### Core Technology Stack
- Frontend: React, Vite
- Backend: Spring Boot
- Database: PostgreSQL
- Others: Python, FastAPI (AI 모델 서빙)

## 📁 Project Structure
\`\`\`
moheng
├── 📁 ai
│   ├── 📁 model_serving
│   │   ├── 📁 application
│   │   ├── 📁 domain
│   │   ├── 📁 infra
│   │   ├── 📁 interface
│   │   └── 📁 presentation
│   └── ...
├── 📁 frontend
│   ├── 📁 src
│   │   ├── 📁 api
│   │   └── ...
│   └── ...
├── 📁 moheng
│   ├── 📁 auth
│   ├── 📁 member
│   ├── 📁 planner
│   ├── 📁 trip
│   ├── 📁 recommendtrip
│   └── ...
└── ...
\`\`\`

## 🚀 Getting Started

### Prerequisites
- 지원 운영체제
  * Windows, macOS, Linux
- 필수 소프트웨어
  * Node.js, Python, Java
  * Node.js: 18.3.1 이상, Python: 3.11.x, Java: 22 이상
  * 패키지 관리자: npm, poetry
- 시스템 종속성
  * Docker

### Installation
- Dockerfile을 사용하여 설치할 수 있습니다.
- 모든 설치 방법은 Dockerfile에 포함되어 있습니다.

\`\`\`bash
# 리포지토리 클론
git clone https://github.com/kakao-25/moheng.git
cd moheng-develop

# 필요한 패키지 설치
# Frontend 설치
cd frontend
npm install

# Backend 설치
cd ../backend
./gradlew clean build

# AI 설치
cd ../ai
pip install poetry
poetry install

# Docker 빌드 및 실행
cd ..
docker-compose up --build
\`\`\`

### Usage
\`\`\`bash
# 실행 방법
# Frontend 실행
cd frontend
npm start

# Backend 실행
cd backend
./gradlew bootRun

# AI 서비스 실행
cd ai
python3 main.py
\`\`\`

## 💡 Motivation
이 프로젝트는 여행을 좋아하는 사람들을 위해 더 나은 여행 경험을 제공하고자 하는 열망에서 시작되었습니다. 사용자가 선호하는 여행지를 기반으로 맞춤형 추천을 제공함으로써 여행 계획을 보다 쉽게 할 수 있도록 돕고자 합니다.

## 🎬 Demo
![Demo Video or Screenshot](path/to/demo.mp4)

## 🌐 Deployment
- AWS, Heroku와 같은 클라우드 플랫폼을 통해 배포할 수 있습니다.
- 배포 단계는 다음과 같습니다:
  1. 서버 환경 설정
  2. 데이터베이스 설정
  3. 애플리케이션 빌드 및 배포

## 🤝 Contributing
- 기여 방법: 이 레포지토리에 기여하고 싶다면, 먼저 이슈를 생성하거나 PR을 제출하세요.
- 코딩 표준: Java, Python, JavaScript의 코딩 표준을 준수합니다.
- PR 프로세스: 변경 사항을 설명하는 명확한 커밋 메시지를 포함하여 PR을 제출하세요.
- 행동 강령: 모든 기여자는 상호 존중과 협력을 기반으로 행동해야 합니다.

## ❓ Troubleshooting & FAQ
- **문제**: 서버가 시작되지 않음
  - **해결**: 필요한 의존성이 모두 설치되었는지 확인하세요.
- **문제**: 데이터베이스 연결 오류
  - **해결**: 데이터베이스 설정을 확인하고, 올바른 자격 증명을 사용하고 있는지 확인하세요.

## 📈 Performance
- 성능 벤치마크 및 최적화 기술을 통해 시스템의 응답 속도를 개선할 수 있습니다.
- 확장성 고려 사항: 시스템이 증가하는 사용자 수를 처리할 수 있도록 설계되었습니다.
`;