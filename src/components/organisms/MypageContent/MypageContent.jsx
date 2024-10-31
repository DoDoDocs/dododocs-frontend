import React, { useEffect, useState } from 'react';
import { ContentStyle, Row, Col } from "../../../layout/index.js"
import { Image, Typo } from "../../atoms/index.js"
import { EditInfo } from "../../molecules/index.js"
import styled from 'styled-components';
import { useNavigate, useParams } from "react-router-dom"
import { useScrollTop } from "../../../hooks/index.js"

const MenuWrapper = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    transition: all ease .3s;
    font-size : 1.1rem;
    font-weight : 500;
    text-align : center;

    color:#a3a4a7;
    cursor: pointer;
    ${props => props.selected ? `
        font-weight: 900;
        color : #0d7000;
    `: null}
    &:hover{
        font-weight: 900;
        color : #0d7000;

    }
`



const MypageContent = ({ name = "user" }) => {
  useScrollTop();

  const { menu } = useParams();
  const navigate = useNavigate();

  const MENU_KOR = {
    "order": "주문/배송정보",
    "info": "회원정보",
    "review": "상품후기",

  }

  // SECTION 메뉴
  /**
  * @hook useState
  * @description 선택한 메뉴 
 */
  const [selectedMenu, setSelectMenu] = useState(menu || 'order');

  /**
    * @type {Function}
    * @description 메뉴 클릭시 메뉴 바꾸기
    */
  const handleMenuClick = (value) => {
    setSelectMenu(value);

    if (value === 'order') return navigate('/mypage/order');
    if (value === 'info') return navigate('/mypage/info');
    if (value === 'review') return navigate('/mypage/review');

  }

  // !SECTION 메뉴


  return (
    <>
      <ContentStyle>
        <Row justify={'center'}>
          {/* //SECTION - {name}님의 마이페이지  */}
          <Col span={12} justify={'center'} style={{ marginTop: "3rem " }} >
            <Typo size={'2rem'} weight={"bold"} color={"rgb(51,51,51)"} > {name}님의 마이페이지</Typo>
          </Col>
          {/* //!SECTION - {name}님의 마이페이지 */}

          {/* //SECTION - content */}
          <Col span={10} justify={'center'} style={{
            marginTop: "3rem"
          }} >
            <Row>
              {/* 1.주문/배송정보 2.주소지수정 3.상품후기 4.문의확인  5.회원정보 */}
              {/* //SECTION - 메뉴 */}
              <Col span={12}>
                <Row style={{ border: "1px solid rgb(242, 242, 242)", backgroundColor: "#fafafb", padding: "3rem 0" }}>
                  <Col span={4} justify={'center'}>
                    <Row justify={'center'} align={'center'}>
                      <MenuWrapper selected={selectedMenu === 'order'} onClick={() => { handleMenuClick(`order`) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0m12 0m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0m-10 0h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
                        </svg>
                        {MENU_KOR['order']}
                      </MenuWrapper>

                    </Row>
                  </Col>
                  <Col span={4} justify={'center'}>
                    <Row>
                      <Col span={12} justify={'center'} align={'center'} >
                        <MenuWrapper selected={selectedMenu === 'info'} onClick={() => { handleMenuClick(`info`) }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2c.645 0 1.218 .305 1.584 .78"></path>
                            <path d="M20 11l-8 -8l-9 9h2v7a2 2 0 0 0 2 2h4"></path>
                            <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z"></path>
                          </svg>
                          {MENU_KOR['info']}
                          <br />
                          <p style={{ paddingTop: '3px' }}>주소지 수정</p>
                        </MenuWrapper>

                      </Col>

                    </Row>
                  </Col>
                  <Col span={4} justify={'center'}>
                    <Row>
                      <Col span={12} justify={'center'} align={'center'} >
                        <MenuWrapper selected={selectedMenu === 'review'} onClick={() => { handleMenuClick(`review`) }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"></path>
                            <path d="M12 12l0 .01"></path>
                            <path d="M8 12l0 .01"></path>
                            <path d="M16 12l0 .01"></path>
                          </svg>
                          {MENU_KOR['review']}
                        </MenuWrapper>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              {/* //!SECTION - 메뉴 */}

              {/* //SECTION - 주소지수정 */}
              {
                menu === 'info' ?
                  <EditInfo />
                  : null
              }
              {/* //!SECTION - 주소지수정 */}


            </Row>

          </Col>
          {/* //!SECTION - content */}
        </Row>
      </ContentStyle >
    </>
  )
}

export default React.memo(MypageContent);

