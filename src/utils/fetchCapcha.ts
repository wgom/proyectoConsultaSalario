const API_URL = "https://servicios.mef.gov.py/consultas-publicas/api/captcha";
//const API_URL = "https://api.nasa.gov/planetary/apod?api_key=ddD6cUCw6XidX2AZRYaKghcRGrjrnMGWyWMXAtS6";


export default async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    //console.log(data);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};