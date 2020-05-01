import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import { Line, Icon } from 'shared/base';

import './dropZone.scss';

export const DropZone: React.FC = () => {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState();

  const onDragOver = useCallback(e => {
    e.preventDefault();
    setDrag(true);
  }, []);

  const onDragLeave = useCallback(e => {
    e.preventDefault();
    setDrag(false);
  }, []);

  const removeDefault = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback(e => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  }, []);

  return (
    <Line
      draggable
      className={classnames('dropZone', { 'drag-over': drag })}
      onDragStart={removeDefault}
      onDragEnd={removeDefault}
      onDragEnter={removeDefault}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      justifyContent="center"
      alignItems="center">
      <Line vertical>
        <Line justifyContent="center" mb="2" className="icon">
          <Icon prefix="fas" name="cloud-upload-alt" className="fa-lg"></Icon>
        </Line>
        <div className="lighter-text text">Перетащите файл сюда или <b>выберите файл для загрузки</b></div>
      </Line>
    </Line>
  );
};