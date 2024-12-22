import { AuthController } from './AuthController.js';
import { KeywordController } from './KeywordController.js';
import { LiveInformationController } from './LiveInformationController.js';
import { MemberController } from './MemberController.js';
import { MemberLiveInformationController } from './MemberLiveInformationController.js';
import { PlannerController } from './PlannerController.js';
import { RecommendTripController } from './RecommendTripController.js';
import { TripController } from './TripController.js';

export const docsGuideText = {
  regularFiles: [
    {
      fileName: 'AuthController.md',
      fileContents: AuthController,
    },
    {
      fileName: 'KeywordController.md',
      fileContents: KeywordController,
    },
    {
      fileName: 'LiveInformationController.md',
      fileContents: LiveInformationController,
    },
    {
      fileName: 'MemberController.md',
      fileContents: MemberController,
    },
    {
      fileName: 'MemberLiveInformationController.md',
      fileContents: MemberLiveInformationController,
    },
    {
      fileName: 'PlannerController.md',
      fileContents: PlannerController,
    },
    {
      fileName: 'RecommendTripController.md',
      fileContents: RecommendTripController,
    },
    {
      fileName: 'TripController.md',
      fileContents: TripController,
    },
  ],
  summaryFiles: [
    {
      fileName: 'Controller_Summary.md',
      fileContents: '전체 컨트롤러 요약 내용',
    },
    {
      fileName: 'Service_Summary.md',
      fileContents: '전체 서비스 요약 내용',
    },
  ],
};
