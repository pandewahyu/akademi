
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "../style/style.css"
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
            lineHeight: "160%",
            textTransform: "capitalize"
        },
        input: {
            style: {
                filter: 'invert(10%) hue-rotate(10deg) brightness(1) !important'
            }
        }
    },
    tables: {
        border: "6px !important"
    },

    headCells: {
        style: {
            backgroundColor: "#FFF !important",
            color: "black !important",
            borderTopStyle: 'outset',
            borderTopWidth: '5px',
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
export const Notes= () => {
    //menampilkan kolom dan isi tabel.
    const columns = [
        {
            name: "Student",
            selector: row => row.student_id,
            sortable: true,
            center: true,
        },
        {
            name: "Employee",
            selector: row => row.employee_id,
            sortable: true,
            center: true,
        },
        {
          name: "Title",
          selector: row => row.title,
          sortable: true,
          center: true,
      },
      {
        name: "Description",
        selector: row => row.description,
        sortable: true,
        center: true,
    },
    {
      name: "Created",
      selector: row => row.created_at,
      sortable: true,
      center: true,
  },
    {
      name: "Role",
      selector: row => row.role,
      sortable: true,
      center: true,
      conditionalCellStyles: [
          {
              when: row => row.role === 'Employee',
              style: {
                  borderRadius: '25px',
                  margin: '7px 5px 7px 5px',
                  backgroundColor: '#025E86',
                  color: 'white',
              },
          },
         
          {
              when: row => row.role === 'Student',
              style: {
                  margin: '7px 5px 7px 5px',
                  borderRadius: '25px',
                  backgroundColor: '#FFB800',
                  color: 'white',
              },
          },
         
          
      ]
  },
        {
            name: "delete",
            center: true,
            cell: row => (
                <div>
                    <Row>
                      
                        <Col>
                            <FontAwesomeIcon size="lg" icon={faTrashAlt} onClick={() => handleHapus(row.id)} />
                        </Col>

                    </Row>
                </div>
            )
        }
        
    ];
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    //menampilkan employee
    useEffect(() => {
      getNotes();
      getStudent();
      getNama();
      getEmployee();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getNotes = async () => {
        axios.get("http://localhost:3000/notes", { withCredentials: "true" })
          .then((response) => {
            setData(response.data);
          })
      };
  
    const [coba, setCoba] = useState([]);
    const getNama = async () => {
      setIsLoading(true);
      axios.get("http://localhost:3000/users", { withCredentials: "true" })
        .then((response) => {
          setCoba(response.data);
        })
        .catch(error => {
          console.log(error.response);
        });
    };
  
    const [student, setStudent] = useState([]);
    const getStudent = async () => {
      setIsLoading(true);
      axios.get("http://localhost:3000/students", { withCredentials: "true" })
        .then((response) => {
          setStudent(response.data);
        })
        .catch(error => {
          console.log(error.response);
        });
    };
  
    const [employee, setEmployee] = useState([]);
    const getEmployee = async () => {
      setIsLoading(true);
      axios.get("http://localhost:3000/employee", { withCredentials: "true" })
        .then((response) => {
          setEmployee(response.data);
        })
        .catch(error => {
          console.log(error.response);
        });
    };
  
    //add employee
    const [id, setId] = useState("");
    const [student_id, setStuden] = useState("");
    const [employee_id, setEmploye] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [created_at, setCreat] = useState("");
    const [role, setRole] = useState("");
    //delete
    const [hapus, setHapus] = useState(false);
    const handleHapus = (id) => {
      axios.get("http://localhost:3000/notes/" + id, { withCredentials: 'true' })
        .then((response) => {
          setId(response.data.id);
          setStuden(response.data.student_id);
          setEmploye(response.data.employee_id);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setRole(response.data.role);
          setCreat(response.data.created_at);
          setHapus(true);
        });
    };
    const deleteData = (id) => {
      axios.delete("http://localhost:3000/notes/" + id, { withCredentials: 'true' })
        .then(() => {
          getNotes();
          setHapus(false);
          setId('');
          setStuden('');
          setEmploye('');
          setTitle('');
          setDescription('');
          setRole('');
          setCreat('');
         
  
        });
    };
    const handleClose = () => {
    
      setId('');
      setStuden('');
      setEmploye('');
      setTitle('');
      setDescription('');
      setRole('');
      setCreat('');
      setHapus(false);
    };
      //filtering data
    const [filterText, setFilterText] = React.useState('');
    const [filterS, setFilterS] = React.useState('');

    const filterPerm = [...new Set(data.map(item => item.role))];
    const filteredItems = data.filter(
        item => 
            item.role.includes(filterS),
    );
    return (<>
            <div className="back mt-3">

                <div className="content d-flex mb-4 ">
                <h3>Notes</h3>
                <select
                                onChange={(e) => setFilterS(e.target.value)}
                                className="content1 rounded-5 shadow role"
                                aria-label="Filter user">
                                <option value="">Role ALL</option>
                                {filterPerm.map((item) => (
                                    <option value={item}>{item}</option>
                                ))}
                            </select>
                
                <input className="text-center shadow search"
                        style={{  background: "#233EAE",borderColor:"white", borderRadius: "50px", marginBottom: "20px", height: "37px", width: "135px" }}
                        id="search"
                        type="text"
                        placeholder=" 
                        Search ..."
                        aria-label="Search Input"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}

                    />
       
                         
                            
                
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
                                    <h4>Do you want to delete "{title}"?</h4>
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

export default Notes;




  
  