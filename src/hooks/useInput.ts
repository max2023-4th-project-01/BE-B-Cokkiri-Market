import { useState } from 'react';

export const useInput = <T>(initialValue?: T, regex?: RegExp) => {
  const [value, setValue] = useState<T | undefined>(initialValue);
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value as T;
    setValue(newValue);

    regex && setIsValid(regex.test(e.target.value));
  };

  const clearValue = () => {
    setValue(initialValue);
    setIsValid(undefined);
  };

  return regex
    ? ({ value, onChange, clearValue, isValid } as const)
    : ({ value, onChange, clearValue } as const);
};
