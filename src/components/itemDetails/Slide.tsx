import { styled } from 'styled-components';

type SlideProps = {
  imageData: { id: number; url: string };
  slideWidth: number;
  slideHeight: number;
};

export function Slide({ slideWidth, slideHeight, imageData }: SlideProps) {
  return (
    <ImageSlide $slideWidth={slideWidth} $slideHeight={slideHeight}>
      <Image src={imageData.url} alt={`Item image ${imageData.id}`} />
    </ImageSlide>
  );
}

const ImageSlide = styled.div<{ $slideWidth: number; $slideHeight: number }>`
  width: ${({ $slideWidth }) => $slideWidth}px;
  height: ${({ $slideHeight }) => $slideHeight}px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
