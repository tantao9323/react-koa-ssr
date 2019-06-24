import React, { useState, Children, cloneElement } from 'react';
import classnames from 'classnames';
import styles from './index.less';

const Title = (props) => {
  const { info, onClick, active } = props;
  return (
    <div
      role="button"
      tabIndex={0}
      className={classnames(styles['tab-bar-title'], { active })}
      onClick={() => onClick(info.index)}
      onKeyDown={() => onClick(info.index)}
    >
      {info.title}
    </div>
  );
};

const TabBar = (props) => {
  const [active, setActive] = useState(0);
  const style = {
    transform: `translate3d(${active * -100}%, 0px, 0px)`,
  };
  const { tabs, children } = props;
  return (
    <div>
      <div className={styles['tab-bar-top']}>
        {tabs.map(item => (
          <Title
            info={item}
            key={item.index}
            active={item.index === active}
            onClick={index => setActive(index)}
          />
        ))}
      </div>
      <div className={styles['tab-bar-content']} style={style}>
        {Children.map(children, (item, i) => cloneElement(item, {
          style: active === i ? { height: 'calc(100vh - 92px)', overflowY: 'scroll' } : {},
        }))}
      </div>
    </div>
  );
};

export default TabBar;
