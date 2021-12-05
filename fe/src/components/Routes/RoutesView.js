import React, { useContext } from 'react'
import { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import '../../util/colors.scss'
import RouteItem from './RouteItem/RouteItem'
import './routesView.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { RoutesShowingContext } from '../../contexts/routesShowingContext'

export default function RoutesView() {

    const {routesShowingContext} = useContext(RoutesShowingContext)
    
    const componentRef = useRef();


    return (
        <div  className={   routesShowingContext &&
                            routesShowingContext.showing ? '':'hide'} >
            <div id="routes_container">

                {/* Header */}
                <div className="routes_header">
                    <div id="routes_header_title">
                        <h4>Your Routes</h4>
                    </div>
                    <ul>
                        <li>   
                            <ReactToPrint
                                trigger={() => <FontAwesomeIcon icon={faPrint} />}
                                content={() => componentRef.current}
                            />
                        </li>
                    </ul>
                </div>

                {/* List */}
                <div id="routes_list" ref={componentRef}>
                    <ul>
                      {
                            [...Array(15)].map((i, index) => (
                                <li>
                                    <RouteItem index={index} />
                                </li>
                            ))
                      }
                    </ul>
                </div>

            </div>            
        </div>
    )
}
