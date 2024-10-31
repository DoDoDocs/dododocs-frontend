import React from "react"
import { Row, Col } from "../../../layout/index.js"
import { Typo } from "../../atoms/index.js"
import styled from "styled-components"


const ContentColorWrapper = styled.div`
        transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    background-image: none;
    border-radius: 4px;
    border: none ;
    border: 1px solid ${props => props.$bgColor || `rgba(190, 145, 109,0.4)`}; 
    padding : 3rem 2rem;
    width : 80%;
    overflow-y:auto;
    overflow-x:hidden;
    margin : 2rem 0;
    display : flex;
    flex-direction : column;
    align-items : flex-start;
    justify-content : flex-start;
`

const Code = styled.span`
    padding: 0.2em 0.4em;
    margin: 0.4em 0.5rem 0.4rem 0;
    font-size: 85%;
    white-space: break-spaces;
    background-color: rgba(135,131,120,0.15);
    color: rgba(68, 131, 97, 1);
    fill: rgba(68, 131, 97, 1);
    border-radius: 6px;
    font-weight : bold;
    line-height: normal;
    min-width : fit-content;
`


const AdminDesc = () => {

    return (
        <Row justify={'center'}>
            <Col span={10} justify={"center"} >
                <ContentColorWrapper>
                    <Typo color={"#000"} size={'1.5rem'} weight={"bold"} style={{ overflow: "hidden", alignItems: 'center' }}>상품 관리</Typo>
                    <br /><br />
                    <Typo color={"#000"} size={'1.2rem'} style={{ overflow: "hidden", alignItems: 'center' }}>
                        <Code>상품 전체 보기</Code>상품의 내용을 수정하고 수량을 관리할 수 있습니다.
                    </Typo>
                    <br />
                    <Typo color={"#000"} size={'1.2rem'} style={{ overflow: "hidden", marginTop: "0.5rem", alignItems: 'center' }}>
                        <Code>상품 추가</Code>새로운 상품을 등록 할 수 있습니다.
                    </Typo>
                </ContentColorWrapper>
            </Col>

            <Col span={10} justify={"center"}>
                <ContentColorWrapper $bgColor={"rgba(107,160,194,0.4)"}>
                    <Typo color={"#000"} size={'1.5rem'} weight={"bold"} style={{ overflow: "hidden", alignItems: 'center' }}>주문 관리</Typo>
                    <br /><br />
                    <Typo color={"#000"} size={'1.2rem'} style={{ overflow: "hidden", alignItems: 'center' }}>
                        <Code>주문 확인 하기</Code>접수된 주문을 확인하고 [배송 준비중 , 배송중 ] 상태 업데이트 하기
                    </Typo>
                    <br />
                    <Typo color={"#000"} size={'1.2rem'} style={{ overflow: "hidden", marginTop: "0.5rem", alignItems: 'center' }}>
                        <Code>...</Code> - ...
                    </Typo>
                </ContentColorWrapper>
            </Col>

            <Col span={10} justify={"center"}>
                <ContentColorWrapper $bgColor={"rgba(107,160,194,0.4)"}>
                    <Typo color={"#000"} size={'1.5rem'} weight={"bold"} style={{ overflow: "hidden", alignItems: 'center' }}>QnA 관리</Typo>
                    <br /><br />
                    <Typo color={"#000"} size={'1.2rem'} style={{ overflow: "hidden", alignItems: 'center' }}>
                        <Code>QnA 전체 보기</Code>  전체 QnA를 확인하고 답변할 수 있습니다.
                    </Typo>
                    <br />
                    <Typo color={"#000"} size={'1.2rem'} style={{ overflow: "hidden", marginTop: "0.5rem", alignItems: 'center' }}>
                        <Code>...</Code> - ...
                    </Typo>
                </ContentColorWrapper>
            </Col>
        </Row>
    )
}

export default AdminDesc;