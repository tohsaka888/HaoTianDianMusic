import {pythonUrl} from './baseUrl';

const getCategoryDetail = async (tags: string, page = 1) => {
  const res = await fetch(`${pythonUrl}/getPLCat`, {
    method: 'POST',
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({tags: tags, page: page}),
  });
  const data = await res.json();
  return data.success ? data.result : [];
};

export {getCategoryDetail};
