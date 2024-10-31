import React, { useState, useRef, useCallback } from "react"
import { Button, notification, Steps, Radio } from 'antd';
import { Typo, Image, TextBox, Divider } from "../../components/atoms/index.js";
import { Col, Row } from "../../layout/index.js"
import CloseIcon from '@mui/icons-material/Close';
import styled, { keyframes } from "styled-components";
import naverBtn from "../../assets/icons/naverBtn.png"
import kakaoBtn from "../../assets/icons/kakaoBtn.png"
import DaumPostcode from 'react-daum-postcode';

import { useDispatch } from "react-redux";
import { login } from "../../entities/session/index.js"
import { updateUser } from "../../entities/user/index.js"

const SnsLoginBtn = styled.div`
    margin : 5px 0;
    height : 4rem;
    width: 100%;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    position : relative;
    background-color: ${props => props.$naver ? `#1EC800` : `#F5E901`};
    color: ${props => props.$naver ? `#fff` : `#000`};
    border-radius : 4px;
    cursor : pointer;
`
const SnsIconWrapper = styled.div`
    position : absolute;
    display:flex;
    align-items:center;
    justify-content:center;
    width : 4rem;
    padding :0 1rem;
    height : 100%;
    border-right:2px solid white;
    cursor : pointer;
`
const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: 3.5rem;
  padding-left: 1rem;
  border: 1px solid #0d7000;
  border-radius: 6px;
  box-shadow: rgb(247 247 247) 0px 0px 0px 1px inset;
  font-size: 1.2rem;
`;


