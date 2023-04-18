// .js file that handles api calls to server

const url = "https://just-enough-server.azurewebsites.net/api";
//const url = "http://localhost:3000";             // for testing purposes


async function ping() {
    currURL = url + "/ping";
    const response = await fetch(currURL);       
    const data = await response.text();
    console.log(data);
}

ping();
