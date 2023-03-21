// .js file that handles api calls to server

const url = "https://just-enough-server.azurewebsites.net/";
//const url = "http://localhost:3000";             // for testing purposes

url += "api";

async function ping() {
    const response = await fetch(url + "/ping");       
    const data = await response.text();
    console.log(data);
}

ping();