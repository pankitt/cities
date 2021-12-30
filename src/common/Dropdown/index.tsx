import React, { useState, useRef, FunctionComponent } from 'react';
import { useOnClickOutside } from 'hooks';
import styles from './index.module.css';

interface Props {
  Trigger: FunctionComponent;
  Content: FunctionComponent;
  className?: string;
  closeBodyOnClick?: boolean;
}

const Dropdown = ({
  Trigger,
  Content,
  className = '',
  closeBodyOnClick = true
}: Props): JSX.Element => {
  const iconRef = useRef<HTMLDivElement | null>(null);
  const downRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setVisibility] = useState(false);

  useOnClickOutside(downRef, iconRef, () => setVisibility(false));
  const toggleClose = () => setVisibility(!isVisible);

  return (
    <div className={`${styles.dropdown} ${className}`}>
      <div onClick={toggleClose} ref={iconRef} role="presentation">
        <Trigger />
      </div>
      {isVisible && (
        <div
          className={styles.content}
          ref={downRef}
          onClick={closeBodyOnClick ? toggleClose : undefined}
          role="presentation"
        >
          <Content />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
