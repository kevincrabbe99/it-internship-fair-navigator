import React from 'react';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faHome } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';

export const SidebarData = [
  {
    title: 'Home',
    path: '/', 
    icon: <FontAwesomeIcon icon={faHome} />,
    cName: 'nav-text',
    address: '/'
  },
  {
    title: 'Internship Fair Checklist',
    path: '/',
    icon: <MdIcons.MdOutlineChecklist size ={55}/>,
    cName: 'nav-text',
    address: 'checklist',
    target:'_blank'
  },
  {
    title: 'Internship Fair Preparation Worksheet',
    path: '/',
    icon: <BiIcons.BiSpreadsheet size={70} />,
    cName: 'nav-text',
    address: 'worksheet',
    target:'_blank'
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
  },
  {
    title: 'Subscribe to Mailing List',
    path: '/',
    icon: <FontAwesomeIcon icon={faAddressBook} />,
    cName: 'nav-text',
    address: 'subscribe'
  }
];