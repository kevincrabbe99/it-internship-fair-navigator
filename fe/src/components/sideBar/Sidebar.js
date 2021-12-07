import React, {useContext, useState, useEffect} from 'react'
import './sidebar.scss'
import { SidebarData } from '../../util/SidebarData';
import Searchbar from '../searchBar/Seachbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import { faWindowClose, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { UserContext } from '../../contexts/userContext';
import { SidebarContext } from '../../contexts/sidebarContext';

import { isAdmin } from '../../contexts/userContext';
import Searchbar from '../searchBar/Seachbar';

export default function Sidebar() {

    const { user, setUser } = useContext(UserContext)
    const { sidebarState, setSidebarState } = useContext(SidebarContext)

    const showSidebar = () => setSidebarState(!sidebarState);

    const handleClick = (address) => {
        window.open(address);
    }

    const logoutUserClick = () => {

        localStorage.removeItem("adminToken")
        setUser(null)
      }

    return (
        <div>
            <IconContext.Provider value={{ color: '#fff' }}>

                <nav className={sidebarState ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' >
                        <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars' onClick={showSidebar}>
                            <FontAwesomeIcon icon={faWindowClose} />
                        </Link>
                        </li>
                        {SidebarData.map((item, index) => {

                        if (isAdmin()) {
                            if (item.title == 'Admin Login') {
                            return (
                                <li key={index} className={item.cName}>
                                <Link to={item.link}>
                                    <div className='nav-icon'>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    </div>
                                    <span onClick={logoutUserClick}>Logout</span>
                                </Link>
                                </li>
                            )
                            }
                        }

                        return (
                            <li key={index} className={item.cName}>
                            <Link to={item.address} target={item.target ? '_blank' : ''}>
                                <div className='nav-icon'>
                                {item.icon}
                                </div>
                                {/* <span onClick={() => handleClick(item.address)}>{item.title}</span> */}
                                <span>{item.title}</span>
                            </Link>
                            </li>
                        );
                        })}
                        <Searchbar/>
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    )
}
