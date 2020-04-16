import React, { useCallback } from 'react';
import { Modal } from 'shared/base/modal';
import { Button } from 'shared/base/button';
import { useDispatch } from 'react-redux';
import { updateEventAsync } from 'data/event/action';
import { Status } from 'data/enum';
import { EventType } from 'data/event/model';

interface Props {
  onClose: (needUpdate: boolean) => void;
  event: EventType;
}

export const DeleteDialog: React.FC<Props> = ({ onClose, event }) => {
  const dispatch = useDispatch();

  const onApply = useCallback(() => {
    dispatch(updateEventAsync({
      event: {
        ...event,
        status: Status.Pending
      },
      onResponseCallback: () => onClose(true)
    }));
  }, [dispatch, event, onClose]);

  const footer = (
    <>
      <Button onClick={() => onClose(false)} className="btn-outline-secondary btn-sm">
        Отмена
      </Button>
      <Button onClick={onApply} className="btn-danger btn-sm">
        Удалить
      </Button>
    </>
  );

  return (
    <Modal header="Удаление заявки" onCancel={() => onClose(false)} footer={footer}>
      <div className="text-modal">Вы уверены, что хотите удалить заявку из подтвержденных?</div>
    </Modal>
  );
};