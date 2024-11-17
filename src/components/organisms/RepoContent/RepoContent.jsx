import React, { useState } from 'react';
import { Image, Typo, Button, TextBox, Table, Pagination } from "../../index.js"
import DododocsIcon from "../../../assets/icons/dododocs_Icon.png"
import {
  ContentStyle, TitleWrapper, ContentWrapper, RepoBoxWrapper, Divider, ButtonWrapper,
  SearchTextWrapper,
  DeleteBtn,
} from "./RepoContent.style.js"

import styled, { css } from "styled-components"
import { Trash2 } from 'lucide-react';



const RepoContent = () => {

  const [searchValue, setSearchValue] = useState();

  const searchOnChange = (e) => {
    setSearchValue(e.target.value);
  }


  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 100;
  const itemsPerPage = 10;

  const data = [
    {
      key: '1',
      Repository: 'spring-boot_test',
      Status: 'Code Imported',
      Branch: 'main',
      Action: 'Delete'
    },
    {
      key: '2',
      Repository: 'Deploy_DiscordBot',
      Status: 'Code Imported',
      Branch: 'main',
      Action: 'Delete'

    },
    {
      key: '3',
      Repository: 'moheng',
      Status: 'Code Imported',
      Branch: ['main', 'develop'],
      Action: 'Delete'

    },
  ];


  // 태그 렌더링 핸들러
  const renderTags = (tags, colors) => {
    if (!tags) return null;
    if (typeof tags === 'string') {
      return <span className="tag" style={{ color: `${colors}` }}>{tags}</span>;
    }
    if (Array.isArray(tags)) {
      return tags.map((tag, index) => (
        <span key={index} className="tag" style={{ marginRight: '0.5rem' }}>
          {tag}
        </span>
      ));
    }
    return tags;
  };

  const renderAction = (actions) => {
    if (actions === 'Delete') {
      return (
        <>
          <DeleteBtn>
            <Trash2 style={{ width: '0.875rem', height: '0.875rem', verticalAlign: 'middle' }} />
            <span >Delete</span>
          </DeleteBtn>
        </>
      );
    } else if (actions === 'Import') {
      return (
        <div>
          <Button
            style={{
              backgroundColor: '#8B5CF6',
              color: '#FFFFFF',
              border: '1px solid #D9D9D9',
              borderRadius: '4px',

            }} />
        </div>
      )
    }
  }

  const columns = [
    {
      key: 'Repository',
      title: 'Repository'
    },
    {
      key: 'Branch',
      title: 'Branch',
      render: (value) => renderTags(value, '#8b5cf6')
    },
    {
      key: 'Status',
      title: 'Status',
      render: (value) => renderTags(value, '#d923ff')

    },
    {
      key: 'Action',
      title: ' ',
      render: (value) => renderAction(value)
    },
  ];



  /**SECTION 체크박스상태관리 
   * @체크박스상태관리 
   */
  // 단일 선택 상태 관리
  const [selectedRow, setSelectedRow] = useState(null);

  // 선택 핸들러
  const handleSelectionChange = (key) => {
    setSelectedRow(key);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row.key); // 행 클릭시에도 선택 처리
    console.log('Selected row:', row);
  };




  return (
    <>
      <ContentStyle>

        <RepoBoxWrapper>
          <TitleWrapper>
            <Typo color={'#ffffff'} weight={600} size={"3rem"}>User Name</Typo>
          </TitleWrapper>

          <TitleWrapper>
            <Typo color={'#ffffff'} weight={600} size={"1.3rem"}>Import from your GitHub organizations</Typo>
            <Typo color={'##a1a1aa'} size={"1.1rem"}>Earn 1 month for free for each 3 new paid subscribers</Typo>
          </TitleWrapper>

          <ContentWrapper>
            <ButtonWrapper>
              <Button btnType={'gradient'} style={{ padding: "1rem 1.6rem ", fontSize: "1.1rem", color: "#000000" }} >Add Repository</Button>
            </ButtonWrapper>
            <Divider />
            <SearchTextWrapper>
              {/* <SearchTextBox> */}
              <TextBox value={searchValue} onChange={searchOnChange}
                placeholder={"Search Here..."}
                plane={true}
              ></TextBox>
              {/* </SearchTextBox> */}
            </SearchTextWrapper>

            <Table
              dataSource={data}
              columns={columns}
              onRowClick={handleRowClick}
              selectedRow={selectedRow}
              onSelectionChange={handleSelectionChange}
              tagKeysArr={['tag', 'Branch', 'Status']}
            />

            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              showQuickJumper
              maxPageButtons={5}
            />
          </ContentWrapper>


        </RepoBoxWrapper>
      </ContentStyle >

    </>
  )
}

export default RepoContent;