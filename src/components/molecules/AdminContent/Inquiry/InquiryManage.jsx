import React, { useEffect, useState } from "react"
import { Row, Col } from "../../../../layout/index.js"
import { TextAreaBox, Typo, Button, Divider } from "../../../atoms/index.js"
import styled from "styled-components";
import get_product_all_questions from "../../../../service/api/get/get_product_all_questions";
import Patch_product_answer from "../../../../service/api/patch/patch_product_answer";
import Pagination from '@mui/material/Pagination';




const TextAreaWrapper = styled.div`
    display : flex;
    align-items: center;
    justify-content: space-between;
    width : 100%;
    height : 10rem;
    padding :0.5rem 0 0.5rem 0.5rem ;
    border : 1px solid rgb(221, 221, 221);
    background-color: #f5f5f5;
    border-radius: 6px;
    box-shadow : rgb(247 247 247) 0px 0px 0px 1px inset;
    font-size : 1.3rem;
    font-weight: 500;
    color : #555555;
`


const InquiryManage = () => {
    //NOTE 전체 페이지 갯수 
    const [totalPageNum, setTotalPageNum] = useState(0);
    //NOTE 선택한 리스트 페이지 번호 ( 1페이지 , 2페이지) [pagingNum, setPagingNum]
    const [pagingNum, setPagingNum] = useState(1);
    /**
  * @description paging 클릭 시
  * @param e - 선택한 page target하기위한 param
  * @detail id -1 해야댐 (page는 0 부터 시작 )
  */
    const pagingClick = (e) => {
        const pagingId = e.target.innerText;
        console.log(pagingId)
        setPagingNum(Number(pagingId))
    }
    /**
    * @hook useState
    * @description 전체 문의
   */
    const [productAllQuestions, setProductAllQuestions] = useState([]);


    useEffect(() => {
        get_product_all_questions(pagingNum - 1)
            .then((res) => {
                setProductAllQuestions([])
                const response = res.response;
                console.log('/api/product/v1/products/questions')
                console.log(response)
                setTotalPageNum(response.totalPages)
                response.content.map((item) => {
                    return setProductAllQuestions((state) => [
                        ...state,
                        {
                            answerContent: item.answerContent,
                            id: item.id,
                            productTitle: item.productName,
                            productId: item.productId,
                            questionContent: item.questionContent,
                            title: item.title,
                            writerName: item.writerName,
                        }
                    ])
                })
            })
            .catch((err) => console.log(err))

        // TODO 삭제

    }, [pagingNum])



    /**
        * @hook useState
        * @description 작성답변value
        */
    const [answerContent, setAnswerContent] = useState({
        questionId: null,
        content: '',
    });
    let editAnswerContent = {
        content: (e) => {
            return setAnswerContent((state) => ({ ...state, content: e.target.value }))
        },
    }
    /**
     * @type {Function}
     * @description 답변 작성
     */
    const makeAnswerOnClick = (id) => {
        setAnswerContent({
            questionId: null,
            content: '',
        })
        if (answerContent.questionId === id) {
            return setAnswerContent((state) => ({
                ...state,
                questionId: null,
            }))
        }
        setAnswerContent((state) => ({
            ...state,
            questionId: id,
        }))
    }
    /**
        * @type {Function}
        * @description 답변 제출
        */
    const submitAnswerOnClick = () => {
        Patch_product_answer(answerContent.questionId, answerContent.content)
            .then((res) => {
                setAnswerContent({
                    questionId: null,
                    content: '',
                })
            })
            .catch((err) => console.log(err))
    }





    return (
        <>
            <Row>
                {/* SECTION 제목 */}
                <Col span={12}>
                    <Row style={{ margin: "2rem 0" }}>
                        <Col span={12} justify={'start'} align={'center'}>
                            <Typo fontFamily={'Noto'} size={"3rem"} weight={"500"} color={'rgb(51,51,51)'} >
                                문의 답변하기
                            </Typo>

                        </Col>
                        <Col span={12} justify={'start'} align={'center'}>
                            <Typo fontFamily={'Noto'} size={"1.3rem"} weight={"500"} color={'rgb(153, 153, 153)'}  >
                                고객이 남긴 문의에 대한 답변을 남겨주세요.
                            </Typo>
                        </Col>
                        <Col span={12} justify={'start'} align={'center'}>
                            <Typo fontFamily={'Noto'} size={"1.3rem"} weight={"500"} color={'rgb(153, 153, 153)'}  >
                                클릭시 답변을 작성할 수 있습니다.
                            </Typo>
                        </Col>
                    </Row>
                </Col>

                {/* //!SECTION 제목 */}
                <Col span={12}>
                    {
                        productAllQuestions.length === 0 ?
                            <Col span={12} justify={'center'} style={{ padding: '50px 0' }}>
                                <Typo size={'1.5rem'} color={'#b5b5b5'}>등록된 질문이 없습니다.</Typo>
                            </Col>
                            :
                            productAllQuestions.map((question, index) => {
                                return (
                                    <Row key={index} style={{ margin: "2rem 0" }}>
                                        <Col span={12} align={'center'} style={{ padding: "0.5rem 0 0.5rem 1rem" }} >
                                            <Typo size={"1rem"} weight={"700"} color={"#9c9c9c"} style={{ paddingRight: '0.5rem' }} >
                                                작성자
                                            </Typo>
                                            <Typo size={"1.1rem"} weight={"700"} color={"#333333"} >
                                                {question.writerName}
                                            </Typo>
                                        </Col>
                                        <Col span={12} >
                                            <Row align={'center'} style={{
                                                padding: '2rem',
                                                border: '1px solid rgb(215 215 215)',
                                                borderRadius: '10px',
                                                // backgroundColor: 'rgb(240, 240, 240)',
                                            }}>
                                                <Col span={12} align={'flex-end'} justify={'space-between'}>
                                                    <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "flex-end", flexDirection: "column", position: "relative", width: "auto" }}>
                                                        <Typo color={"#9c9c9c"} style={{ position: "absolute", top: "-1.5rem", left: "0px", width: "7rem" }} >상품명</Typo>
                                                        <Typo size={"1.1rem"} weight={"700"} color={"#333333"} >
                                                            {question.productTitle || '유미카츠 떡볶카츠 밀키트'}
                                                        </Typo>
                                                    </div>
                                                    {
                                                        question.answerContent !== null ?
                                                            <Typo color={'#0d7000'} size={"1.5rem"} weight={"bold"}>답변 완료</Typo>
                                                            :
                                                            answerContent.questionId === question.id ?
                                                                <Button types={"text"} value={'닫기'} onClick={() => makeAnswerOnClick(question.id)} ></Button>
                                                                :
                                                                <Button types={"primary"} value={'답변하기'} onClick={() => makeAnswerOnClick(question.id)} ></Button>
                                                    }
                                                </Col>
                                                <Divider marginBottom={'1.5rem'} marginTop={'0.5rem'} color={'#a5a5a5'}></Divider>
                                                <Col span={12} >
                                                    <Row>
                                                        <Col span={2} >
                                                            <Typo size={"1.2rem"} weight={"700"} color={"#333333"} >
                                                                [{question.title}]
                                                            </Typo>
                                                        </Col>
                                                        <Col span={10} justify={'center'}>
                                                            <Typo size={"1.2rem"} weight={"500"} color={"#333333"} >
                                                                {question.questionContent}
                                                            </Typo>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                {
                                                    answerContent.questionId === question.id ?
                                                        <>
                                                            <Row gutter={[5, 0]} style={{ padding: "2rem 0 1rem 0 " }} >
                                                                <Col span={2} >
                                                                    <Typo size={"1.2rem"} weight={"500"} color={"#333333"} >
                                                                        답변작성
                                                                    </Typo>
                                                                </Col>
                                                                <Col span={10} justify={'center'}>
                                                                    <TextAreaWrapper>
                                                                        <TextAreaBox
                                                                            value={answerContent.content}
                                                                            onChange={(e) => editAnswerContent.content(e)}
                                                                            placeholder={"내용을 입력해 주세요"}
                                                                            style={{ width: '100%', lineHeight: "1.7rem", fontSize: '1.2rem' }}
                                                                        >
                                                                        </TextAreaBox>
                                                                    </TextAreaWrapper>
                                                                </Col>
                                                                <Col span={12} justify={'flex-end'} style={{ paddingTop: '1rem' }}>
                                                                    <Button types={"primary"} value={'답변제출하기'} onClick={submitAnswerOnClick} ></Button>
                                                                </Col>
                                                            </Row>
                                                        </>
                                                        :
                                                        null
                                                }

                                                {
                                                    question.answerContent !== null ?
                                                        <Row>
                                                            <Divider marginBottom={'2rem'} marginTop={'2rem'} />
                                                            <Col span={2} >
                                                                <Typo size={"1.2rem"} weight={"700"} color={"#333333"} >
                                                                    작성된 답변
                                                                </Typo>
                                                            </Col>
                                                            <Col span={10} justify={'center'}>
                                                                <Typo size={"1.2rem"} color={"#333333"} >
                                                                    {question.answerContent}
                                                                </Typo>
                                                            </Col>
                                                        </Row>
                                                        :
                                                        null
                                                }
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            })
                    }
                </Col>
                <Col span={12} justify={"center"} style={{ margin: "1rem 0 3rem 0" }}>
                    <Pagination count={totalPageNum} onChange={pagingClick} key={pagingNum} defaultPage={pagingNum} shape="rounded" />
                </Col>
            </Row>
        </>
    )
}

export default InquiryManage;