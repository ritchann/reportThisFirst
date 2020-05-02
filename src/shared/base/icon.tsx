import { library } from '@fortawesome/fontawesome-svg-core';
//regular
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons/faCheckSquare';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons/faArrowAltCircleUp';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons/faCheckCircle';
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons/faFileAlt';
import { faCircle } from '@fortawesome/free-regular-svg-icons/faCircle';
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
import { faCloudUploadAlt } from  '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';
import { faAngleUp } from  '@fortawesome/free-solid-svg-icons/faAngleUp';
//
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(
  //regular
  faSquare,
  faCheckSquare,
  faArrowAltCircleUp,
  faCheckCircle,
  faCalendar,
  faFileAlt,
  faCircle,
  //solid
  faAngleRight,
  faBars,
  faMapMarkerAlt,
  faSignOutAlt,
  faTimes,
  faAngleDown,
  faArrowRight,
  faUserFriends,
  faFilter,
  faCloudUploadAlt,
  faAngleUp
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
  | 'filter'
  | 'cloud-upload-alt'
  | 'file-alt'
  | 'angle-up'
  | 'circle';

export interface Props extends React.HTMLAttributes<any> {
  className?: string;
  spin?: boolean;
  prefix?: 'fas' | 'far' | 'fab';
  name: ImportedIcon;
}

export const Icon: React.FC<Props> = ({ prefix = 'fas', name, spin, className, ...other }) => {
  return <FontAwesomeIcon icon={[prefix, name]} spin={spin} className={className} {...other}></FontAwesomeIcon>;
};
