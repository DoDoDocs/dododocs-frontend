import React from 'react';
import { Coffee, ArrowRight, Code, XCircle } from 'lucide-react';
import * as S from './NoDocument.style.js';

const MoDocument = () => {
  return (

    <S.Container>
      <S.NoticeCard>
        <S.IconWrapper>
          <Coffee size={24} />
        </S.IconWrapper>
        <S.Title>
          현재 <span>Java</span> 프로젝트만 지원합니다
        </S.Title>
        <S.Description>
          DODODOCS는 현재 Java 프로젝트에 대한 문서화만 지원하고 있습니다.
          다른 언어 지원은 순차적으로 추가될 예정입니다.
        </S.Description>
        <S.FeatureList>
          <li>
            <XCircle size={20} />
            <span>타 프로그래밍 언어는 현재 지원되지 않습니다</span>
          </li>
        </S.FeatureList>
      </S.NoticeCard>
    </S.Container>
  );
};

export default MoDocument;