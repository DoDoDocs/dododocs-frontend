import React, { useState, useRef, useCallback } from "react"

import { Row, Col } from "../../../layout/index.js"
import { Typo, Button, Divider, TextBox, } from "../../atoms/index.js"
import DaumPostcode from 'react-daum-postcode';
import styled from "styled-components"
import { notification } from "antd"

const TextBoxWrapper = styled.div`
    display : flex;
    align-items: center;
    justify-content: space-between;
    width : 100%;
    height : 3rem;
    padding-left :1rem ;
    background-color: #f5f5f5;
    border-radius: 6px;
    box-shadow : rgb(247 247 247) 0px 0px 0px 1px inset;
    font-size : 1.2rem;
    font-weight: 500;
`

const EditInfo = ({ }) => {

  /**
    * @hook useState
    * @description 내 정보
   */
  const [myInfo, setMyInfo] = useState({
    jibunAddress: '',
    rodeAddress: '',
    detailAddress: '',
    zipCode: '',
    name: "username",
    phoneNumber: '010-0000-0000',
    email: "email@naver.com"
  });

  let editMyInfo = {
    name: (e) => {
      const value = e.target.value
      setMyInfo((state) => ({ ...state, name: value }))
    },
    phoneNumber: (e) => {
      const value = e.target.value
      setMyInfo((state) => ({ ...state, phoneNumber: value }))
    },
    email: (e) => {
      const value = e.target.value
      setMyInfo((state) => ({ ...state, email: value }))
    },
    detailAddress: (e) => {
      const value = e.target.value
      setMyInfo((state) => ({ ...state, detailAddress: value }))
    },
  }

  //SECTION  변경 관련  CODE
  //true :  변경하는 form   false :   변경하는 form 닫기 
  const [isEditForm, setEditForm] = useState(false);

  //edit form handler
  const editForm = {
    show: () => setEditForm(true),
    close: () => setEditForm(false)
  }

  /**
      @description  변경하는 form open 
      @function buttonOnclick
      @btnValue   변경
      @detail  변경 form 열기 */
  const editShowOnclick = () => editForm.show()


  /**
  @description   변경후 저장하기
  @function buttonOnclick
  @btnValue  저장
  @detail   [POST] 하기  -> form close 하기*/
  const editCloseOnclick = () => {
    // TODO POST
    if (!myInfo.name) {
      return (
        notification['error']({
          message: `${myInfo.name || '회원'}님 이름을 입력해 주세요.😥 `,
        })
      )
    }
    if (!myInfo.email) {
      return (
        notification['error']({
          message: `${myInfo.email || '회원'}님 이메일을 입력해 주세요.😥 `,
        })
      )
    }
    if (!myInfo.phoneNumber) {
      return (
        notification['error']({
          message: `${myInfo.phoneNumber || '회원'}님 전화번호를 입력해 주세요.😥 `,
        })
      )
    }

    //TODO post 수정된 회원정보
    //TODO 성공 -> redux update -> form Close
    //TODO 실패 -> 다시시도 notification

    editForm.close();

  }
  //!SECTION 변경 관련  CODE


  // SECTION 주소지 수정

  const [editDetailAddress, setEditDetailAddress] = useState(false)

  const [isOpenKakaoMap, setIsOpenKakaoMap] = useState(false)

  const openKakaoMapOnClick = () => {
    setMyInfo((state) => ({ ...state, detailAddress: null }))
    setIsOpenKakaoMap(!isOpenKakaoMap)
  }
  const saveAddressOnClick = () => {
    if (myInfo.detailAddress === null) {
      return notification['error']({
        message: `저장 실패 💦`,
        description: '상세주소를 입력해 주세요.',
      });
    }
    //TODO patch_edit_address
  }

  const selectAddressHandle = (data) => {
    setEditDetailAddress(true)
    setMyInfo((state) => ({ ...state, jibunAddress: data.jibunAddress }))
    setMyInfo((state) => ({ ...state, zipCode: data.zonecode }))
    setMyInfo((state) => ({ ...state, rodeAddress: data.roadAddress }))

    setIsOpenKakaoMap(false);
  }

  // !SECTION 주소지 수정


  return (
    <>
      <Col span={12} align={'center'} style={{ marginTop: "3rem", }}>
        <Row justify={"space-between"}>
          <Col span={12} align={"center"}>
            <Row align={"center"} >
              <Col span={7} align={"center"}>
                <Row align={"center"} >
                  <Col span={12}>
                    <Typo fontFamily={'Noto'} size={"2rem"} weight={"500"} color={'rgb(51,51,51)'} >
                      회원 정보
                    </Typo>
                  </Col>
                  <Col span={12}>
                    <Typo fontFamily={'Noto'} size={"1.1rem"} weight={"500"} color={'rgb(153, 153, 153)'}  >
                      회원정보를 관리하고 변경할 수 있습니다.
                    </Typo>
                  </Col>
                </Row>
              </Col>
              <Col span={5} align={'center'} justify={'flex-end'}>

                {
                  // TODO 정보 수정 ture시 
                  isEditForm ?
                    <Button onClick={editCloseOnclick} btnType={"primary"} value={'저장하기'}></Button>
                    :
                    <Button onClick={editShowOnclick} value={'수정하기'}></Button>



                }

              </Col>
            </Row>
          </Col>
        </Row>
      </Col>


      <Col span={12} style={{ marginTop: "1rem" }}>
        <Row >
          <Divider color={'rgb(51,51,51)'} marginBottom={'0'} marginTop={'0'} borderWidth={'2px'} />

          <Col span={12}>
            <Row style={{ height: "5rem" }}>
              <Col span={4} justify={"center"} align={"center"} style={{ height: "inherit", backgroundColor: '#fafafb' }}>
                <Typo size={"1.2rem"} weight={'bold'} color={'rgb(51, 51, 51)'}>이름</Typo>
              </Col>
              <Col span={8} justify={"flex-start"} align={"center"} style={{ height: "inherit", paddingLeft: "1rem" }}>
                {
                  isEditForm ?
                    <TextBoxWrapper>
                      <TextBox plane color={"black"} block align={'left'}
                        onChange={editMyInfo.name} value={myInfo.name}></TextBox>
                    </TextBoxWrapper>
                    :
                    <Typo size={"1.2rem"} weight={'bold'} color={'rgb(51, 51, 51)'}>{myInfo.name} </Typo>
                }
              </Col>
            </Row>
            <Divider color={'rgb(242, 242, 242)'} marginBottom={'0'} marginTop={'0'} />
          </Col>
          <Col span={12}>
            <Row style={{ height: "5rem" }}>
              <Col span={4} justify={"center"} align={"center"} style={{ height: "inherit", backgroundColor: '#fafafb' }}>
                <Typo size={"1.2rem"} weight={'bold'} color={'rgb(51, 51, 51)'}>휴대폰</Typo>
              </Col>
              <Col span={8} justify={"flex-start"} align={"center"} style={{ height: "inherit", paddingLeft: "1rem" }}>
                {
                  isEditForm ?
                    <TextBoxWrapper>
                      <TextBox plane color={"black"} block align={'left'}
                        onChange={editMyInfo.phoneNumber} value={myInfo.phoneNumber}></TextBox>
                    </TextBoxWrapper>
                    :
                    <Typo size={"1.2rem"} weight={'bold'} color={'rgb(51, 51, 51)'}>{myInfo.phoneNumber} </Typo>
                }
              </Col>
            </Row>
            <Divider color={'rgb(242, 242, 242)'} marginBottom={'0'} marginTop={'0'} />
          </Col>
          <Col span={12}>
            <Row style={{ height: "5rem" }}>
              <Col span={4} justify={"center"} align={"center"} style={{ height: "inherit", backgroundColor: '#fafafb' }}>
                <Typo size={"1.2rem"} weight={'bold'} color={'rgb(51, 51, 51)'}>이메일</Typo>
              </Col>
              <Col span={8} justify={"flex-start"} align={"center"} style={{ height: "inherit", paddingLeft: "1rem" }}>
                {
                  isEditForm ?
                    <TextBoxWrapper>
                      <TextBox plane color={"black"} block align={'left'}
                        onChange={editMyInfo.email} value={myInfo.email}></TextBox>
                    </TextBoxWrapper>
                    :
                    <Typo size={"1.2rem"} weight={'bold'} color={'rgb(51, 51, 51)'}>{myInfo.email} </Typo>}
              </Col>
            </Row>
          </Col>
          <Divider color={'rgb(51,51,51)'} marginBottom={'0'} marginTop={'0'} borderWidth={'2px'} />
        </Row>
      </Col>
      {/*  🌀🌀🌀🌀❔❔❔❔❔🌀🌀🌀🌀❔❔❔❔❔🌀🌀🌀🌀❔❔❔❔❔🌀🌀🌀🌀❔❔❔❔❔🌀🌀🌀🌀❔❔❔❔❔🌀🌀🌀🌀❔❔❔❔❔🌀🌀🌀🌀❔❔❔❔❔🌀🌀🌀🌀❔❔❔❔❔🌀🌀🌀🌀❔❔❔❔❔ */}

      <Col span={12} align={'center'} style={{ marginTop: "3rem", }}>
        <Row justify={"space-between"} align={'center'}>
          <Col span={7} align={"center"}>
            <Row align={"center"} >
              <Col span={12}>
                <Typo fontFamily={'Noto'} size={"2rem"} weight={"500"} color={'rgb(51,51,51)'} >
                  주소지 정보
                </Typo>
              </Col>
              <Col span={12}>
                <Typo fontFamily={'Noto'} size={"1.1rem"} weight={"500"} color={'rgb(153, 153, 153)'}  >
                  주소지를 관리하고 변경할 수 있습니다.
                </Typo>
              </Col>
            </Row>
          </Col>
          <Col span={5} align={'center'} justify={'flex-end'}>

            {
              myInfo.jibunAddress ?
                <Button onClick={openKakaoMapOnClick} value={'주소지 수정'}></Button>
                :
                <Button onClick={openKakaoMapOnClick} value={'새 주소지 추가'}></Button>

            }
            {editDetailAddress ?
              <Button onClick={saveAddressOnClick} btnType={"primary"} value={'저장하기'} style={{ marginLeft: "1rem" }} ></Button>
              : null

            }


          </Col>
        </Row>
      </Col>

      <Col span={12} style={{ marginTop: "1rem" }}>
        <Row >
          {
            (!myInfo.jibunAddress) ?
              <>
                <Divider color={'rgb(51,51,51)'} marginBottom={'0'} marginTop={'0'} borderWidth={'2px'} />
                <Row gutter={[5, 0]}>
                  <Col xs={12} sm={12} span={12} style={{ padding: '2rem 0' }}>
                    <Typo size={'1.3rem'} >주소지를 추가해 주세요.</Typo>
                  </Col>
                </Row>
                <Divider color={'rgb(51,51,51)'} marginBottom={'0'} marginTop={'0'} borderWidth={'2px'} />
              </>
              :
              null
          }
          {
            isOpenKakaoMap ?
              <Col span={12}>
                <DaumPostcode
                  onComplete={selectAddressHandle}  // 값을 선택할 경우 실행되는 이벤트
                  autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                  defaultQuery='' // 팝업을 열때 기본적으로 입력되는 검색어 
                />
              </Col>
              :

              <>
                {
                  (myInfo.jibunAddress) ?
                    <>
                      <Divider color={'rgb(51,51,51)'} marginBottom={'0'} marginTop={'0'} borderWidth={'2px'} />

                      <Row style={{ margin: "1rem 0" }} gutter={[5, 0]}>
                        <Col xs={12} sm={12} span={12}>
                          <Typo size={"1rem"} color={"#666666"} full >우편번호</Typo>
                          <Typo size={"1.3rem"} weight={"500"}>{myInfo.zipCode}</Typo>
                        </Col>
                        <Col xs={12} sm={12} span={12}>
                          <Typo size={"1rem"} color={"#666666"} full >기본주소</Typo>
                          <Typo size={"1.3rem"} weight={"500"}>{myInfo.jibunAddress}</Typo>
                        </Col>
                        <Col xs={12} sm={8} span={7}>
                          <Typo size={"1rem"} color={"#666666"} full padding={"0 0 3px 0"}>상세주소</Typo>
                          {
                            editDetailAddress ?
                              <TextBoxWrapper>
                                <TextBox value={myInfo.detailAddress || ''} onChange={editMyInfo.detailAddress} placeholder={"상세주소를 입력해 주세요"}></TextBox>
                              </TextBoxWrapper>
                              :
                              <Typo size={"1.3rem"} weight={"500"}>{myInfo.detailAddress}</Typo>
                          }
                        </Col>
                      </Row>
                      <Divider color={'rgb(51,51,51)'} marginBottom={'0'} marginTop={'0'} borderWidth={'2px'} />

                    </>
                    :
                    null
                }

              </>
          }

        </Row>
      </Col>

    </>
  )
}

export default EditInfo;