const flashAnimation = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const FlashOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  animation: ${flashAnimation} 0.3s ease-out;
`;


const SignupProgress = ({ onFlashClick, handleLoginModalClose }) => {
  const dispatch = useDispatch();


  //카카오 지도 여는 state
  const [editDetailAddress, setEditDetailAddress] = useState(false)


  // signup 결과 내정보 기입시 -> true / 미 기입시 -> false
  const [isNewbe, setIsNewbe] = useState(false);

  //필수 회원가입 정보 기입
  const [signupForm, setSignupForm] = useState({
    nickName: "",
    gender: "",
    phoneNumber: "",
    roadAddress: "",
    zipCode: '',
    detailAddress: '',
    role: "BUYER"
  });

  //필수 회원가입 정보 받아오기
  let editSignupForm = {
    nickName: (e) => {
      const value = e.target.value
      setSignupForm((state) => ({ ...state, nickName: value }))
    },
    gender: (e) => {
      const value = e.target.value
      setSignupForm((state) => ({ ...state, gender: value }))
    },
    phoneNumber: (e) => {
      const value = e.target.value
      setSignupForm((state) => ({ ...state, phoneNumber: value }))
    },
    address: (data) => {
      setSignupForm((state) => ({ ...state, zipCode: data.zonecode }))
      setSignupForm((state) => ({ ...state, roadAddress: data.roadAddress }))
      setEditDetailAddress(true)

    },
    detailAddress: (e) => {
      const value = e.target.value
      setSignupForm((state) => ({ ...state, detailAddress: value }))
    },
    role: (e) => {
      const value = e.target.value
      setSignupForm((state) => ({ ...state, role: value }))
    },
  }

  const doingSingUp = {
    //  TODO oauth post
    // 성공시 setIsOAuth true
    naver: () => {
      // window.location.href = "http://3.36.177.84:8080/oauth2/authorization/naver"
      isNewbe(true);
      dispatch(login());
      dispatch(updateUser({
        email: '',
        password: '',
        nickname: '',
        realName: '',
        phoneNumber: '',
        roadAddress: '',
        zipCode: '',
        detailAddress: '',
        gender: '',
        role: 'GUEST',
        searchValue: '',
      }))

    },
    kakao: async () => {
      // window.location.href = "http://3.36.177.84:8080/oauth2/authorization/kakao"
      // window.open("http://3.36.177.84:8080/oauth2/authorization/kakao", "PopupNew", "width=500,height=600");

      // // 로그인 성공 -> 
      // setIsNewbe(true);
      // if (!isNewbe) {
      //   dispatch(login());
      // }
      dispatch(login());
      dispatch(updateUser({
        email: 'csmo2642@naver.com',
        nickname: '슈슈',
        realName: '이채은',
        phoneNumber: '01036296541',
        roadAddress: '',
        zipCode: '',
        detailAddress: '',
        gender: 'female',
        role: 'USER',
      }))
      onFlashClick();
      handleLoginModalClose();
    },

  }

  const doneOnClick = () => {
    //todo post 정보 
    //회원가입성공
    console.log(signupForm)
    const anyFalse = Object.values(signupForm).some(value => String(value).length === 0);

    if (anyFalse === true) {
      notification['error']({
        message: `저장 실패 💦`,
        description: '아직 채우지 않은 값이 있습니다.',
      });
      return;
    }

    //회원가입 성공!
    handleLoginModalClose();
    isNewbe(false);
    dispatch(login());
  }

  const steps = [
    {
      title: '닉네임',
      content: (
        <Row justify={"center"} align={"center"} >
          <Col span={4} justify={"center"} align={"center"} style={{ height: "inherit" }}>
            <Typo size={"1.2rem"} weight={'bold'} color={'rgb(51, 51, 51)'}>닉네임</Typo>
          </Col>
          <Col span={8} justify={"flex-start"} align={"center"} style={{ height: "4rem", paddingLeft: "1rem" }}>
            <SearchWrapper>
              <TextBox value={signupForm.nickName} onChange={editSignupForm.nickName} ></TextBox>
            </SearchWrapper>
          </Col>
        </Row>
      ),
    },
    {
      title: '성별',
      content: (
        <Row justify={"center"} align={"center"} >
          <Col span={4} justify={"center"} align={"center"} style={{ height: "inherit" }}>
            <Typo size={"1.2rem"} weight={'bold'} color={'rgb(51, 51, 51)'}>성별</Typo>
          </Col>
          <Col span={8} justify={"flex-start"} align={"center"} style={{ height: "4rem", paddingLeft: "1rem" }}>
            <Radio.Group onChange={editSignupForm.gender} value={signupForm.gender}>
              <Radio value={"male"} >남성</Radio>
              <Radio value={"female"}>여성</Radio>
            </Radio.Group>
          </Col>
        </Row>

      ),
    },
    {
      title: '전화번호',
      content: (
        <Row justify={"center"} align={"center"} >
          <Col span={4} justify={"center"} align={"center"} style={{ height: "inherit" }}>
            <Typo size={"1.2rem"} weight={'bold'} color={'rgb(51, 51, 51)'}>전화번호</Typo>
          </Col>
          <Col span={8} justify={"flex-start"} align={"center"} style={{ height: "4rem", paddingLeft: "1rem" }}>
            <SearchWrapper>
              <TextBox value={signupForm.phoneNumber} onChange={editSignupForm.phoneNumber} placeholder={'-없이 숫자만 적어주세요.'} ></TextBox>
            </SearchWrapper>
          </Col>
        </Row>
      ),
    },
    {
      title: '주소',
      content: (
        <Row justify={"center"} align={"center"} >
          <Col span={4} justify={"center"} align={"center"} style={{ height: "inherit" }}>
            <Typo size={"1.2rem"} weight={'bold'} color={'rgb(51, 51, 51)'}>주소</Typo>
          </Col>
          <Col span={8} justify={"flex-start"} align={"center"} style={{ paddingLeft: "1rem" }}>




            <>
              {
                (signupForm.roadAddress) ?
                  <>
                    <Divider color={'rgb(51,51,51)'} marginBottom={'0'} marginTop={'0'} borderWidth={'2px'} />

                    <Row style={{ margin: "1rem 0" }} gutter={[5, 0]}>
                      <Col xs={12} sm={12} span={12}>
                        <Typo size={"1rem"} color={"#666666"} full >우편번호</Typo>
                        <Typo size={"1.3rem"} weight={"500"}>{signupForm.zipCode}</Typo>
                      </Col>
                      <Col xs={12} sm={12} span={12}>
                        <Typo size={"1rem"} color={"#666666"} full >기본주소</Typo>
                        <Typo size={"1.3rem"} weight={"500"}>{signupForm.roadAddress}</Typo>
                      </Col>
                      <Col xs={12} sm={8} span={7}>
                        <Typo size={"1rem"} color={"#666666"} full padding={"0 0 3px 0"}>상세주소</Typo>
                        {
                          editDetailAddress ?
                            <SearchWrapper>
                              <TextBox value={signupForm.detailAddress || ''} onChange={editSignupForm.detailAddress} placeholder={"상세주소를 입력해 주세요"}></TextBox>
                            </SearchWrapper>
                            :
                            <Typo size={"1.3rem"} weight={"500"}>{signupForm.detailAddress}</Typo>
                        }
                      </Col>
                    </Row>
                    <Divider color={'rgb(51,51,51)'} marginBottom={'0'} marginTop={'0'} borderWidth={'2px'} />

                  </>
                  :
                  <Col span={12}>
                    <DaumPostcode
                      onComplete={editSignupForm.address}  // 값을 선택할 경우 실행되는 이벤트
                      autoClose={true} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                      defaultQuery='' // 팝업을 열때 기본적으로 입력되는 검색어 
                    />
                  </Col>

              }

            </>


          </Col>
        </Row >
      ),
    },
    {
      title: '가입 방식',
      content: (
        <Row justify={"center"} align={"center"} >
          <Col span={4} justify={"center"} align={"center"} style={{ height: "inherit" }}>
            <Typo size={"1.2rem"} weight={'bold'} color={'rgb(51, 51, 51)'}>가입 방식</Typo>
          </Col>
          <Col span={8} justify={"flex-start"} align={"center"} style={{ height: "4rem", paddingLeft: "1rem" }}>
            <Radio.Group onChange={editSignupForm.gender} value={signupForm.gender}>
              <Radio value={"seller"} >관리자</Radio>
              <Radio value={"buyer"}>구매자</Radio>
            </Radio.Group>
          </Col>
        </Row>
      ),
    },
  ];

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));




  return (
    <>
      <Row justify={'center'}>
        <Col span={12} justify={'flex-end'} style={{ paddingBottom: "1rem" }}>
          <CloseIcon onClick={handleLoginModalClose} style={{ fontSize: "23px", color: "rgb(112, 121, 143)", cursor: "pointer" }} />
        </Col>
        {
          isNewbe ?
            <Col span={12} justify={'center'} align={'center'} style={{ width: "75dvw" }}>
              <Steps current={current} items={items} />
              <Row>
                <Col span={12} justify={'center'} align={'center'} style={{ padding: "3rem 1rem" }}>
                  {steps[current].content}
                </Col>
              </Row>
              <div
                style={{
                  marginTop: 24,
                }}
              >
                {current > 0 && (
                  <Button
                    style={{
                      margin: '0 8px',
                    }}
                    onClick={() => prev()}
                  >
                    Previous
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" onClick={() => doneOnClick()}>
                    Done
                  </Button>
                )}

              </div>
            </Col>
            :
            <>
              <Col span={12} justify={'center'} align={'center'}>
                <Typo size={'1.3rem'} color={'#414141'} weight={'500'}>
                  소셜계정으로 간편하게 회원가입하기!
                </Typo>
              </Col>
              <Col span={11} justify={'center'} style={{ marginTop: '1rem' }}>
                <Row justify={'space-between'} >
                  {/* //SECTION - JSX 소셜로그인 */}
                  <Col span={12} style={{ paddingTop: '1rem' }} justify={'center'}>
                    {/* <Typo size={'1.5rem'} color={"#414141"} weight={"bold"}>소셜계정으로 로그인</Typo> */}
                    <SnsLoginBtn $naver onClick={doingSingUp.naver}>
                      <SnsIconWrapper >
                        <Image src={naverBtn} alt="NAVER" width={"80%"} />
                      </SnsIconWrapper>
                      <Typo width={'100%'} cursor={"pointer"} textAlign={"center"} size={"1.2rem"} style={{ justifyContent: "center" }}>네이버로 시작하기</Typo>
                    </SnsLoginBtn>
                  </Col>
                  <Col span={12} style={{ padding: '10px 0' }} justify={'center'}>
                    <SnsLoginBtn onClick={doingSingUp.kakao}>
                      <SnsIconWrapper >
                        <Image src={kakaoBtn} alt="KAKAO" width={"80%"} />
                      </SnsIconWrapper>
                      <Typo width={'100%'} cursor={"pointer"} textAlign={"center"} size={"1.2rem"} style={{ justifyContent: "center" }}>카카오로 시작하기</Typo>
                    </SnsLoginBtn>
                  </Col>
                  <Button onClick={onFlashClick}></Button>
                  {/* //!SECTION - 소셜로그인 */}
                </Row>
              </Col>
            </>
        }

      </Row>


    </>
  )
}

export default SignupProgress;