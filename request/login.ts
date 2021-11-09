import {baseUrl} from './baseUrl';

const setLogin = async (phone: string, password: string) => {
  const res = await fetch(
    `${baseUrl}/login/cellphone?phone=${phone}&password=${password}`,
  );
  const data = await res.json();
  return data.profile;
};

export {setLogin};
