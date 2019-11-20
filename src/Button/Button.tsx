/** @jsx jsx */
import { jsx, css } from '@emotion/core';

type ButtonProps = {
  /** 버튼 안의 내용 */
  children: React.ReactNode;
  /** 클릭했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼의 생김새를 설정합니다. */
  theme: 'primary' | 'secondary' | 'tertiary';
  /** 버튼의 크기를 설정합니다. */
  size: 'small' | 'medium' | 'big';
  /** 버튼을 비활성화 시킵니다. */
  disabled?: boolean;
  /** 버튼의 너비를 임의로 설정합니다. */
  width?: string | number;
  /** 버튼에서 아이콘만 보여줄 때 이 값을 `true`로 설정하세요. */
  iconOnly?: boolean;
};

/** `Button` 컴포넌트는 어떠한 작업을 트리거 할 때 사용합니다.  */
const Button = ({
  children,
  theme,
  size,
  disabled,
  width,
  iconOnly,
  onClick
}: ButtonProps) => {
  return (
    <button
      css={[
        style,
        themes[theme],
        sizes[size],
        { width },
        iconOnly && [iconOnlyStyle, iconOnlySizes[size]]
      ]}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  theme: 'primary',
  size: 'medium'
};

const style = css`
  outline: none;
  border: none;
  box-sizing: border-box;
  border-radius: 0.25rem;
  line-height: 1;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:disabled {
    cursor: not-allowed;
  }
  svg {
    width: 1em;
    margin-right: 1em;
  }
`;

const themes = {
  primary: css`
    background: #20c997;
    color: white;
    svg {
      fill: white;
    }
    &:hover:enabled {
      background: #38d9a9;
    }
    &:active:enabled {
      background: #12b886;
    }
    &:disabled {
      background: #aed9cc;
    }
  `,
  secondary: css`
    background: #e9ecef;
    color: #343a40;
    svg {
      fill: #343a40;
    }
    &:hover:enabled {
      background: #f1f3f5;
    }
    &:active:enabled {
      background: #dee2e6;
    }
    &:disabled {
      color: #c6d3e1;
      svg {
        fill: #c6d3e1;
      }
    }
  `,
  tertiary: css`
    background: none;
    color: #20c997;
    svg {
      fill: #20c997;
    }
    &:hover:enabled {
      background: #e6fcf5;
    }
    &:active:enabled {
      background: #c3fae8;
    }
    &:disabled {
      color: #bcd9d0;
      svg {
        fill: #bcd9d0;
      }
    }
  `
};

const sizes = {
  small: css`
    height: 1.75rem;
    font-size: 0.75rem;
    padding: 0 0.875rem;
  `,
  medium: css`
    height: 2.5rem;
    font-size: 1rem;
    padding: 0 1rem;
  `,
  big: css`
    height: 3rem;
    font-size: 1.125rem;
    padding: 0 1.5rem;
  `
};

const iconOnlyStyle = css`
  padding: 0;
  border-radius: 50%;
  svg {
    margin: 0;
  }
`;

const iconOnlySizes = {
  small: css`
    width: 1.75rem;
  `,
  medium: css`
    width: 2.5rem;
  `,
  big: css`
    width: 3rem;
  `
};

export default Button;
