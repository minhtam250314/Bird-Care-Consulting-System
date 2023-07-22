import React from "react";
import { BrowserRouter as Router, Route, Routes, redirect, useNavigate} from "react-router-dom";
import Login from "./Login";
import Admin from "../Admin/Page/Admin"
export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/Admin" render={() => {
                    return localStorage.getItem("Data") ? <Admin /> : redirect("/");
                }}>

                </Route>
                <Route path="/dang-nhap">
                    <Login />
                </Route>
            </Routes>
        </Router>
    )
}

