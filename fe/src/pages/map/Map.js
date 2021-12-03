import React, { useContext } from 'react'
import RoutesView from '../../components/Routes/RoutesView'
import "./map.scss"

import Table from './table/Table'

import { test } from '../../util/Endpoints'
import { RoutesContext } from '../../contexts/routesContext'

export default function Map() {
    const { routesContext, setRoutesContext } = useContext(RoutesContext)

    const rows = 6
    const columns = 5
    /*const locations = [[0,0], [0,1], [0,2], [0,3], [0,4],
                        [1,0], [1,1], [1,2], [1,3], [1,4], 
                        [2,0], [2,1], [2,2], [2,3], [2,4],
                        [3,0], [3,1], [3,2], [3,3], [3,4], 
                        [4,0], [4,1], [4,2], [4,3], [4,4],
                        [5,0], [5,1], [5,2], [5,3], [5,4]]*/
    const locations = [];
                        


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
                            <Table x = {row} y = {column} />
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
