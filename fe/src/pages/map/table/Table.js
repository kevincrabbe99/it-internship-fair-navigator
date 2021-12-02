import React from 'react'
import "./table.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faRoute } from '@fortawesome/free-solid-svg-icons'

export default function Table() {
    return (
        <div className="table-container border">
            <div className="container tableInfoRow">
                <div className="row companyName">
                    Company Name
                </div>
                <div className="row contactTitle">
                    Primary Contact Title
                </div>
                <div className="row contactInfo">
                    Primary Contact Name
                </div>
                <div className="row contactInfo">
                    Primary Contact Email
                </div>
                <div className="row contactInfo">
                    (000) 000-0000
                </div>
            </div>    
            <div className="table-footer">
                <div className="footer-container">
                    <div className="row">
                        <div className="col-md-6">
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="col-md-6">
                            <FontAwesomeIcon icon={faRoute} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
