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

// TODO: add message view и закрывать окно, если нет ошибок

export const RejectDialog: React.FC<Props> = ({ onClose, event }) => {
  const dispatch = useDispatch();

  const onApply = useCallback(() => {
    dispatch(updateEventAsync({
      event: {
        ...event,
        status: Status.Postponed
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
        Отклонить
      </Button>
    </>
  );

  return (
    <Modal header="Отклонение заявки" onCancel={() => onClose(false)} footer={footer}>
      <div className="text-modal">Вы уверены, что хотите отклонить заявку?</div>
    </Modal>
  );
};