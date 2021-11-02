import {createContext} from 'react';

type SearchProps = {
  result: any[];
  searchValue?: string;
  setSearchValue?: string;
  setResult: Function;
};

const SearchContext = createContext<SearchProps | null>(null);

export {SearchContext};
