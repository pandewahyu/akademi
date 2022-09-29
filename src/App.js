import "./App.css";
import LayoutDashboard from "./layout/layout";
import "@fontsource/roboto";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Login from "./halamanAwal/Login";
import LForm from "./halamanAwal/FormLogin";
import SignUp from "./halamanAwal/SignUp";
import Categori from "./mCategori/Categoriproduk";
import ListProduct from "./components/Mproduk/ListUnit";
import Units from "./Produkunit/mUnit";
import "react-calendar/dist/Calendar.css";
import Search from "./Mproduk/index";
import Dashboard from "./Home/index";
import MJadwal from "./Mjadwal/m_jadwal";
import Notes from "./Notes/index";
function App() {
  return (
    <Router>
      <div className="App wrapper">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/LForm">
            <LForm />
          </Route>
          <Route exact path="/SignUp" component={SignUp} />
          <LayoutDashboard>
            <Route exact path="/home" component={Dashboard} />
            <Route exact path="/mjadwal" component={MJadwal} />
            <Route exact path="/mproduk" component={Search} />
            <Route exact path="/categori" component={Categori}/>
            <Route exact path="/units" component={Units}/>
            <Route exact path="/Listunit/:id" component={ListProduct} />
            <Route exact path="/notes" component={Notes} />
          </LayoutDashboard>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
