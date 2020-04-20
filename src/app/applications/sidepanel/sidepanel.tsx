import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useLocation } from 'core/router';
import { ImportedIcon } from 'shared/base/icon';
import { SidepanelItem } from 'app/sidepanel/sidepanelItem';
import { Line } from 'shared/base';

import './sidepanel.scss';

interface LinkItem {
  type: 'link';
  title: string;
  icon: ImportedIcon;
  to: string;
}

export const Sidepanel: React.FC = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<{ to: string }>();

  const menu = useMemo(() => {
    const innerMenu: LinkItem[] = [
      { type: 'link', title: 'Заявки', icon: 'bars', to: '/applications' },
      { type: 'link', title: 'Карта', icon: 'map-marker-alt', to: '/map' },
      { type: 'link', title: 'Выйти', icon: 'sign-out-alt', to: '/' }
    ];
    return innerMenu;
  }, []);

  useEffect(() => {
    const isActive = (to: string) => RegExp(`^${to}(/\\w*)?$`, 'i').test(location.pathname);
    for (const item of menu) {
      if (item.type === 'link' && isActive(item.to)) {
        setActiveItem(item);
        return;
      }
    }
  }, [location.pathname, menu]);

  return (
    <div className="sidepanel">
      <Line className="sidebar-container" vertical>
        {menu.map((item, itemKey) => {
          return (
            <Link
              key={itemKey}
              to={item.to}
              className={classNames({
                active: item === activeItem,
                logout: item.title === 'Выйти'
              })}>
              <SidepanelItem icon={item.icon} />
            </Link>
          );
        })}
      </Line>
    </div>
  );
};
