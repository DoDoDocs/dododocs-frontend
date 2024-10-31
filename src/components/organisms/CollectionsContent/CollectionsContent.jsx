import React from 'react';
import { ContentStyle, Row, Col } from "../../../layout/index.js"
import { Image, Typo } from "../../atoms/index.js"
import { useCategories, useQueryParams } from "../../../hooks/index.js"
import { CategoriesBox, CateCol } from "./CollectionsContent.styles.js"


const HomeContent = ({ }) => {
  console.log('Effect 실행');

  const { categories, categoriesValues, getCategoryKorName } = useCategories();

  // useMemo를 사용하여 값을 메모이제이션
  const memoizedCategories = React.useMemo(() => categories, [categories]);
  const memoizedCategoriesValues = React.useMemo(() => categoriesValues, [categoriesValues]);

  // useEffect를 사용한 로깅
  React.useEffect(() => {
    console.log(memoizedCategoriesValues.length);
    console.log(memoizedCategories['SNACK']);
  }, [memoizedCategoriesValues, memoizedCategories]);


  //SECTION params로 category가져오기
  //TODO
  const { getParam, getAllParams } = useQueryParams();

  const allParams = getAllParams();

  console.log('allParams', allParams)
  //!SECTION params로 category가져오기

  return (
    <>
      <ContentStyle>
        <Row justify={"center"} align={"center"}>

          {/* //SECTION Title */}
          <Col span={12} justify={"center"} align={"center"} style={{ margin: "3rem 0" }}>
            <Typo size={'2.5rem'} weight={"bold"} color={"rgb(51,51,51)"} > 전체 상품</Typo>

          </Col>
          {/* //!SECTION Title */}

          {/* //SECTION Categories */}
          <Col span={12} justify={"center"} align={"center"} style={{ margin: "1rem 0 3rem 0" }}>
            <Row justify={"center"} align={"center"}>
              <CateCol >
                <Row>
                  {
                    memoizedCategoriesValues.map((category, index) => (
                      // <Col span={12 / categoriesValues.length} justify={"center"} align={"center"} key={index}  >
                      <CategoriesBox key={index} >
                        <Typo size={'1.3rem'} weight={"bold"} color={"rgb(51,51,51)"} >{getCategoryKorName(category)}</Typo>
                        {memoizedCategories[category].map((subCategory, index) => (
                          <Typo key={index} size={'1rem'} color={"rgb(51,51,51)"} >{getCategoryKorName(subCategory)}</Typo>
                        ))}
                      </CategoriesBox>
                      // </Col>
                    ))

                  }
                </Row>
              </CateCol>
            </Row>
          </Col>
          {/* //!SECTION Categories */}

          {/* //SECTION Content*/}

          <Col span={12} justify={'center'} style={{ padding: '50px 0' }}>
            <Typo size={'1.5rem'} color={'#b5b5b5'}>등록된 상품이 없습니다.</Typo>
          </Col>

          {/* //!SECTION Content*/}


        </Row >
      </ContentStyle >
    </>
  )
}

export default React.memo(HomeContent);

