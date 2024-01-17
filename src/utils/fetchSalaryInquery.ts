const API_URL = 'https://servicios.mef.gov.py/consultas-publicas/api/pagos/data';

export default async (urlParams?: string) => {
  try {
    const response = await fetch(
      `${API_URL}?${
        typeof urlParams !== 'undefined' && urlParams?.length > 0
          ? urlParams
          : ''
      }`,
    );
    const data = await response.json();
    //console.log(data);
    if (data.estado.trim() == "error") {
      const transformData = {...data,
      result: [[data.result]]};
      //console.log(transformData);
      return Promise.resolve(transformData);
    } else {
      return Promise.resolve(data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};