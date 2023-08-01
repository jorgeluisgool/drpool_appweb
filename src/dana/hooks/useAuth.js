import { useContext } from "react";
import { ExampleContex } from "../context/ExampleContext";

const useAuth = () => {
    return useContext(ExampleContex)
}

export default useAuth;