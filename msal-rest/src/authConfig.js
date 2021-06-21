export const msalConfig = {
  auth: {
    clientId: "{client id}",
    authority: "https://login.microsoftonline.com/{authority]",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["https://digitaltwins.azure.net/.default"],
};

export const adtHost =
  "{adt instance}";
