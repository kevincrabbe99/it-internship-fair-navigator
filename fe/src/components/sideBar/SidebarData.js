import React from 'react';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

export const SidebarData = [
  {
    title: 'Internship Fair Checklist',
    path: '/',
    icon: <MdIcons.MdOutlineChecklist size ={55}/>,
    cName: 'nav-text',
    address: 'checklist'
  },
  {
    title: 'Internship Fair Preparation Worksheet',
    path: '/',
    icon: <BiIcons.BiSpreadsheet size={70} />,
    cName: 'nav-text',
    address: 'worksheet'
  },
  {
    title: 'Admin Login',
    path: '/',
    icon: <FontAwesomeIcon icon={faUserCog} />,
    cName: 'nav-text',
    address: 'login'
  },
  {
    title: 'Feedback',
    path: '/',
    icon: <FontAwesomeIcon icon={faCommentDots} />,
    cName: 'nav-text',
    address: 'feedback'
  }
];