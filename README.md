Creating an API that will hit the Auth0 Management API to retrieve all clients & rules from the users tenant and then output an array that groups all rules associated with a specific client.

To Test:

1.) Create an Auth0 Backend/API. https://auth0.com/docs/quickstart/backend/nodejs

2.) Fork this repository and clone a local copy.

3.) Run 'npm install' in it's root directory. 

4.) Create a .env file and inside assign the following values. These values can be found under the settings tab of the machine-to-machine app that shares the name of your newly created api. PORT can be assigned any open port, or it will default to 8080. Lastly, set the audience to the identifier, found under the settings tab, of the API you created:
    - PORT=
    - DOMAIN=
    - CLIENT_ID=
    - CLIENT_SECRET=
    - AUDIENCE=

5.) Ensure that you have set the appropriate permissions of you API machine-to-machine application to access at least the read:clients & read:rules scopes. 

6.) Start this server by running 'npm start' in it's root directory.

7.) Once the server is running, you can hit this endpoint ('http://localhost:{PORT}/mgmt/rules-per-app' ) with an exisiting application that sends an approprite jwt to the endpoint, or you can create a simple app to access this api.   