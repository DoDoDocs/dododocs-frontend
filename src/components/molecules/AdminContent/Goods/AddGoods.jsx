import React, { useState, useRef, useCallback } from "react"
import { Row, Col } from "../../../../layout/index.js"
import { Image, Typo, Button, Divider, FileBox, NumberField, TextBox } from "../../../atoms/index.js"
import { CreateTextArea, UploadContentWrapper, SearchWrapper } from './AddGoods.styles.js';
import { PlusOutlined } from '@ant-design/icons';
import uploadBackground from "../../../../assets/images/uploadBackground.png"
import { notification } from 'antd';
import PostProduct from "../../../../service/api/post/post_product";
import { Alert } from 'antd';
import { Radio } from 'antd';




const AdminContent = () => {

    const ref = useRef(null);
    const handleResizeHeight = useCallback(() => {
        if (ref === null || ref.current === null) {
            return;
        }
        ref.current.style.height = "2.5rem";
        ref.current.style.height = ref.current.scrollHeight + "px";
    }, []);
    //SECTION - 상품 게시물 작성


    /**
     * @hook useState
     * @description 상품 추가시 들어갈 거
     */
    const [addGoodData, setAddGoodData] = useState({
        title: "",
        cost: 0,
        discount: 0,
        amount: 0,
        description: "",
        imgUrl: null,
        infoUrl: null,
        imgFile: null,
        infoImgFile: null
    })




    const discountCost = String(Math.floor(addGoodData.cost * (100 - addGoodData.discount) * 0.01))
    const sellingPrice = Number(discountCost - discountCost.slice(-1) || discountCost)
    // const sellingPrice = addGoodData.cost * (100 - addGoodData.discount) * 0.01


    /**
   * @description addGoodData  입력  FUNCTION  */
    let addGoodHandleFunction = {
        title: (e) => {
            return setAddGoodData((state) => ({ ...state, title: e.target.value }))
        },
        description: (e) => {
            return setAddGoodData((state) => ({ ...state, description: e.target.value }))
        },
        amount: (e) => {
            return setAddGoodData((state) => ({ ...state, amount: e.target.value }))
        },
        cost: (e) => {
            return setAddGoodData((state) => ({ ...state, cost: e.target.value }))
        },
        discount: (e) => {
            return setAddGoodData((state) => ({ ...state, discount: e.target.value }))
        },
        imgUrl: (e) => {
            return setAddGoodData((state) => ({ ...state, imgUrl: e.target.files[0] }))
        },
        infoUrl: (e) => {
            return setAddGoodData((state) => ({ ...state, infoUrl: e.target.files[0] }))
        },
        imgFile: (file) => {
            return setAddGoodData((state) => ({ ...state, imgFile: file }))
        },
        infoImgFile: (file) => {
            return setAddGoodData((state) => ({ ...state, infoImgFile: file }))

        }
    }

    //SECTION 카테고리

    /**
     * @type {object}
     * @description 카테고리 옵션 리스트
     */
    const categoryOptions = [
        { value: 'RICE', label: '쌀/잡곡' },
        { value: 'VEGETABLE', label: '채소' },
        { value: 'FRUIT', label: '과일' },
        { value: 'PERSIMMON', label: '감/곶감' },
        { value: 'NUT', label: '견과/버섯' },
        { value: 'WINE', label: '와인' },
        { value: 'HONEY', label: '벌꿀' },
        { value: 'PROCESSED', label: '가공식품' },
        { value: 'PASTE', label: '장류' },
        { value: 'SNACK', label: '떡/간식' },
        { value: 'ETC', label: '기타' },
    ];

    /**
     * @type {useState}
     * @description 카테고리 옵션 선택
     */
    const [category, setCategory] = useState('');

    /**
    * @type {Function}
    * @description 카테고리 옵션 선택 바꾸는 함수
    */
    const categoryOnChange = ({ target: { value } }) => {
        console.log('radio checked', value);
        setCategory(value);
    };

    //!SECTION 카테고리




    //SECTION 썸네일 imgUrl
    /**
     * @hook useState
   * @description 섬네일 사진 
   * @true 이미지 저장하기 + 올리기 form 열기
   * @false 이미지 저장하기 + 올리기 form 닫기 */
    const [isCustomImgPostForm, setCustomImgPostForm] = useState(false);


    const customImgPostForm = {
        show: () => setCustomImgPostForm(true),
        close: () => setCustomImgPostForm(false)
    }
    /**
    @description 로컬에서 선택한 이미지를 업로드하기 
    @function FileBoxOnclick
    @btnValue 이미지 업로드
    @detail  업로드할 사진 선택 -> set formData  -> 미리보기 보여주기  */
    const uploadImgOnclick = (e) => {
        const imgFile = e.target.files[0]
        console.log(imgFile)
        addGoodHandleFunction.imgFile(imgFile)
        let reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload = () => {
            setAddGoodData((state) => ({ ...state, imgUrl: reader.result }))
            if (isCustomImgPostForm === false)
                return customImgPostForm.show()

        }
    }
    //!SECTION 썸네일 imgUrl

    //SECTION 상품info imgUrl
    /**
    * @hook useState
    * @description 상품detailInfo 사진 
    * @true 이미지 저장하기 + 올리기 form 열기
    * @false 이미지 저장하기 + 올리기 form 닫기 */
    const [isInfoImgPostForm, setInfoImgPostForm] = useState(false);


    const infoImgPostForm = {
        show: () => setInfoImgPostForm(true),
        close: () => setInfoImgPostForm(false)
    }
    /**
   @description 로컬에서 선택한 INFO 이미지를 업로드하기 
   @function FileBoxOnclick
   @btnValue 이미지 업로드
   @detail  업로드할 사진 선택 -> set formData  -> 미리보기 보여주기  */
    const uploadInfoImgOnclick = (e) => {
        const infoImgFile = e.target.files[0];
        console.log(infoImgFile)
        addGoodHandleFunction.infoImgFile(infoImgFile)
        let infoReader = new FileReader();
        infoReader.readAsDataURL(infoImgFile);
        infoReader.onload = () => {
            setAddGoodData((state) => ({ ...state, infoUrl: infoReader.result }))
            if (isInfoImgPostForm === false)
                return infoImgPostForm.show()
        }
    }


    /**
    * @hook useState
    * @description 상품 info 이미지 열기 닫기 
    * @true 이미지 열기
    * @false 이미지 닫기 */
    const [isOpenInfoImage, setIsOpenInfoImage] = useState(true)

    const openInfoBtnOnclick = () => {
        setIsOpenInfoImage(!isOpenInfoImage)
    }

    //!SECTION 상품info imgUrl


    /**
     * @typedef Function
     * @description 제품 제출 post
     * @method POST
     */
    const postProductOnclick = () => {  /**
    * @type {FormData}
    * @description post 보낼 FormData
    * @property {object} dto
    * @property {string} dto.name
    * @property {number} dto.cost
    * @property {number} dto.discount
    * @property {number} dto.amount
    * @property {string} dto.description
    * @property {Image} thumbnailImg
    * @property {Image} infoImg
    */
        const productFormData = new FormData();

        if (!addGoodData.title) return notification['error']({
            message: `제목을 입력해야 합니다.`,
            description: `제목을 입력해 주세요`,
        });
        if (!category) return notification['error']({
            message: `카테고리를 선택해야 합니다.`,
            description: `카테고리를 선택해 주세요`,
        });
        if (!addGoodData.cost) return notification['error']({
            message: `가격을 입력해야 합니다.`,
            description: `가격을 입력해 주세요`,
        });
        if (!addGoodData.amount || addGoodData.amount === 0) return notification['error']({
            message: `수량을 입력해야 합니다.`,
            description: `한개이상의 수량을 입력해 주세요`,
        });
        if (!addGoodData.cost || addGoodData.cost === 0) return notification['error']({
            message: `가격을 입력해야 합니다.`,
            description: `가격을 입력해 주세요`,
        });
        if (!addGoodData.imgFile) return notification['error']({
            message: `썸네일 사진을 넣어야 합니다.`,
            description: `정사각형의 사진을 입력해 주세요`,
        });
        if (!addGoodData.infoImgFile) return notification['error']({
            message: `상품상세 사진을 입력해야 합니다.`,
            description: `사진을 입력해 주세요`,
        });

        /**@description FormData setting */
        const dto = {
            name: addGoodData.title,
            originalPrice: addGoodData.cost,
            sellingPrice: sellingPrice,
            totalCount: addGoodData.amount,
            description: addGoodData.description,
            category: category,
        }
        const jsonDto = JSON.stringify(dto)
        const blobDto = new Blob([jsonDto], { type: "application/json" })
        productFormData.append('dto', blobDto)
        productFormData.append('thumbnailImg', addGoodData.imgFile)
        productFormData.append('descriptionImg', addGoodData.infoImgFile)

        // TODO infoImg하고나면 밑에 주석 제거
        // productFormData.append('infoImgFile', addGoodData.infoImgFile)
        for (let key of productFormData.keys()) {
            console.log(key);
        }

        /* value 확인하기 */
        for (let value of productFormData.values()) {
            console.log(value);
        }
        console.log('cc productFormData', productFormData)
        PostProduct(productFormData)
            .then((res) => {
                console.log(res)
                notification['success']({
                    message: `상품 추가 성공 ✅`,
                    description: `${addGoodData.title}상품을 추가하였습니다!`,
                });
                setAddGoodData(
                    {
                        title: "",
                        cost: 0,
                        discount: 0,
                        amount: 0,
                        description: "",
                        imgUrl: null,
                        infoUrl: null,
                        imgFile: null,
                        infoImgFile: null
                    }
                )
                setCategory('')

            })
            .catch((err) => {
                console.log(err)
            })

    }

    //!SECTION - 상품 게시물 작성


    const { title, description, amount, cost, discount, imgUrl, infoUrl } = addGoodData


    return (
        <>
            <Row >
                {/* SECTION 제목 */}
                <Col span={12} style={{ margin: "2rem 0" }}>
                    <Row>
                        <Col span={12} justify={'center'} align={'center'}>
                            <Typo fontFamily={'Noto'} size={"3rem"} weight={"500"} color={'rgb(51,51,51)'} >
                                상품추가
                            </Typo>

                        </Col>
                        <Col span={12} justify={'center'} align={'center'}>
                            <Typo fontFamily={'Noto'} size={"1.3rem"} weight={"500"} color={'rgb(153, 153, 153)'}  >
                                새로운 상품을 추가할 수 있습니다.
                            </Typo>
                        </Col>
                    </Row>
                </Col>


                {/* !SECTION 제목 */}
                {/* SECTION 제목 */}
                <Col span={12}>
                    <Col span={12}>
                        {
                            title ?
                                <Typo size={"1.4rem"} weight={"bold"} color={"#0d7000"}>제목</Typo>
                                :
                                <Typo size={"2rem"} weight={"bold"} color={"#0d7000"}>제목</Typo>
                        }
                    </Col>

                    <Col span={12} style={{ marginTop: "5px" }}>
                        <CreateTextArea
                            onInput={handleResizeHeight}
                            rows={1}
                            ref={ref}
                            value={title}
                            onChange={addGoodHandleFunction.title}
                        ></CreateTextArea>
                    </Col>
                    <Col span={12}>
                        <Divider marginBottom={'2rem'} marginTop={'2rem'} radius={'1px'}
                            width={'4rem'} borderWidth={'5px'} color={'rgb(73, 80, 87)'}></Divider>
                    </Col>
                </Col>
                {/* !SECTION 제목 */}

                {/* SECTION 카테고리  */}
                <Col span={12}>
                    <Col span={12}>
                        {
                            category ?
                                <Typo size={"1.4rem"} weight={"bold"} color={"#0d7000"}>카테고리</Typo>
                                :
                                <Typo size={"2rem"} weight={"bold"} color={"#0d7000"}>카테고리</Typo>
                        }
                    </Col>
                    <Col span={12} style={{ marginTop: "5px" }}>
                        <Radio.Group
                            options={categoryOptions}
                            onChange={categoryOnChange}
                            value={category}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Col>

                    <Col span={12}>
                        <Divider marginBottom={'2rem'} marginTop={'2rem'} radius={'1px'}
                            width={'4rem'} borderWidth={'5px'} color={'rgb(73, 80, 87)'}></Divider>
                    </Col>
                </Col>
                {/* !SECTION 카테고리  */}

                {/* SECTION 썸네일 */}
                <Col span={12}>
                    <Col span={12}>
                        {
                            imgUrl ?
                                <Typo size={"1.4rem"} weight={"bold"} color={"#0d7000"}>섬네일</Typo>
                                :
                                <Typo size={"2rem"} weight={"bold"} color={"#0d7000"}>섬네일</Typo>
                        }
                    </Col>
                    <Col span={12} justify={"center"} align={"center"} style={{ margin: "5px 0", }} >
                        <Alert
                            message="가로세로의 크기가 같은 정사각형사진만 업로드해주세요."
                            type="warning"
                            showIcon
                            style={{ width: "100%", fontWeight: "bold", fontSize: "1rem", position: "static" }}
                        />
                    </Col>

                    <Col span={12} style={{ marginTop: "5px" }}>
                        <Row justify={'space-between'}>
                            <Col span={6} justify={"start"} align={"center"}>
                                {
                                    (imgUrl) ?
                                        <Image src={imgUrl} width={'100%'} ></Image>
                                        :
                                        <FileBox block id={"customImg"} accept="image/*" size={"50%"} onChange={uploadImgOnclick} >
                                            <Image src={uploadBackground} width={'100%'} style={{ position: "relative" }}></Image>
                                            <UploadContentWrapper>
                                                <PlusOutlined></PlusOutlined>
                                                <Typo style={{ marginTop: "8px" }}>이미지 선택</Typo>
                                            </UploadContentWrapper>
                                        </FileBox>
                                }

                            </Col>


                        </Row>
                        <Col span={6}>
                            {
                                (isCustomImgPostForm === false) ?
                                    null
                                    :
                                    <>
                                        <Row gutter={[0, 0]} justify={'space-between'} align={'center'} style={{ marginTop: '10px' }} >
                                            <Col span={12}>
                                                <FileBox types={"button"} block id={"customImg"} onChange={uploadImgOnclick} >재선택</FileBox>
                                            </Col>

                                        </Row>
                                    </>
                            }
                        </Col>
                    </Col>
                    <Col span={12}>
                        <Divider marginBottom={'2rem'} marginTop={'2rem'} radius={'1px'}
                            width={'4rem'} borderWidth={'5px'} color={'rgb(73, 80, 87)'}></Divider>
                    </Col>
                </Col>
                {/* !SECTION 썸네일 */}



                {/* SECTION 가격 */}
                <Col span={12}>
                    <Col span={12} justify={"center"} align={"center"} style={{ margin: "5px 0", }} >
                        <Alert
                            message="할인하지 않는 경우 할인율에 0을 기입해 주세요."
                            type="warning"
                            showIcon
                            style={{ width: "100%", fontWeight: "bold", fontSize: "1rem", position: "static" }}
                        />
                    </Col>
                    <Col xs={6} span={4}>
                        <Col span={12} align={"center"}>
                            {
                                cost ?
                                    <Typo size={"1.4rem"} weight={"bold"} color={"#0d7000"}>가격</Typo>
                                    :
                                    <Typo size={"2rem"} weight={"bold"} color={"#0d7000"}>가격</Typo>
                            }
                        </Col>

                        <Col span={12} align={"center"} style={{ marginTop: "5px" }}>
                            <label style={{ border: `solid black 1px`, borderRadius: "2px" }}>
                                <NumberField value={cost} onChange={addGoodHandleFunction.cost} width={`10rem`} ></NumberField>
                            </label>
                            <Typo size={"1.4rem"} color={"black"} style={{ marginLeft: "5px" }} >원</Typo>

                        </Col>


                    </Col>
                    {/* !SECTION 가격 */}
                    {/* SECTION 할인율 */}
                    <Col xs={6} span={4}>
                        <Col align={"center"} span={12}>
                            {
                                discount ?
                                    <Typo size={"1.4rem"} weight={"bold"} color={"#0d7000"}>할인율</Typo>
                                    :
                                    <Typo size={"2rem"} weight={"bold"} color={"#0d7000"}>할인율</Typo>
                            }
                        </Col>

                        <Col span={12} align={"center"} style={{ marginTop: "5px", fontWeight: "500" }}>
                            <label style={{ border: `solid black 1px`, borderRadius: "2px" }}>
                                <NumberField value={discount} onChange={addGoodHandleFunction.discount} width={`5rem`} ></NumberField>
                            </label>
                            <Typo size={"1.4rem"} color={"black"} style={{ marginLeft: "5px" }} >%</Typo>
                        </Col>


                    </Col>
                    {/* !SECTION 할인율 */}
                    {/* SECTION 할인된 가격 */}
                    <Col xs={12} span={4}>
                        <Col span={12} align={"center"}>
                            {
                                (discount < 1) ?
                                    <Typo size={"2em"} weight={"bold"} color={"#0d7000"}>최종 가격</Typo>
                                    :
                                    <Typo size={"2em"} weight={"bold"} color={"#0d7000"}>할인된 가격</Typo>

                            }
                        </Col>

                        <Col span={12} align={"center"} style={{ marginTop: "5px", fontWeight: "500" }}>
                            <Typo size={"1.4rem"} color={"black"}>{sellingPrice}</Typo>
                            <Typo size={"1.4rem"} color={"black"} style={{ marginLeft: "5px" }} >원</Typo>
                        </Col>


                    </Col>
                </Col>
                <Col span={12}>
                    <Divider marginBottom={'2rem'} marginTop={'2rem'} radius={'1px'}
                        width={'4rem'} borderWidth={'5px'} color={'rgb(73, 80, 87)'}></Divider>
                </Col>

                {/* //!SECTION 할인된 가격 */}

                {/* SECTION 수량 */}
                <Col span={12}>
                    <Col span={12}>
                        {
                            amount ?
                                <Typo size={"1.4rem"} weight={"bold"} color={"#0d7000"}>수량</Typo>
                                :
                                <Typo size={"2rem"} weight={"bold"} color={"#0d7000"}>수량</Typo>
                        }
                    </Col>

                    <Col span={12} align={"center"} style={{ marginTop: "5px", fontWeight: "500" }}>
                        <label style={{ border: `solid black 1px`, borderRadius: "2px" }}>
                            <NumberField value={amount} onChange={addGoodHandleFunction.amount} width={`5rem`} ></NumberField>
                        </label>
                        <Typo size={"1.4rem"} color={"black"} style={{ marginLeft: "5px" }} >개</Typo>
                    </Col>

                </Col>
                <Col span={12}>
                    <Divider marginBottom={'2rem'} marginTop={'2rem'} radius={'1px'}
                        width={'4rem'} borderWidth={'5px'} color={'rgb(73, 80, 87)'}></Divider>
                </Col>
                {/* !SECTION 수량 */}
                {/* SECTION 설명 */}
                <Col span={12}>
                    <Col span={12}>
                        {
                            description ?
                                <Typo size={"1.4rem"} weight={"bold"} color={"#0d7000"}>설명</Typo>
                                :
                                <Typo size={"2rem"} weight={"bold"} color={"#0d7000"}>설명</Typo>
                        }
                    </Col>

                    <Col span={12} align={"center"} style={{ marginTop: "5px", fontWeight: "500" }}>
                        <SearchWrapper>
                            <TextBox value={description} onChange={addGoodHandleFunction.description} placeholder={"간단한 설명을 입력해 주세요"}></TextBox>
                        </SearchWrapper>
                    </Col>

                </Col>
                <Col span={12}>
                    <Divider marginBottom={'2rem'} marginTop={'2rem'} radius={'1px'}
                        width={'4rem'} borderWidth={'5px'} color={'rgb(73, 80, 87)'}></Divider>
                </Col>
                {/* !SECTION 설명 */}
                {/* SECTION 상품 설명 이미지 */}
                <Col span={12}>
                    <Col span={12}>
                        {
                            infoUrl ?
                                <Typo size={"1.4rem"} weight={"bold"} color={"#0d7000"}>상품 설명 이미지</Typo>
                                :
                                <Typo size={"2rem"} weight={"bold"} color={"#0d7000"}>상품 설명 이미지</Typo>
                        }
                    </Col>

                    <Col span={12} style={{ marginTop: "5px" }}>
                        <Row justify={'space-between'}>
                            {
                                infoUrl ?
                                    isOpenInfoImage ?
                                        <>
                                            <Col span={12} style={{ margin: '1rem 0' }}>
                                                <Row align={"center"} justify={"space-between"}>
                                                    <Col span={4}>
                                                        <Button block value={'이미지 열기'} onClick={openInfoBtnOnclick} style={{ padding: '8px 1rem', fontSize: '1rem' }} />
                                                    </Col>
                                                    <Col span={7}>
                                                        <FileBox types={"button"} block id={"infoImg"} onChange={uploadInfoImgOnclick} >재선택</FileBox>

                                                    </Col>
                                                </Row>
                                            </Col>
                                        </>
                                        :
                                        <>
                                            <Col span={12} style={{ margin: '1rem 0' }}>
                                                <Row align={"center"} justify={"space-between"}>
                                                    <Col span={4}>
                                                        <Button block value={'이미지 닫기'} onClick={openInfoBtnOnclick} style={{ padding: '8px 1rem', fontSize: '1rem' }} />
                                                    </Col>
                                                    <Col span={7}>
                                                        <FileBox types={"button"} block id={"infoImg"} onChange={uploadInfoImgOnclick} >재선택</FileBox>

                                                    </Col>
                                                </Row>
                                            </Col>
                                        </>
                                    :
                                    null
                            }

                            <Col span={12} justify={"start"} align={"center"}>
                                {
                                    infoUrl ?
                                        isOpenInfoImage ?
                                            <>
                                                <Image src={infoUrl} height={`5rem`} width={"100%"}></Image>
                                            </>
                                            :
                                            <>
                                                <Image src={infoUrl} width={"100%"}></Image>
                                            </>
                                        :
                                        <FileBox block id={"infoImg"} accept="image/*" size={"100%"} onChange={uploadInfoImgOnclick} >
                                            <Image src={uploadBackground} width={'100%'} height={"15rem"} style={{ position: "relative" }}></Image>
                                            <UploadContentWrapper>
                                                <PlusOutlined></PlusOutlined>
                                                <Typo style={{ marginTop: "8px" }}>이미지 선택</Typo>
                                            </UploadContentWrapper>

                                        </FileBox>
                                }
                            </Col>


                        </Row>
                    </Col>

                </Col>
                <Col span={12}>
                    <Divider marginBottom={'2rem'} marginTop={'2rem'} radius={'1px'}
                        width={'4rem'} borderWidth={'5px'} color={'rgb(73, 80, 87)'}></Divider>
                </Col>
                {/* !SECTION 상품 설명 이미지 */}

                {/* SECTION 제출하기 */}
                <Col span={12} >
                    <Button block onClick={postProductOnclick} types={'primary'} size={"large"} value={'제출하기'} style={{ padding: "1.2rem 2rem", fontSize: "1.3rem" }} />
                </Col>
                {/* !SECTION 제출하기 */}


            </Row>
        </>
    )

}

export default AdminContent;