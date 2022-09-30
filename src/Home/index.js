import React, { useState } from "react";
import Calendar from "react-calendar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect } from "react";
// import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Diagram Produk",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
      
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [100, 200, 300, 100, 500, 400, 900],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      yAxisID: "y",
    },
    {
      label: "Dataset 2",
      data: [200, 400, 800, 900, 1000, 300, 200],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y1",
    },
  ],
};

export const category = ["Website", "Game", "Robot", "Aplikasi", "Engineering"];
export const category_filter = [
  {
    id: 1,
    text: "( 06 - 12 Tahun )",
  },
  {
    id: 2,
    text: "( 12 - 15 Tahun )",
  },
  {
    id: 3,
    text: "( 16 - 19 Tahun )",
  },
];
export default function Dashboard() {
  const [kursus, setKursus] = useState(0);
  const [trainer, setTrainer] = useState(0);
  const [murid, setMurid] = useState(0);
  const cardCategory = [
    { name: "murid", api: "http://localhost:3000/students-count" },
    { name: "kursus", api: "http://localhost:3000/products-count" },
    { name: "trainer", api: "http://localhost:3000/employee-count" },
  ];

  const getData = () => {
    cardCategory.map((e) => {
      axios
        .get(e.api, {
          withCredentials: "true",
        })
        .then((response) => {
          if (e.name == "kursus") {
            setKursus(response.data);
          } else if (e.name == "murid") {
            setMurid(response.data);
          } else if (e.name == "trainer") {
            setTrainer(response.data);
          }
        });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex gap-3 dashboard__cart" >
        <div className="col-8 card" >
        
          <div className=" dashboard__card-container">
            <div className="dashboard__card p-5">
              <div className="card col dashboard__card-product">
                <h3>{murid}</h3>
                <h4 className="text-capitalize">Murid</h4>
              </div>
              <div className="card col dashboard__card-product">
                <h3>{kursus}</h3>
                <h4 className="text-capitalize">Kursus</h4>
              </div>
              <div className="card col dashboard__card-product">
                <h3>{trainer}</h3>
                <h4 className="text-capitalize">Trainer</h4>
              </div>
            </div>
          </div>
        </div>
        <Calendar className="col" showWeekNumbers />
      </div>
      <div className="row gap-5 mt-5 dashboard__cart">
        <div className="col card d-flex justify-content-center">
          <div className="d-flex justify-content-between ">
            <div
              className="d-flex justify-content-center align-self-center"
              style={{ width: "50%" }}
            >
              <div className="chekbox">
                {category.map((e, i) => (
                  <div class="form-check" key={i}>
                    <input
                      className="form-check-input chekbox"
                      type="checkbox"
                      value={e}
                      id={`flexCheckChecked-${e}`}
                    />
                    <label
                      class="form-check-label"
                      for={`flexCheckChecked-${e}`}
                    >
                      {e}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5">
              <div className="d-flex">
                <div className="chart_1"></div>
                <div className="chart_2 align-self-end"></div>
                <div className="chart_3 align-self-end"></div>
              </div>
              <h3 className="fs-2 mt-5">Keterangan</h3>
              {category_filter.map((e) => (
                <div className="d-flex" key={e.id}>
                  <div className={`chart_${e.id}-small`}></div>
                  <p>{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col card ">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
