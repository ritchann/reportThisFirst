import React, { useCallback } from 'react';
import { EventType } from 'data/event/model';
import { CancelButton, DeleteButton } from 'shared/components';
import { Modal } from 'shared/base';

interface Props {
  onClose: (needUpdate: boolean) => void;
}

export const DeleteDialog: React.FC<Props> = ({ onClose }) => {
  const footer = (
    <>
      <CancelButton small onClick={() => onClose(false)} />
      <DeleteButton small />
    </>
  );

  return (
    <Modal header="Удаление файла" onCancel={() => onClose(false)} footer={footer}>
      <div className="text-modal lighter-text">Вы уверены, что хотите удалить файл из архива?</div>
    </Modal>
  );
};