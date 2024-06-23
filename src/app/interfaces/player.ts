export enum RolePlayerEnum {
  player,
  keeper,
}

export interface Player {
  id: number;
  firstname: string;
  lastname: string;
  role: RolePlayerEnum;
}
