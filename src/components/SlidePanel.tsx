import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { usePanelStore } from '../stores/usePanelStore';
import { useScreenConfigStore } from '../stores/useScreenConfigStore';

export function SlidePanel() {
  const { screenWidth } = useScreenConfigStore();
  const [rightPosition, setRightPosition] = useState(-screenWidth);
  const { isOpen, panelChildren, clearPanel } = usePanelStore(state => ({
    isOpen: state.isOpen,
    panelChildren: state.panelChildren,
    closePanel: state.closePanel,
    clearPanel: state.clearPanel,
  }));

  useEffect(() => {
    setRightPosition(isOpen ? 0 : -screenWidth);
  }, [isOpen, screenWidth]);

  const onTransitionEnd = () => {
    rightPosition !== 0 && clearPanel();
  };

  return (
    <Panel $right={rightPosition} onTransitionEnd={onTransitionEnd}>
      {panelChildren}
    </Panel>
  );
}

const Panel = styled.div<{ $right: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: ${({ $right }) => `${$right}px`};
  display: flex;
  align-items: center;
  flex-direction: column;
  border: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
  background: ${({ theme }) => theme.color.accentText};
  transition: right 0.6s;
  z-index: 10;
`;
