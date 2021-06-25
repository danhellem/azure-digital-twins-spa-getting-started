import { useMsal } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";

import Button from "react-bootstrap/Button";

function handleLogout(instance: IPublicClientApplication) {
    instance.logoutRedirect().catch((e: any) => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will redirect the page to the logout prompt
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    return (
        <Button variant="secondary" className="ml-auto" onClick={() => handleLogout(instance)}>Sign out using Redirect</Button>
    );
}