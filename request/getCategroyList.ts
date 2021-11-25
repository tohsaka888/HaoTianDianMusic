import {pythonUrl} from './baseUrl';

type CategroyFunction = ({
  tags,
  page,
}: {
  tags: string;
  page: number;
}) => Promise<any>;

const getCategroyList: CategroyFunction = async ({tags = '娱乐'}) => {
  const res = await fetch(`${pythonUrl}/getPLCat`, {
    method: 'POST',
    body: JSON.stringify({tags: tags, page: -1}),
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  });
  const data = await res.json();
  return data.data || [];
};

export {getCategroyList};
