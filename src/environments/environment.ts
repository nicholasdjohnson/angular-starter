// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:3000/quarantine-api/v1',
  BASE_URL: 'http://localhost:4200',
  AUTH_URL: 'https://login.microsoftonline.com/4696492d-646d-4d3c-9465-6c5a36f31a16/v2.0',
  CLIENT_ID: '5b3af20e-0f33-4ee2-8113-def5eb623280',
  TENANT_ID: '4696492d-646d-4d3c-9465-6c5a36f31a16'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
