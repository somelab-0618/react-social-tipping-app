import { memo, VFC } from 'react';

export const NotFoundPage: VFC = memo(() => {
  return (
    <>
      <div>
        <h1>404 NotFound</h1>
        <p>ページが見つかりません</p>
      </div>
    </>
  );
});
