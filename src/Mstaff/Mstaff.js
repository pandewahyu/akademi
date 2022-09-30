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
        },
        input: {
            style: {
                filter: 'invert(10%) hue-rotate(10deg) brightness(1) !important'
            }
        }
    },

    headCells: {
        style: {
            backgroundColor: "#FFF !important",
            color: "black !important",
            borderTopStyle: 'outset',
            borderTopWidth: '1px',
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
export const Mstaff = () => {
    //get 
    //filter id by user
    const [user_id, setUserid] = useState('');
    const [user, setUser] = useState([]);
    const [student, setStudent] = useState([]);
    const [dataDe, setDatade] = useState([]);
    const filterID = [...new Set(user.map(item => item.id))];

    //menampilkan kolom dan isi tabel.
    const columns = [
        {
            name: "Name",
            sortable: true,
            selector: row => row.name_employee,
            center: true,
        },
        {
            name: "Phone Number",
            selector: row => row.phone,
            sortable: true,
            center: true,
        },
        {
            name: "Department",
            selector:  row => row.department.name,
            sortable: true,
            center: true,

            style: {
                borderRadius: '25px',
                margin: '7px 5px 7px 5px',
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
                        <Col>
                            <FontAwesomeIcon size="lg" icon={faCalendarAlt} onClick={() => handleShow(row.id)} />

                        </Col>
                    </Row>
                </div>
            )
        }
    ];

    //select row
    const [selectedRows, setSelectedRows] = React.useState([]);
    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    //filtering
    const [filterText, setFilterText] = React.useState('');
    const filteredItems = data.filter(
        item => item.name_employee.toLowerCase().includes(filterText.toLowerCase())
    );

    //menampilkan employee
    useEffect(() => {
        getEmployee();
        getUser();
        getDepartment();
        getStudents();
    }, []);
    const getDepartment = async () => {
        axios.get("http://localhost:3000/department", { withCredentials: 'true' })
            .then((response) => {
                setDatade(response.data);
            });
    };
    const getStudents = async () => {
        axios.get("http://localhost:3000/students", { withCredentials: 'true' })
            .then((response) => {
                setStudent(response.data);
            })
    };

    const getEmployee = async () => {
        axios.get("http://localhost:3000/employee", { withCredentials: 'true' })
            .then((response) => {
                setData(response.data);
                console.log(data);
            })
    };
    const getUser = async () => {
        axios.get("http://localhost:3000/users-employee", { withCredentials: 'true' })
            .then((response) => {
                setUser(response.data);
            });
    };
    const filteredID = user.filter(
        item => item && item.id == user_id,
    );

    const employeeMap = data.map((item) => item.user_id)
    const studentMap = student.map((item) => item.user_id)
    const userNew = user.filter(({ id }) => !employeeMap.includes(id) && !studentMap.includes(id))

    //add employee
    const [id, setId] = useState("");
    const [name_employee, setNameEmployee] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [department, setDepartment] = useState("");
    //menambah employee

    //modal add
    const [buka, setBuka] = useState(false);
    const addEmployee = async (id) => {
        filteredID.map((item, index) => (
            axios.post("http://localhost:3000/employee", {
                user_id: user_id,
                name_employee: item.full_name,
                gender: gender,
                address: address,
                phone: item.phone,
                department_id: department,
            }, { withCredentials: 'true' })
                .then(() => {
                    delState();
                })

        ))
    };

    const delState = () => {
        setId('');
        setUserid('');
        setNameEmployee('');
        setAddress('');
        setPhone('');
        setGender('');
        setDepartment('');
        setError("");
    }

    //modal edit
    const [tampil, setTampil] = useState(false);
    const handleTtp = () => {
        delState();
        setTampil(false);
    }

    
    const handleEdit = (id) => {
        axios.get("http://localhost:3000/employee/" + id, { withCredentials: 'true' })
            .then((response) => {
                setId(response.data.id);
                setUserid(response.data.user_id);
                setNameEmployee(response.data.name_employee);
                setAddress(response.data.address);
                setPhone(response.data.phone);
                setGender(response.data.gender);
                setDepartment(response.data.department_id);
                setTampil(true);
            });
    };
    const updateProduct = async (id) => {
        axios.patch("http://localhost:3000/employee/" + id, {
            name_employee: name_employee,
            address: address,
            gender: gender,
            phone: phone,
            department_id: department,
        }, { withCredentials: true })
            .then(
                () => {
                    axios.patch("http://localhost:3000/users-edit/" + user_id, {
                        full_name: name_employee,
                        phone: phone,
                    }, { withCredentials: true })
                }
            ).catch((error) => {
                setError(error.response.data.msg);
            })
    }
    const handleTutup = () => {
        setBuka(false);
        delState('')
    }

    
    //open modal add
    const handleBuka = () => setBuka(true);
    const [senin, setSenin] = React.useState("");
    const [aSenin, setaSenin] = React.useState('');
    const [selasa, setSelasa] = React.useState('');
    const [aselasa, setaSelasa] = React.useState('');
    const [rabu, setRabu] = React.useState('');
    const [arabu, setaRabu] = React.useState('');
    const [kamis, setKamis] = React.useState('');
    const [akamis, setaKamis] = React.useState('');
    const [jumat, setJumat] = React.useState('');
    const [ajumat, setaJumat] = React.useState('');
    const [sabtu, setSabtu] = React.useState('');
    const [asabtu, setaSabtu] = React.useState('');
    const [minggu, setMinggu] = React.useState('');
    const [aminggu, setaMinggu] = React.useState('');
    const [isSenin, setIssenin] = React.useState('');
    const [endSenin, setEndsenin] = React.useState('');
    const [isSelasa, setIsselasa] = React.useState('');
    const [endSelasa, setEndselasa] = React.useState('');
    const [isRabu, setIsrabu] = React.useState('');
    const [endRabu, setEndrabu] = React.useState('');
    const [isKamis, setIskamis] = React.useState('');
    const [endKamis, setEndkamis] = React.useState('');
    const [isJumat, setIsjumat] = React.useState('');
    const [endJumat, setEndjumat] = React.useState('');
    const [isSabtu, setIssabtu] = React.useState('');
    const [endSabtu, setEndsabtu] = React.useState('');
    const [isMinggu, setIsminggu] = React.useState('');
    const [endMinggu, setEndminggu] = React.useState('');
    const [idSenin, setIdsenin] = React.useState('');
    const [idSelasa, setIdselasa] = React.useState('');
    const [idRabu, setIdRabu] = React.useState('');
    const [idKamis, setIdkamis] = React.useState('');
    const [idJumat, setIdjumat] = React.useState('');
    const [idSabtu, setIdsabtu] = React.useState('');
    const [idMinggu, setIdminggu] = React.useState('');
    const [emplyeId, setAddId] = React.useState('');



    const editSenin = () => {
        axios.patch("http://localhost:3000/employee-schedules/" + idSenin, {
            id: idSenin,
            start_time: senin,
            end_time: aSenin,
            start_break: isSenin,
            end_break: endSenin
        }, { withCredentials: true })
            .then(
                () => {
                    console.log('mau');
                }
            ).catch(
                (eror) => {
                    console.log('gaamau');
                    console.log(eror);
                }
            )
    }
    const editSelasa = () => {
        axios.patch("http://localhost:3000/employee-schedules/" + idSelasa, {
            id: idSelasa,
            start_time: selasa,
            end_time: aselasa,
            start_break: isSelasa,
            end_break: endSelasa
        }, { withCredentials: true })
            .then(
                () => {
                    console.log('mau');
                }
            ).catch(
                (eror) => {
                    console.log('gaamau');
                    console.log(eror);
                }
            )
    }
    const editRabu = () => {
        axios.patch("http://localhost:3000/employee-schedules/" + idRabu, {
            id: idRabu,
            start_time: rabu,
            end_time: arabu,
            start_break: isRabu,
            end_break: endRabu
        }, { withCredentials: true })
            .then(
                () => {
                    console.log('mau');
                }
            ).catch(
                (eror) => {
                    console.log('gaamau');
                    console.log(eror);
                }
            )
    }
    
    const editKamis = () => {
        axios.patch("http://localhost:3000/employee-schedules/" + idKamis, {
            id: idKamis,
            start_time: kamis,
            end_time: akamis,
            start_break: isKamis,
            end_break: endKamis
        }, { withCredentials: true })
            .then(
                () => {
                    console.log('mau');
                }
            ).catch(
                (eror) => {
                    console.log('gaamau');
                    console.log(eror);
                }
            )
    }
    const editJumat = () => {
        axios.patch("http://localhost:3000/employee-schedules/" + idJumat, {
            id: idJumat,
            start_time: jumat,
            end_time: ajumat,
            start_break: isJumat,
            end_break: endJumat
        }, { withCredentials: true })
            .then(
                () => {
                    console.log('mau');
                }
            ).catch(
                (eror) => {
                    console.log('gaamau');
                    console.log(eror);
                }
            )
    }
    const editSabtu = () => {
        axios.patch("http://localhost:3000/employee-schedules/" + idSabtu, {
            id: idSabtu,
            start_time: sabtu,
            end_time: asabtu,
            start_break: isSabtu,
            end_break: endSabtu
        }, { withCredentials: true })
            .then(
                () => {
                    console.log('mau');
                }
            ).catch(
                (eror) => {
                    console.log('gaamau');
                    console.log(eror);
                }
            )
    }
    const editMinggu = () => {
        axios.patch("http://localhost:3000/employee-schedules/" + idMinggu, {
            id: idMinggu,
            start_time: minggu,
            end_time: aminggu,
            start_break: isMinggu,
            end_break: endMinggu
        }, { withCredentials: true })
            .then(
                () => {
                    console.log('mau');
                }
            ).catch(
                (eror) => {
                    console.log('gaamau');
                    console.log(eror);
                }
            )
    }
    const editJadwal = () => {
        editSenin();
        editSelasa();
        editRabu();
        editKamis();
        editJumat();
        editSabtu();
        editMinggu();
    }
    const addSenin = (id) => {
        axios.post("http://localhost:3000/employee-schedules", {
            employee_id: emplyeId,
            day: 'Senin',
            start_time: senin,
            end_time: aSenin,
            start_break: isSenin,
            end_break: endSenin
        }, { withCredentials: 'true' })
            .then(() => {
                axios.post("http://localhost:3000/employee-schedules", {
                    employee_id: emplyeId,
                    day: 'Selasa',
                    start_time: selasa,
                    end_time: aselasa,
                    start_break: isSelasa,
                    end_break: endSelasa
                }, { withCredentials: 'true' })
                    .then(() => {
                        axios.post("http://localhost:3000/employee-schedules", {
                            employee_id: emplyeId,
                            day: 'Rabu',
                            start_time: rabu,
                            end_time: arabu,
                            start_break: isRabu,
                            end_break: endRabu
                        }, { withCredentials: 'true' })
                            .then(() => {
                                axios.post("http://localhost:3000/employee-schedules", {
                                    employee_id: emplyeId,
                                    day: 'Kamis',
                                    start_time: kamis,
                                    end_time: akamis,
                                    start_break: isKamis,
                                    end_break: endKamis
                                }, { withCredentials: 'true' })
                                    .then(() => {
                                        axios.post("http://localhost:3000/employee-schedules", {
                                            employee_id: emplyeId,
                                            day: 'Jumat',
                                            start_time: jumat,
                                            end_time: ajumat,
                                            start_break: isJumat,
                                            end_break: endJumat
                                        }, { withCredentials: 'true' })
                                            .then(() => {
                                                axios.post("http://localhost:3000/employee-schedules", {
                                                    employee_id: emplyeId,
                                                    day: 'Sabtu',
                                                    start_time: sabtu,
                                                    end_time: asabtu,
                                                    start_break: isSabtu,
                                                    end_break: endSabtu
                                                }, { withCredentials: 'true' })
                                                    .then(() => {
                                                        axios.post("http://localhost:3000/employee-schedules", {
                                                            employee_id: emplyeId,
                                                            day: 'Minggu',
                                                            start_time: minggu,
                                                            end_time: aminggu,
                                                            start_break: isMinggu,
                                                            end_break: endMinggu
                                                        }, { withCredentials: 'true' })
                                                            .then(() => {
                                                                console.log('mau');
                                                            })
                                                            .catch((error) => {
                                                                console.log(error);
                                                            })
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                    })
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            })
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    })
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    };
   
    const addJadwal = (id) => {
        addSenin(id);
    };

    //modal jadwal
    const hardReset = () => {
        setSenin("00:00");
        setaSenin("00:00");
        setSelasa("00:00");
        setaSelasa("00:00");
        setRabu("00:00");
        setaRabu("00:00");
        setKamis("00:00");
        setaKamis("00:00");
        setJumat("00:00");
        setaJumat("00:00");
        setSabtu("00:00");
        setaSabtu("00:00");
        setMinggu("00:00");
        setaMinggu("00:00");
        setIssenin("00:00");
        setEndsenin("00:00");
        setIsselasa("00:00");
        setEndselasa("00:00");
        setIsrabu("00:00");
        setEndrabu("00:00");
        setIskamis("00:00");
        setEndkamis("00:00");
        setIsjumat("00:00");
        setEndjumat("00:00");
        setIssabtu("00:00");
        setEndsabtu("00:00");
        setIsminggu("00:00");
        setEndminggu("00:00");
    }

    const [editJ, setEditj] = useState(false);
    const handleEditT = () => {
        canceling();
        setEditj(false);}

    const [show, setShow] = useState(false);
    const handleClose = () =>{ 
        canceling();
        setShow(false);
    }
    const canceling = ()=>{
        setSenin("");
        setaSenin("");
        setSelasa("");
        setaSelasa("");
        setRabu("");
        setaRabu("");
        setKamis("");
        setaKamis("");
        setJumat("");
        setaJumat("");
        setSabtu("");
        setaSabtu("");
        setMinggu("");
        setaMinggu("");
        setIssenin("");
        setEndsenin("");
        setIsselasa("");
        setEndselasa("");
        setIsrabu("");
        setEndrabu("");
        setIskamis("");
        setEndkamis("");
        setIsjumat("");
        setEndjumat("");
        setIssabtu("");
        setEndsabtu("");
        setIsminggu("");
        setEndminggu("");
    }

    const handleShow = (id) => {
        axios.get("http://localhost:3000/employee/" + id, { withCredentials: 'true' })
        .then((response) => {
            setNameEmployee(response.data.name_employee);
            setDepartment(response.data.department_id);
        });
        axios.get("http://localhost:3000/employee-schedulesbyemployee/" + id, { withCredentials: 'true' })
        .then((response) => {
            if (response.data !== null) {
                setSenin(response.data[0].start_time);
                setIdsenin(response.data[0].id);
                setIssenin(response.data[0].start_break);
                setEndsenin(response.data[0].end_break);
                setaSenin(response.data[0].end_time);
                setSelasa(response.data[1].start_time);
                setIdselasa(response.data[1].id);
                setIsselasa(response.data[1].start_break);
                setEndselasa(response.data[1].end_break);
                setaSelasa(response.data[1].end_time);
                setRabu(response.data[2].start_time);
                setaRabu(response.data[2].end_time);
                setIdRabu(response.data[2].id);
                setIsrabu(response.data[2].start_break);
                setEndrabu(response.data[2].end_break);
                setKamis(response.data[3].start_time);
                setaKamis(response.data[3].end_time);
                setIdkamis(response.data[3].id);
                setIskamis(response.data[3].start_break);
                setEndkamis(response.data[3].end_break);
                setJumat(response.data[4].start_time);
                setaJumat(response.data[4].end_time);
                setIdjumat(response.data[4].id);
                setIsjumat(response.data[4].start_break);
                setEndjumat(response.data[4].end_break);
                setSabtu(response.data[5].start_time);
                setaSabtu(response.data[5].end_time);
                setIdsabtu(response.data[5].id);
                setIssabtu(response.data[5].start_break);
                setEndsabtu(response.data[5].end_break);
                setMinggu(response.data[6].end_time);
                setIdminggu(response.data[6].id);
                setaMinggu(response.data[6].end_time);
                setIsminggu(response.data[6].start_break);
                setEndminggu(response.data[6].end_break);
                setEditj(true);
            }
        }).catch((error) => {
            setShow(true)
            setAddId(id);
        });
    }
    return (
        <>
          
                <div className="back mt-3">
                    <div className="content d-flex mb-4 ">

                        <h3 className="TextU pt-1">Employee List</h3>
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
                                        <Modal.Title>Add User Employee</Modal.Title>
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
                                <Row>

                                </Row>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={addEmployee}>
                                    {
                                        filteredID.map((item, index) => (
                                            <>
                                                <Row key={index}>
                                                    <Col>
                                                        <Form.Group className="mb-3" controlId="formBasicName">
                                                            <Form.Label>Name</Form.Label>
                                                            <Form.Control type="text" disabled placeholder="Full Name" value={item.full_name} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group className="mb-3" controlId="formBasicAddress">
                                                            <Form.Label>Address</Form.Label>
                                                            <Form.Control type="text" placeholder="address" required onChange={(e) => setAddress(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Label>Select Gender</Form.Label>
                                                        <Form.Select aria-label="Default select example" required onChange={(e) => setGender(e.target.value)}>
                                                            <option value="">Select Gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                        </Form.Select>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group className="mb-3" controlId="formBasicPhone">
                                                            <Form.Label>Phone Number</Form.Label>
                                                            <Form.Control type="text" disabled placeholder="Phone Number" value={item.phone} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Label>Select Department</Form.Label>
                                                        <Form.Select aria-label="Default select coba" required onChange={(e) => setDepartment(e.target.value)}>
                                                            <option value="">Select Department</option>
                                                            {
                                                                dataDe.map((item) => (
                                                                    <>
                                                                        <option value={item.id}>{item.name}</option>
                                                                    </>
                                                                ))
                                                            }
                                                        </Form.Select>
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
                            <Modal.Header closeButton>
                                <Modal.Title>Edit User Employee</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={() => updateProduct(id)}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" placeholder="Full Name" value={name_employee} required
                                                    onChange={(e) => setNameEmployee(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control type="text" placeholder="Skill" required
                                                    onChange={(e) => setAddress(e.target.value)} value={address} />
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
                                                <Form.Control type="number" required placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} value={phone} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">

                                        <Col>
                                            <Form.Label>Select Department</Form.Label>
                                            <Form.Select aria-label="Default select coba" required onChange={(e) => setDepartment(e.target.value)}>
                                                <option value={department}>{(dataDe.filter(item => item.id == department)).map((item) => item.name)}</option>
                                                {
                                                    dataDe.map((item) => (
                                                        <>
                                                            <option value={item.id}>{item.name}</option>
                                                        </>
                                                    ))
                                                }
                                            </Form.Select>
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

                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                            size="lg"
                            centered
                        >
                            <Modal.Header className="header-schedule"  style={{ backgroundColor: '#F2AD00' }}>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h4 className="mb-3">Add Jadwal Employee</h4>
                                        <div className="nama d-flex flex-column">
                                            <div className="fw-bold h2 mb-0 mx-auto">{name_employee}</div>
                                            <div className="rounded-5 title-edit my-auto">{(dataDe.filter(item => item.id == department)).map((item) => item.name)}</div>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Header>
                            <Modal.Body className="Mbody">
                                <Form onSubmit={() => addJadwal(id)}>
                                <div className="d-flex ">
                                        <div className="d-flex rowJam">
                                            <div className="hari my-auto">
                                                Monday
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={senin}
                                                placeholder="Time"
                                                onChange={(e) => setSenin(e.target.value)}
                                                required
                                            />
                                            <div className="my-auto">
                                                Until
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={aSenin}
                                                required
                                                placeholder="Time"
                                                onChange={(e) => setaSenin(e.target.value)}
                                            />
                                            <div className="istirahat my-auto">
                                                timebreak
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="rounded-3 my-auto"
                                                    value={isSenin}
                                                    required
                                                    placeholder="Time"
                                                    onChange={(e) => setIssenin(e.target.value)}
                                                    id="startTime" />
                                            </div>
                                            <div className="my-auto">
                                                -
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="inputJam mx-1 rounded-3 my-auto"
                                                    value={endSenin}
                                                    required
                                                    onChange={(e) => setEndsenin(e.target.value)}
                                                    placeholder="Time"
                                                    id="endTime" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <div className="d-flex rowJam">
                                            <div className="hari my-auto">
                                                Tuesday
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={selasa}
                                                placeholder="Time"
                                                onChange={(e) => setSelasa(e.target.value)}
                                                required
                                            />
                                            <div className="my-auto">
                                                Until
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={aselasa}
                                                placeholder="Time"
                                                onChange={(e) => setaSelasa(e.target.value)}
                                                required
                                            />
                                            <div className="istirahat my-auto">
                                                timebreak
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="rounded-3 my-auto"
                                                    required
                                                    value={isSelasa}
                                                    placeholder="Time"
                                                    onChange={(e) => setIsselasa(e.target.value)}
                                                    id="startTime" />
                                            </div>
                                            <div className="my-auto">
                                                -
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="inputJam mx-1 rounded-3 my-auto"
                                                    required
                                                    value={endSelasa}
                                                    onChange={(e) => setEndselasa(e.target.value)}
                                                    placeholder="Time"
                                                    id="endTime" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <div className="d-flex rowJam">
                                            <div className="hari my-auto">
                                                Wednesday
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={rabu}
                                                placeholder="Time"
                                                onChange={(e) => setRabu(e.target.value)}
                                                required
                                            />
                                            <div className="my-auto">
                                                Until
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={arabu}
                                                placeholder="Time"
                                                onChange={(e) => setaRabu(e.target.value)}
                                                required
                                            />
                                            <div className="istirahat my-auto">
                                                timebreak
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="rounded-3 my-auto"
                                                    value={isRabu}
                                                    placeholder="Time"
                                                    required
                                                    onChange={(e) => setIsrabu(e.target.value)}
                                                    id="startTime" />
                                            </div>
                                            <div className="my-auto">
                                                -
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="inputJam mx-1 rounded-3 my-auto"
                                                    value={endRabu}
                                                    onChange={(e) => setEndrabu(e.target.value)}
                                                    placeholder="Time"
                                                    required
                                                    id="endTime" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <div className="d-flex rowJam">
                                            <div className="hari my-auto">
                                                Thursday
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={kamis}
                                                placeholder="Time"
                                                onChange={(e) => setKamis(e.target.value)}
                                                required
                                            />
                                            <div className="my-auto">
                                                Until
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={akamis}
                                                placeholder="Time"
                                                required
                                                onChange={(e) => setaKamis(e.target.value)}
                                            />
                                            <div className="istirahat my-auto">
                                                timebreak
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="rounded-3 my-auto"
                                                    value={isKamis}
                                                    placeholder="Time"
                                                    onChange={(e) => setIskamis(e.target.value)}
                                                    required
                                                    id="startTime" />
                                            </div>
                                            <div className="my-auto">
                                                -
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="inputJam mx-1 rounded-3 my-auto"
                                                    value={endKamis}
                                                    onChange={(e) => setEndkamis(e.target.value)}
                                                    placeholder="Time"
                                                    required
                                                    id="endTime" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <div className="d-flex rowJam">
                                            <div className="hari my-auto">
                                                Friday
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={jumat}
                                                placeholder="Time"
                                                onChange={(e) => setJumat(e.target.value)}
                                                required
                                            />
                                            <div className="my-auto">
                                                Until
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={ajumat}
                                                placeholder="Time"
                                                required
                                                onChange={(e) => setaJumat(e.target.value)}
                                            />
                                            <div className="istirahat my-auto">
                                                timebreak
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="rounded-3 my-auto"
                                                    value={isJumat}
                                                    required
                                                    placeholder="Time"
                                                    onChange={(e) => setIsjumat(e.target.value)}
                                                    id="startTime" />
                                            </div>
                                            <div className="my-auto">
                                                -
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="inputJam mx-1 rounded-3 my-auto"
                                                    value={endJumat}
                                                    required
                                                    onChange={(e) => setEndjumat(e.target.value)}
                                                    placeholder="Time"
                                                    id="endTime" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <div className="d-flex rowJam">
                                            <div className="hari my-auto">
                                                Saturday
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={sabtu}
                                                placeholder="Time"
                                                onChange={(e) => setSabtu(e.target.value)}
                                                required
                                            />
                                            <div className="my-auto">
                                                Until
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={asabtu}
                                                placeholder="Time"
                                                required
                                                onChange={(e) => setaSabtu(e.target.value)}
                                            />
                                            <div className="istirahat my-auto">
                                                timebreak
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="rounded-3 my-auto"
                                                    required
                                                    value={isSabtu}
                                                    placeholder="Time"
                                                    onChange={(e) => setIssabtu(e.target.value)}
                                                    id="startTime" />
                                            </div>
                                            <div className="my-auto">
                                                -
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="inputJam mx-1 rounded-3 my-auto"
                                                    value={endSabtu}
                                                    onChange={(e) => setEndsabtu(e.target.value)}
                                                    placeholder="Time"
                                                    required
                                                    id="endTime" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <div className="d-flex rowJam">
                                            <div className="hari my-auto">
                                                Sunday
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={minggu}
                                                placeholder="Time"
                                                onChange={(e) => setMinggu(e.target.value)}
                                                required
                                            />
                                            <div className="my-auto">
                                                Until
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={aminggu}
                                                required
                                                placeholder="Time"
                                                onChange={(e) => setaMinggu(e.target.value)}
                                            />
                                            <div className="istirahat my-auto">
                                                timebreak
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="rounded-3 my-auto"
                                                    required
                                                    value={isMinggu}
                                                    placeholder="Time"
                                                    onChange={(e) => setIsminggu(e.target.value)}
                                                    id="startTime" />
                                            </div>
                                            <div className="my-auto">
                                                -
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="inputJam mx-1 rounded-3 my-auto"
                                                    value={endMinggu}
                                                    onChange={(e) => setEndminggu(e.target.value)}
                                                    placeholder="Time"
                                                    required
                                                    id="endTime" />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="d-flex flex-row justify-content-between">
                                        <div>
                                            <Button variant="danger w-100" onClick={() => hardReset()}>
                                                Reset
                                            </Button>
                                        </div>

                                        <div className="d-flex flex-row justify-content-between">
                                            <div className="mx-3">
                                                <Button onClick={() => handleClose()} variant="secondary w-100">
                                                    Back
                                                </Button>
                                            </div>
                                            <div className="mx-2">
                                                <Button variant="success w-100" type="submit">
                                                    Save
                                                </Button>
                                            </div>

                                        </div>
                                    </div>

                                </Form>
                            </Modal.Body>
                        </Modal >

                        <Modal
                            show={editJ}
                            onHide={handleEditT}
                            backdrop="static"
                            keyboard={false}
                            size="lg"
                            centered
                        >
                            <Modal.Header className="header-schedule"  style={{ backgroundColor: '#F2AD00' }}>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h4 className="mb-3">Edit Jadwal Employee</h4>
                                        <div className="nama d-flex flex-column">
                                            <div className="fw-bold h2 mb-0 mx-auto">{name_employee}</div>
                                            <div className="rounded-5 title-edit my-auto">{(dataDe.filter(item => item.id == department)).map((item) => item.name)}</div>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Header>
                            <Modal.Body className="Mbody">
                                <Form onSubmit={() => editJadwal()}>
                                    <div className="d-flex ">
                                        <div className="d-flex rowJam">
                                            <div className="hari my-auto">
                                                Monday
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={senin}
                                                placeholder="Time"
                                                onChange={(e) => setSenin(e.target.value)}
                                                required
                                            />
                                            <div className="my-auto">
                                                Until
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={aSenin}
                                                required
                                                placeholder="Time"
                                                onChange={(e) => setaSenin(e.target.value)}
                                            />
                                            <div className="istirahat my-auto">
                                                timebreak
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="rounded-3 my-auto"
                                                    value={isSenin}
                                                    required
                                                    placeholder="Time"
                                                    onChange={(e) => setIssenin(e.target.value)}
                                                    id="startTime" />
                                            </div>
                                            <div className="my-auto">
                                                -
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="inputJam mx-1 rounded-3 my-auto"
                                                    value={endSenin}
                                                    required
                                                    onChange={(e) => setEndsenin(e.target.value)}
                                                    placeholder="Time"
                                                    id="endTime" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <div className="d-flex rowJam">
                                            <div className="hari my-auto">
                                                Tuesday
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={selasa}
                                                placeholder="Time"
                                                onChange={(e) => setSelasa(e.target.value)}
                                                required
                                            />
                                            <div className="my-auto">
                                                Until
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={aselasa}
                                                placeholder="Time"
                                                onChange={(e) => setaSelasa(e.target.value)}
                                                required
                                            />
                                            <div className="istirahat my-auto">
                                                timebreak
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="rounded-3 my-auto"
                                                    required
                                                    value={isSelasa}
                                                    placeholder="Time"
                                                    onChange={(e) => setIsselasa(e.target.value)}
                                                    id="startTime" />
                                            </div>
                                            <div className="my-auto">
                                                -
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="inputJam mx-1 rounded-3 my-auto"
                                                    required
                                                    value={endSelasa}
                                                    onChange={(e) => setEndselasa(e.target.value)}
                                                    placeholder="Time"
                                                    id="endTime" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <div className="d-flex rowJam">
                                            <div className="hari my-auto">
                                                Wednesday
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={rabu}
                                                placeholder="Time"
                                                onChange={(e) => setRabu(e.target.value)}
                                                required
                                            />
                                            <div className="my-auto">
                                                Until
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={arabu}
                                                placeholder="Time"
                                                onChange={(e) => setaRabu(e.target.value)}
                                                required
                                            />
                                            <div className="istirahat my-auto">
                                                timebreak
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="rounded-3 my-auto"
                                                    value={isRabu}
                                                    placeholder="Time"
                                                    required
                                                    onChange={(e) => setIsrabu(e.target.value)}
                                                    id="startTime" />
                                            </div>
                                            <div className="my-auto">
                                                -
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="inputJam mx-1 rounded-3 my-auto"
                                                    value={endRabu}
                                                    onChange={(e) => setEndrabu(e.target.value)}
                                                    placeholder="Time"
                                                    required
                                                    id="endTime" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <div className="d-flex rowJam">
                                            <div className="hari my-auto">
                                                Thursday
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={kamis}
                                                placeholder="Time"
                                                onChange={(e) => setKamis(e.target.value)}
                                                required
                                            />
                                            <div className="my-auto">
                                                Until
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={akamis}
                                                placeholder="Time"
                                                required
                                                onChange={(e) => setaKamis(e.target.value)}
                                            />
                                            <div className="istirahat my-auto">
                                                timebreak
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="rounded-3 my-auto"
                                                    value={isKamis}
                                                    placeholder="Time"
                                                    onChange={(e) => setIskamis(e.target.value)}
                                                    required
                                                    id="startTime" />
                                            </div>
                                            <div className="my-auto">
                                                -
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="inputJam mx-1 rounded-3 my-auto"
                                                    value={endKamis}
                                                    onChange={(e) => setEndkamis(e.target.value)}
                                                    placeholder="Time"
                                                    required
                                                    id="endTime" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <div className="d-flex rowJam">
                                            <div className="hari my-auto">
                                                Friday
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={jumat}
                                                placeholder="Time"
                                                onChange={(e) => setJumat(e.target.value)}
                                                required
                                            />
                                            <div className="my-auto">
                                                Until
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={ajumat}
                                                placeholder="Time"
                                                required
                                                onChange={(e) => setaJumat(e.target.value)}
                                            />
                                            <div className="istirahat my-auto">
                                                timebreak
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="rounded-3 my-auto"
                                                    value={isJumat}
                                                    required
                                                    placeholder="Time"
                                                    onChange={(e) => setIsjumat(e.target.value)}
                                                    id="startTime" />
                                            </div>
                                            <div className="my-auto">
                                                -
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="inputJam mx-1 rounded-3 my-auto"
                                                    value={endJumat}
                                                    required
                                                    onChange={(e) => setEndjumat(e.target.value)}
                                                    placeholder="Time"
                                                    id="endTime" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <div className="d-flex rowJam">
                                            <div className="hari my-auto">
                                                Saturday
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={sabtu}
                                                placeholder="Time"
                                                onChange={(e) => setSabtu(e.target.value)}
                                                required
                                            />
                                            <div className="my-auto">
                                                Until
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={asabtu}
                                                placeholder="Time"
                                                required
                                                onChange={(e) => setaSabtu(e.target.value)}
                                            />
                                            <div className="istirahat my-auto">
                                                timebreak
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="rounded-3 my-auto"
                                                    required
                                                    value={isSabtu}
                                                    placeholder="Time"
                                                    onChange={(e) => setIssabtu(e.target.value)}
                                                    id="startTime" />
                                            </div>
                                            <div className="my-auto">
                                                -
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="inputJam mx-1 rounded-3 my-auto"
                                                    value={endSabtu}
                                                    onChange={(e) => setEndsabtu(e.target.value)}
                                                    placeholder="Time"
                                                    required
                                                    id="endTime" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <div className="d-flex rowJam">
                                            <div className="hari my-auto">
                                                Sunday
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={minggu}
                                                placeholder="Time"
                                                onChange={(e) => setMinggu(e.target.value)}
                                                required
                                            />
                                            <div className="my-auto">
                                                Until
                                            </div>
                                            <input type="time"
                                                className="inputJam mx-3 rounded-3 my-auto"
                                                id="time"
                                                value={aminggu}
                                                required
                                                placeholder="Time"
                                                onChange={(e) => setaMinggu(e.target.value)}
                                            />
                                            <div className="istirahat my-auto">
                                                timebreak
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="rounded-3 my-auto"
                                                    required
                                                    value={isMinggu}
                                                    placeholder="Time"
                                                    onChange={(e) => setIsminggu(e.target.value)}
                                                    id="startTime" />
                                            </div>
                                            <div className="my-auto">
                                                -
                                            </div>
                                            <div className="d-flex mx-3">
                                                <input type="time"
                                                    className="inputJam mx-1 rounded-3 my-auto"
                                                    value={endMinggu}
                                                    onChange={(e) => setEndminggu(e.target.value)}
                                                    placeholder="Time"
                                                    required
                                                    id="endTime" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row justify-content-between">
                                        <div>
                                            <Button variant="danger w-100 " onClick={() => hardReset()}>
                                                Reset
                                            </Button>
                                        </div>

                                        <div className="d-flex flex-row justify-content-between">
                                            <div className="mx-3">
                                                <Button variant="secondary w-100" onClick={() => handleEditT()} >
                                                    Back
                                                </Button>
                                            </div>
                                            <div className="mx-2">
                                                <Button variant="success w-100" type="submit">
                                                    Save
                                                </Button>
                                            </div>

                                        </div>
                                    </div>

                                </Form>
                            </Modal.Body>
                        </Modal >

                    </div>
                    <div >
                        <div className="shadow">
                            <DataTable
                                keyField={id}
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
                                onSelectedRowsChange={handleRowSelected}
                                noHeader
                                fixedHeaderScrollHeight="760px"
                                customStyles={customStyles}
                            />

                        </div>

                    </div>
                </div >
            
        </>
    );
};

export default Mstaff;


