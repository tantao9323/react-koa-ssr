import React from 'react';
import Spinner from '../spinner';

const Page = (props) => {
  const { loaded, children } = props;
  return (
    <div>
      {children}
      {loaded ? <Spinner /> : null}
    </div>
  );
};

export default Page;
