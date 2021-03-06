import React, { useContext, useEffect, useState } from 'react'
import RoutesView from '../../components/Routes/RoutesView'
import "./map.scss"
import { getTablesEndpoint } from '../../util/Endpoints'

import Table from './table/Table'

import { test } from '../../util/Endpoints'
import { RoutesShowingContext } from '../../contexts/routesShowingContext'
import { MapContext } from '../../contexts/mapContext'
import { YearContext } from '../../contexts/yearContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { isAdmin } from '../../contexts/userContext'
import { CreateTableModalContext } from '../../contexts/createTableModalContext'
import { generateBlankTableTemplate } from '../../util/Shared'
import { TableMatrixContext } from '../../contexts/tableMatrixContext'
import { PanZoom } from 'react-easy-panzoom'


export default function Map() {

    const { routesShowingContext, setRoutesShowingContext } = useContext(RoutesShowingContext)
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
        setMapContext(res)
        // }
        
    }
    console.log("MAP CONTEXT: ", yearData)
        if (yearData && yearData.selected) {
            getTablesAsyncWrapper();
        }
    }, [yearData])

    useEffect(() => {
        if(!mapContext || !mapContext.tables || !mapContext.tables.length > 0) {return}

        // get favorite table from localStorate
        let userFavorites = JSON.parse(localStorage.getItem("favoriteTables"))

        setTableMatrix([...Array(15)].map(e => Array(15)))
        for (let i = 0; i < mapContext.tables.length; i++) {

            // insert location 
            const location = [mapContext.tables[i].x_coord, mapContext.tables[i].y_coord]
            const xPos = mapContext.tables[i].x_coord
            const yPos = mapContext.tables[i].y_coord
            
            // set fav
            if (userFavorites && userFavorites.length > 0) {
                if (userFavorites.includes(mapContext.tables[i]._id)) {
                    mapContext.tables[i].favorite = true
                }
            }

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


    return (  
       <div className="map-container">
           <PanZoom
            boundaryRatioVertical={0.01} 
            boundaryRatioHorizontal={0.9} 
            enableBoundingBox 
            maxZoom={1.25}
            minZoom={.5}>
            {
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
            }
            </PanZoom>
            
        </div>

    )

    


}
