import { Outlet } from "react-router" 
import Header from "./Header"
import ArrowUp from "../components/ArrowUp"

export default function Layout () {

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <ArrowUp />
        </>
    )
}