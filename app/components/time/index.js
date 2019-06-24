import React from 'react';
import styles from './index.less';

const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;

const getDate = (dateTimeStamp) => {
  if (dateTimeStamp === undefined) {
    return false;
  }
  const timeStamp = dateTimeStamp.replace(/-/g, '/');
  const sTime = new Date(timeStamp).getTime();
  const now = new Date().getTime();
  const diffValue = now - sTime;
  if (diffValue < 0) {
    return '';
  }
  const monthC = diffValue / month;
  const weekC = diffValue / (7 * day);
  const dayC = diffValue / day;
  const hourC = diffValue / hour;
  const minC = diffValue / minute;
  if (monthC >= 1) {
    return `${parseInt(monthC, 10)}个月前`;
  }
  if (weekC >= 1) {
    return `${parseInt(weekC, 10)}周前`;
  }
  if (dayC >= 1) {
    return `${parseInt(dayC, 10)}天前`;
  }
  if (hourC >= 1) {
    return `${parseInt(hourC, 10)}个小时前`;
  }
  if (minC >= 1) {
    return `${parseInt(minC, 10)}分钟前`;
  }
  return '刚刚';
};

const Time = (props) => {
  const { time } = props;
  return <span className={styles.time}>{getDate(time)}</span>;
};

export default Time;
