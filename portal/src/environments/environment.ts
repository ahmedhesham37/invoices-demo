// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr: false,
    keycloak: {
        // Url of the Identity Provider
        issuer: "http://localhost:8081/auth/",

        // Realm
        realm: "IS_REALM",

        // The SPA's id.
        // The SPA is registerd with this id at the auth-serverß
        clientId: "IS_PORTAL",
    },
};
