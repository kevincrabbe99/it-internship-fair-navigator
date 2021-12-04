import React, { useContext, useEffect } from 'react'
import RoutesView from '../../components/Routes/RoutesView'
import "./map.scss"

import Table from './table/Table'

import { test } from '../../util/Endpoints'
import { RoutesContext } from '../../contexts/routesContext'
import { MapContext } from '../../contexts/mapContext'

export default function Map() {

    const { routesContext, setRoutesContext } = useContext(RoutesContext)
    const { mapContext , setMapContext} = useContext(MapContext)

    const [locations, setLocations] = React.useState([])

    const rows = 15
    const columns = 15
    // const locations = [[0,1], [0,3], [2,3], [2,1], [3,3], [3,1]]


    useEffect(() => {

        // loop through map context and add 
        for (let i = 0; i < mapContext..length; i++) {
            const location = mapContext[i]
            locations.push(location)
        }

    }, [mapContext])



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
            <table>
                <tbody>
                {
                    [...Array(rows)].map((e, row) => (
                        
                            renderRow(row)
                        
                    ))
                }
                </tbody>
            </table>
            
            {
                
                <RoutesView/>
            }
        </div>
    )
}
