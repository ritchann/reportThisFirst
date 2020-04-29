import React, { useCallback } from 'react';
import { Line, Icon } from 'shared/base';

import './dropZone.scss';

export const DropZone: React.FC = () => {
  const fileInputRef = React.createRef<HTMLAnchorElement>();

  const openFileDialog = useCallback(e => {
    e.preventDefault();
    fileInputRef.current.click();
  }, [fileInputRef]);

  return (
    <Line className="dropZone" justifyContent="center" alignItems="center">
      <Line vertical>
        <Line justifyContent="center" mb="2" className="icon">
          <Icon prefix="fas" name="cloud-upload-alt" className="fa-lg"></Icon>
        </Line>
        <div className="lighter-text text">Перетащите файл сюда или <a ref={fileInputRef} onClick={openFileDialog}>выберите файл для загрузки</a></div>
      </Line>
    </Line>
  );
};