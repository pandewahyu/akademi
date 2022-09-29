import React from 'react';
import axios from 'axios';

import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ isOpen, onClose, eventId, onEventDeleted }) => {
    const deleteSchedule = async (id) => {
        await axios.delete('http://localhost:3000/class-schedules/' + id, {
            withCredentials: true,
        });
    };

    const handleDelete = () => {
        onEventDeleted(eventId);
        deleteSchedule(eventId);
        onClose(false);
    };

    const handleCancel = () => {
        onClose(true);
    };

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
            backdrop='static'
            keyboard={false}
            centered
            className='bg-dark'
        >
            <Modal.Body>
                <div className='d-flex justify-content-center align-items-center p-4'>
                    <h5>Anda yakin akan menghapus jadwal?</h5>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={handleDelete}>
                    Delete
                </Button>
                <Button variant='primary' onClick={handleCancel}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
