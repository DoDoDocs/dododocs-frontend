import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Camera, Pencil, Video, Palette, Layout, Box, MoreVertical } from 'lucide-react';
import api from "../../../api/axios.js";


const Container = styled.div`
  display: flex;
  height: 100%;
  width : 100%;
  background: #10121b66;
`;

const Sidebar = styled.div`
  background: rgba(24, 24, 27, 0.5);
  padding: 1.5rem 0;
  overflow-y: auto;
  width: ${props => props.width}px;
  min-width: 200px;
  max-width: 400px;

  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #3f3f46;
  }
`;

const SectionTitle = styled.h2`
  text-transform: uppercase;
  color: #71717a;
  font-size: 0.75rem;
  padding: 0 1.5rem;
  margin-bottom: 0.75rem;
`;

const Section = styled.div`
  margin-bottom: ${props => props.mb || 0}rem;
`;

const NavItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  color: ${props => props.active ? 'white' : '#a1a1aa'};
  background: ${props => props.active ? 'rgba(147, 51, 234, 0.1)' : 'transparent'};
  position: relative;

  &:hover {
    background: ${props => props.active ? 'rgba(147, 51, 234, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
    color: white;
  }

  ${props => props.active && `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 2px;
      height: 100%;
      background: #9333ea;
    }
  `}
`;

const IconWrapper = styled.div`
  margin-right: 0.75rem;
  opacity: 0.7;
`;

const Badge = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  background: rgba(147, 51, 234, 0.2);
  color: #9333ea;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
`;

const Splitter = styled.div`
  cursor: col-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.75rem;
  position: relative;
  background: rgba(39, 39, 42, 0.3);

  &:hover {
    background : transparent;
  }
`;

const SplitterBorder = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 1px;
  background: rgba(39, 39, 42, 0.5);
  ${props => props.side}: 0;
`;

const MainContent = styled.div`
  flex: 1;
  background: #10121b66;
  overflow-y: auto;
`;

const ContentArea = styled.div`
  padding: 2rem;
  color: #a1a1aa;
`;


const NavItem = ({ icon: Icon, children, active, badge }) => (
  <NavItemWrapper active={active}>
    <IconWrapper>
      <Icon size={20} />
    </IconWrapper>
    <span>{children}</span>
    {badge && <Badge>{badge}</Badge>}
  </NavItemWrapper>
);

const Document = () => {
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const startResizing = (e) => {
    setIsDragging(true);
  };

  const stopResizing = () => {
    setIsDragging(false);
  };

  const resize = (e) => {
    if (isDragging && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;
      if (newWidth >= 200 && newWidth <= 400) {
        setSidebarWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isDragging]);

  return (
    <Container ref={containerRef}>
      <Sidebar width={sidebarWidth}>
        <Section mb={2}>
          <SectionTitle>Apps</SectionTitle>
          <NavItem icon={Box}>All Apps</NavItem>
          <NavItem icon={Box} active badge="3">Updates</NavItem>
        </Section>
        <Section>
          <SectionTitle>Categories</SectionTitle>
          <NavItem icon={Camera}>Photography</NavItem>
          <NavItem icon={Pencil}>Graphic Design</NavItem>
          <NavItem icon={Video}>Video</NavItem>
          <NavItem icon={Palette}>Illustrations</NavItem>
          <NavItem icon={Layout}>UI/UX</NavItem>
          <NavItem icon={Box}>3D/AR</NavItem>
        </Section>
      </Sidebar>
      <Splitter onMouseDown={startResizing}>
        <SplitterBorder side="left" />
        <SplitterBorder side="right" />
        <MoreVertical size={12} color="#52525b" />
      </Splitter>
      <MainContent>
        <ContentArea>Main Content Area</ContentArea>
      </MainContent>
    </Container>
  );
};

export default Document;