export enum RoleAppEnum {
  admin,
  modo,
  viewer,
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: RoleAppEnum;
}
