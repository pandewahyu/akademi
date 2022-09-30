import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "../style/style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DataTable from "react-data-table-component";
import axios from "axios";
import LayoutDashboard from "../layout/layout";


//style
const customStyles = {
    rows: {
        style: {
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "150%",
            textTransform: "capitalize"
        },
        input: {
            style: {
                filter: 'invert(10%) hue-rotate(10deg) brightness(1) !important'
            }
        }
    },
    tables: {
        border: "3px !important"
    },

    headCells: {
        style: {
            backgroundColor: "#FFF !important",
            color: "black !important",
            borderTopStyle: 'outset',
            borderTopWidth: '1px',
            textAlign: 'center !important',
            textTransform: 'capitalize'
        },
    },

};

// paginasi
const paginationComponentOptions = {
    rowsPerPageText: 'Rows for Page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'ALL',
};

//Crud, select, search
export const Mstudent = () => {
    //menampilkan kolom dan isi tabel.
    const columns = [
        {
            name: "Name",
            sortable: true,
            selector: row => row.name_student,
            center: true,
        },
        {
            name: "phone number",
            selector: row => row.phone,
            sortable: true,
            center: true,
        },
        {
            name: "Age",
            selector: row => row.age,
            sortable: true,
            center: true,
        },
        {
            name: "adress",
            selector: row => row.address,
            sortable: true,
            center: true,
        },
        {
            name: "Gender",
            selector: row => row.gender,
            sortable: true,
            center: true,
            style: {
                color: 'white',
            },
        },
        {
            name: "Action",
            center: true,
            cell: row => (
                <div>
                    <Row>
                        <Col>
                            <FontAwesomeIcon size="lg" icon={faEdit} onClick={() => handleEdit(row.id)} />
                        </Col>
                    </Row>
                </div>
            )
        }
    ];

    // //select row
    // const [selectedRows, setSelectedRows] = React.useState([]);
    // const handleRowSelected = React.useCallback(state => {
    //     setSelectedRows(state.selectedRows);
    // }, []);

    const [data, setData] = useState([]);
    //filtering
    const [filterText, setFilterText] = React.useState('');
    const filteredItems = data.filter(
        item => item && item.name_student.toLowerCase().includes(filterText.toLowerCase())
    );

    //filter id by user
    const [user_id, setUserid] = useState('');
    const [user, setUser] = useState([]);
    const [employee, setEmployee] = useState([]);
    const filterID = [...new Set(user.map(item => item.id))];
    //menampilkan employee
    useEffect(() => {
        getStudents();
        getUser();
        getEmployee();
    }, [])

    const getEmployee = async () => {
        axios.get("http://localhost:3000/employee", { withCredentials: 'true' })
            .then((response) => {
                setEmployee(response.data);
                console.log(data);
            })
    };
    const getStudents = async () => {
        axios.get("http://localhost:3000/students", { withCredentials: 'true' })
            .then((response) => {
                setData(response.data);
                console.log(data);
            })
    };
    const getUser = async () => {
        axios.get("http://localhost:3000/users-student", { withCredentials: 'true' })
            .then((response) => {
                setUser(response.data);
            });
    };
    const filteredID = user.filter(
        item => item && item.id == user_id,
    );
    const employeeMap = employee.map((item) => item.user_id)
    const studentMap = data.map((item) => item.user_id)
    const userNew = user.filter(({ id }) => !employeeMap.includes(id) && !studentMap.includes(id))
    //add employee
    const [id, setId] = useState("");
    const [name_student, setNamestudent] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");


    //menambah employee

    //modal add
    const [buka, setBuka] = useState(false);
    const addEmployee = async (id) => {
        filteredID.map((item) => (
            axios.post("http://localhost:3000/students", {
                user_id: user_id,
                name_student: item.full_name,
                phone: item.phone,
                address: address,
                gender: gender,
                age: age,
            }, { withCredentials: 'true' })
                .then(() => {
                    console.log('mau');
                })
        ))
    };
    console.log(filteredID)

    //modal edit
    const [tampil, setTampil] = useState(false);
    const handleTtp = () => {
        delstate();
        setTampil(false);}
    const handleEdit = (id) => {
        axios.get("http://localhost:3000/students/" + id)
            .then((response) => {
                setId(response.data.id);
                setUserid(response.data.user_id);
                setNamestudent(response.data.name_student);
                setAddress(response.data.address);
                setPhone(response.data.phone);
                setGender(response.data.gender);
                setAge(response.data.age);
                setTampil(true);
            });
    };
    const updateProduct = async (id) => {
        axios.patch("http://localhost:3000/students/" + id, {
            id: id,
            user_id: user_id,
            name_student: name_student,
            phone: phone,
            address: address,
            gender: gender,
            age: age,
        })
            .then(
                () => {
                    axios.patch("http://localhost:3000/users-edit/" + user_id, {
                        full_name: name_student,
                        phone: phone,
                    }, { withCredentials: true })
                }
            ).catch(
                (eror) => {
                    console.log('gaamau');
                    console.log(eror);
                }
            )
    }
    const handleTutup = () => {
        setBuka(false);
        delstate();
    }
    const delstate = () =>{
        setId('');
        setUserid('');
        setNamestudent('');
        setAddress('');
        setPhone('');
        setGender('');
    }
    const handleBuka = () => setBuka(true);
    //modal jadwal

    return (
        <>
           
                <div className="back mt-3">
                    <div className="content d-flex mb-4 ">

                        <h3 className="TextU pt-1">Student List</h3>
                        <Button className="shadow" style={{ marginRight: "30px", backgroundColor: '#233EAE', height: "37px", width: "135px", borderRadius: "50px" }}
                            onClick={handleBuka}> ADD NEW   +</Button>
                        <input className="text-center shadow"
                            style={{ color: "white", background: "#233EAE", borderRadius: "50px", marginBottom: "20px", height: "37px", width: "135px" }}
                            id="search"
                            type="text"
                            placeholder=" 
                        Search ..."
                            aria-label="Search Input"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}

                        />

                        <Modal //modal add
                            show={buka}
                            onHide={handleTutup}
                            backdrop="static"
                            size="lg"
                            keyboard={false}
                            centered
                        >
                            <Modal.Header closeButton>
                                <Row>
                                    <Col xs={9}>
                                        <Modal.Title>Add User Student</Modal.Title>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Select aria-label="Default select example" style={{ width: '110px' }} required onChange={(e) => setUserid(e.target.value)}>
                                            <option value="">User ID</option>
                                            {userNew.map((item) => (
                                                <option value={item.id}>{item.id} - {item.full_name}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Row>

                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={addEmployee}>
                                    {
                                        filteredID.map((item) => (
                                            <>
                                                <Row>
                                                    <Col>
                                                        <Form.Group className="mb-3" controlId="formBasicName">
                                                            <Form.Label>Name</Form.Label>
                                                            <Form.Control type="text" disabled placeholder="Full Name" required value={item.full_name} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group className="mb-3" controlId="formBasicAddress">
                                                            <Form.Label>Address</Form.Label>
                                                            <Form.Control type="text" placeholder="address" required onChange={(e) => setAddress(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>-
                                                    <Col>
                                                        <Form.Label>Gender</Form.Label>
                                                        <Form.Select aria-label="Default select example" required onChange={(e) => setGender(e.target.value)}>
                                                            <option value="">Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </Form.Select>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group className="mb-3" controlId="formBasicPhone">
                                                            <Form.Label>Phone Number</Form.Label>
                                                            <Form.Control type="text" disabled placeholder="Phone Number" required value={item.phone} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Group className="mb-3" controlId="formBasicDepartment">
                                                            <Form.Label>Age</Form.Label>
                                                            <Form.Control type="number" placeholder="Age" required onChange={(e) => setAge(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>

                                                    </Col>
                                                </Row>
                                                <Row className="mx-auto d-flex justify-content-between">
                                                    <Button variant="danger" onClick={() => handleTutup()} className="w-45">
                                                        Cancel
                                                    </Button>
                                                    <Button variant="success" type="submit" className="w-45" >
                                                        Save
                                                    </Button>
                                                </Row>
                                            </>
                                        ))
                                    }
                                </Form>
                            </Modal.Body>
                        </Modal>

                        <Modal //modal edit
                            show={tampil}
                            onHide={handleTtp}
                            backdrop="static"
                            size="lg"
                            keyboard={false}
                            centered
                        >
                            <Modal.Header >
                                <Modal.Title>Edit User Student</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={() => updateProduct(id)}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" placeholder="Full Name" required value={name_student}
                                                    onChange={(e) => setNamestudent(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control type="text" placeholder="Address"
                                                    onChange={(e) => setAddress(e.target.value)} required value={address} />
                                            </Form.Group>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Select aria-label="Default select example" required onChange={(e) => setGender(e.target.value)}>
                                                <option value={gender}>{gender}</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </Form.Select>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control type="number" placeholder="Phone Number" required onChange={(e) => setPhone(e.target.value)} value={phone} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Azge</Form.Label>
                                                <Form.Control type="text" placeholder="Department" required onChange={(e) => setAge(e.target.value)} value={age} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                        </Col>
                                    </Row>
                                    <Row className="mx-auto d-flex justify-content-between">
                                        <Button variant="danger" onClick={() => handleTtp()} className="w-45">
                                            Cancel
                                        </Button>
                                        <Button variant="success" type="submit" className="w-45" >
                                            Save
                                        </Button>
                                    </Row>
                                </Form>
                            </Modal.Body>
                        </Modal>

                    </div>
                    <div className="shadow">
                        <DataTable
                            className="table-staff"
                            title="User"
                            columns={columns}
                            data={filteredItems}
                            pagination
                            paginationComponentOptions={paginationComponentOptions}
                            fixedHeader
                            highlightOnHover
                            pointerOnHover
                            responsive
                            noHeader
                            fixedHeaderScrollHeight="760px"
                            customStyles={customStyles}
                            keyField='id'
                            key={'id'}
                        />
                    </div>
                </div >
            
        </>
    );
};

export default Mstudent;