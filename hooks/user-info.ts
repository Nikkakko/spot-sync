import { create } from 'zustand';

export type Item = {
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

type stepType = 'default' | 'selectArtist' | 'createProfile';

type UserInfoStore = {
  artists: UserInfo[];
  step: stepType | null;

  setArtist: (user: UserInfo) => void;
  setStep: (step: stepType) => void;

  nullArtist: () => void;

  selectedArtist: Item | null;
  setSelectedArtist: (selectedArtist: Item) => void;
};

export const useUserInfoStore = create<UserInfoStore>(set => ({
  artists: [],
  step: 'default',
  setArtist: artists => set(state => ({ artists: [artists] })),
  nullArtist: () => set(state => ({ artists: [] })),
  setStep: (step: stepType) => set(state => ({ step })),
  selectedArtist: null,
  setSelectedArtist: selectedArtist => set(state => ({ selectedArtist })),
}));
