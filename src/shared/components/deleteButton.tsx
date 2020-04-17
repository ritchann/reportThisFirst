import React from 'react';
import classNames from 'classnames';
import { Button } from 'shared/base/button';
import { propsToSpace, SpaceProps } from 'shared/base/utils/spaceUtil';

interface Props extends SpaceProps {
    onClick?: () => void;
    isReject?: boolean;
}

export const DeleteButton: React.FC<Props> = ({ onClick, isReject, ...other }) => {
    const classes = classNames('deleteButton btn-outline-danger btn-sm button',
        propsToSpace(other));
    return (
        <Button onClick={onClick} className={classes}>
            {isReject ? 'Отклонить' : 'Удалить'}
        </Button>
    );
};