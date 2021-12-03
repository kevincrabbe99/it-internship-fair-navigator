import React from 'react'
import RoutesView from '../../components/Routes/RoutesView'
import "./map.scss"

import Table from './table/Table'
import PanZoom from '@sasza/react-panzoom'
import { test } from '../../util/Endpoints'

export default function Map() {

    const rows = 15
    const columns = 15
    const locations = [[0,1], [0,3], [2,3], [2,1], [3,3], [3,1]]


    function renderRow(row) {

        var colsToRender = [];
        locations.forEach(location => {
            if (location[0] === row) {
                colsToRender.push(location[1])
            }
        })

        console.log("Cols to render: ", colsToRender)

        return (
            <tr key={row}>
            {
                [...Array(columns)].map((e, column) => (
                    <>
                    { colsToRender.includes(column) ? <>
                        <td>
                            <Table />
                        </td>
                     </> : 
                     <>
                        <td> 
                            <div className="table-container">

                            </div>
                        </td>
                    </> }
                    </>
                ))
            
            }
            </tr>

        
        )
    }

    // test();

    return (
        
        <div className="map-container">
            <PanZoom
            boundary={{
            parent: true
            }}
            disableUserSelect
            >
            <table>
                <tbody>
                {
                    [...Array(rows)].map((e, row) => (
                        
                            renderRow(row)
                        
                    ))
                }
                </tbody>
            </table>
            </PanZoom>
            <RoutesView />
        </div>
    )
}
