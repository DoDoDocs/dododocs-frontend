import { css } from 'styled-components';

export const modalStyles = css`
  /* react-modal 커스텀 스타일 */
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }

  .ReactModal__Content {
    transform: scale(0.8);
    transition: transform 200ms ease-in-out;
  }

  .ReactModal__Content--after-open {
    transform: scale(1);
  }

  .ReactModal__Content--before-close {
    transform: scale(0.8);
  }
`;
