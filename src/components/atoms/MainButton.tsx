import { memo, ReactNode, VFC } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const MainButton: VFC<Props> = memo((props) => {
  const { children, onClick, className } = props;
  return (
    <SButton onClick={onClick} className={className}>
      {children}
    </SButton>
  );
});

const SButton = styled.div`
  display: inline-block;
  padding: 8px 12px;
  color: #fff;
  background-color: #078080;
  border-radius: 6px;
  &:first-child {
    margin-right: 12px;
  }
  &:hover {
    opacity: 0.8;
  }
`;
