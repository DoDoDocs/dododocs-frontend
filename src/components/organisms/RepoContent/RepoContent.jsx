import React, { useState, useCallback } from 'react';
import { Image, Typo, Button, TextBox, Table, Pagination, Select } from "../../index.js";
import bgShapeFive from "../../../assets/images/bg-shape-five.png";
import bgShapeFour from "../../../assets/images/bg-shape-four.png";
import { Search, Trash2, Plus, Trash } from 'lucide-react';
import {
  BgShape,
  ContentStyle,
  TitleWrapper,
  ContentWrapper,
  RepoBoxWrapper,
  Divider,
  ButtonWrapper,
  SearchTextWrapper,
  SearchInput,
  DeleteBtn,
  PaginationWrapper,
} from "./RepoContent.style.js";

import AddRepo from './AddRepo.jsx';



const RepoContent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);

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

  const handleSearchChange = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleSelectionChange = useCallback((key) => {
    setSelectedRow(key);
  }, []);

  const handleRowClick = useCallback((row) => {
    console.log('Row clicked:', row);
    setSelectedRow(row.key);
  }, []);

  const handleDeleteClick = useCallback((e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    console.log('Delete clicked');
  }, []);

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
          <DeleteBtn onClick={handleDeleteClick}>
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


  const [selectedRepo, setSelectedRepo] = useState('');

  const repositories = [
    'euncherry/0526_signup',
    'euncherry/airbnb_clone',
    'euncherry/ant-design',
    'euncherry/0526_signup',
    'euncherry/airbnb_clone',
    'euncherry/ant-design',
    'euncherry/0526_signup',
    'euncherry/airbnb_clone',
    'euncherry/ant-design',
    // ...
  ];


  return (
    <>
      <ContentStyle>
        <RepoBoxWrapper>

          <AddRepo></AddRepo>
          {/* <Select
          options={repositories}
          value={selectedRepo}
          onChange={setSelectedRepo}
        /> */}
          <TitleWrapper>
            <Typo
              color="#ffffff"
              weight={600}
              size="3rem"
              style={{ letterSpacing: '-0.025em' }}
            >
              User Name
            </Typo>
          </TitleWrapper>

          <TitleWrapper>
            <Typo
              color="#ffffff"
              weight={600}
              size="1.3rem"
            >
              Import from your GitHub organizations
            </Typo>
            <Typo
              color="#a1a1aa"
              size="1.1rem"
            >
              Earn 1 month for free for each 3 new paid subscribers
            </Typo>
          </TitleWrapper>

          <ContentWrapper>
            <ButtonWrapper>
              <Button
                btnType="gradient"
                style={{
                  padding: "0.875rem 1.5rem",
                  fontSize: "1.1rem",
                  color: "#000000",
                  fontWeight: 600,
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <Plus size={20} />
                Add Repository
              </Button>
            </ButtonWrapper>

            <Divider />

            <SearchTextWrapper>
              <SearchInput>
                <TextBox
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search repositories..."
                  plane={true}
                />
                <Search />
              </SearchInput>
            </SearchTextWrapper>

            <Table
              dataSource={data}
              columns={columns}
              onRowClick={handleRowClick}
              selectedRow={selectedRow}
              onSelectionChange={handleSelectionChange}
            />

            <PaginationWrapper>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                showQuickJumper
                maxPageButtons={5}
              />
            </PaginationWrapper>
          </ContentWrapper>



        </RepoBoxWrapper>

      </ContentStyle>
      <BgShape>
        <Image src={bgShapeFour} width={'640px'} height={'949px'} style={{ position: 'absolute', top: '5dvh', left: '0', loading: 'lazy', filter: 'brightness(0.4) opacity(90%)', pointerEvents: "none" }} />
        <Image src={bgShapeFive} width={'626px'} height={'1004px'} style={{ position: 'absolute', top: '5dvh', right: '0', loading: 'lazy', filter: 'brightness(0.7)', pointerEvents: "none" }} />
      </BgShape>
    </>
  );
};

export default RepoContent;

