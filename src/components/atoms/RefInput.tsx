import { forwardRef } from 'react';
import styled from 'styled-components';

type Props = {
  inputType: 'text' | 'number' | 'email' | 'password';
  placeholder: string;
};

export const RefInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { inputType, placeholder } = props;

  return <SInput ref={ref} type={inputType} placeholder={placeholder} />;
});

const SInput = styled.input`
  display: inline-block;
  width: 30%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
