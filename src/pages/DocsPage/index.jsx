
import React, { useState, useRef, useEffect } from "react";
import { Header } from "../../layouts/index.js"
import { DocsContent } from "../../components/index.js"
import _ from '../../config/index.js';
const Home = () => {

  return (
    <>
      <Header></Header>
      <DocsContent />

    </>
  );
};

export default Home;
