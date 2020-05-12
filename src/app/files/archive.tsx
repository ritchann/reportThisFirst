import React, { useState, useCallback, useEffect, useMemo } from 'react';
import classnames from 'classnames';
import { Line, Icon } from 'shared/base';
import { ServiceType, Sort } from 'data/enum';
import { Card, EditButton, DeleteButton, Pagination } from 'shared/components';
import { DateTime } from 'shared/base/utils/dateTime';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from 'core/store';
import { setSort } from 'data/files/action';
import { FileType } from 'data/files/model';
import { usePagination } from 'app/common/usePagination';

import { DeleteDialog } from './deleteDialog';
import './archive.scss';

const maxElements = 3;

export const Archive: React.FC = () => {
  const dispatch = useDispatch();

  const [activePage, setActivePage] = useState(1);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [pages, setPages] = useState<{ [page: number]: FileType[] }>({ 1: [] });
  const [maxPages, setMaxPages] = useState(1);

  const getPages = usePagination<FileType>(maxElements);

  const { files: filesOriginal, filter, sort } = useSelector((state: StoreType) => state.files);

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
    setPages(getPages(handledResult));
    setMaxPages(Math.round(handledResult.length / maxElements));
    setActivePage(1);
  }, [onFilterFiles, onSortFiles, getPages, filesOriginal]);

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
        <div className="files-archive">
          <Line vertical mb="3">
            {pages[activePage].map((file, i) => {
              return (
                <Card key={i} className="file-card">
                  <Line className="card-container" justifyContent="between" alignItems="center">
                    <Line alignItems="center">
                      <div className={classnames('label', {
                        gas: file.type == ServiceType.Gas,
                        electricity: file.type == ServiceType.Electricity,
                        water: file.type == ServiceType.Water,
                        heat: file.type == ServiceType.Heat
                      })}></div>
                      <Line vertical ml="3">
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
          <Pagination maxPages={maxPages} active={activePage} setActive={setActivePage} />
        </div>
      </Line>
      {showDeleteDialog && <DeleteDialog onClose={() => setShowDeleteDialog(false)} />}
    </>
  );
};