import React from 'react';
import { Line, Icon } from 'shared/base';

import './dropZone.scss';

export const DropZone: React.FC = () => {
  return (
    <Line className="dropZone" justifyContent="center" alignItems="center" mr="5">
      <Line vertical>
        <Line justifyContent="center" mb="2" className="icon">
        <Icon prefix="fas" name="cloud-upload-alt" className="fa-lg"></Icon>
        </Line>
        <div className="lighter-text text">Перетащите файл сюда или <b>выберите файл для загрузки</b></div>
      </Line>
    </Line>
  );
};