import {createBrowserRouter} from "react-router-dom";
import MainRoutes from "@/routers/MainRoutes";
import {AuthenticationRoutes} from "@/routers/AuthenticationRoutes";


const Routers = createBrowserRouter([AuthenticationRoutes,MainRoutes], {
  basename: import.meta.env.BASE_URL
});
export default Routers;