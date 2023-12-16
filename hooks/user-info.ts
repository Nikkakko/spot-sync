import { create } from 'zustand';

type Item = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type UserInfo = {
  href: string;
  items: Item[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
};

type UserInfoStore = {
  artists: UserInfo[];
  setUser: (user: UserInfo) => void;
};

export const useUserInfoStore = create<UserInfoStore>(set => ({
  artists: [],
  setUser: artists => set(state => ({ artists: [artists] })),
}));
