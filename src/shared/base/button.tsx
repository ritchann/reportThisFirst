import React from 'react';
import classNames from 'classnames';

export interface ButtonProps extends React.HTMLAttributes<any> {
  buttonType?: 'light' | 'primary';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, buttonType, className, children }) => {
  const classes = classNames('btn', { [`btn-${buttonType}`]: true }, className);
  return (
    <div className="buttons">
      <button onClick={onClick} className={classes}>
        {children}
      </button>
    </div>
  );
};
