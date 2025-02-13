import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { Image, Typo, TextBox, Button } from "../../components/index.js";
import { Row, Col } from "../index.js"
import headerIcon from "../../assets/icons/dododocs_Icon.png"
import {
  SenHeader, LayoutHeaderWrapper, HeaderWrapper, IconHeader, SearchWrapper, IconHeaderButton,
  VerticalDivider, CategoryBox, LoginBtnBox, LoginValueBtn, LoginButton
} from "./header.styles.js"

import { useAuth } from "../../hooks/useAuth.js";
import { useAuthStore, useUserStore } from "../../store/store.js"

const HomeHeader = ({ role }) => {
  // 여러 상태 한번에 가져오기
  const { userNickname } = useUserStore()


  const {
    isAuthenticated
  } = useAuthStore();

  const location = useLocation();

  const { logout } = useAuth();


  //!SECTION

  //NOTE - JS
  const navigate = useNavigate()


  //SECTION 회원가입 정보

  const handleSignUp = () => {
    navigate('/login');
  }


  const logOutOnClick = () => {
    //TODO logout_process
    // logout_process()
    logout();
    navigate('/');
  }
  //!SECTION

  //SECTION - return JSX
  return (
    <>

      <div style={{ position: 'absolute', top: '2.5dvh', height: '1px', width: '100%' }} />
      <SenHeader data-scrolled={true} $isHome={location.pathname !== '/'}>

        {/* SECTION - jsx 장바구니 | 로그인 | 회원가입 */}
        <LoginBtnBox>

          {
            isAuthenticated ?
              <LoginValueBtn onClick={logOutOnClick}>로그아웃</LoginValueBtn>
              :
              <LoginValueBtn onClick={handleSignUp}>로그인</LoginValueBtn>
          }
        </LoginBtnBox>
        {/* !SECTION - jsx 장바구니 | 로그인 | 회원가입 */}


      </SenHeader>
      <LayoutHeaderWrapper data-scrolled={true} >
        <HeaderWrapper>
          <Row align={"center"} justify={"space-between"}>
            <Col span={7} align={"center"}>
              <Row align={"center"}>
                <Col xs={4} sm={3} span={3} align={"center"}>
                  <Typo onClick={() => navigate("/")} fontFamily={'Roboto'} weight={100} size={'32px'} cursor={"pointer"} $isGradient>Dododocs</Typo>
                </Col>
                <Col xs={0} sm={9} md={8} lg={8} xl={8} xxl={8} span={8} justify={"space-evenly"} align={"center"}>
                  <CategoryBox onClick={() => navigate("/landing/docs")}>Code document</CategoryBox>
                  <CategoryBox onClick={() => navigate("/landing/chatting")} >Chatbot</CategoryBox>
                  <CategoryBox onClick={() => navigate("/landing/readme")} >Read Me Editor</CategoryBox>

                </Col>
              </Row>
            </Col>
            <Col span={5}>
              <Row align={"center"} justify={"flex-end"}>


                {
                  userNickname ?
                    <Col md={7} span={9} justify={"flex-end"} align={"center"} style={{ paddingRight: "2rem" }}>
                      <Typo size={'1.2rem'} color={"#545454"}>환영합니다. {userNickname}님 </Typo>
                    </Col>
                    :
                    null
                }
                <Col md={3} span={2} justify={"flex-end"} align={"center"}>
                  {
                    isAuthenticated ?
                      <Button onClick={() => { navigate("/repositories") }}
                        btnType={"gradientLine"} size={'large'} $bold style={{ minWidth: '10rem', wordBreak: 'keep-all' }}
                      >Repo 관리
                      </Button>
                      :
                      <Button onClick={() => { navigate("/login") }}
                        btnType={"gradientLine"} size={'large'} $bold style={{ minWidth: '10rem', wordBreak: 'keep-all' }}
                      >로그인
                      </Button>
                  }

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