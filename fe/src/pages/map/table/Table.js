import React, { useContext } from 'react'
import "./table.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faRoute, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../../contexts/userContext'
import { isAdmin } from '../../../contexts/userContext'

export default function Table() {

    const { user } = useContext(UserContext)

    // const getTables = await getTablesEndpoint(user.uuid);


    return (
        <div className="table-container border">
            <div className="container tableInfoRow">
                <div className="row companyName">
                    Company Name
                </div>
                <div className="row contactInfo">
                    Number of Representatives: {''}
                </div>
                <div className="row contactInfo">
                    Website: {''}
                </div>
                <div className="row contactInfo">
                    Notes: {''}
                </div>
            </div>    
            <div className="table-footer">
                <div className="footer-container">
                    <div className="row">
                        { isAdmin() ? // regular view
                            <>       
                                <div className="col-md-6">
                                    <FontAwesomeIcon icon={faEdit} />
                                </div>
                                <div className="col-md-6">
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>
                            </>
                        : // admin view
                            <>
                                <div className="col-md-6">
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                                <div className="col-md-6">
                                    <FontAwesomeIcon icon={faRoute} />
                                </div>
                            </>
                        }       
                    </div>
                </div>
            </div>
        </div>
    )
}
