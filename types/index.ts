interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export type artisAlbumType = {
  name: string;
  images: [
    {
      url: string;
    }
  ];
  release_date: string;
  external_urls: {
    spotify: string;
  };
  album_type: string;
};

interface Followers {
  href: null;
  total: number;
}

interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  followers: Followers;
  genres: string[];
  name: string;
  type: string;
  uri: string;
  images: Image[];
  popularity: number;
}

interface ExternalIds {
  isrc: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}
