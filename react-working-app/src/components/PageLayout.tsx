import Navbar from "react-bootstrap/Navbar";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props: { children: any; }) => {    

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <a className="navbar-brand" href="/" style={{paddingLeft: "20px"}}>ADT using the Sdk - @Azure/Identity React Tutorial</a>               
            </Navbar>         
            <br />
            {props.children}
        </>
    );
    
};