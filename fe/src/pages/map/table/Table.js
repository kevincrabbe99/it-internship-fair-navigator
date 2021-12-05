import React, { useContext, useState, useEffect } from 'react'
import "./table.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faRoute, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../../contexts/userContext'
import { isAdmin } from '../../../contexts/userContext'
import { generateBlankTableTemplate } from '../../../util/Shared'
import { CreateTableModalContext } from '../../../contexts/createTableModalContext'
import { MapContext } from '../../../contexts/mapContext'
import { YearContext } from '../../../contexts/yearContext'
import { TableMatrixContext } from '../../../contexts/tableMatrixContext'
import { removeTableEndpoint } from '../../../util/Endpoints'
import { RoutesDataContext } from '../../../contexts/routesDataContext'
import { RoutesShowingContext } from '../../../contexts/routesShowingContext'

export default function Table({xPos, yPos}) {


    const { user } = useContext(UserContext)
    const { setCreateTableModal } = useContext(CreateTableModalContext)
    const { mapContext, setMapContext} = useContext(MapContext)
    const { yearData, setYearData } = useContext(YearContext)
    const [data, setTable] = useState(generateBlankTableTemplate(xPos, yPos))
    const [isFavorite, setFavorite] = useState(false)
    const {tableMatrix, setTableMatrix} = useContext(TableMatrixContext)
    const { routesData, setRoutesData } = useContext(RoutesDataContext)
    const { routesShowingContext, setRoutesShowingContext } = useContext(RoutesShowingContext)
    const [isRoute, setIsRoute] = useState(false)


    useEffect(() => {
        
        setIsRoute(false)

        data &&
        routesData &&
        routesData.forEach(route => {

            if (route.year == yearData.selected) {
                route.tables.forEach(table => {
                    if (table.id == data._id) { 
                        setIsRoute(true)
                    }
                }) 
            }
        })

    }, [routesData, data])

    // 
    // const getTables = await getTablesEndpoint(user.uuid);
    useEffect(() => {

        var userFavorites = JSON.parse(localStorage.getItem("favoriteTables"))
        if (!tableMatrix || !tableMatrix.length > 0) { return }



        setTable(tableMatrix[xPos][yPos])

        if (tableMatrix[xPos][yPos] &&  tableMatrix[xPos][yPos]._id) {
            if(userFavorites && userFavorites.includes(tableMatrix[xPos][yPos]._id)) {
                setFavorite(true)
            }
        }



        console.log("DATA IS: ", data)

    }, [mapContext,yearData, tableMatrix])

    const setFavoriteClick = () => {
        
        var res;

        // add data.uuid to favoriteTavles localStorage
        let favoriteTable = JSON.parse(localStorage.getItem("favoriteTables"))
        if (favoriteTable && data._id) {
            if (favoriteTable.includes(data._id)) {
                favoriteTable = favoriteTable.filter(id => id !== data._id)
                // setFavorite(false)
                res = false
            } else {
                favoriteTable.push(data._id)
                // setFavorite(true)
                res = true
            }
        } else {
            favoriteTable = [[data._id]]
            res = true
            // setFavorite(true)
            localStorage.setItem("favoriteTables", JSON.stringify(favoriteTable))
        }
        
        // remove .favorite from tableMatrix
        setFavorite(res)

        localStorage.setItem("favoriteTables", JSON.stringify(favoriteTable))

    }

    const addToRouteClick = () => {
        if (!data || !data._id) { return }

        let routes = JSON.parse(localStorage.getItem("route"))
       
        if (!routes) {
            routes = []
        }

        var exists = false
        routes.forEach(route => {
            if (route.year == yearData.selected) {
                exists = true
                return 
            }
        })

        if (!exists) {
           
            routes = [...routes, {year: yearData.selected, tables: [{id: data._id, data: data}]}]
            console.log("ADDED ROUTE ROUTES: ", routes)

        } else {

             // check if data._id exists in routes
             var existsDeep = false
             var yearPos
             routes.forEach((route, yearI) => {
                if (route.year == yearData.selected) {
                    route.tables.forEach(table => {
                        if(table.id === data._id) {
                            existsDeep = true
                            yearPos = yearI
                            return
                        }
                    })
                }
            })


            if (!existsDeep) { // add 
                routes.forEach(route => {
                    if (route.year == yearData.selected) {
                        route.tables.push({id: data._id, data: data})
                    }
                })
            } else {
                // remove data._id from routes.selectedYear.tables

                // filter routes where routes.selectedYear.tables.id === data._id
                routes = routes.filter(route => {
                    if (route.year == yearData.selected) {
                        route.tables = route.tables.filter(table => table.id !== data._id)
                    }
                    return route
                })

                // routes = routes[yearPos].tables.filter(table => table != data._id)
                console.log("REMOVED ROUTE ROUTES: ", routes)
            }


            
        }

        localStorage.setItem("route", JSON.stringify(routes))

        setRoutesData(routes)
        setRoutesShowingContext({showing: true})
        
    }

    return  (
        data && data.company && data.company.name != "" ? 
            <div className="table-container border">
                <div className="image-container">
                    <img src={data.imageUrl} alt=""/>
                </div>
                <div className="container tableInfoRow">
                    <div className="row companyName">
                        {data.company.name}
                    </div>
                    <div className="row">
                        <div className="col-auto repsC_key">
                            # of Reps:
                        </div>
                        <div className="col-auto repsC_val">
                            {data.company.number_of_reps}
                        </div>
                    </div>
                    <div className="row websiteLink">
                        {data.company.website}
                    </div>
                    <div className="row otherInfo">
                        {data.company.other_info}
                    </div>
                </div>    
                <div className="table-footer">
                    <div className="footer-container">
                        <div className="row">
                            { isAdmin() ? // regular view
                                <>       
                                    <div className="col-md-6" onClick={() => setCreateTableModal(data)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </div>
                                    <div className="col-md-6" onClick={() => removeTableEndpoint(user.uuid, data._id, yearData.selected)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                    </div>
                                </>
                            : // admin view
                                <>
                                    <div className="col-md-6" onClick={setFavoriteClick}>
                                        <FontAwesomeIcon icon={faStar} className={ isFavorite ? 'fav' : ''} />
                                    </div>
                                    <div className="col-md-6" onClick = {addToRouteClick}>
                                        <FontAwesomeIcon icon={faRoute} className={ isRoute ? 'isRoute' : ''} />
                                    </div>
                                </>
                            }       
                        </div>
                    </div>
                </div>
            </div>
        :
            <div className="table-container">
                {
                isAdmin() &&
                        <>
                            <div className = "blank-td" onClick={() => setCreateTableModal(generateBlankTableTemplate(xPos, yPos))}>
                            <FontAwesomeIcon icon = {faPlus} />
                            </div>
                        </>
                }

            </div>

    )

}
