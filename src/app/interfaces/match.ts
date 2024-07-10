export enum StatusEnum {
  notstarted,
  inprogress,
  closed,
}

export interface Match {
  id: number;
  versus: string;
  date: Date;
  score: string;
  isHome: boolean;
  status: StatusEnum;
}
