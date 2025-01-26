let accessToken: string =
  "BQCJrdUHsuyeefRi1xgZrZcNz6-n0l9GLaiz6YxKuhwI7E-unacDNv1JHlQoRfNEmR1eVlipo35xoE4aRNEPYglxA9HsSTA84enQJfWArUoLRsR5DsQ";

export const setAccessToken = (token: string): void => {
  accessToken = token;
};

export const getAccessToken = (): string => {
  return accessToken;
};
