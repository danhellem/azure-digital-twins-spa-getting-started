# Code Examples for a Azure Digital Twins Single-page Application

This repo contains several sample projects of examples on how to connect to Azure Digital Twins from a Single-page Application (SPA). 

- [React, using @azure/identity with direct calls to Azure Digital Twins REST API's](./react-azure-identity-rest)
- [React, using @azure/identity with the Azure Digital Twins SDK](./react-azure-identity-sdk)
- [React, uing MSAL with direct calls to Azure Digital Twins REST API's](./react-msal-rest)
- [React, using MSAL with the Azure Digital Twins SDK](./react-msal-sdk)

### ⚠ Caution ⚠

CORS is not yet supported by Azure Digital Twins. So a proxy is used to work around this issue. This is a security risk.

We **do not** recommend you use these examples in production environment. It is inteded to be run locally to validate your proof of concept using Azure Digitial Twins. It is not production ready!
