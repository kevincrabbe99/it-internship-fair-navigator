import React, { useContext, useEffect, useState } from 'react'
import RoutesView from '../../components/Routes/RoutesView'
import "./map.scss"
import { getTablesEndpoint } from '../../util/Endpoints'

import Table from './table/Table'

import { test } from '../../util/Endpoints'
import { RoutesContext } from '../../contexts/routesContext'
import { MapContext } from '../../contexts/mapContext'
import { YearContext } from '../../contexts/yearContext'

export default function Map() {

    const { routesContext, setRoutesContext } = useContext(RoutesContext)
    const { mapContext , setMapContext} = useContext(MapContext)
    const { yearData, setYearData } = useContext(YearContext)

    const rows = 15
    const columns = 15 
    const [locations, setLocations] = useState([])
    const [tableMatrix, setTableMatrix] = useState([...Array(rows)].map(e => Array(columns)))


    // const locations = [[0,1], [0,3], [2,3], [2,1], [3,3], [3,1]]

    // use effect for on load fetch map
    useEffect(() => {

    async function getTablesAsyncWrapper() {
        const res = await getTablesEndpoint(yearData.selected)
        // if (res.status === 200) {
        console.log("TABLES: ", yearData)
        setMapContext(res)
        // }
        
    }
    console.log("MAP CONTEXT: ", yearData)
    if (yearData && yearData.selected) {
        getTablesAsyncWrapper();
    }
    }, [yearData])

    useEffect(() => {
        if (!mapContext || !mapContext.tables.length > 0) {return}


        for (let i = 0; i < mapContext.tables.length; i++) {

            // insert location 
            const location = [mapContext.tables[i].x_coord, mapContext.tables[i].y_coord]
            const xPos = mapContext.tables[i].x_coord
            const yPos = mapContext.tables[i].y_coord
            console.log("Cols inserting ", location)
            
            // insert table
            setTableMatrix(prevState => { 
                const newTableMatrix = [...prevState]
                newTableMatrix[xPos][yPos] = <Table data={mapContext.tables[i].company} />
                return newTableMatrix
            })

        }

        console.log("Cols to render: ", locations)
        console.log("Cols map context: ", mapContext)
        console.log("Cols table matrix: ", tableMatrix)
    }, [mapContext, yearData])



    // function renderRow(row) {

    //     var colsToRender = [];
    //     locations.forEach(location => {
    //         if (location[0] === row) {
    //             colsToRender.push(location[1])
    //         }
    //     })


    //     return (
    //         <tr key={row}>
    //         {
    //             [...Array(columns)].map((e, column) => (
    //                 <>
    //                 { colsToRender.includes(column) ? <>
    //                     <td>
    //                         <Table  />
    //                     </td>
    //                  </> : 
    //                  <>
    //                     <td> 
    //                         <div className="table-container">

    //                         </div>
    //                     </td>
    //                 </> }
    //                 </>
    //             ))
            
    //         }
    //         </tr>

        
    //     )
    // }

    // test();

    return (
        <div className="map-container">
            <table>
                <tbody>
                {
                    [...Array(rows)].map((e, row) => (
                        <tr> 
                        {
                            [...Array(columns)].map((e, column) => (
                                tableMatrix[row][column] != null ?
                                <>
                                    <td>
                                        {tableMatrix[row][column]}
                                    </td>
                                </> : 
                                <>
                                    <td> 
                                        <div className="table-container">

                                        </div>
                                    </td>
                                </>
                            ))
                        }
                        </tr>
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
