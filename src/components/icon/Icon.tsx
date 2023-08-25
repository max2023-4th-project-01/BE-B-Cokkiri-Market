import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { ColorType, designSystem } from '../../styles/designSystem';
import { IconsType, icons } from './icons';

interface IconProps {
  name: IconsType;
  color: ColorType;
}

export function Icon({ name, color }: IconProps) {
  const IconComponent = icons[name];
  const iconColor = designSystem.color[color];
  const iconRef = useRef<HTMLDivElement>(null);

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
    <Div ref={iconRef}>
      <IconComponent />
    </Div>
  );
}

const Div = styled.div`
  display: flex;
`;
