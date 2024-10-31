import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import './test.css';

// React 컴포넌트
const AnimatedContent = () => {
  let showingChatting = true;

  function toggleContent() {
    console.log("click")
    const aiChatting = document.getElementById('aiChatting');
    const aiWriting = document.getElementById('aiWriting');

    if (showingChatting) {
      aiChatting.classList.add('is-hidden');
      aiChatting.classList.remove('is-visible',);
      aiWriting.classList.add('is-visible');
      aiWriting.classList.remove('is-hidden');
      // aiWriting.classList.add('active');
    } else {
      aiWriting.classList.add('is-hidden');
      aiWriting.classList.remove('is-visible',);
      aiChatting.classList.add('is-visible');
      aiChatting.classList.remove('is-hidden');
      // aiChatting.classList.add('active');
    }

    showingChatting = !showingChatting;
  }
  return (
    <>
      <div class="container">
        <div id="aiChatting" class="content is-hidden">AI Chatting</div>
        <div id="aiWriting" class="content is-visible">AI Writing</div>
      </div>
      <button onClick={toggleContent}>Toggle Content</button>
    </>
  );

};

export default AnimatedContent;

document.querySelector("#__next > main > div.slider-area.slider-style-1.variation-default.slider-bg-image.bg-banner1.slider-bg-shape > div.container > div > div.col-lg-12 > div > h1 > span > span > span > b:nth-child(1)")