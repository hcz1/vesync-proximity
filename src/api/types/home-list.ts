// Generated by https://quicktype.io

export interface HomeListResponse {
  traceId: string;
  code: number;
  msg: string;
  result: HomeListResult;
}

export interface HomeListResult {
  homeList: HomeList[];
}

export interface HomeList {
  homeId: number;
  homeName: string;
  nickname: null;
  email: null;
  type: number;
  inviteStatus: null;
  timestamp: null;
  createTime: string;
}
