import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

export default () => (
  <div className={styles['page-loading']}>
    <div className={styles['self-building-square-spinner']}>
      <div className={styles.square} />
      <div className={styles.square} />
      <div className={styles.square} />
      <div className={classnames([styles.square, styles.clear])} />
      <div className={styles.square} />
      <div className={styles.square} />
      <div className={classnames([styles.square, styles.clear])} />
      <div className={styles.square} />
      <div className={styles.square} />
    </div>
  </div>
);
