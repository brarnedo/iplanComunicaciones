import { Outlet } from "react-router-dom";
import { Header} from "componentesUI";

export const Layout = () =>{

    return(
    <>
        <div className="min-h-screen w-full flex flex-col"> 
            <Header />
           <Outlet />
        </div>
    </>
    )
}

