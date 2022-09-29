import "../App.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import React, { useState } from "react";


const LayoutDashboard = ({children}) =>{
const [active, setActive] = useState(false);


    return(
        <>
        <div>
        <Sidebar active={active} />
        <Header active={active} setActive={setActive} />
        <main
            className={
            active
                ? "content_active page-content p-5 mt-5"
                : "page-content p-5 mt-5 content"
            }
        >
            {children}
        </main>
        </div>
        
        </>
    )
}

export default LayoutDashboard;