import { useState } from "react";
import { useAuth } from "../../context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";


function AdminRoutes() {
    const[ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(()=>{
        const authCheck = async()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/is-admin`,{
                    headers : {
                        'Authorization' : `Bearer ${auth?.token}`
                    }
                })
                setOk(res.data.ok)
            } catch (error) {
                console.log(error);
                setOk(false);
            }
        }
        if(auth?.token) authCheck();
    },[auth?.token]);

    return ok ?<Outlet /> : <Spinner />
}

export default AdminRoutes