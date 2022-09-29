import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "../style/style.css"
import "../style/UM.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import DataTable from "react-data-table-component";
import axios from "axios";



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
export const Units = () => {

    //menampilkan kolom dan isi tabel.
    const columns = [
        {
            name: "Produk id",
            selector: row => row.product_id ,
            sortable: true,
            center: true,
        },
        {
            name: "Kode Unit",
            selector: row => row.code_unit,
            sortable: true,
            center: true,
        },
        {
            name: "Nama",
            selector: row => row.name,
            sortable: true,
            center: true,
        },
        {
            name: "Order",
            selector: row => row.order_unit,
            sortable: true,
            center: true,
        },
        {
            name: "edit",
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
    const [productid, setProdukId] = useState([]);
    //filtering
    const [filterText, setFilterText] = React.useState('');
    const filteredItems = data.filter(
        item => item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    //menampilkan employee
    useEffect(() => {
        getUnit();
        getProduct();
    }, [])

    const getUnit = async () => {
        axios.get("http://localhost:3000/product-units", { withCredentials: 'true' })
            .then((response) => {
                setData(response.data);
            });
    };
    const getProduct = async () => {
        axios.get("http://localhost:3000/products", { withCredentials: 'true' })
            .then((response) => {
                setProdukId(response.data);
            });
    };
    const ProductidMap = productid.map((item) => item.product_id)
    const ProdukNew = data.filter(({ id }) => ProductidMap.includes(id))
    //add employee
    const [id, setId] = useState("");
    const [product_id, setProdukid] = useState("");
    const [code_unit, setCodeunit] = useState("");
    const [name, setName] = useState("");
    const [order_unit, setOrderunit] = useState("");


    //menambah employee

    //modal add
    const [buka, setBuka] = useState(false);
    const addUnit = async (id) => {
        axios.post("http://localhost:3000/product-units", {
            product_id: product_id,
            code_unit: code_unit,
            name: name,
            order_unit: order_unit,
        }, { withCredentials: 'true' })
            .then(() => {
                console.log('mau');
            })
    };
    const [hapus, setHapus] = useState(false);
    const handleHapus = (id) => {
        axios.get("http://localhost:3000/product-units/" + id, { withCredentials: 'true' })
            .then((response) => {
                setId(response.data.id);
                setProdukid(response.data.product_id);
                setCodeunit(response.data.code_unit);
                setName(response.data.name);
                setOrderunit(response.data.order_unit);
                setHapus(true);
            });
    };
    const deleteData = (id) => {
        axios.delete("http://localhost:3000/product-units/" + id, { withCredentials: 'true' })
            .then(() => {
                getUnit();
                setHapus(false);
                setId('');
                setProdukid('')
                setCodeunit('');
                setName('')
                setOrderunit('');

            });
    };
    const handleClose = () => {
        setId('');
        setProdukid('')
        setCodeunit('');
        setName('')
        setOrderunit('');
        setHapus(false);
    };

    //modal edit
    const [tampil, setTampil] = useState(false);
    const handleTtp = () => {
        setId('');
        setProdukid('')
        setCodeunit('');
        setName('')
        setOrderunit('');
        setTampil(false);
    }

    const handleEdit = (id) => {
        axios.get("http://localhost:3000/product-units/" + id, { withCredentials: 'true' })
            .then((response) => {
                setId(response.data.id);
                setProdukid(response.data.product_id)
                setCodeunit(response.data.code_unit);
                setName(response.data.name)
                setOrderunit(response.data.order_unit);
                setTampil(true);
            });
    };
    const updateProduct = async () => {
        axios.patch("http://localhost:3000/product-units/" + id, {
            id: id,
            product_id: product_id,
            code_unit: code_unit,
            name: name,
            order_unit: order_unit,
        }, { withCredentials: 'true' })
            .then(
                () => {
                    setId('');
                    setProdukid('')
                    setCodeunit('');
                    setName('')
                    setOrderunit('');
                }
            ).catch(
                (eror) => {
                    console.log(eror);
                }
            )
    }
    const handleTutup = () => {
        setId('');
        setProdukid('')
        setCodeunit('');
        setName('')
        setOrderunit('');
        setBuka(false);
    }
    const handleBuka = () => setBuka(true);
    return (<>
   
            <div className="back mt-3">

                <div className="content d-flex mb-4 ">

                    <h3 className="TextU pt-1">Produk unit List</h3>
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
                                    <Modal.Title>Add Units</Modal.Title>
                                </Col>

                            </Row>

                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={addUnit}>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Col>
                                                <Form.Label>Produk ID</Form.Label>
                                                <Form.Select aria-label="Default select coba" required onChange={(e) => setProdukid(e.target.value)}>
                                                    <option value="">Select Produk ID</option>
                                                    {productid.map((item) => (
                                                        <option value={item.id}>{item.id} - {item.code_product}</option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicCode">
                                            <Form.Label>Code Product Unit</Form.Label>
                                            <Form.Control type="text" required placeholder="Code Product" onChange={(e) => setCodeunit(e.target.value)} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicCode">
                                            <Form.Label>Nama Product Units</Form.Label>
                                            <Form.Control type="text" required placeholder="Code Product" onChange={(e) => setName(e.target.value)} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicCode">
                                            <Form.Label>Order Product Units</Form.Label>
                                            <Form.Control type="number" required placeholder="Code Product" onChange={(e) => setOrderunit(e.target.value)} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row className=" mx-auto">
                                    <Col>
                                    <Button className="Button_cancel" variant="danger" type=""  onClick={handleTutup} >
                                        Cancel
                                    </Button>
                                    <Button className="Button_save" variant="success" type="submit" >
                                        Save
                                    </Button>
                                    </Col>
                              
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
                            <Modal.Title>Edit Categories</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={() => updateProduct(id)}>
                                <Row>
                                <Col>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Col>
                                                <Form.Label>Produk Catagory</Form.Label>
                                                <Form.Select aria-label="Default select coba" required onChange={(e) => setProdukid(e.target.value)} value={product_id}>
                                                    <option value="">Select Produk ID</option>
                                                    {productid.map((item) => (
                                                        <option value={item.id}>{item.id} - {item.code_product}</option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                   
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicCode">
                                            <Form.Label>Code Unit</Form.Label>
                                            <Form.Control type="text" required placeholder="Code Product" value={code_unit} onChange={(e) => setCodeunit(e.target.value)} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicCode">
                                            <Form.Label>Nama</Form.Label>
                                            <Form.Control type="text" required placeholder="Code Product" value={name} onChange={(e) => setName(e.target.value)} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicCode">
                                            <Form.Label>Order</Form.Label>
                                            <Form.Control type="text" required placeholder="Code Product" value={order_unit} onChange={(e) => setOrderunit(e.target.value)} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row className=" mx-auto">
                                <Col>
                                    <Button className="Button_cancel" variant="danger" type=""  onClick={handleTtp} >
                                        Cancel
                                    </Button>
                                    <Button className="Button_save"  variant="success" type="submit" >
                                        Save
                                    </Button>
                                    </Col>
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
                                src="https://cdn-icons-png.flaticon.com/512/4201/4201973.png" alt="drive" />
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

export default Units;


