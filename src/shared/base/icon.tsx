import { library } from '@fortawesome/fontawesome-svg-core';
//regular
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons/faCheckSquare';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons/faArrowAltCircleUp';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons/faCheckCircle';
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar';
//solid
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faAngleDown } from  '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faUserFriends } from  '@fortawesome/free-solid-svg-icons/faUserFriends';
import { faFilter } from  '@fortawesome/free-solid-svg-icons/faFilter';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(
  //regular
  faSquare,
  faCheckSquare,
  faArrowAltCircleUp,
  faCheckCircle,
  faCalendar,
  //solid
  faAngleRight,
  faBars,
  faMapMarkerAlt,
  faSignOutAlt,
  faTimes,
  faAngleDown,
  faArrowRight,
  faUserFriends,
  faFilter
);

export type ImportedIcon =
  | 'check-square'
  | 'square'
  | 'angle-right'
  | 'google'
  | 'vk'
  | 'twitter'
  | 'bars'
  | 'map-marker-alt'
  | 'sign-out-alt'
  | 'check-circle'
  | 'arrow-alt-circle-up'
  | 'times'
  | 'angle-down'
  | 'arrow-right'
  | 'calendar'
  | 'user-friends'
  | 'filter';

export interface Props extends React.HTMLAttributes<any> {
  className?: string;
  spin?: boolean;
  prefix?: 'fas' | 'far' | 'fab';
  name: ImportedIcon;
}

export const Icon: React.FC<Props> = ({ prefix = 'fas', name, spin, className, ...other }) => {
  return <FontAwesomeIcon icon={[prefix, name]} spin={spin} {...other}></FontAwesomeIcon>;
};
