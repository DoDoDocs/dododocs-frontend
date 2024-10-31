import React from "react";
import { Row, Col, ContentStyle } from "../../../layout/index.js"
import { Image, Typo } from "../../atoms/index.js"
import { GoodsForm } from "../../molecules/index.js"
import { Carousel } from 'antd';
import mainImage from "../../../assets/images/mainImage2.png"
import mainImage_2 from "../../../assets/images/mainImage3.jpg"

import Pagination from '@mui/material/Pagination';

const SearchContent = ({
    pagingClick,
    pagingNum,
    lists,
    collectionProductOnClick,
    totalPageNum,
    keywordValue
}) => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };
    const contentStyle = {
        margin: 0,
        // height: 'auto',
        color: '#fff',
        textAlign: 'center',
        background: '#364d79',
        height: "300px"
    };
    return (
        <>
            {/* //SECTION Carousel */}
            <Carousel afterChange={onChange} autoplay>
                <div>
                    <Image src={mainImage} width={"100%"} style={contentStyle} ></Image>
                </div>
                <div>
                    <Image src={mainImage_2} width={"100%"} style={contentStyle} ></Image>
                </div>
            </Carousel>
            {/* //!SECTION Carousel */}

            <ContentStyle>
                <Row justify={"center"} align={"center"}>
                    {/* //SECTION Title */}

                    <Col span={12} justify={"center"} align={"center"} style={{ margin: "50px 0" }}>
                        <Typo size={'2.5rem'} weight={"bold"} color={"rgb(51,51,51)"} ><p style={{ color: "#0d7000" }} >'{keywordValue}'&nbsp;</p> 검색 결과</Typo>
                    </Col>
                    {/* //!SECTION Title */}
                    {/* //SECTION Content */}

                    <Col span={10} justify={"center"} align={"center"}>
                        <Row justify={"center"} align={"center"}>
                            {/* //SECTION list */}

                            <Col span={12} justify={"center"} align={"center"}>
                                <Row justify={"flex-start"} align={"flex-start"}>
                                    {
                                        (lists) ?
                                            lists.map((lists) => {
                                                return (
                                                    <GoodsForm
                                                        key={lists.id}
                                                        id={lists.id}
                                                        thumbnailImg={lists.thumbnailImg}
                                                        name={lists.name}
                                                        originalPrice={lists.originalPrice}
                                                        sellingPrice={lists.sellingPrice}
                                                        description={lists.description}
                                                        totalCount={lists.totalCount}
                                                        productOnClick={() => collectionProductOnClick(lists.id)}
                                                    />
                                                )
                                            })
                                            :
                                            null
                                    }
                                    {
                                        lists.length === 0 ?
                                            <Col span={12} justify={'center'} style={{ padding: '50px 0' }}>
                                                <Typo size={'1.5rem'} color={'#b5b5b5'}>등록된 상품이 없습니다.</Typo>
                                            </Col>
                                            : null
                                    }
                                </Row>

                            </Col>
                            {/* //!SECTION list */}
                            {/* //SECTION Pagination */}
                            <Col span={12} justify={'center'}>
                                <Pagination count={totalPageNum} onChange={pagingClick} key={pagingNum} defaultPage={pagingNum} shape="rounded" />
                            </Col>
                        </Row>

                    </Col>
                    {/* //!SECTION Pagination */}

                </Row>
            </ContentStyle >
        </>
    )
}

export default SearchContent;