import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateEventAsync } from 'data/event/action';
import { Status } from 'data/enum';
import { EventType } from 'data/event/model';
import { CancelButton } from 'shared/components';
import { LoadingButton } from 'shared/layout';
import { ActionType } from 'data/actionTypes';
import { Modal } from 'shared/base';

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
      <CancelButton small onClick={() => onClose(false)} />
      <LoadingButton
        actionType={ActionType.EVENT_UPDATEVENTASYNC}
        onClick={onApply}
        className="btn-danger btn-sm">
        Отклонить
      </LoadingButton>
    </>
  );

  return (
    <Modal header="Отклонение заявки" onCancel={() => onClose(false)} footer={footer}>
      <div className="text-modal">Вы уверены, что хотите отклонить заявку?</div>
    </Modal>
  );
};