import { faLink, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { RoutesDataContext } from '../../../contexts/routesDataContext'
import { YearContext } from '../../../contexts/yearContext'
import './routeItem.scss'

export default function RouteItem({index}) {

    const { routesData, setRoutesData } = useContext(RoutesDataContext)
    const {yearData, setYearData} = useContext(YearContext)

    const [ itemState, setItemState ] = useState(null)

    // set item data from routesData
    useEffect(() => {


        // set itemState to routesData.selectedYear.tables where table[i].id === index
        setItemState(null)
   
        routesData.forEach(year => {

            if (year.year == yearData.selected) {
                year.tables.forEach((table, i) => {
                    if (i == index) {
                        setItemState(table.data)
                        return
                    }
                })
            }

        })

        console.log("ROUTE DATA: ", routesData)
        console.log("ITEM STATE ROUTE: ", itemState)
        console.log("ROUTES YEAR CONTEXT: ", yearData)

    }, [routesData,yearData])

    const removeRouteClick = async () => {

        // setItemState(null)

        let routes = JSON.parse(localStorage.getItem("route"))

         // filter routes where routes.selectedYear.tables.id === data._id
         routes = routes.filter(route => {
            if (route.year == yearData.selected) {
                route.tables = route.tables.filter(table => table.id !== itemState._id)
            }
            return route
        })

        // await setTimeout(2000)
        localStorage.setItem("route", JSON.stringify(routes))

        setRoutesData(routes)

    }

    return (
        itemState ? 
        <>

                    
                        <div className="routes_list_item">
                            <div className="row">
                                <div class="col-auto r-number">
                                    <span>{index + 1}</span>
                                </div>
                                <div class="col-auto r-icon">
                                    <img src={itemState.imageUrl}></img>
                                </div>
                                <div class="col-auto r-name">
                                    {itemState.company.name}
                                </div>
                                <div class="col-auto r-icon-opt r-link">
                                    <Link to={{ pathname: itemState.company.website}} target="_blank">
                                        <FontAwesomeIcon icon = {faLink} />
                                    </Link>
                                </div> 
                                <div class="col-auto r-icon-opt r-trash">
                                    <FontAwesomeIcon icon = {faTrash} onClick = {removeRouteClick}/>
                                </div>
                            </div>
                        </div>        
        </>
        :
        <></>
    )
}
