import React from 'react';
import { Block } from 'shared/base/block';
import { ActionType } from 'data/actionTypes';
import { useLoader } from 'core/useLoader';

interface Props {
  messages?: string | string[];
  actionType?: ActionType;
  mod?: string;
}

export const MessagesView: React.FC<Props> = ({ messages, actionType, mod }) => {
  const item = useLoader(actionType != null ? actionType : ActionType.CORE_NOPE, mod);
  let items: string[];
  if (messages) {
    items = Array.isArray(messages) ? messages : [messages];
  } else if (item && item.isError && item.error != null) {
    items = Array.isArray(item.error) ? item.error : [item.error];
  } else {
    items = [];
  }

  if (items) {
    return (
      <Block p="3">
        <ul className="list-unstyled">
          {items.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      </Block>
    );
  }
  return null;
};
