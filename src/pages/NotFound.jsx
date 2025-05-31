import { useEffect } from "react";
const NotFound = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <>
        <div>Ops! Elemento non trovato.</div>
    </>
};

export default NotFound;