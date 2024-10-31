import React, { useEffect, useState } from "react"
import { Row, Col } from "../../../../layout/index.js"
import { Typo, Button } from "../../../atoms/index.js"
import { Space, Table, Tag, notification } from 'antd';
import get_all_goods from "../../../../service/api/get/get_product_all_goods";
import PatchEditGrade from "../../../../service/api/patch/patch_edit_grade";

//NOTE contentContainer 에서 다룰 내용이 아닌거같아서 content랑 합칠게요


const AdminContent = () => {

    //SECTION pagination
    const [paginationInfo, setPaginationInfo] = useState({
        pageSize: 15,
        total: 200,
    })
    const [paginationCurrent, setPaginationCurrent] = useState(1)
    /**
        * @hook useState
        * @description 상품 리스트
        */
    const [productData, setProductData] = useState([])

    /**
         * @hook useEffect
         * @description 전체 리스트 갯수 저장 
         * @description 페이지 바뀔떄마다 새로운 페이지 가져오기
         * @description 전체 페이지 갯수 가져오기
         */
    useEffect(() => {
        setProductData([])
        get_all_goods(paginationCurrent - 1)
            .then((res) => {
                const data = res.response;
                console.log(data)
                setPaginationInfo((state) => ({ ...state, pageSize: data.size }))
                setPaginationInfo((state) => ({ ...state, total: data.totalElements }))
                data.content.map((data) => {
                    return setProductData((state) => (
                        [
                            ...state,
                            {
                                key: data.id,
                                name: data.name,
                                price: [data.originalPrice, data.sellingPrice],
                                // TODO ||지우기
                                sig: data.grade,
                                category: data.category,
                                totalCount: data.totalCount || 100,
                            }
                        ]
                    ))
                })
            })
    }, [paginationCurrent])


    /**
        * @description 페이지 클릭시
        */
    const handleTableChange = (pagination) => {
        setPaginationCurrent(pagination.current)
    }

    //!SECTION pagination

    //SECTION 시그니처 지정 / 삭제 

    const setSigOnClick = (productId, sig, productName) => {
        console.log(productId, sig);
        const sigValue = sig === 'NORMAL' ? "SPECIAL" : "NORMAL"
        PatchEditGrade(sigValue, productId,)
            .then((res) => {
                console.log(res)
                setProductData((state) => (
                    state.map((data) => {
                        if (data.key === productId) {
                            return {
                                ...data,
                                sig: sigValue,
                            }
                        } else {
                            return data
                        }
                    })
                ))
                notification['success']({
                    message: `${productName}의 시그니처가 수정되었습니다.`,
                })

                console.log(productData)

            })
            .catch((err) => console.log(err))
    }

    //!SECTION 시그니처 지정 / 삭제 
    console.log("🚀 ~ productData", productData);




    const categoryOptions = {
        RICE: ['쌀/잡곡', 'blue'],
        VEGETABLE: ['채소', 'green'],
        FRUIT: ['과일', 'magenta'],
        PERSIMMON: ['감/곶감', 'orange'],
        NUT: ['견과/버섯', 'geekblue'],
        WINE: ['와인', 'red'],
        HONEY: ['벌꿀', 'gold'],
        PROCESSED: ['가공식품', 'volcano'],
        PASTE: ['장류', 'lime'],
        SNACK: ['떡/간식', 'cyan'],
        ETC: ['기타', 'purple'],
    };

    const columns = [
        {
            title: '제목',
            dataIndex: 'name',
            key: 'name',
            width: '20rem',
            render: (text) => <Typo size={"1.2rem"} color={"#333333"} >{text}</Typo>
            ,
        },

        {
            title: '가격',
            dataIndex: 'price',
            key: 'price',
            responsive: ['md'],

            render: (_, { price }) => (
                <>
                    {
                        price[0] === price[1] ?
                            <Typo size={"1.2rem"} color={"#333333"} >{price[0]}&nbsp;원</Typo>
                            :
                            <>
                                <Typo size={"1.2rem"} color={"#b5b5b5"} style={{ textDecorationLine: "line-through" }} >{price[0]}</Typo>
                                <Typo size={"1.2rem"} color={"#333333"} >{price[1]}&nbsp;원</Typo>
                            </>
                    }
                </>
            ),
        },
        {
            title: '갯수',
            key: 'totalCount',
            dataIndex: 'totalCount',
            responsive: ['md'],
            render: (_, { totalCount }) => (
                <Typo size={"1.2rem"} color={"#333333"} >{totalCount}&nbsp;개</Typo>

            ),
        },
        {
            title: '카테고리',
            key: 'category',
            dataIndex: 'category',
            responsive: ['md'],
            render: (_, { category }) => (
                <Tag color={categoryOptions[category][1]} style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                    {categoryOptions[category][0]}
                </Tag>
            ),
        },
        {
            title: '시그니처',
            key: 'sig',
            dataIndex: 'sig',
            align: 'center',
            render: (_, { sig }) => (
                sig === "SPECIAL" ?
                    '⭕️'
                    :
                    '❌'
            ),
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Space size="large">
                        {
                            record.sig === 'SPECIAL' ?
                                <>
                                    <Button onClick={() => setSigOnClick(record.key, record.sig, record.name)} types={'text'} size={'small'} value={"시그니처 빼기"} />
                                </>
                                :
                                <Button onClick={() => setSigOnClick(record.key, record.sig, record.name)} types={'text'} size={'small'} value={"시그니처 지정"} />
                        }
                    </Space>
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
                                상품관리
                            </Typo>

                        </Col>
                        <Col span={12} justify={'start'} align={'center'}>
                            <Typo fontFamily={'Noto'} size={"1.3rem"} weight={"500"} color={'rgb(153, 153, 153)'}  >
                                등록된 상품의 시그니처를 지정하고 남은 재고를 확인 할 수 있습니다.
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
                                pagination={{ current: paginationCurrent, total: paginationInfo.total, pageSize: paginationInfo.pageSize, position: ['none', 'bottomCenter'] }}

                                onChange={handleTableChange}
                                style={{ width: "100%", }} />
                        </Col>
                    </Row>
                </Col>
                {/* //!SECTION 내용 */}

            </Row>
        </>
    )

}

export default AdminContent;