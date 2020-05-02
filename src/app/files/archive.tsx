import React, { useState, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { Line, Icon } from 'shared/base';
import { ServiceType, Sort } from 'data/enum';
import { Card, EditButton, DeleteButton } from 'shared/components';
import { DateTime } from 'shared/base/utils/dateTime';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from 'core/store';
import { setSort } from 'data/files/action';

import { DeleteDialog } from './deleteDialog';
import './archive.scss';

type FileType = {
  title: string;
  date: Date;
  type: string;
}

const filesOriginal: FileType[] = [
  { title: "Плановые отключения воды", date: new Date(2020, 0, 5), type: ServiceType.Water },
  { title: 'Плановые отключения электричества', date: new Date(2020, 1, 5), type: ServiceType.Electricity },
  { title: 'Плановые отключения газа', date: new Date(2020, 2, 5), type: ServiceType.Gas },
  { title: 'Плановые отключения воды', date: new Date(2020, 3, 5), type: ServiceType.Water },
  { title: 'Плановые отключения воды', date: new Date(2020, 4, 5), type: ServiceType.Water },
  { title: 'Плановые отключения воды', date: new Date(2020, 5, 5), type: ServiceType.Water }
];

export const Archive: React.FC = () => {
  const dispatch = useDispatch();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [files, setFiles] = useState<FileType[]>([]);

  const filter = useSelector((state: StoreType) => state.files.filter);
  const sort = useSelector((state: StoreType) => state.files.sort);

  const onFilterFiles = useCallback((files: FileType[]) => {
    const types: string[] = [];
    if (filter.isElectricity) types.push(ServiceType.Electricity);
    if (filter.isGas) types.push(ServiceType.Gas);
    if (filter.isHeat) types.push(ServiceType.Heat);
    if (filter.isWater) types.push(ServiceType.Water);

    let newFiles = [...files];
    if (types.length > 0) newFiles = newFiles.filter(x => types.includes(x.type));
    return newFiles;
  }, [filter]);

  const onSortFiles = useCallback((files: FileType[]) => {
    let newFiles = [...files];
    sort === Sort.First ?
      newFiles.sort((p, c) => p.date.getTime() - c.date.getTime())
      :
      newFiles.sort((p, c) => c.date.getTime() - p.date.getTime());
    return newFiles;
  }, [sort]);

  const onChangeSort = useCallback(() => dispatch(setSort(Number(!sort))), [dispatch, sort]);

  useEffect(() => {
    let result: FileType[] = [...filesOriginal];
    let handledResult = onFilterFiles(result);
    handledResult = onSortFiles(handledResult);
    setFiles(handledResult);
  }, [onFilterFiles, onSortFiles]);

  return (
    <>
      <Line className="archive" vertical>
        <Line className="header" justifyContent="between" alignItems="baseline">
          <div className="title">Архив</div>
          <Line className="sort" alignItems="center" onClick={onChangeSort}>
            {sort == Sort.Last ? (
              <>
                <Line mr="1">Последние</Line>
                <Icon name="angle-down"></Icon>
              </>
            ) : <>
                <Line mr="1">Ранние</Line>
                <Icon name="angle-up"></Icon>
              </>
            }
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