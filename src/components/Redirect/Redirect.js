import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = props => {
    const navigate = useNavigate();

    useEffect(() => {  
        if (!props.to) {
            console.warn('The redirect component is missing the "to" prop.')
        }
        return navigate(props.to);
    }, []);

    return null

}

export default Redirect