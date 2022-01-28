import { memo, VFC } from 'react';
import styled from 'styled-components';

type Props = {
  inputType: 'text' | 'email' | 'password';
  placeholder: string;
};

export const TextInput: VFC<Props> = memo((props) => {
  const { inputType, placeholder } = props;
  return <SInput type={inputType} placeholder={placeholder} />;
});

const SInput = styled.input`
  display: inline-block;
  width: 30%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
