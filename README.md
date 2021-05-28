Creating an endpoint that will hit the Auth0 Management API to retrieve all clients & rules from the users tenant and then output an object that groups all rules associated with a specific client.

To Test:

1.) Fork this repository and clone a local copy.

2.) Create a .env file and inside asign the following values:
    - PORT=
    - DOMAIN=
    - ACCESS_TOKEN=

3.) Start this server by running npm start in it's root directory.

4.) Once the server is running navigate to the endpoint in a webbrowser, for example 'http://localhost:{PORT}/auth0' to view the results.