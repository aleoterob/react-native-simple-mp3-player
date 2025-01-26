const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

export const endpoints = {
  getTrack: (trackId: string): string =>
    `${SPOTIFY_API_BASE_URL}/tracks/${trackId}`,
  getArtist: (artistId: string): string =>
    `${SPOTIFY_API_BASE_URL}/artists/${artistId}`,
  search: (query: string, type: string): string =>
    `${SPOTIFY_API_BASE_URL}/search?q=${query}&type=${type}`,
  getUserProfile: (): string => `${SPOTIFY_API_BASE_URL}/me`,
  getUserPlaylists: (): string => `${SPOTIFY_API_BASE_URL}/me/playlists`,
};
