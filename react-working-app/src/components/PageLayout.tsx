import Navbar from "react-bootstrap/Navbar";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props: { children: any; }) => {    

    return (
        <>
            <Navbar bg="secondary" variant="dark">
                <a className="navbar-brand" href="/" style={{paddingLeft: "20px"}}>Azure Digital Twins Working React App</a>               
            </Navbar>         
            <br />
            {props.children}
        </>
    );
    
};