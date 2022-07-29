export interface TokenInterface {
  token: string;
  expire: number;
}

export interface JwtInterface {
  id: string;
  iat: number;
  exp: number;
}

export interface TokenReturnInterface {
  token: string;
  expire: number;
}
