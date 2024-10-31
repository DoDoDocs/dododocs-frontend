import React, { useEffect, useState } from "react"
import { Row, Col } from "../../../../layout/index.js"
import { Image, Typo, Button, Divider, TextBox } from "../../../atoms/index.js"
import styled from "styled-components";
import { Table, Tag } from 'antd';
import get_order_admin_all_orders from "../../../../service/api/get/get_order_admin_all_orders";
import patch_order_product_delivery from "../../../../service/api/patch/patch_order_product_delivery";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

//NOTE contentContainer 에서 다룰 내용이 아닌거같아서 content랑 합칠게요


const BorderWrapper = styled.div`
    display : flex;
    align-items: center;
    justify-content: space-between;
    width : 100%;
    height : 2.8rem;
    padding-left :1rem ;
    border : 1px solid #0d7000;
    border-radius: 6px;
    box-shadow : rgb(247 247 247) 0px 0px 0px 1px inset;
    font-size : 1.2rem;
`


const AdminContent = () => {

    //SECTION pagination
    const [paginationInfo, setPaginationInfo] = useState({
        pageSize: 15,
        total: 30,
    })
    const [paginationCurrent, setPaginationCurrent] = useState(1)
    /**
        * @hook useState
        * @description 주문내역 리스트
        */
    const [productData, setProductData] = useState([{
        buyerName: "",
        id: 1,
        key: 1,
        orderDate: "",
        orderProducts: [],
        paymentPrice: 79150,
        recipientName: "",
    }])

    /**
         * @hook useEffect
         * @description 전체 리스트 갯수 저장 
         * @description 페이지 바뀔떄마다 새로운 페이지 가져오기
         * @description 전체 페이지 갯수 가져오기
         */
    useEffect(() => {
        setProductData([])
        get_order_admin_all_orders(paginationCurrent - 1)
            .then((res) => {
                const data = res.response;
                console.log('/api/order/v1/admin/orders')
                console.log(data)
                setPaginationInfo((state) => ({ ...state, pageSize: data.size }))
                setPaginationInfo((state) => ({ ...state, total: data.totalElements }))
                setProductData(data.content)
            }).catch((err) => console.log(err))
    }, [paginationCurrent])

    /**
        * @description 페이지 클릭시
        */
    const handleTableChange = (pagination) => {
        setPaginationCurrent(pagination.current)
    }
    //!SECTION pagination



    // SECTION 배송관련 

    /**
    * @hook useState 
    * @description 관리자가 입력할 배송정보에 대한 주문 제품
    */
    const [deliveryProduct, setDeliveryProduct] = useState({
        orderProductId: "",
        orderProductName: "",
        orderProductCount: 0,
        deliveryCompany: '',
        trackingNumber: ""
    });

    /**
     * @description buyer Info 수정 Func
     */
    let editBuyerInfo = {
        orderProductId: (orderProductId) => {
            return setDeliveryProduct((state) => ({ ...state, orderProductId: orderProductId }))
        },
        orderProductName: (productName) => {
            return setDeliveryProduct((state) => ({ ...state, orderProductName: productName }))
        },
        orderProductCount: (orderProductCount) => {
            return setDeliveryProduct((state) => ({ ...state, orderProductCount: orderProductCount }))
        },
        deliveryCompany: (e) => {
            return setDeliveryProduct((state) => ({ ...state, deliveryCompany: e.target.value }))
        },
        trackingNumber: (e) => {
            return setDeliveryProduct((state) => ({ ...state, trackingNumber: e.target.value }))
        },
    }

    /**
    * @hook useState 
    * @description 관리자가 해당 주문 제품에 대한 배송 정보 입력 모달
    */
    const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
    const deliveryModalHandler = {
        show: () => setIsDeliveryModalOpen(true),
        close: () => setIsDeliveryModalOpen(false)
    }

    /** 
    * @description 송장번호 입력하기 클릭시 모달 열기
    */
    const inPutTrackingNumberOnClick = (orderProductId, productName, orderProductCount,) => {
        editBuyerInfo.orderProductId(orderProductId);
        editBuyerInfo.orderProductName(productName);
        editBuyerInfo.orderProductCount(orderProductCount);
        deliveryModalHandler.show();
    }

    /** 
    * @description 모달에서 제출하기 클릭시 배송정보 전송
    */
    const submitDeliveryInfoOnClick = () => {
        patch_order_product_delivery(
            deliveryProduct.orderProductId,
            {
                deliveryCompany: deliveryProduct.deliveryCompany,
                trackingNumber: deliveryProduct.trackingNumber,
            })
            .then((res) => {
                console.log(res);
                get_order_admin_all_orders(paginationCurrent - 1)
                    .then((res) => {
                        const data = res.response;
                        console.log(data)
                        setProductData(data.content);
                        setDeliveryProduct({
                            orderProductId: "",
                            orderProductName: "",
                            orderProductCount: 0,
                            deliveryCompany: '',
                            trackingNumber: ""
                        })
                    }).catch((err) => console.log(err))
            }).catch((err) => console.log(err))
        deliveryModalHandler.close();
    }


    // !SECTION 배송관련 






    const columns = [
        {
            title: '제품명',
            dataIndex: 'orderProducts',
            key: 'orderProducts',
            render: (_, { orderProducts }) => (
                orderProducts.map((products, index) => {
                    return (
                        <Typo key={index} size={"1.2rem"} color={"#333333"} style={{ padding: "0.5rem 0", alignItems: "center" }} weight={'500'} >
                            {index + 1}. {products.productName}
                            {
                                products.deliveryStatus === "WAITING" ?
                                    <Tag color={'volcano'} style={{ fontSize: "1.1rem", fontWeight: "bold", marginLeft: "0.5rem" }}>
                                        배송전
                                    </Tag>
                                    :
                                    <Tag color={'green'} style={{ fontSize: "1.1rem", fontWeight: "bold", marginLeft: "0.5rem" }}>
                                        배송완료
                                    </Tag>
                            }


                        </Typo>
                    )
                })
            ),
        },


        {
            title: '구매자',
            key: 'buyerName',
            dataIndex: 'buyerName',
            responsive: ['md'],
            render: (_, { buyerName }) => (
                <Typo size={"1.2rem"} color={"#333333"} >{buyerName}</Typo>

            ),
        },

        {
            title: '결제금액',
            dataIndex: 'paymentPrice',
            key: 'paymentPrice',
            responsive: ['md'],
            render: (_, { paymentPrice }) => (
                <Typo size={"1.2rem"} color={"#333333"} >{paymentPrice.toLocaleString()}&nbsp;원</Typo>


            ),
        },
        {
            title: '주문일자',
            key: 'orderDate',
            dataIndex: 'orderDate',
            align: 'center',
            responsive: ['md'],
            render: (_, { orderDate }) => (
                <>
                    <Typo size={"1.2rem"} weight={500} color={"#333333"} >
                        {orderDate.slice(0, 10)}
                    </Typo>
                    <Typo size={"1.2rem"} color={"#333333"} >
                        {orderDate.slice(11, 19)}
                    </Typo>
                </>

            ),
        },
    ];


    return (
        <>
            <Row >
                {/* SECTION 제목 */}
                <Col span={12}>
                    <Row style={{ margin: "2rem 0" }}>
                        <Col span={12} justify={'start'} align={'center'}>
                            <Typo fontFamily={'Noto'} size={"3rem"} weight={"500"} color={'rgb(51,51,51)'} >
                                주문확인하기
                            </Typo>

                        </Col>
                        <Col span={12} justify={'start'} align={'center'}>
                            <Typo fontFamily={'Noto'} size={"1.3rem"} weight={"500"} color={'rgb(153, 153, 153)'}  >
                                접수된 주문을 확인하고 <b>[배송 준비중 , 배송중 ]</b> 상태 업데이트 하기
                            </Typo>
                        </Col>
                        <Col span={12} justify={'start'} align={'center'}>
                            <Typo fontFamily={'Noto'} size={"1.3rem"} weight={"500"} color={'rgb(153, 153, 153)'}  >
                                클릭시 상세정보를 확인할 수 있습니다.
                            </Typo>
                        </Col>
                    </Row>
                </Col>

                {/* //!SECTION 제목 */}


                {/* //SECTION 내용 */}

                <Col span={12}>
                    <Row>
                        <Col span={12}>
                            <Table columns={columns} dataSource={productData}
                                rowKey={(render) => render.id}
                                pagination={{ current: paginationCurrent, total: paginationInfo.total, pageSize: paginationInfo.pageSize, position: ['none', 'bottomCenter'] }}
                                onChange={handleTableChange}
                                style={{ width: "100%", }}
                                expandable={{
                                    expandedRowRender: (record) => (

                                        <Row >
                                            <Col span={12}>
                                                <Typo size={"1.5rem"} weight={'bold'} color={"#333333"} >송장번호 입력하기</Typo>
                                            </Col>
                                            <Col span={12}>
                                                {
                                                    record.orderProducts.map((products) => {
                                                        return (
                                                            <Col key={products.productId} span={12} align={'center'} style={{ padding: "1.5rem 0" }} >
                                                                <Row align={'center'} >
                                                                    <Col xs={7} span={8} >
                                                                        <Row align={'center'}>
                                                                            <Col span={2.5}>
                                                                                <Image src={products.productThumbnailImg} width={'100%'}></Image>
                                                                            </Col>
                                                                            <Col span={9} style={{ paddingLeft: '1rem', height: '100%' }} align={'stretch'}>
                                                                                <Row style={{ alignContent: "space-evenly" }}>
                                                                                    <Col span={12} align={'baseline'}>
                                                                                        <Typo size={'1.3rem'} color={'#9e9e9e'} weight={'500'} style={{ wordBreak: 'keep-all', paddingLeft: '0.5rem' }} >
                                                                                            제품명
                                                                                        </Typo>
                                                                                        <Typo size={'1.3rem'} color={'rgb(51,51,51)'} weight={'500'} style={{ wordBreak: 'keep-all', paddingLeft: '0.5rem' }} >
                                                                                            {products.productName}
                                                                                        </Typo>
                                                                                    </Col>
                                                                                    <Col xs={0} span={12} align={'baseline'}>
                                                                                        <Typo size={'1.3rem'} color={'#9e9e9e'} weight={'500'} style={{ wordBreak: 'keep-all', paddingLeft: '0.5rem' }} >
                                                                                            수량
                                                                                        </Typo>
                                                                                        <Typo size={'1.3rem'} color={'rgb(51,51,51)'} weight={'500'} style={{ paddingLeft: '0.5rem' }} >
                                                                                            {products.orderProductCount} 개
                                                                                        </Typo>
                                                                                    </Col>
                                                                                    <Col xs={0} span={12} align={'baseline'} >
                                                                                        <Typo size={'1.3rem'} color={'#9e9e9e'} weight={'500'} style={{ wordBreak: 'keep-all', paddingLeft: '0.5rem' }} >
                                                                                            금액
                                                                                        </Typo>
                                                                                        <Typo size={'1.3rem'} color={'rgb(51,51,51)'} weight={'500'} style={{ paddingLeft: '0.5rem' }} >
                                                                                            {products.orderProductPrice.toLocaleString()} 원
                                                                                        </Typo>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>

                                                                    <Col xs={5} span={4}>
                                                                        {
                                                                            products.deliveryStatus === "WAITING" ?
                                                                                <>
                                                                                    <Row justify={'space-between'} align={'center'}>
                                                                                        <Col span={4} justify={'center'}>
                                                                                            <Typo size={'1.2rem'} color={'rgb(51,51,51)'} weight={'bold'} style={{ padding: ' 0 0.5rem', wordBreak: 'keep-all' }} >
                                                                                                배송 준비중
                                                                                            </Typo>
                                                                                        </Col>
                                                                                        <Col span={6} justify={'center'}>
                                                                                            <Button types={'text'} onClick={() => inPutTrackingNumberOnClick(products.orderProductId, products.productName, products.orderProductCount)} value={'송장번호 입력하기'} style={{ fontSize: "1.2rem", padding: '0.8rem' }}></Button>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </>
                                                                                :
                                                                                <Row>
                                                                                    <Col span={12}>
                                                                                        <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "flex-end", flexDirection: "column", position: "relative", width: "auto" }}>
                                                                                            <Typo color={"#9c9c9c"} style={{ position: "absolute", top: "-1.5rem", left: "0px", width: "7rem" }} >택배사</Typo>
                                                                                            <Typo size={"1.2rem"} weight={"700"} color={"#333333"} >
                                                                                                {products.deliveryCompany}
                                                                                            </Typo>
                                                                                        </div>
                                                                                    </Col>
                                                                                    <Col span={12}>
                                                                                        <div style={{ marginTop: "2rem", display: "flex", alignItems: "flex-end", flexDirection: "column", position: "relative", width: "auto" }}>
                                                                                            <Typo color={"#9c9c9c"} style={{ position: "absolute", top: "-1.5rem", left: "0px", width: "7rem" }} >송장번호</Typo>
                                                                                            <Typo size={"1.2rem"} weight={"700"} color={"#333333"} >
                                                                                                {products.trackingNumber}
                                                                                            </Typo>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                        }
                                                                    </Col>
                                                                </Row>
                                                            </Col>

                                                        )
                                                    })
                                                }
                                            </Col>
                                            <Col span={12} style={{ marginTop: "1rem" }}>
                                                <Typo size={"1.5rem"} weight={'bold'} color={"#333333"} >배송정보 확인하기</Typo>
                                            </Col>
                                            <Col span={12}>
                                                <Col span={12}>
                                                    <Row gutter={[5, 0]} >
                                                        <Col span={12} >
                                                            <Row>
                                                                <Col span={3}>
                                                                    <Typo color={'rgb(102, 102, 102)'} weight={'500'} size={'1.3rem'} style={{ wordBreak: 'keep-all' }}>
                                                                        수령인
                                                                    </Typo>
                                                                </Col>
                                                                <Col span={8}>
                                                                    <Typo color={'rgb(51, 51, 51)'} weight={'500'} size={'1.3rem'} style={{ wordBreak: 'keep-all' }}>
                                                                        {record.orderProducts[0].recipientName}
                                                                    </Typo>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Row>
                                                                <Col span={3}>
                                                                    <Typo color={'rgb(102, 102, 102)'} weight={'500'} size={'1.3rem'} style={{ wordBreak: 'keep-all' }}>
                                                                        핸드폰
                                                                    </Typo>
                                                                </Col>
                                                                <Col span={8} align={'center'}>
                                                                    <Typo color={'rgb(51, 51, 51)'} weight={'500'} size={'1.3rem'} style={{ wordBreak: 'keep-all', alignItems: "flex-end" }}>
                                                                        {record.orderProducts[0].recipientPhoneNumber}
                                                                    </Typo>

                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Row>
                                                                <Col span={3}>
                                                                    <Typo color={'rgb(102, 102, 102)'} weight={'500'} size={'1.3rem'} style={{ wordBreak: 'keep-all' }}>
                                                                        우편번호
                                                                    </Typo>
                                                                </Col>
                                                                <Col span={8}>
                                                                    <Typo color={'rgb(51, 51, 51)'} weight={'500'} size={'1.3rem'} style={{ wordBreak: 'keep-all' }}>
                                                                        {record.orderProducts[0].zipCode}
                                                                    </Typo>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Row>
                                                                <Col span={3}>
                                                                    <Typo color={'rgb(102, 102, 102)'} weight={'500'} size={'1.3rem'} style={{ wordBreak: 'keep-all' }}>
                                                                        주소
                                                                    </Typo>
                                                                </Col>
                                                                <Col span={8}>
                                                                    <Typo color={'rgb(51, 51, 51)'} weight={'500'} size={'1.3rem'} style={{ wordBreak: 'keep-all' }}>
                                                                        {record.orderProducts[0].jibunAddress} {record.orderProducts[0].detailAddress}
                                                                    </Typo>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Row>
                                                                <Col span={3}>
                                                                    <Typo color={'rgb(102, 102, 102)'} weight={'500'} size={'1.3rem'} style={{ wordBreak: 'keep-all' }}>
                                                                        요청사항
                                                                    </Typo>
                                                                </Col>
                                                                <Col span={8}>
                                                                    <Typo color={'rgb(51, 51, 51)'} weight={'500'} size={'1.3rem'} style={{ wordBreak: 'keep-all' }}>
                                                                        {record.orderProducts[0].deliveryRequirement || '없음'}
                                                                    </Typo>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Col>
                                        </Row>
                                    ),
                                    onExpand: (_, record) => {
                                        if (_ === true) {
                                        }
                                    },
                                    expandRowByClick: true,
                                }}

                            />
                        </Col>
                    </Row >
                </Col >
                {/* //!SECTION 내용 */}
            </Row >


            <Modal
                open={isDeliveryModalOpen}
                onClose={() => { deliveryModalHandler.close(); }}
            >
                <>
                    <Box sx={{
                        position: 'relative',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: {
                            xs: "88%",
                            sm: "65%",
                            md: "65%",
                            lg: "65%",
                            xl: "65%",
                        },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: '5px',
                        p: 4,
                        overflow: 'auto',
                        maxHeight: '70%',
                        padding: "2rem 3rem 2rem 3rem",
                    }}>

                        <Row gutter={[10, 0]} >
                            <Col span={12} justify={'space-between'} align={'center'} style={{ paddingBottom: "1rem ", borderBottom: "rgba(0,0,0,.06) 1px solid" }}>
                                <Typo size={"1.5rem"} weight={"500"} color={'rgb(51,51,51)'} >
                                    송장번호 입력하기
                                </Typo>
                                <CloseIcon onClick={deliveryModalHandler.close} style={{ cursor: 'pointer' }} />

                            </Col>
                            <Col span={12}>
                                <Row style={{ marginTop: "2rem" }}>
                                    <Col span={6}>
                                        <div style={{ display: "flex", alignItems: "flex-end", flexDirection: "column", position: "relative", width: "auto" }}>
                                            <Typo color={"#9c9c9c"} style={{ position: "absolute", top: "-1.5rem", left: "0px", width: "7rem" }} >제품명</Typo>
                                            <Typo size={"1.2rem"} weight={"700"} color={"#333333"} >
                                                {deliveryProduct.orderProductName}
                                            </Typo>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ display: "flex", alignItems: "flex-end", flexDirection: "column", position: "relative", width: "auto" }}>
                                            <Typo color={"#9c9c9c"} style={{ position: "absolute", top: "-1.5rem", left: "0px", width: "7rem" }} >주문 갯수</Typo>
                                            <Typo size={"1.2rem"} weight={"700"} color={"#333333"} >
                                                {deliveryProduct.orderProductCount}
                                            </Typo>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Divider marginBottom={'1rem'} marginTop={'1rem'} ></Divider>
                            <Col span={12}>
                                <Row align={"center"}>
                                    <Col span={2} align={"center"}>
                                        <Typo size={"1.2rem"} weight={"700"} color={"#333333"} >
                                            택배회사
                                        </Typo>
                                    </Col>
                                    <Col span={10}>
                                        <BorderWrapper>
                                            <TextBox value={deliveryProduct.deliveryCompany} onChange={(e) => editBuyerInfo.deliveryCompany(e)} placeholder={"택배회사를 입력해 주세요."}></TextBox>
                                        </BorderWrapper>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row align={"center"}>
                                    <Col span={2} align={"center"}>
                                        <Typo size={"1.2rem"} weight={"700"} color={"#333333"} >
                                            송장번호
                                        </Typo>
                                    </Col>
                                    <Col span={10}>
                                        <BorderWrapper>
                                            <TextBox value={deliveryProduct.trackingNumber} onChange={(e) => editBuyerInfo.trackingNumber(e)} placeholder={"송장번호를 입력해 주세요."}></TextBox>
                                        </BorderWrapper>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12} justify={'flex-end'} align={'center'} style={{ marginTop: '1rem' }} >
                                <Button types={'text'} onClick={deliveryModalHandler.close} style={{ marginRight: "1rem" }}
                                    value={'취소'}
                                />

                                <Button types={'primary'} onClick={submitDeliveryInfoOnClick}
                                    value={'제출하기'} />

                            </Col>
                        </Row>
                    </Box>
                </>
            </Modal>
        </>
    )

}

export default AdminContent;