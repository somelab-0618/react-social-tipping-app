// ユーザー名用input要素
import { ChangeEvent, memo, ReactNode, VFC } from 'react';
import styled from 'styled-components';
import { TextInput } from '../atoms/TextInput';

type Props = {
  children: ReactNode;
  inputType: 'text' | 'email' | 'password';
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput: VFC<Props> = memo((props) => {
  const { children, inputType, placeholder, onChange } = props;
  return (
    <>
      <SFormControl>
        <SFormlabel>{children}</SFormlabel>
        <TextInput
          inputType={inputType}
          placeholder={placeholder}
          onChange={onChange}
        />
      </SFormControl>
    </>
  );
});

const SFormControl = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;

const SFormlabel = styled.label`
  flex-basis: 120px;
  text-align: left;
`;
