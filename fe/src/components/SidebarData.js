import React from 'react';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi'

export const SidebarData = [
  {
    title: 'Internship Fair Checklist',
    path: '/',
    icon: <MdIcons.MdOutlineChecklist size ={55}/>,
    cName: 'nav-text'
  },
  {
    title: 'Internship Fair Preparation Worksheet',
    path: '/',
    icon: <BiIcons.BiSpreadsheet size={70} />,
    cName: 'nav-text'
  }
];