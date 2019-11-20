/** @jsx jsx */
import { Fragment } from 'react';
import { css, jsx } from '@emotion/core';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Button from '../Button/Button';
import { useTransition, animated } from 'react-spring';

export type DialogProps = {
  visible: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  hideButtons?: boolean;
  cancellable?: boolean;
  cancelText: string;
  confirmText: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const Dialog = ({
  visible,
  title,
  description,
  hideButtons,
  cancellable,
  cancelText,
  confirmText,
  children,
  onCancel,
  onConfirm
}: DialogProps) => {
  const fadeTransition = useTransition(visible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const slideUpTransition = useTransition(visible, null, {
    from: {
      transform: `translateY(200px) scale(0.8)`,
      opacity: 0
    },
    enter: {
      transform: `translateY(0px) scale(1)`,
      opacity: 1
    },
    leave: {
      transform: `translateY(200px) scale(0.8)`,
      opacity: 0
    },
    config: {
      tension: 200,
      friction: 15
    }
  });

  return (
    <Fragment>
      {fadeTransition.map(({ item, key, props }) =>
        item ? (
          <animated.div
            css={[fullscreen, darkLayer]}
            key={key}
            style={props}
          ></animated.div>
        ) : null
      )}

      {slideUpTransition.map(({ item, key, props }) =>
        item ? (
          <animated.div
            css={[fullscreen, whiteBoxWrapper]}
            style={props}
            key={key}
          >
            <div css={whiteBox}>
              {title && <h3>{title}</h3>}
              {description && <p>{description}</p>}
              {children}
              {!hideButtons && (
                <ButtonGroup css={{ marginTop: '3rem' }} rightAlign>
                  {cancellable && (
                    <Button theme="tertiary" onClick={onCancel}>
                      {cancelText}
                    </Button>
                  )}
                  <Button onClick={onConfirm}>{confirmText}</Button>
                </ButtonGroup>
              )}
            </div>
          </animated.div>
        ) : null
      )}
    </Fragment>
  );
};

Dialog.defaultProps = {
  cancelText: '취소',
  confirmText: '확인'
};

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

const fullscreen = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const darkLayer = css`
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
`;

const whiteBoxWrapper = css`
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const whiteBox = css`
  box-sizing: border-box;
  border-radius: 4px;
  width: 25rem;
  background: white;
  box-shadow: 0px 4px 8px 8px rgba(0, 0, 0, 0.05);
  padding: 2rem;

  h3 {
    font-size: 1.5rem;
    color: #343a40;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.125rem;
    margin: 0;
    color: #868e96;
  }

  ${mq[1]} {
    width: calc(100% - 2rem);
    padding: 1.5rem;
    h3 {
      font-size: 1.3125rem;
    }
    p {
      font-size: 0.875rem;
    }
  }
`;

export default Dialog;
