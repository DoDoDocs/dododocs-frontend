import React from 'react';
import GollaIcon from "../../../assets/icons/golla_Icon.png"
import { Row, Col, ContentStyle } from "../../../layout/index.js"
import { Image, Typo, Button } from "../../atoms/index.js"
import { AdminDesc, AddGoods, SetGoods, OrderManage, InquiryManage } from "../../molecules/index.js"


const AdminContent = ({
  role, name, logined,

  focusNavList, navListOnClick, isHeaderDetailOpen, menu,
  headerDetailOpenHandler
}) => {


  return (
    <>


      <ContentStyle style={{ color: "#898e92" }} >

        {
          menu === undefined ?
            <AdminDesc />
            : null
        }
        {/* //SECTION - 상품관리 */}
        {
          menu === `addgood` ?
            <AddGoods />
            : null
        }
        {
          menu === `setgood` ?
            <SetGoods />
            : null
        }
        {/* //!SECTION - 상품관리 */}

        {/* //SECTION - 주문관리 */}
        {
          menu === `orderManage` ? <OrderManage />
            : null
        }
        {/* //!SECTION - 주문관리 */}

        {/* //SECTION - QnA관리 */}
        {
          menu === `inquiry` ? <InquiryManage />
            : null
        }
        {/* //!SECTION - QnA관리 */}
      </ContentStyle>


    </>
  )


}

export default AdminContent;