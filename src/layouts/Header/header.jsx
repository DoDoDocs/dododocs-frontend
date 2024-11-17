import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { Image, Typo, TextBox, Button } from "../../components/index.js";
import { Row, Col } from "../index.js"
import headerIcon from "../../assets/icons/dododocs_Icon.png"
import useAuthStore from "../../store/authStore.js"
import {
  SenHeader, LayoutHeaderWrapper, HeaderWrapper, IconHeader, SearchWrapper, IconHeaderButton,
  VerticalDivider, CategoryBox, LoginBtnBox, LoginValueBtn, LoginButton
} from "./header.styles.js"
// import { selectIsUserInitialized } from "../../entities/session/index.js";
import { userAPI } from "../../api/index.js"

const HomeHeader = ({ role }) => {
  // 여러 상태 한번에 가져오기
  const { user } = useAuthStore()

  const location = useLocation();
  // const logined = useSelector(selectIsUserInitialized);
  const name = '채은';
  //SECTION 스크롤 
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: `0px 0px 0px 0px`
      }
    );

    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [location.pathname]);

  console.log(scrolled)


  //!SECTION

  //NOTE - JS
  const navigate = useNavigate()


  //SECTION 회원가입 정보

  const handleSignUp = () => {
    handleLoginModalOpen();
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
        method: 'GET',
        credentials: 'include' // 이 옵션을 사용하면 쿠키가 포함됩니다.
      });

      if (response.ok) {
        // 요청이 성공했을 때의 처리
        console.log('로그아웃 성공');
        // 로그아웃 후 원하는 페이지로 리다이렉트

      } else {
        // 요청이 실패했을 때의 처리
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  const logOutOnClick = () => {
    //TODO logout_process
    // logout_process()
    handleLogout();
  }


  //!SECTION


  //SECTION modal(Login , Signup) , UI controls 

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const handleLoginModalOpen = () => setOpenLoginModal(true);
  const handleLoginModalClose = () => {
    setOpenLoginModal(false)
  };

  const doingLogin = async () => {
    console.log('repoo')
    const res = await userAPI.getPreferences();
    console.log(res)
  }







  /**
      * @description 마이페이지, 장바구니 클릭시 func
      */

  const IconHeaderBtnOnClick = {
    home: () => {
      navigate('/');
    },

    myPage: () => {
      navigate('/mypage/order')
    },
    cart: () => {
      navigate('/cart');

    }
  }

  //!SECTION





  //SECTION - Login
  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao"
    handleLoginModalClose()
  }

  const handleNaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver"
    handleLoginModalClose()

  }

  //!SECTION - Login







  //SECTION - return JSX
  return (
    <>

      <div ref={sentinelRef} style={{ position: 'absolute', top: '2.5dvh', height: '1px', width: '100%' }} />
      <SenHeader data-scrolled={scrolled} $isHome={location.pathname !== '/'}>
        {
          false ?

            // SECTION - jsx 장바구니 | 로그인 | 회원가입
            <LoginBtnBox>
              {/* <LoginValueBtn onClick={() => navigate('/cart')} >마이페이지</LoginValueBtn> */}
              <LoginValueBtn onClick={() => { navigate("/admin") }}>관리자 페이지</LoginValueBtn>
              <LoginValueBtn onClick={logOutOnClick}>로그아웃</LoginValueBtn>
              {
                role === 'ADMIN' ?
                  <LoginValueBtn onClick={() => { navigate("/admin") }}>관리자 페이지</LoginValueBtn>
                  :
                  null
              }
            </LoginBtnBox>
            :
            <>
              <LoginBtnBox>
                {
                  role === 'ADMIN' ?
                    <LoginValueBtn onClick={() => { navigate("/admin") }}>관리자 페이지</LoginValueBtn>
                    :
                    null
                }
                <LoginValueBtn onClick={handleSignUp} >회원가입</LoginValueBtn>
                {/*TODO 삭제  */}


              </LoginBtnBox>
            </>
          // !SECTION - jsx 장바구니 | 로그인 | 회원가입

        }
      </SenHeader>
      <LayoutHeaderWrapper data-scrolled={scrolled} >
        <HeaderWrapper>
          <Row align={"center"} justify={"space-between"}>
            <Col span={7} align={"center"}>
              <Row align={"center"}>
                <Col xs={4} sm={3} span={3} align={"center"}>
                  <Typo fontFamily={'Roboto'} weight={100} size={'32px'} $isGradient>Dododocs</Typo>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} span={8} justify={"space-evenly"} align={"center"}>
                  <CategoryBox onClick={() => navigate("/docs")}>AI Code document</CategoryBox>
                  <CategoryBox onClick={() => navigate("/chatting")} >AI chatting</CategoryBox>
                  <CategoryBox onClick={() => navigate("/collections/signature")} >Read Me Editor</CategoryBox>

                </Col>
              </Row>
            </Col>
            <Col span={5}>
              <Row align={"center"} justify={"space-between"}>


                {
                  name ?
                    <Col md={9} span={9} justify={"flex-end"} align={"center"} style={{ paddingRight: "2rem" }}>
                      <Typo size={'1.2rem'} color={"#545454"}>환영합니다. {name}님 </Typo>
                    </Col>
                    :
                    null
                }
                <Col md={3} span={2}>
                  <Button onClick={() => { navigate("/repositories") }}
                    btnType={"gradientLine"} size={'large'} $bold
                  >Repo 관리
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </HeaderWrapper >
      </LayoutHeaderWrapper >
    </>

  )
  //!SECTION - return JSX


}

export default HomeHeader;