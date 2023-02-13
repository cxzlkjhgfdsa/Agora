import axios from "axios";

const APPLICATION_SERVER_URL = "http://localhost:5000/";

const getToken = async(mySessionId) => {
  const sessionId = await createSession(mySessionId);
  return await createToken(sessionId);
}

const createSession = async(sessionId) => {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
        headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The sessionId
}

const createToken = async(sessionId) => {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
        headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The token
}


export default getToken