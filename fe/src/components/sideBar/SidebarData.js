import React from 'react';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';

export const SidebarData = [
  {
    title: 'Internship Fair Checklist',
    path: './Internship Fair Checklist.pdf', // This probably needs to go in address, as long as the host can be removed from the URL
    icon: <MdIcons.MdOutlineChecklist size ={55}/>,
    cName: 'nav-text',
    address: 'data:image/png;base64,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'
  },
  {
    title: 'Internship Fair Preparation Worksheet',
    path: './Internship Fair Preparation Worksheet.pdf', // Same here
    icon: <BiIcons.BiSpreadsheet size={70} />,
    cName: 'nav-text',
    address: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMUAAAEACAMAAAA0tEJxAAAAclBMVEX///8AAADDw8Nqamr5+fn29vYvLy/KysrFxcUkJCSLi4sODg7j4+OmpqZBQUHn5+c6Ojrv7+9jY2NxcXFcXFzb29spKSkbGxsXFxdTU1OYmJhFRUW6urp9fX2bm5uQkJDS0tKxsbEsLCxMTEx3d3eFhYWhgS3WAAAC40lEQVR4nO3d23KiQBRGYRUaPEUFNSqeZ8b3f8WJNRdR04ONJd0L/ddlpIr9VQqS2onSark1n7Wx5UNHRJaHHrWs3FGRJqEnLWvpqOiiFe33UyyKDq1uUVnRSx2P9lj6EoqOFJik4CQFJyk4ScFJCk5ScJKCU4kizobXjY+fZ8VxPAxd5qwwx2g9umqdDL6OHSSj4OUb46hALzyS1E0RF4EHLW8XOylMP/Cc5fVNFcWAV3XF+oPXurIisrwSuqi6Ira8FLZYCkxScJKCkxScpOAkBScpOJUozGYb3TQ5v/Dr9qsBOhpXxa4Nbu+q6AUd806juaMi6JT3Srrvp1iFvo5/thpUVgCX4YdeZUXH74QupVJgkoKTFJyk4CQFJyk4ScFJCk5ScJKCkxScpOAkBScpOEnBSQpOUnCSgpMUnKTgJAUnKThJwUkKTlJwkoKTFJyk4CQFJyk4ScFJCk5ScJKCkxScpOAkBScpOEnBSQpOUlxkMn/VpsiKqbe2lk+zeY5ivGp7a2l+nl+K77JpMvHV79oUrfHcW7anmelOy0kKTlJwkoKTFJyk4CQFJyk4ScFJCk5ScHqSIhv7qzZF1l/NfBVpw/kGiixafHqqt65vTxs4KThJwUkKTlJwkoKTFJyk4CQFJyk4ScFJCk7a014gXmKr9hobTp+KQX172v0s99Wf2v5DuxV7zHJ63Wk5ScHpxRXXz8tNG6qYXD/wtKEKW1LUWhVF7yUUu+YpJrdPNN5uTPMUfcsvwFLUmhScpOAkBScpOD1J0Yx3Rt9RNGTDCVIsXkJR3/fCfJz6njoVj+9p7yhaxmOW0+tOy+mfonO5ujcNVSym++/LZ9+fNFNhSwrv/Vdhuy03TjE62I5GKwbr27cwnQ7Wo9GKr58X9/+OeY6ucEuKOpOCkxScpOAkBScpOL2tIq11oId6QFF0O7SKRWUFtTdTLENPWlbiesHmoSctK7d9uratIZgxmzsi/gJvctjqQrFXrQAAAABJRU5ErkJggg=='
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