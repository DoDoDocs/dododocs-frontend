import React from "react";
import { Row, Col } from "../../../layout/index.js"
import { GoodsImg } from "../index.js"
import { Typo } from "../../atoms/index.js"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const GoodsForm = ({
    id,
    name,
    originalPrice,
    sellingPrice,
    description,
    totalCount,
    thumbnailImg,
    //FUNCTION
    productOnClick,
}) => {
    return (
        <>
            <Col key={id} span={4} justify={"center"} align={"center"} style={{ padding: "1.5rem 1rem" }} >
                <Row justify={"center"} align={"center"}>
                    <Col span={1}></Col>
                    <Col span={9}>
                        <div
                            onClick={() => totalCount === 0 ? null : productOnClick(id)}
                            style={{ cursor: "pointer", width: "100%" }}>
                            <Col span={12} justify={"center"} align={"center"}>
                                {/* <GoodsImg square imgSrc={imgUrl} ></GoodsImg> */}
                                <GoodsImg
                                    soldOut={totalCount === 0 ? true : false}
                                    square imgSrc={thumbnailImg}
                                    productId={id}
                                ></GoodsImg>

                            </Col>
                            <Col span={12} justify={"flex-start"} align={"center"} style={{ marginTop: "1rem" }}>
                                <Typo fontFamily={'Noto Sans KR'} size={"1.3rem"} weight={"normal"} >{name}</Typo>
                            </Col>

                            {
                                (originalPrice !== sellingPrice) ?
                                    <Col span={12} justify={"flex-start"} align={"center"} style={{ marginTop: "0.5rem", }}>
                                        <Typo color={"#f03f45"} size={"1.3rem"} fontFamily={'Noto Sans KR'} weight={'700'}>{Math.ceil(100 - (sellingPrice / originalPrice * 100))}%</Typo>
                                        <ArrowDownwardIcon style={{ color: "#f03f45", fontSize: "1.5rem", marginRight: "6px" }}></ArrowDownwardIcon>
                                        <Typo color={"#333333"} size={"1.3rem"} weight={"800"} >{sellingPrice.toLocaleString()}&nbsp;원</Typo>
                                    </Col>

                                    :
                                    <Col span={12} justify={"flex-start"} align={"center"} style={{ marginTop: "0.5rem", }}>
                                        <Typo color={"#333333"} size={"1.3rem"} weight={"800"} >{sellingPrice.toLocaleString()}&nbsp;원</Typo>
                                    </Col>
                            }
                            <Col span={12} justify={"flex-start"} align={"center"} style={{ marginTop: "0.5rem" }}>
                                <Typo fontFamily={'Noto Sans KR'} size={"1rem"} color={"#999999"} >{description}</Typo>
                            </Col>
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </Col>

        </>
    )


}

export default GoodsForm;