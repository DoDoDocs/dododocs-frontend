import React from 'react';
import { MessageSquareOff, ArrowRight, FileText, BookOpen, GitPullRequest } from 'lucide-react';
import * as S from './GuideChatting.styles.js';
import { useNavigate } from 'react-router-dom';

const NoChatNotice = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.NoticeCard>
        <S.IconWrapper>
          <MessageSquareOff size={24} />
        </S.IconWrapper>
        <S.Title>
          가이드에선 <span>채팅 기능</span>이 제공되지 않습니다
        </S.Title>
        <S.Description>
          DODODOCS는 AI 문서화에 집중하여 더 나은 문서 생성 경험을 제공합니다.
          지금 바로 문서 생성을 시작해보세요.
        </S.Description>
        <S.FeatureList>
          <li>
            <FileText size={20} />
            <span>프로젝트 코드 기반 문서 자동 생성</span>
          </li>
          <li>
            <BookOpen size={20} />
            <span>API 문서 및 아키텍처 문서화</span>
          </li>
          <li>
            <GitPullRequest size={20} />
            <span>코드 변경사항 자동 문서 업데이트</span>
          </li>
        </S.FeatureList>
        <S.Button onClick={() => navigate('/repositories')} >
          문서 생성하기
          <ArrowRight size={18} />
        </S.Button>
      </S.NoticeCard>
    </S.Container>
  );
};

export default NoChatNotice;