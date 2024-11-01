const createTheme = () => {
  const layout = {
    header: {
      height: '64px',
      heightNumber: 64, // 숫자 계산이 필요할 때 사용
    },
    home: {
      mainTextSize: `clamp(2.56rem, 3.5vw + 1.8rem, 4.69rem)`,
    },
  };
  const colors = {
    // Base colors
    bg: '#0e0c15',
    link: '#bcc3d7',
    white: '#ffffff',

    // Gradient colors
    gradient: {
      primary: {
        start: '#a25cff',
        end: '#d923ff',
      },
    },
  };

  const gradients = {
    // 미리 정의된 그라데이션
    values: {
      primary: `linear-gradient(to right, ${colors.gradient.primary.start}, ${colors.gradient.primary.end})`,
    },

    // 그라데이션 생성 유틸리티 함수들
    utils: {
      // 기본 두 색상 그라데이션
      create: (start, end, direction = 'to right') =>
        `linear-gradient(${direction}, ${start}, ${end})`,

      // 다중 색상 그라데이션
      createMulti: (direction = 'to right', ...colors) =>
        `linear-gradient(${direction}, ${colors.join(', ')})`,

      // 각도 기반 그라데이션
      createAngled: (angle = '45deg', start, end) =>
        `linear-gradient(${angle}, ${start}, ${end})`,
    },
  };

  return {
    layout,
    colors,
    gradients,
  };
};

export const theme = createTheme();
export default theme;
