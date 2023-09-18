import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
// import { Badge } from '../Badge';
import { Slide } from './Slide';

type SliderProps = {
  imageList: { id: number; url: string }[];
};

export function Slider({ imageList }: SliderProps) {
  const [slideSize, setSlideSize] = useState({ width: 0, height: 0 });
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const currentIndex = useRef<number>(0);
  const startPosition = useRef(0);
  const animationRef = useRef<number | null>(null);
  const prevTranslate = useRef(0);
  const currentTranslate = useRef(0);

  const setPositionByIndex = () => {
    currentTranslate.current = currentIndex.current * -slideSize.width;
    prevTranslate.current = currentTranslate.current;
    setSliderPosition();
  };

  useEffect(() => {
    if (!sliderRef.current) return;

    const { width, height } = sliderRef.current.getBoundingClientRect();
    setSlideSize({ width, height });
  }, []);

  const onDragStart = (event: React.PointerEvent, index: number) => {
    event.preventDefault();

    isDragging.current = true;
    currentIndex.current = index;
    startPosition.current = event.pageX;
    animationRef.current = requestAnimationFrame(slideAnimation);

    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grabbing';
    }
  };

  const onDragging = (event: React.PointerEvent) => {
    if (isDragging.current) {
      const currentPostion = event.pageX;
      currentTranslate.current =
        prevTranslate.current + currentPostion - startPosition.current;
    }
  };

  const onDragEnd = () => {
    isDragging.current = false;
    cancelAnimationFrame(animationRef.current!);

    const movedDist = currentTranslate.current - prevTranslate.current;

    if (
      movedDist < -(slideSize.width / 3) &&
      currentIndex.current < imageList.length - 1
    ) {
      currentIndex.current += 1;
    }

    if (movedDist > slideSize.width / 3 && currentIndex.current > 0) {
      currentIndex.current -= 1;
    }

    setPositionByIndex();

    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }
  };

  const slideAnimation = () => {
    setSliderPosition();
    if (isDragging.current) {
      requestAnimationFrame(slideAnimation);
    }
  };

  const setSliderPosition = () => {
    if (!sliderRef.current) return;
    sliderRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
  };

  return (
    <Container>
      <Wrapper ref={sliderRef}>
        {imageList.map((image, index) => (
          <div
            key={index}
            onPointerDown={event => onDragStart(event, index)}
            onPointerMove={onDragging}
            onPointerUp={onDragEnd}
            onPointerLeave={() => {
              if (isDragging.current) {
                onDragEnd();
              }
            }}
            onContextMenu={event => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <Slide
              imageData={image}
              slideWidth={slideSize.width}
              slideHeight={slideSize.height}
            />
          </div>
        ))}
      </Wrapper>
      {/* <PageNav
        fontColor="neutralTextWeak"
        badgeColor="neutralBackgroundBlur"
        text={`${currentIndex.current} / ${imageList.length}`}
        size="M"
        type="container"
      /> */}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  cursor: grab;
  transition: transform 0.2s ease-out;
  // For mobile touch event
  touch-action: none;
`;

// const PageNav = styled(Badge)`
//   position: absolute;
//   bottom: 16px;
//   right: 16px;
// `;
