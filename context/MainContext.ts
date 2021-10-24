import React from 'react';

type ComponentProps = {
  searchValue: string;
  setSearchValue: Function;
  bannerUrls: string[];
  setBannerUrls: Function;
};

export const ComponentsContext = React.createContext<ComponentProps | null>(
  null,
);
