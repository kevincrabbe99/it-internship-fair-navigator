import { faLink, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import './routeItem.scss'

export default function RouteItem({data, index}) {
console.log("DATA RI: ", data)
console.log("INDEX RI: ", index)

    return (
        data && 
        <>
            {/* {
                data.map((item, index) => {
                    return ( */}
                    
                        <div className="routes_list_item">
                            <div className="row">
                                <div class="col-auto r-number">
                                    <span>{index + 1}</span>
                                </div>
                                <div class="col-auto r-icon">
                                    <img src={data[index].logoUrl}></img>
                                </div>
                                <div class="col-auto r-name">
                                    {data[index].name}
                                </div>
                                <div class="col-auto r-icon-opt r-link">
                                    <Link to={{ pathname: data[index].website}} target="_blank">
                                        <FontAwesomeIcon icon = {faLink} />
                                    </Link>
                                </div> 
                                <div class="col-auto r-icon-opt r-trash">
                                    <FontAwesomeIcon icon = {faTrash} />
                                </div>
                            </div>
                        </div>
                    {/* )
                })
            } */}

            
    </>)
}
