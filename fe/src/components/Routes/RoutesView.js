import React from 'react'
import '../../util/colors.scss'
import RouteItem from './RouteItem/RouteItem'
import './routesView.scss'

export default function RoutesView() {
    return (
        <div>
            <div id="routes_container">

                {/* Header */}
                <div id="routes_header">
                    <div id="routes_header_title">
                        <h4>Your Routes</h4>
                    </div>
                    <ul>
                        <li>Print</li>
                        <li>Email</li>
                        <li>Reset</li>
                    </ul>
                </div>

                {/* List */}
                <div id="routes_list">
                    <ul>
                      {
                            [...Array(10)].map(i => (
                                <li>
                                    <RouteItem key={i} />
                                </li>
                            ))
                      }
                    </ul>
                </div>

            </div>            
        </div>
    )
}
