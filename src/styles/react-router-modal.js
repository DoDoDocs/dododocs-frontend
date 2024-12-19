import { css } from 'styled-components';

export const modalStyles = css`
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  .ReactModal__Content {
    transform: scale(0.7);
    opacity: 0;
    transition: all 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Content--after-open {
    transform: scale(1);
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }

  .ReactModal__Content--before-close {
    transform: scale(0.7);
    opacity: 0;
  }
`;
