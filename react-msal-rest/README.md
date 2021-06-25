# React app using MSAL and REST

This project is an example on how to get started with a React app connecting to Azure Digital Twins. It is using MSAL.js for authentication and making direct calls to the Azure Digital Twins REST API's.

### ⚠ Caution ⚠

CORS is not yet supported by Azure Digital Twins. So a proxy is used to work around this issue. This is a security risk.

We **do not** recommend you use the structure of this application in a production environment. It is inteded to be run locally to validate your proof of concept using Azure Digitial Twins. It is not production ready!

### `App registration`

Before you get started with the project, you must register your application in the Microsoft identity platform. [Follow these steps](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-app-registration).

### `authConfig.js`

Once you register your application, you need to configure the ``authConfig.js`` with the appropiate values. The file has been setup to work as is, but you need to enter values in for the following:

```
...
auth: {
    clientId: "Enter_the_Application_Id_Here",
    authority: "https://login.microsoftonline.com/Enter_the_Tenant_Info_Here",
    ...
  },
  ...
  export const adtHost = "Enter_the_Azure_Digital_Twins_Instance_Name_Here";

```
### `npm install`

Before getting started, run ``npm install`` to restore on the dependent packages.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

To learn about Single-page applications using MSAL.js, checkout the turorials for [React](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-react), [JavaScript](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-javascript-auth-code), and [Angular](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-angular-auth-code)

To learn more about the Azure Digital Twins REST API's, see the offical documentation here: [https://docs.microsoft.com/en-us/rest/api/azure-digitaltwins/](https://docs.microsoft.com/en-us/rest/api/azure-digitaltwins/)
