import React, { useContext, useEffect, useState } from 'react'
import RoutesView from '../../components/Routes/RoutesView'
import "./map.scss"
import { getTablesEndpoint } from '../../util/Endpoints'

import Table from './table/Table'

import { test } from '../../util/Endpoints'
import { RoutesContext } from '../../contexts/routesContext'
import { MapContext } from '../../contexts/mapContext'
import { YearContext } from '../../contexts/yearContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { isAdmin } from '../../contexts/userContext'
import { CreateTableModalContext } from '../../contexts/createTableModalContext'
import { generateBlankTableTemplate } from '../../util/Shared'
import { TableMatrixContext } from '../../contexts/tableMatrixContext'
export default function Map() {

    const { routesContext, setRoutesContext } = useContext(RoutesContext)
    const { mapContext , setMapContext} = useContext(MapContext)
    const { createTableModal, setCreateTableModal } = useContext(CreateTableModalContext)
    const { yearData, setYearData } = useContext(YearContext)

    const rows = 15
    const columns = 15 
    const [locations, setLocations] = useState([])
    const {tableMatrix, setTableMatrix} = useContext(TableMatrixContext)


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
        setTableMatrix([...Array(15)].map(e => Array(15)))
        for (let i = 0; i < mapContext.tables.length; i++) {

            // insert location 
            const location = [mapContext.tables[i].x_coord, mapContext.tables[i].y_coord]
            const xPos = mapContext.tables[i].x_coord
            const yPos = mapContext.tables[i].y_coord
            console.log("Cols inserting ", location)
            
            // insert table
            setTableMatrix(prevState => { 
                const newTableMatrix = [...prevState]
                newTableMatrix[xPos][yPos] = mapContext.tables[i]
                return newTableMatrix
            })

        }

        console.log("Cols to render: ", locations)
        console.log("Cols map context: ", mapContext)
        console.log("Cols table matrix: ", tableMatrix)
    }, [mapContext, yearData])

    // const generateTableData = (x, y) => {
    //     var res;
    //     if (tableMatrix[x][y]) {
    //         res = (
    //             <td>
    //                 {tableMatrix[x][y]}
    //             </td>
    //         )
    //     } else {
    //         res = (
    //             <td > 
    //                 <div className="table-container">
    //                     {
    //                         isAdmin() &&
    //                         <>
    //                             <div className = "blank-td" onClick={() => setCreateTableModal(generateBlankTableTemplate(x, y))}>
    //                                 <FontAwesomeIcon icon = {faPlus} />
    //                             </div>
    //                         </>
    //                     }
                        
    //                 </div>
    //             </td>
    //         )
    //     }

    //     return res
    // }


    return (
        <div className="map-container">
            <table>
                <tbody>
                {
                    [...Array(rows)].map((e, row) => (
                        <tr> 
                        {
                            [...Array(columns)].map((e, column) => (
                                <td>
                                  <Table xPos={row} yPos={column} />
                                </td>
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
