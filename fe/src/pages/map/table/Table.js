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

export default function Table({xPos, yPos}) {


    const { user } = useContext(UserContext)
    const { setCreateTableModal } = useContext(CreateTableModalContext)
    const { mapContext, setMapContext} = useContext(MapContext)
    const { yearData, setYearData } = useContext(YearContext)
    const [data, setTable] = useState(generateBlankTableTemplate(xPos, yPos))
    const [isFavorite, setFavorite] = useState(false)
    const {tableMatrix, setTableMatrix} = useContext(TableMatrixContext)

    // useEffect(() => {
    //     if (!data._id) { return }

    //     // get favorite table from localStorate
    //     let favoriteTable = JSON.parse(localStorage.getItem("favoriteTables"))

    //     if (favoriteTable) {
    //         favoriteTable.forEach(favId => {
    //             if (favId === data._id) {
    //                 setFavorite(true)
    //                 return
    //             }
    //         })
    //     }


    // }, [data])

    // 
    // const getTables = await getTablesEndpoint(user.uuid);
    useEffect(() => {

        [...Array(15).keys()].forEach(i => {
            [...Array(15).keys()].forEach(j => {
                if (i === xPos && j === yPos) {
                    setTable(tableMatrix[i][j])
                    return
                }
            })
        })

        console.log("DATA IS: ", data)

    }, [mapContext,yearData, tableMatrix])

    const setFavoriteClick = () => {
        
        // add data.uuid to favoriteTavles localStorage
        let favoriteTable = JSON.parse(localStorage.getItem("favoriteTables"))
        if (favoriteTable && data._id) {
            if (favoriteTable.includes(data._id)) {
                favoriteTable = favoriteTable.filter(id => id !== data._id)
                setFavorite(false)
            } else {
                favoriteTable.push(data._id)
                setFavorite(true)
            }
        } else {
            favoriteTable = [[data._id]]
            setFavorite(true)
            // localStorage.setItem("favoriteTables", JSON.stringify(favoriteTable))
        }

        localStorage.setItem("favoriteTables", JSON.stringify(favoriteTable))

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
                                        <FontAwesomeIcon icon={faStar} className={data && data.favorite || isFavorite ? 'fav' : ''} />
                                    </div>
                                    <div className="col-md-6">
                                        <FontAwesomeIcon icon={faRoute} />
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
