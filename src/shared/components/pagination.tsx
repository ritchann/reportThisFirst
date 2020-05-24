import React, { useState, useMemo } from 'react';
import classnames from 'classnames';
import { Line } from 'shared/base';

import './pagination.scss';

interface Props {
  maxPages?: number;
  active?: number;
  setActive?: (page: number) => void;
}

const delta = 2;

export const Pagination: React.FC<Props> = ({ maxPages = 5, active, setActive }) => {
  const pages = useMemo(() => {
    const list = [{ number: 1, skip: false }];
    const start = Math.max(active - delta, 2);
    const end = Math.min(active + delta, maxPages);
    if (start - 1 > 1) list.push({ number: start - 1, skip: true });
    for (let i = start; i <= end; i++) list.push({ number: i, skip: false });
    if (maxPages - end > 0) {
      if (maxPages - end > 1) list.push({ number: maxPages - 1, skip: true });
      list.push({ number: maxPages, skip: false });
    }
    return list;
  }, [active, maxPages]);

  const links = useMemo(() => {
    return pages.map(p => {
      return p.skip ? (
          <div key={p.number} className="page-item pagination-ellipsis">
            <li className="page-link">
              <span>&hellip;</span>
            </li>
          </div>
        ) : (
        <li key={p.number} className={classnames('page-item', (active ?? 1) == p.number ? 'active' : '')}>
          <button className="page-link" onClick={() => setActive(p.number)}>
            {p.number}
          </button>
        </li>
      );
    });
  }, [pages, active, setActive]);

  return (
    <Line justifyContent="end">
       <nav>{maxPages > 0 && <ul className="pagination">{links}</ul>}</nav>
    </Line>
  );
};