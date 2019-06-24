import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

const Spinner = (props) => {
  const { className } = props;
  return (
    <div className={classnames(styles['circles-to-rhombuses-spinner'], className)}>
      <div className={styles.circle} />
      <div className={styles.circle} />
      <div className={styles.circle} />
    </div>
  );
};

export default Spinner;
