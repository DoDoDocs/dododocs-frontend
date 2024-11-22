//  src/components/organisms/HomeContent/HomeContent.styles.js
import styled from 'styled-components';
import bgBannerImg from '../../../assets/images/main-banner-bg.cb7bf167.png';
import bgSliderBgImg from '../../../assets/images/slider-main-bg.png';
import _ from '../../../config/index.js';

export const HomeWrapper = styled.div`
  width: calc(100dvw - (100dvw - 100%));
  height: auto;
  padding: 0 0 100px 0;

  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 5vw, 3.5rem);
  justify-content: center;
  align-items: center;
`;
export const MainSectionWrapper = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: auto auto;
  justify-content: center;
  flex-direction: column;
  gap: clamp(2rem, 4vw, 3rem);

  background-image: url(${bgBannerImg});
  background-size: unset;
  background-repeat: no-repeat;
  background-position: 50% 70%;
`;

export const HomeLayout = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  justify-content: center;
  align-items: center;
  position: relative;

  padding-bottom: 4rem;

  &::before {
    opacity: 0.1;
    background-color: #000;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
  }
`;

export const TextSectionWrapper = styled.div`
  margin-top: ${_.HEADER.TOTAL_DVH}dvh;
  position: relative;
  width: 95dvw;
  height: 60dvh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextContainer = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.layout.home.mainTextSize};
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  gap: 1rem;
  text-align: center;
`;

export const MainText = styled.span`
  background: black;
  -webkit-background-clip: text;
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
  background-clip: text;
  padding-bottom: 1rem;
  text-fill-color: ${({ theme }) => theme.colors.white};
`;

export const SubText = styled.span`
  background: black;
  font-size: 20px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: ${({ theme }) => theme.colors.link};
  font-family: 'Roboto', sans-serif;

  background-clip: text;
  padding-top: 2rem;
  text-fill-color: ${({ theme }) => theme.colors.white};
  letter-spacing: 2px;
`;

export const MainImageSectionWrapper = styled.div`
  width: 95dvw;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2dvh 2dvw;
`;

export const BgShape = styled.div`
  position: static !important;
`;

export const MainImageFrame = styled.div`
  background: url(${bgSliderBgImg});
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 70px 70px 42px;
  z-index: 3;
  overflow: hidden;

  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 60%,
    rgba(0, 0, 0, 0) 100%
  );
`;
export const MainFeatureSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95dvw;
  gap: 1rem;
`;

export const MainFeatureSection = styled.main`
  margin: 1dvh 0 4rem 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  overflow: hidden;
  gap: 40px;
  width: clamp(min(100%, 540px), calc(90vw - 2rem), 1320px);
  padding: 4.125rem 2.815rem 4.125rem 4.188rem;
  background: #15091d;
  border-radius: 20px;
  border: 1px solid #2a1454;
  border-radius: 15px;

  font-family: 'Roboto', sans-serif;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureContentText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  justify-content: space-evenly;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  h2 {
    color: ${({ theme }) => theme.colors.white};
    font-size: clamp(4rem, 4vw, 2.5rem);
    margin-bottom: 2rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: clamp(1rem, 2vw, 1.2rem);
  }
`;

export const FeatureContentImage = styled.div`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;
