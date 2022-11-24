import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Create from "./components/Create/Create";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path ="/" component={LandingPage}/>
      <Route exact path ="/home" component={Home}/>
      <Route exact path ="/create" component={Create}/>
      <Route exact path ="/pokemon/:id" component={Detail}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
