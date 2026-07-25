import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Servers from "./pages/Servers";


import AuroraBackground from "./components/layout/AuroraBackground";



export default function App(){


return (

<BrowserRouter>


<AuroraBackground />


<Routes>


<Route
path="/"
element={<Login />}
/>


<Route
path="/dashboard"
element={<Dashboard />}
/>


<Route
path="/users"
element={<Users />}
/>


<Route
path="/servers"
element={<Servers />}
/>



</Routes>


</BrowserRouter>

);


}