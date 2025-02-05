import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChattingLanding from './ChattingLanding/ChattingLanding.jsx';
import DocsLanding from './DocsLanding/DocsLanding.jsx';
import ReadmeLanding from './LandingReadme/LandingReadme.jsx';

const LandingContent = () => {
  const { serviceTitle } = useParams();

  if (serviceTitle === 'chatting') {
    return <ChattingLanding />;
  } else if (serviceTitle === 'readme') {
    return <ReadmeLanding />;
  } else if (serviceTitle === 'docs') {
    return <DocsLanding />;
  }

};

export default LandingContent;