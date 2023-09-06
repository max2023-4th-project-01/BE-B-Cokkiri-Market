import { MouseEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { ColorType, designSystem } from '../../styles/designSystem';
import { IconsType, icons } from './icons';

interface IconProps {
  name: IconsType;
  size?: number;
  color: ColorType;
  onClick?: (event: MouseEvent) => void;
}

export function Icon({ name, size = 24, color, onClick }: IconProps) {
  const IconComponent = icons[name];
  const iconColor = designSystem.color[color];
  const iconRef = useRef<HTMLDivElement>(null);
  const isClickable = !!onClick;

  useEffect(() => {
    const svgElement = iconRef.current;

    if (!svgElement) return;

    const paths = svgElement.querySelectorAll('path');
    paths.forEach((path: SVGPathElement) => {
      if (path.getAttribute('fill')) {
        path.setAttribute('fill', iconColor);
      }
      if (path.getAttribute('stroke')) {
        path.setAttribute('stroke', iconColor);
      }
    });
  }, [iconColor]);

  return (
    <Div ref={iconRef} onClick={onClick} $isClickable={isClickable}>
      <IconComponent width={size} height={size} />
    </Div>
  );
}

const Div = styled.div<{ $isClickable: boolean }>`
  display: flex;
  ${({ $isClickable }) => $isClickable && 'cursor: pointer;'}
`;
