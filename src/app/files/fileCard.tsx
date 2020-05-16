import React from 'react';
import classnames from 'classnames';
import { Card, EditButton, DeleteButton } from 'shared/components';
import { Line } from 'shared/base';
import { FileType } from 'data/files/model';
import { ServiceType } from 'data/enum';
import { DateTime } from 'shared/base/utils/dateTime';

import './fileCard.scss';

interface Props {
  model: FileType;
  openDeleteDialog: (value: boolean) => void;
}

export const FileCard: React.FC<Props> = ({ model, openDeleteDialog }) => {
  const header = (
    <Line className="file-header" alignItems="baseline">
      <div
        className={classnames('label', {
          gas: model.type == ServiceType.Gas,
          electricity: model.type == ServiceType.Electricity,
          water: model.type == ServiceType.Water,
          heat: model.type == ServiceType.Heat,
        })}></div>
      <div className="file-title bolder-text">{model.title}</div>
    </Line>
  );

  return (
    <Card className="file-card">
      <Line className="card-body" justifyContent="between">
        <Line vertical>
          {header}
          <Line mt="2">
            <div>Дата загрузки: </div>
            <div className="lighter-text pl-1">{DateTime.format(new Date(model.date))}</div>
          </Line>
        </Line>
        <Line vertical justifyContent="center">
          <EditButton small mb="2" header="Скачать" />
          <DeleteButton small onClick={() => openDeleteDialog(true)} />
        </Line>
      </Line>
    </Card>
  );
};
