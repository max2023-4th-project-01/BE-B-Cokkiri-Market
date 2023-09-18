import {
  PointerEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { styled } from 'styled-components';
import { Slide } from './Slide';

type SliderProps = {
  imageList: { id: number; url: string }[];
};

export function Slider({ imageList }: SliderProps) {
  const [sliderSize, setSliderSize] = useState({ width: 0, height: 0 });
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!sliderRef.current) return;

    const { width, height } = sliderRef.current.getBoundingClientRect();
    setSliderSize({ width, height });
  }, []);

  const onDragStart: PointerEventHandler = event => {
    event.preventDefault();

    isDragging.current = true;
    console.log('drag start');
  };

  const onDragging = () => {
    if (isDragging.current) {
      console.log('dragging');
    }
  };

  const onDragEnd = () => {
    isDragging.current = false;
    console.log('drag end');
  };

  return (
    <Container>
      <Wrapper ref={sliderRef}>
        {imageList.map((image, index) => (
          <div
            key={index}
            onPointerDown={onDragStart}
            onPointerMove={onDragging}
            onPointerUp={onDragEnd}
            onContextMenu={event => {
              event.preventDefault();
            }}
          >
            <Slide
              imageData={image}
              slideWidth={sliderSize.width}
              slideHeight={sliderSize.height}
            />
          </div>
        ))}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  cursor: grab;
  // For mobile touch event
  touch-action: none;
`;
