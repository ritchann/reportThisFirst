import React, { useMemo, useCallback } from 'react';
import { Modal, Line } from 'shared/base';
import { DeleteButton, CancelButton } from 'shared/components';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from 'core/store';
import { setEmployees } from 'data/employee/action';

import './deleteDialog.scss';

interface Props {
  onClose: () => void;
  id: number;
}

export const DeleteDialog: React.FC<Props> = ({ onClose, id }) => {
  const dispatch = useDispatch();

  const employees = useSelector((state: StoreType) => state.employee.employees);

  const onApply = useCallback(() => {
    const newEmployees = [...employees];
    const index = newEmployees.findIndex(x => x.id == id);
    newEmployees.splice(index, 1);
    dispatch(setEmployees(newEmployees));
    onClose();
  }, [dispatch, employees, id, onClose]);

  const footer = useMemo(() => {
    return (
      <Line>
        <CancelButton small onClick={onClose} mr="2" />
        <DeleteButton small onClick={onApply} />
      </Line>
    );
  }, [onClose, onApply]);

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