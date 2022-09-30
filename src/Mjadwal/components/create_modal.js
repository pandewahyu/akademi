import axios from 'axios';
import React, { useState } from 'react';
import "../components/style.css"
// Bootstrap
import { Modal, Form } from 'react-bootstrap';

const CreateModal = ({
    isOpen,
    onClose,
    onEventAdded,
    onDate,
    onDay,
    employee,
    products,
    tanggal,
}) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndtime] = useState('');

    // Select Employee
    const [productId, setProductId] = useState('');
    const productChange = (event) => {
        setProductId(event.target.value.toString());
    };
    // Select Employee
    const [employeeId, setEmployeeId] = useState('');
    const employeeChange = (event) => {
        setEmployeeId(event.target.value.toString());
    };

    // Save To Database
    const saveSchedule = async () => {
        await axios
            .post(
                'http://localhost:3000/class-schedules',
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
            )
            .then((res) => {
                let productStr = products.filter((p) => p.id == productId);
                let employeeStr = employee.filter((e) => e.id == employeeId);
                let title = `${employeeStr[0].name_employee.toString()} - ${productStr[0].name.toString()}`;
                const startDate = onDate + 'T' + startTime;
                const endDate = onDate + 'T' + endTime;
                onEventAdded({
                    backgroundColor: 'green',
                    borderColor: 'green',
                    id: res.data.data.id,
                    title,
                    start: startDate,
                    end: endDate,
                });
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        saveSchedule();
        setStartTime(null);
        setEndtime(null);
        setProductId('');
        setEmployeeId('');
        onClose();
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header
                closeButton
            >{`${onDay}, ${tanggal[0]} ${tanggal[1]} ${tanggal[2]} `}</Modal.Header>
            <Modal.Body>
                <h3> Add schedule</h3>
                <Form onSubmit={onSubmit}>
                    <section>
                        <Form.Group className='mb-3'>
                            <Form.Label>Day</Form.Label>
                            <Form.Control type='text' value={onDay} disabled />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                            className='timeschedule border-1 w-100'
                         
                                required
                                type='time'
                                value={startTime}
                                onChange={(st) => {
                                    setStartTime(st.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                              className='timeschedule w-100'
                                type='time'
                                required
                                value={endTime}
                                onChange={(et) => {
                                    setEndtime(et.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Product</Form.Label>
                            <Form.Select
                                required
                                value={productId}
                                label='Product'
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
                                required
                                value={employeeId}
                                label='Employee'
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
                    <div className='text-center'>
                        <button className='btn btn-primary mt-3'>
                            Add Event
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateModal;
