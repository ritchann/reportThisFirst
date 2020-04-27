import React, { useState } from 'react';
import classnames from 'classnames';
import { Line, Icon } from 'shared/base';
import { ServiceType } from 'data/enum';
import { Card, EditButton, DeleteButton } from 'shared/components';
import { DateTime } from 'shared/base/utils/dateTime';

import { DeleteDialog } from './deleteDialog';
import './archive.scss';

const files = [
  { title: 'Плановые отключения воды', date: new Date(), type: ServiceType.Water },
  { title: 'Плановые отключения электричества', date: new Date(), type: ServiceType.Electricity },
  { title: 'Плановые отключения газа', date: new Date(), type: ServiceType.Gas },
  { title: 'Плановые отключения воды', date: new Date(), type: ServiceType.Water }
];

export const Archive: React.FC = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <Line className="archive" vertical>
        <Line className="header" justifyContent="between" alignItems="baseline">
          <div className="title">Архив</div>
          <Line className="sort" alignItems="center">
            <Line mr="1">Недавние</Line>
            <Icon name="angle-down"></Icon>
          </Line>
        </Line>
        <Line className="files-archive" vertical>
          {files.map((file, i) => {
            return (
              <Card key={i} className="file-card">
                <Line className="card-container" justifyContent="between" alignItems="center">
                  <Line>
                    <div className='icon'>
                      <Icon name="file-alt" prefix="far" className={classnames({
                        'electricity-icon': file.type === ServiceType.Electricity,
                        'water-icon': file.type === ServiceType.Water,
                        'gas-icon': file.type === ServiceType.Gas
                      })}></Icon>
                    </div>
                    <Line vertical ml="4" mt="2">
                      <div className="title">{file.title}</div>
                      <div className="lighter-text">{DateTime.format(new Date(file.date))}</div>
                    </Line>
                  </Line>
                  <Line vertical mr="4">
                    <EditButton small mb="2" header="Скачать" />
                    <DeleteButton small onClick={() => setShowDeleteDialog(true)} />
                  </Line>
                </Line>
              </Card>
            );
          })}
        </Line>
      </Line>
      {showDeleteDialog && <DeleteDialog onClose={() => setShowDeleteDialog(false)} />}
    </>
  );
};