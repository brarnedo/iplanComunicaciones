import { Outlet } from "react-router-dom";
import { Header} from "componentesUI";

export const Layout = () =>{

    return(
    <>
    
        <Header />
       
        <Outlet />
    </>
    )
}

