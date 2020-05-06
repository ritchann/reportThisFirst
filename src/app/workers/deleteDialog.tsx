import React, { useMemo } from 'react';
import { Modal, Line } from 'shared/base';
import { DeleteButton, CancelButton } from 'shared/components';

import './deleteDialog.scss';

interface Props {
  onClose: () => void;
}

export const DeleteDialog: React.FC<Props> = ({ onClose }) => {
  const footer = useMemo(() => {
    return (
      <Line>
        <CancelButton small onClick={onClose} mr="2" />
        <DeleteButton small />
      </Line>
    );
  }, [onClose]);

  return (
    <Modal
      header="Удаление"
      onCancel={onClose}
      footer={footer}
      className="deleteWorkerDialog">
      Вы действительно хотите удалить рабочего из списка?
    </Modal>
  );
};