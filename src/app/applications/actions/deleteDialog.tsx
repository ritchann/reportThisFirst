import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { EventType } from 'data/event/model';
import { updateEventAsync } from 'data/event/action';
import { Status } from 'data/enum';
import { CancelButton } from 'shared/components';
import { LoadingButton } from 'shared/layout';
import { ActionType } from 'data/actionTypes';
import { Modal } from 'shared/base';

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
      <CancelButton small onClick={() => onClose(false)} />
      <LoadingButton
        actionType={ActionType.EVENT_UPDATEVENTASYNC}
        onClick={onApply}
        className="btn-danger btn-sm">
        Удалить
      </LoadingButton>
    </>
  );

  return (
    <Modal header="Удаление заявки" onCancel={() => onClose(false)} footer={footer}>
      <div className="text-modal">Вы уверены, что хотите удалить заявку из подтвержденных?</div>
    </Modal>
  );
};