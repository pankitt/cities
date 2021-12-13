import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './index.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const Button = ({ children, ...props }: Props): JSX.Element => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
