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
        routesData && 
        routesData.forEach(year => {
            if (year.year == yearData.selectedYear) {
                console.log("route found year")
                year.tables.forEach((table, i) => {
                    console.log("route adding table: ", i)
                    if (i == index) {
                        setItemState(table.data)
                        console.log("ROUTE DATA SET: ", table.data)
                    }
                })
            }
        })
     
        // routesData && 
        // routesData.forEach((year, i) => {
        //     if (year) {
        //         if(yearData.selectedYear === year.year) {
        //             year.tables.forEach((table, j) => {
        //                 if(j == index) {
        //                     setItemState(table.data)
        //                     console.log("SETTINGS STATE ROUTE ITEM: ", table.data)
        //                     return
        //                 }
        //             })
        //         }
        //     }
        // })
        console.log("ROUTE DATA: ", routesData)
        console.log("ITEM STATE ROUTE: ", itemState)

    }, [routesData,yearData])

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
                                    <FontAwesomeIcon icon = {faTrash} />
                                </div>
                            </div>
                        </div>        
        </>
        :
        <></>
    )
}
