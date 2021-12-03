import React, { useContext, useState, useEffect } from 'react'
import './addYearModal.scss'
import { Modal, Button } from 'react-bootstrap'
import { ModalContext } from '../../../contexts/modalContext'
import { YearContext } from '../../../contexts/yearContext'
import { addNewYear } from '../../../util/Endpoints'
import { structureYearState } from '../../../contexts/yearContext'

export default function AddYearModal(setNewYearValue, setModalContext, setSubmitAddYear, newYearValue) {



    return (
        <div>
            <Modal.Dialog>
                <Modal.Header>
                <Modal.Title>Add a New Year</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <input type="text" placeholder="Enter Year" onChange={e => setNewYearValue(e.target.value)} />
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={() => setModalContext(null)}>CLOSE</Button>
                <Button variant="primary" onClick={() => setSubmitAddYear(newYearValue)}>ADD</Button>
                </Modal.Footer>
            </Modal.Dialog>             
        </div>
    )
}
