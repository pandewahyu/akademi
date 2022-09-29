import axios from 'axios';
import { isEmptyObject } from 'jquery';
import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';

const UpdateModal = ({
    isOpen,
    onClose,
    onEventUpdated,
    deleteButtonOnclick,
    onDay,
    onDate,
    employee,
    products,
    eventId,
    tanggal,
}) => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndtime] = useState(null);

    // Select Product
    const [productId, setProductId] = useState('');
    const productChange = (event) => {
        setProductId(event.target.value.toString());
    };
    // Select Employee
    const [employeeId, setEmployeeId] = useState('');
    const employeeChange = (event) => {
        setEmployeeId(event.target.value.toString());
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let productStr = products.filter((p) => p.id == productId);
        let employeeStr = employee.filter((e) => e.id == employeeId);
        let title = `${employeeStr[0].name_employee.toString()} - ${productStr[0].name.toString()}`;
        let startDate = onDate + 'T' + startTime;
        let endDate = onDate + 'T' + endTime;

        onEventUpdated(eventId, {
            title,
            start: startDate,
            end: endDate,
        });
        updateEvent(eventId);
        onClose();
    };

    // Update Schedule
    const updateEvent = async (id) => {
        await axios.patch(
            'http://localhost:3000/class-schedules/' + id,
            {
                employee_id: employeeId,
                product_id: productId,
                date: onDate,
                start_time: startTime,
                end_time: endTime,
            },
            {
                withCredentials: true,
            }
        );
    };

    useEffect(() => {
        if (!isEmptyObject(eventId)) {
            getSchedule(eventId);
        }
    }, [eventId]);

    // Get Schedule By Id
    const getSchedule = async (id) => {
        await axios
            .get('http://localhost:3000/class-schedules/' + eventId, {
                withCredentials: true,
            })
            .then((res) => {
                setStartTime(res.data.start_time);
                setEndtime(res.data.end_time);
                setProductId(res.data.product_id);
                setEmployeeId(res.data.employee_id);
            });
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <span>
                    {` ${onDay}, ${tanggal[0]} ${tanggal[1]} ${tanggal[2]} `}
                </span>
            </Modal.Header>
            <Modal.Body>
            <h3> Update schedule</h3>
                <Form onSubmit={onSubmit}>
                    <section>
                        <Form.Group className='mb-3'>
                            <Form.Label>Day</Form.Label>
                            <Form.Control type='text' value={onDay} disabled />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                // required
                                type='time'
                                value={startTime}
                                onChange={(st) => setStartTime(st.target.value)}
                            />
                        </Form.Group>
                        <div className='mb-3'>
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                // required
                                type='time'
                                value={endTime}
                                onChange={(et) => setEndtime(et.target.value)}
                            />
                        </div>
                        <Form.Group className='mb-3'>
                            <Form.Label>Product</Form.Label>
                            <Form.Select
                                // required
                                value={productId}
                                onChange={productChange}
                            >
                                <option value=''>Pilih Product</option>
                                {products.map((p) => {
                                    return (
                                        <option key={p.id} value={p.id}>
                                            {p.name}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Employee</Form.Label>
                            <Form.Select
                                // required
                                value={employeeId}
                                onChange={employeeChange}
                            >
                                <option value=''>Pilih Employee</option>
                                {employee.map((e) => {
                                    return (
                                        <option key={e.id} value={e.id}>
                                            {e.name_employee}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>
                    </section>
                    <div className='d-flex justify-content-between'>
                        <button type='submit' className='btn btn-warning mt-3'>
                            Update Event
                        </button>
                        <button
                            type='button'
                            onClick={() => deleteButtonOnclick()}
                            className='btn btn-danger mt-3'
                        >
                            Delete Event
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateModal;
