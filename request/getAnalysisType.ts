import {pythonUrl} from './baseUrl';

const getAnalysisType = async () => {
  const res = await fetch(`${pythonUrl}/getDataTableN`, {
    method: 'POST',
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  });
  const data = await res.json();
  return data.success ? data.data : [];
};

export {getAnalysisType};
