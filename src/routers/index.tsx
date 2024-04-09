import {useRoutes} from "react-router-dom";
import MainRoutes from "@/routers/MainRoutes";
import {AuthenticationRoutes} from "@/routers/AuthenticationRoutes";


const Routers = () => {
    return useRoutes([AuthenticationRoutes, MainRoutes])
}
export default Routers;