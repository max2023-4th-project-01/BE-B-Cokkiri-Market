import { styled } from 'styled-components';
import { Button } from '../components/button/Button';
import { useToastStore } from '../stores/useToastStore';

export function Test() {
  const { showToast } = useToastStore();

  const handleError = () => {
    showToast({ message: 'This is a error', type: 'error', duration: 500000 });
  };

  const handleSuccess = () => {
    showToast({
      message: 'This is a success',
      type: 'success',
      duration: 1000,
    });
  };

  return (
    <Div>
      <Button
        color="accentPrimary"
        fontColor="accentText"
        onClick={handleSuccess}
      >
        성공
      </Button>
      <Button
        styledType="outline"
        color="neutralBorder"
        fontColor="accentTextWeak"
        onClick={handleError}
      >
        에러
      </Button>
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 0 32px;
`;
