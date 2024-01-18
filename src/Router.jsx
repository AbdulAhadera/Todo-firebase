
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./SignUp";
import Login from "./Login";
import TodoApp from "./todo";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./Config";
import AboutUser from "./Pages/AboutUser";

const Router = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const auth = getAuth()

    useEffect(() => {
        const authChange = () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                     setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            });
        };

        authChange();
    }, []);

    if (isAuthenticated === null) {

        return <p>Loading...</p>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                <Route path="/about" element={isAuthenticated ? <AboutUser /> : <Navigate to="/login" />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/todo" element={isAuthenticated ? <TodoApp /> : <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
