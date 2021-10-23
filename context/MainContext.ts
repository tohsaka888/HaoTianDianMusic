import React from 'react';

type ComponentProps = {
  searchValue: string;
  setSearchValue: Function;
};

export const ComponentsContext = React.createContext<ComponentProps | null>(
  null,
);
