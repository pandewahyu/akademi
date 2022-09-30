import { Row, Col, Card, } from "react-bootstrap";
import React from "react";
import { useState, useEffect } from "react";
import "../style/style.css";
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import LayoutDashboard from "../layout/layout";
import "../style/style.css"
import axios from "axios";
import Multiselect from 'multiselect-react-dropdown';


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#0077"];


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const Bullet = ({ backgroundColor, size }) => {
    return (
        <div
            className="CirecleBullet"
            style={{
                backgroundColor,
                width: size,
                height: size
            }}
        ></div>
    );
};



const Manreport = () => {


    const [field, setField] = useState(
        {
            selectedItem: [{ name: 'Course 1', students: 100, }]
        }
    );
    console.log(field)
    const handleChange = (selectedItem, selectedList) => {
        setField({ selectedItem })
    }
    const handleHapus = (selectedItem) => {
        setField(
            ({ selectedItem }))
    }
    console.log(field.selectedItem)
    useEffect(() => {
        getStudents();
    }, [])
    const [student, setStudent] = useState([]);
    const getStudents = async () => {
        axios.get("http://localhost:3000/students", { withCredentials: 'true' })
            .then((response) => {
                setStudent(response.data);
            })
    };
    const data = [
        { name: 'Course 1', students: 100, },
        { name: 'Course 2', students: 400, },
        { name: 'Course 3', students: 200, },
        { name: 'Course 4', students: 300, },
        { name: 'Course 5', students: 200, },
    ];
    

    const dataa = [
        {
            name: '2022-09-01',
            masuk: 2,
            keluar: 2,
            amt: 4,
        },
        {
            name: '2022-09-02',
            masuk: 2,
            keluar: 1,
            amt: 3,
        },
        {
            name: '2022-09-03',
            masuk: 1,
            keluar: 2,
            amt: 3,
        },
        {
            name: '2022-09-04',
            masuk: 1,
            keluar: 1,
            amt: 3,
        },
        {
            name: '2022-09-05',
            masuk: 3,
            keluar: 1,
            amt: 4,
        },
        {
            name: '2022-09-06',
            masuk: 3,
            keluar: 3,
            amt: 7,
        },
        {
            name: '2022-09-07',
            masuk: 3,
            keluar: 3,
            amt: 7,
        },
    ];

    const datah = [
        {
            name: '2022-09-01',
            "0-12": 2,
            "13-15": 2,
            "16++": 4,
        },
        {
            name: '2022-09-02',
            "0-12": 2,
            "13-15": 1,
            "16++": 3,
        },
        {
            name: '2022-09-03',
            "0-12": 1,
            "13-15": 2,
            "16++": 3,
        },
        {
            name: '2022-09-04',
            "0-12": 1,
            "13-15": 1,
            "16++": 3,
        },
        {
            name: '2022-09-05',
            "0-12": 3,
            "13-15": 1,
            "16++": 4,
        },
        {
            name: '2022-09-06',
            "0-12": 3,
            "13-15": 3,
            "16++": 7,
        },
        {
            name: '2022-09-07',
            "0-12": 3,
            "13-15": 3,
            "16++": 7,
        },
    ];

    const dataaa = [
        {
            name: '16-18',
            masuk: 2,
        },
        {
            name: '>22',
            masuk: 4,
        },
        {
            name: '06-12',
            masuk: 3,
        },
        {
            name: '13-15',
            masuk: 1,
        },
    ];

    console.log(dataaa);

    const [startDate, setStartDate] = useState("2022-09-01");
    const [endDate, setEnddate] = useState("2022-09-07");
    const [startDate1, setStartDate1] = useState("2022-09-01");
    const [endDate1, setEnddate1] = useState("2022-09-07");
    const [startDate2, setStartDate2] = useState("2022-09-01");
    const [endDate2, setEnddate2] = useState("2022-09-07");

    const indexStartdat = (dataa.map(i => i.name)).indexOf(startDate);
    const indexEnddate = (dataa.map(i => i.name)).indexOf(endDate);
    const filterData = dataa.slice(indexStartdat, indexEnddate + 1);

    const indexStartdat1 = (datah.map(i => i.name)).indexOf(startDate1);
    const indexEnddate1 = (datah.map(i => i.name)).indexOf(endDate1);
    const filterData1 = datah.slice(indexStartdat1, indexEnddate1 + 1);
    console.log(data)
    console.log(field.selectedItem)
    const haha = (field.selectedItem).map(i => i.name)
    const datanya = data.filter(({ name }) => haha.includes(name))
    console.log(datanya)
    console.log(haha)

    return (
        <>
                <Row>
                    <Col xs={12} md={12} lg={8} style={{ background: 'none' }}>
                        <Card bg=" colReport1" >
                            <div className=" headBar text-center">
                                PERCENTAGE OF INCOMING STUDENT <br />AND EXIT
                            </div>
                            <Card.Body className="cardOne">
                                <ResponsiveContainer width={980} height={200}>
                                    <BarChart className="BarOne" data={filterData}>
                                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="keluar" fill="#8884d8" barSize={30} />
                                        <Bar dataKey="masuk" fill="#82ca9d" barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="d-flex flex-column">
                                    <div>
                                        <input className="text-center kartuatas shadow"
                                            id="startDate"
                                            type="date"
                                            placeholder="  Search ..."
                                            aria-label="tanggal awal"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <input className="text-center kartuatas shadow"
                                            id="startDate"
                                            type="date"
                                            placeholder=" Search ..."
                                            aria-label="tanggal awal"
                                            value={endDate}
                                            onChange={(e) => setEnddate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={12} lg={4}>
                        <Card bg=" colReport2 " >
                            <div className=" headBar text-center">
                                PERCENTAGE OF COURSE SELECTED THIS MONTH
                            </div>
                            <Card.Body className="text-white " >
                                <PieChart width={400} height={140} className="teah">
                                    <Pie data={datanya} dataKey="students" cx={230}
                                        cy={80}
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8" >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                                <div className="d-flex justify-content-between bwah">
                                    <div>
                                        <p>Keterangan: </p>
                                        <ul className="LegendList text-white">
                                            {datanya.map((entry, index) => (
                                                <li key={`item-${index}`}>
                                                    <div className="BulletLabel">
                                                        {/* <Bullet backgroundColor={entry.COLORS.fill} size="10px" /> */}
                                                        <div className="BulletLabelText">{entry.name}</div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p>      Total:</p>
                                        <div className="total">
                                            1 <span style={{ color: '#F4B61B' }}> Course</span>
                                        </div>
                                    </div>


                                </div>
                                <div className="text-center">

                                    <Multiselect
                                        placeholder="Select Data"
                                        options={data} // Options to display in the dropdown// Preselected value to persist in dropdown
                                        onSelect={handleChange} // Function will trigger on remove event
                                        onRemove={handleHapus}
                                        style={{
                                            chips: {
                                                background: 'red'
                                            },
                                            multiselectContainer: {
                                                color: 'red'
                                            },
                                            searchBox: {
                                                border: 'none',
                                                'border-bottom': '1px solid blue',
                                                'border-radius': '0px'
                                            }
                                        }}
                                        displayValue="name"
                                        popupHeight="200"
                                        popupWidth="200"
                                        showCheckbox // Property name to display in the dropdown options
                                    />

                                    {/* <select className="" style={{padding:'5px 100px'}} multiple
                        aria-label="Filter user ">
                        <option value="">Course</option>
                        {data.map((item) => (
                            <option value={item.name}>{item.name}</option>
                        ))}
                    </select> */}
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col xs={12} md={12} lg={8}>
                        <Card bg=" colReport1" >
                            <div className=" headBar text-center">
                                THE NUMBER OF STUDENTS  <br />CODING ACADEMY THIS MONTH
                            </div>
                            <Card.Body className="cardOne">
                                <BarChart className="BarTwo"
                                    width={980}
                                    height={200}
                                    data={filterData1}
                                >
                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="0-12" fill="#8884d8" radius={[30, 30, 0, 0]} barSize={10} />
                                    <Bar dataKey="13-15" fill="#82ca9d" radius={[30, 30, 0, 0]} barSize={10} />
                                    <Bar dataKey="16++" fill="#FF8042" radius={[30, 30, 0, 0]} barSize={10} />
                                </BarChart>
                                <div className="d-flex flex-column">
                                    <div>
                                        <input className="text-center kartuatas shadow"
                                            id="startDate"
                                            type="date"
                                            placeholder="  Search ..."
                                            aria-label="tanggal awal"
                                            value={startDate1}
                                            onChange={(e) => setStartDate1(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <input className="text-center kartuatas shadow"
                                            id="startDate"
                                            type="date"
                                            placeholder=" Search ..."
                                            aria-label="tanggal awal"
                                            value={endDate1}
                                            onChange={(e) => setEnddate1(e.target.value)}
                                        />
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={12} lg={4}>
                        <Card bg=" colReport2">
                            <div className=" headBar text-center">
                                PERCENTAGE OF ACADEMY CODING <br/> PRODUCTS FOR THIS MONTH
                            </div>
                            <Card.Body>
                                <ResponsiveContainer width={450} height={200}>
                                    <BarChart className="" data={dataaa} layout="vertical">
                                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                        <XAxis type="number" />
                                        <YAxis type="category" dataKey="name" />
                                        <Tooltip />
                                        <Legend />

                                        <Bar dataKey="masuk" fill="#82ca9d" barSize={15} />
                                    </BarChart>
                                </ResponsiveContainer>

                                <Multiselect
                                    placeholder="Select Data"
                                    options={data} // Options to display in the dropdown// Preselected value to persist in dropdown
                                    onSelect={handleChange} // Function will trigger on remove event
                                    onRemove={handleHapus}
                                    style={{
                                        chips: {
                                            background: 'red'
                                        },
                                        multiselectContainer: {
                                            color: 'red'
                                        },
                                        searchBox: {
                                            border: 'none',
                                            'border-bottom': '1px solid blue',
                                            'border-radius': '0px'
                                        }
                                    }}
                                    displayValue="name"
                                    singleSelect
                                    popupHeight="100"
                                    popupWidth="100"
                                    showCheckbox // Property name to display in the dropdown options
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </>
    )
}
export default Manreport;