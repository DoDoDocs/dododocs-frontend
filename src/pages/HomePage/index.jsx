import React, { useState, useRef, useEffect } from "react";
import { Header } from "../../layouts/index.js"
import { HomeContent } from "../../components/index.js"
import _ from '../../config/index.js';
const Home = () => {
  const searchMainRef = useRef(null); // 감지할 요소의 ref
  const [isEnded, setIsEnded] = useState(false); // 요소의 끝 감지 상태

  useEffect(() => {
    const sentinel = searchMainRef.current;

    // dvh를 px로 변환
    const dvhToPx = (dvh) => {
      return window.innerHeight * (dvh / 100);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 0) {
          setIsEnded(true); // 요소가 끝났을 때 true로 설정
        } else {
          setIsEnded(false); // 요소가 끝나지 않았을 때 false로 설정
        }
      },
      {
        root: null, // 뷰포트 기준
        threshold: 0, // 요소가 완전히 사라질 때 감지
        rootMargin: `-${dvhToPx(_.HEADER.HEIGHT_DVH)}px`, // 추가적으로 감지 여유를 줄 수 있음
      }
    );

  }, []);

  return (
    <>
      <Header isEnded={isEnded} ></Header>
      <HomeContent />

    </>
  );
};

export default Home;
