import React from 'react';
import classNames from 'classnames';

export interface ButtonProps extends React.HTMLAttributes<any> {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, className, children, disabled }) => {
  const classes = classNames('btn', className);
  return (
    <div className="buttons">
      <button onClick={onClick} className={classes} disabled={disabled}>
        {children}
      </button>
    </div>
  );
};
