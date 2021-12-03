import React, { useContext, useState, useEffect } from 'react'
import { ModalContext } from '../../contexts/modalContext'
import AddYearModal from './addYear/AddYearModal'
import CreateTableModal from './createTable/CreateTableModal'
import { YearContext } from '../../contexts/yearContext'
import { addNewYear } from '../../util/Endpoints'
import { structureYearState } from '../../contexts/yearContext'

export default function ModalRouter() {

    const { modalContext, setModalContext } = React.useContext(ModalContext)

    const { user } = useContext(ModalContext)
    // const { modalContext, setModalContext } = useContext(ModalContext)
    const { yearData, setYearData } = useContext(YearContext)

    // const [availableYears, setAvailableYears] = useState([]);
    const [newYearValue, setNewYearValue] = useState(null);
    // const [selectedYear, setSelectedYear] = useState(null);
    const [submitAddYear, setSubmitAddYear] = useState(null);

    useEffect(() => { 
        async function submitNewYearAsyncWrapper() {
            const res = await addNewYear(user.uuid, newYearValue);
            console.log("ARRAY WITH ALL VALID YEARS: ", res);

            if (res != 'Map already exists for this year' && res.includes(newYearValue)) {
            // structure yearData
            const yearState = structureYearState(newYearValue, res)
            console.log("YEAR STATE: ", yearState)
            setYearData(yearState)
            // setAvailableYears(res)
            setModalContext(null)
            } else {
            if (yearData && yearData.available.includes(newYearValue)) {
                const yearState = structureYearState(newYearValue, yearData.available)
                setYearData(yearState)
                setModalContext(null)
                console.log("setting to already existing year: ", yearState)
            }
            }

        }

        if (submitAddYear !== null) {
            submitNewYearAsyncWrapper();
        }
    }, [submitAddYear])



    



    const [tableId, setTableId] = useState(null);
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [name, setName] = useState(null);
    const [numReps, setNumReps] = useState(null);
    const [website, setWebsite] = useState(null);
    const [notes, setNotes] = useState(null);
    const [year, setYear] = useState(null);
    
    const submit = () => {
        const url = "api.itfnavigator.com/api/navigator/" + 
            "{_id: " + tableId + ", _x_coord: " + x + ", _y_coord: " + y + ", _company: {_name: " + name + ", _number_of_reps: " + numReps + ",_website: " + website + ", _other_info: " + notes + "}, _year: " + year + "}";
        const response = fetch(url);
        return response;
    }




    const hideModal = () => {
        setModalContext(null)
    }

    return (
        <div>
        
        {
            modalContext !== null &&
            <div className="modal-bg" onClick={(hideModal())}>
            </div> 
        }

        {
            modalContext === 'CREATE_TABLE' &&
                CreateTableModal()
        }
        {
            modalContext === 'ADD_YEAR' &&
                AddYearModal(setNewYearValue, setModalContext, setSubmitAddYear, newYearValue)
        }
                                    
        </div>
    )
}
