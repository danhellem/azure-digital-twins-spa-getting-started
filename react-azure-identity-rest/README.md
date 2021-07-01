# React app using @azure/identity and REST

This project is an example on how to get started with a React app connecting to Azure Digital Twins. It is using @azure/identity for authentication and making direct calls to the Azure Digital Twins REST API's.

### ⚠ Caution ⚠

CORS is not yet supported by Azure Digital Twins. So a proxy is used to work around this issue. This is a security risk.

We **do not** recommend you use the structure of this application in a production environment. It is inteded to be run locally to validate your proof of concept using Azure Digitial Twins. It is not production ready!

### `App registration`

Before you get started with the project, you must register your application in the Microsoft identity platform. [Follow these steps](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-app-registration).

### `authConfig.tsx`

Once you register your application, you need to configure the ``authConfig.tsx`` with the appropiate values. The file has been setup to work as is, but you need to enter values in for the following:

```
export const authConfig = {  
    clientId: "enter_the_application_id_here",
    tenantId: "enter_the_tenant_id_here",    
};

export const adtHost = "enter_your_azure_digital_twins_instance_name_here";

```
### `npm install`

Before getting started, run ``npm install`` to restore on the dependent packages.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

To learn about Single-page applications using @azure/identity sdk, check out the examples at [https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md](https://github.com/Azure/azure-sdk-for-js/blob/hotfix/identity_1.3.0/sdk/identity/identity/samples/AzureIdentityExamples.md)

To learn more about the Azure Digital Twins REST API's, see the offical documentation here: [https://docs.microsoft.com/en-us/rest/api/azure-digitaltwins/](https://docs.microsoft.com/en-us/rest/api/azure-digitaltwins/)
