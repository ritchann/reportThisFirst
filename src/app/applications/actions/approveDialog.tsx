import React, { useCallback } from 'react';
import { Modal } from 'shared/base/modal';
import { Button } from 'shared/base/button';
import { useDispatch } from 'react-redux';
import { updateEventAsync } from 'data/event/action';
import { Status } from 'data/enum';
import { EventType } from 'data/event/model';
import { LoadingButton } from 'shared/layout/loadingButton';
import { ActionType } from 'data/actionTypes';

interface Props {
  onClose: (needUpdate: boolean) => void;
  event: EventType;
}

export const ApproveDialog: React.FC<Props> = ({ onClose, event }) => {
  const dispatch = useDispatch();

  const onApply = useCallback(() => {
    dispatch(updateEventAsync({
      event: {
        ...event,
        status: Status.In_progress
      },
      onResponseCallback: () => onClose(true)
    }));
  }, [dispatch, event, onClose]);

  const footer = (
    <>
      <Button onClick={() => onClose(false)} className="btn-outline-secondary btn-sm">
        Отмена
      </Button>
      <LoadingButton
        actionType={ActionType.EVENT_UPDATEVENTASYNC}
        onClick={onApply}
        className="btn-primary btn-sm">
        Подтвердить
      </LoadingButton>
    </>
  );

  return (
    <Modal header="Подтверждение заявки" onCancel={() => onClose(false)} footer={footer}>
      <div className="text-modal">Вы уверены, что хотите подтвердить заявку?</div>
    </Modal>
  );
};