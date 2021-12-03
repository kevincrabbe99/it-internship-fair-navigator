import React, { useContext, useState } from 'react'
import './createTableModal.scss'
import { Modal, Button } from 'react-bootstrap'
import { ModalContext } from '../../../contexts/modalContext';


export default function CreateTableModal() {


    return (
        <div>
            <Modal.Dialog>
                <Modal.Header>
                <Modal.Title>Create a Table</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <div>
                    <form onSubmit = {''}>
                        <div id = "inputLabel">
                            <label>
                                Company Name:
                                <input type = "text" value = {name} onChange = {e => setName(e.target.value)} />
                            </label>
                        </div>
                        <br />
                        <div id = "inputLabel">
                            <label>
                                Number of Representatives:
                                <input type = "text" value = {numReps} onChange = {e => setNumReps(e.target.value)} />
                            </label>
                        </div>
                        <br />
                        <div id = "inputLabel">
                            <label>
                                Company Website:
                                <input type = "text" value = {website} onChange = {e => setWebsite(e.target.value)} />
                            </label>
                        </div>
                        <br />
                        <div id = "inputLabel">
                            <label>
                                Notes:
                                <input type = "text" value = {notes} onChange = {e => setNotes(e.target.value)} />
                            </label>
                        </div>
                        <br />
                        <div id = "inputLabel">
                            <label>
                                Company Logo:
                                <input type = "file" />
                            </label>
                        </div>
                        <br />
                    </form>
                </div>
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={() => setModalContext(null)}>CLOSE</Button>
                <Button variant="primary" onClick = {submit()}>CREATE</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}
