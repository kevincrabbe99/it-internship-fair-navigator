import React, { useContext } from 'react'
import "./table.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faRoute, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../../contexts/userContext'
import { isAdmin } from '../../../contexts/userContext'

export default function Table({data}) {

    const { user } = useContext(UserContext)

    return (
        <div className="table-container border">
            {/* <div className="image-container">
                <img src={data.} alt=""/>
            </div> */}
            <div className="container tableInfoRow">
                <div className="row companyName">
                    {data.name}
                </div>
                <div className="row">
                    <div className="col-auto repsC_key">
                        # of Reps:
                    </div>
                    <div className="col-auto repsC_val">
                        {data.number_of_reps}
                    </div>
                </div>
                <div className="row websiteLink">
                    {data.website}
                </div>
                <div className="row otherInfo">
                    {data.other_info}
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
