import { ChangeEvent, memo, VFC } from 'react';
import styled from 'styled-components';

type Props = {
  inputType: 'text' | 'number' | 'email' | 'password';
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput: VFC<Props> = memo((props) => {
  const { inputType, placeholder, onChange } = props;
  return <SInput type={inputType} placeholder={placeholder} onChange={onChange} />;
});

const SInput = styled.input`
  display: inline-block;
  width: 30%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
