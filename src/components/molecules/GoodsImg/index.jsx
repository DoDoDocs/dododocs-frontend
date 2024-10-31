import React, { memo, useState } from "react"
import styled from "styled-components"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import get_product_info from "../../../service/api/get/get_product_info.js"
import { Typo, Divider } from "../../atoms/index.js";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Row, Col } from "../../../layout/index.js"
import { useNavigate } from "react-router-dom"

const ImgWrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: auto;
    transition: all 0.5s ease-in-out 0s;
`
const ImgContainer = styled.div`
/* position: relative;
    overflow: hidden;
    width: 100%;
    height: auto; */
    transition: all 0.5s ease-in-out 0s;

    width: 100%;
  position: relative;
  padding-bottom: 100%; // 이것이 컨테이너를 정사각형으로 만듭니다
  overflow: hidden;
`


const ImgContent = styled.img.attrs((props) => ({
    src: props.src,
}))`
    transition: all 0.5s ease-in-out 0s;
    /* width:100%;
    height : ${props => props.height || `auto`};
    object-fit: cover;
     */
    object-position: center;
    position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; 
    ${ImgContainer}:hover & {
        transform: scale(1.05);
        transition: all 0.3s ease-in-out 0s;
  }

  //TODO SoldOut
  ${props => props.soldOut === true ? `
    filter :  brightness(40%); 
    `
        :
        null
    }
`
const SoldOut = styled.strong`
    position:absolute;
    top : 50%;
    left : 0%;
    width : 100%;
    height : 2rem;
    font-size: 1.5rem;
    color : #ffffff;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BasketIcon = styled.div`
    position:absolute;
    right : 1rem;
    bottom : 1rem;
    width : 3rem;
    height : 3rem;
    border-radius: 50%;
    background-color: rgba(0 , 128 ,16 , 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`

const GoodsImg = ({ imgSrc, height, productId, soldOut
    // basketIconOnClick 
}) => {

    const navigate = useNavigate();

    /** NOTE 장바구니 아이콘 제품 클릭시 열리는 모달
   * @description 장바구니 아이콘 제품 클릭시 열리는 모달
   */
    const [isCartAlertVisible, setCartAlertVisible] = useState(false);

    const cartAlertModal = {
        show: () => setCartAlertVisible(true),
        close: () => setCartAlertVisible(false)
    }

    /** NOTE 장바구니 아이콘 제품 클릭시 
     * @sort collection - 전체상품
     * @type {Function} 
     * @param productId - 제품 ID
     * @enum {number} productId
     * @description productId로 GET -> localStorage에 {cartItem } 
     */
    const basketIconOnClick = () => {
        // get_product_info(productId)
        //     .then((res) => {
        //         const data = Object.assign(
        //             {
        //                 orderCount: 1,
        //                 orderCost: res.response.cost * (100 - res.response.discount) * 0.01,
        //                 discountCost: res.response.cost * (100 - res.response.discount) * 0.01
        //             },
        //             res.response);

        //         //localStorage에 카트상품리스트가 없다면 생성
        //         if (localStorage.getItem('cartProductList') === null) {
        //             cartAlertModal.show();
        //             localStorage.setItem('cartProductList', JSON.stringify([data]));
        //             return;
        //         } else {
        //             const getCartProductList = JSON.parse(localStorage.getItem('cartProductList')); //문자형으로 된 자료를 다시 배열로 바꾸기
        //             if (getCartProductList.findIndex(products => products.id === data.id) !== -1) {
        //                 return notification['warning']({
        //                     message: `이미 장바구니에 있는 제품입니다.`,
        //                     description: `장바구니를 확인해 주세요`,
        //                 });
        //             }
        //             getCartProductList.push(data);
        //             localStorage.setItem('cartProductList', JSON.stringify(getCartProductList));
        //             cartAlertModal.show();
        //         }
        //     })
    }


    return (
        <>
            <ImgWrapper >
                <ImgContainer>
                    <ImgContent src={imgSrc} height={height} soldOut={soldOut} >
                    </ImgContent>
                    {
                        soldOut === true ?
                            <SoldOut>
                                SOLD OUT
                            </SoldOut>
                            :
                            <BasketIcon onClick={(e) => { e.stopPropagation(); basketIconOnClick(); }} >
                                <ShoppingCartOutlinedIcon style={{
                                    width: '60%',
                                    height: 'auto',
                                    color: "#fff",
                                }} />
                            </BasketIcon>
                    }
                </ImgContainer>
            </ImgWrapper>

            <Modal
                open={isCartAlertVisible}
                onClose={(e) => { e.stopPropagation(); cartAlertModal.close(); }}
            >
                <Box
                    onClick={(e) => { e.stopPropagation(); }}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: {
                            xs: "55%",
                            sm: "45%",
                            md: "45%",
                            lg: "45%",
                            xl: "45%",
                        },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: '5px',
                        p: 4,
                        overflow: 'auto',
                        maxHeight: ' 80%',
                        padding: "2rem 2rem 1.3rem 2rem",
                    }}>
                    <Row>
                        <Col xs={0} span={12}>
                            <Typo full size={'1.1rem'}>선택한 상품이 성공적으로 장바구니에 담겼습니다.</Typo>
                        </Col>
                        <Col span={12}>
                            <Typo full size={'1.1rem'}>장바구니로 이동하시겠습니까?</Typo>
                        </Col>
                        <Col span={12} >
                            <Divider marginBottom={"10px"} marginTop={'10px'}></Divider>
                        </Col>
                        <Col span={12} justify={'flex-end'} >
                            <Typo size={'1.1rem'} color={'#0d7000'} weight={'500'}
                                style={{ marginRight: "2rem", cursor: "pointer" }}
                                onClick={(e) => { e.stopPropagation(); cartAlertModal.close(); }}>
                                취소
                            </Typo>
                            <Typo size={'1.1rem'} color={'#0d7000'} weight={'500'}
                                style={{ cursor: "pointer" }}
                                onClick={(e) => { e.stopPropagation(); navigate('/cart') }}>
                                확인
                            </Typo>
                        </Col>
                    </Row>
                </Box>
            </Modal>

        </>
    )

}

export default memo(GoodsImg);
