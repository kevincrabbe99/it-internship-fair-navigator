import React, { useContext } from 'react'
import '../../util/colors.scss'
import RouteItem from './RouteItem/RouteItem'
import './routesView.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { RoutesShowingContext } from '../../contexts/routesShowingContext'

export default function RoutesView() {

    const {routesShowingContext} = useContext(RoutesShowingContext)


    const data = [
        {
            logoUrl: "https://logodix.com/logo/340298.png",
            name: "StateFarm",
            website: "https://www.statefarm.com/",
            favorited: true
        },
        {
            logoUrl: "https://media-exp1.licdn.com/dms/image/C4E22AQEspo2YZwWHaw/feedshare-shrink_2048_1536/0/1617820112220?e=1640217600&v=beta&t=h11sycUY20ORLihSXIjkv_QlecwMVQMLiK2BGqg9gcA",
            name: "Country Financial",
            website: "https://www.countryfinancial.com/",
            favorited: true
        },
        {
            logoUrl: "https://rivianownersforum.com/attachments/rivian-logo-png.479/",
            name: "Rivian",
            website: "https://www.fivian.com/",
            favorited: false
        }
    ]

    

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
                            <FontAwesomeIcon icon={faPrint} />
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </li>
                    </ul>
                </div>

                {/* List */}
                <div id="routes_list">
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
