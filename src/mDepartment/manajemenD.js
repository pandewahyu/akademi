import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "../style/style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
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
export const Department = () => {
    //menampilkan kolom dan isi tabel.
    const columns = [
        {
            name: "Nama Department",
            selector: row => row.name,
            sortable: true,
            center: true,
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
                            <FontAwesomeIcon size="lg" icon={faTrashAlt} onClick={() => handleHapus(row.id)} />
                        </Col>

                    </Row>
                </div>
            )
        }
    ];
    const [data, setData] = useState([]);
    //filtering
    const [filterText, setFilterText] = React.useState('');
    const filteredItems = data.filter(
        item => item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    //menampilkan employee
    useEffect(() => {
        getDepartmet();
    }, [])

    const getDepartmet = async () => {
        axios.get("http://localhost:3000/department", { withCredentials: 'true' })
            .then((response) => {
                setData(response.data);
            });
    };

    //add employee
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    //menambah employee

    //modal add
    const [buka, setBuka] = useState(false);
    const addEmployee = async (id) => {
        axios.post("http://localhost:3000/department", {
            name: name,
        }, { withCredentials: 'true' })
            .then(() => {
                console.log('mau');
            })
    };
    const [hapus, setHapus] = useState(false);
    const handleHapus = (id) => {
        axios.get("http://localhost:3000/department/" + id, { withCredentials: 'true' })
            .then((response) => {
                setId(response.data.id);
                setName(response.data.name);
                setHapus(true);
            });
    };
    const deleteData = (id) => {
        axios.delete("http://localhost:3000/department/" + id, { withCredentials: 'true' })
            .then(() => {
                getDepartmet();
                setHapus(false);
                setId('');
                setName('')
            });
    };
    const handleClose = () => {
        setId('');
        setName('')
        setHapus(false);
    };

    //modal edit
    const [tampil, setTampil] = useState(false);
    const handleTtp = () => {
        setId('');
        setName('')
        setTampil(false);
    }
    const handleEdit = (id) => {
        axios.get("http://localhost:3000/department/" + id, { withCredentials: 'true' })
            .then((response) => {
                setId(response.data.id);
                setName(response.data.name);
                setTampil(true);
            });
    };
    const updateProduct = async () => {
        axios.patch("http://localhost:3000/department/" + id, {
            id: id,
            name: name,
        }, { withCredentials: 'true' })
            .then(
                () => {
                    setId('');
                    setName('')
                }
            ).catch(
                (eror) => {
                    console.log('gaamau');
                    console.log(eror);
                }
            )
    }
    const handleTutup = () => {
        setId('');
        setName('')
        setBuka(false);
    }
    const handleBuka = () => setBuka(true);
    return (
        <>
           
                <div className="back mt-3">
                    <div className="content d-flex mb-4 ">

                        <h3 className="TextU pt-1">Department List</h3>
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
                            <Modal.Header >
                                <Row>
                                    <Col>
                                        <Modal.Title>Add Department</Modal.Title>
                                    </Col>
                                </Row>

                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={addEmployee}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicName">
                                                <Form.Label>Name Department</Form.Label>
                                                <Form.Control type="text" required placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
                                            </Form.Group>
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
                                <Modal.Title>Edit Department</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={() => updateProduct(id)}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                                <Form.Label> Name Department</Form.Label>
                                                <Form.Control required type="text" placeholder="Name Department"
                                                    onChange={(e) => setName(e.target.value)} value={name} />
                                            </Form.Group>
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
                        <Modal //delete
                            show={hapus}
                            onHide={handleClose}
                            backdrop="static"
                            size="lg"
                            keyboard={false}
                            centered
                        >
                            <Modal.Header closeButton>

                            </Modal.Header>
                            <Modal.Body>
                                <img className="text-center d-flex justify-content-center mx-auto" style={{ alignItems: 'center', width: '100px', height: '100px' }}
                                    src="https://cdn-icons-png.flaticon.com/512/4201/4201973.png" alt="drive image" />
                                <Row>
                                    <h2 className="text-center">Are You Sure?</h2>
                                </Row>
                                <Row className="pb-3">
                                    <Col className="text-center">
                                        <h4>Do you want to delete "{name}"?</h4>
                                    </Col>
                                </Row>
                                {/* <Row>
                                        <Col className="text-center mb-4">
                                            <h2>email: {item.email}</h2>
                                        </Col>
                                    </Row> */}
                                    
                                <Row className=" mx-auto">
                                    <Button className="red" key={id} variant="danger" type="submit" onClick={() => deleteData(id)}>
                                        Delete
                                    </Button>
                                </Row>

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
                            keyField={id}
                            key={id}
                        />
                    </div>
                </div >
           
        </>
    );
};

export default Department;


