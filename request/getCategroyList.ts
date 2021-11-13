import {pythonUrl} from './baseUrl';

type CategroyFunction = ({
  tag,
  page,
}: {
  tag: string;
  page: number;
}) => Promise<any>;

const getCategroyList: CategroyFunction = async ({tag, page = 0}) => {
  const res = await fetch(`${pythonUrl}/getCMExist`, {
    method: 'POST',
    body: JSON.stringify({tag: tag, page: page}),
  });
  const data = await res.json();
  // console.log(data);
};

export {getCategroyList};
