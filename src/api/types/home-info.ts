export interface HomeInfoResponse {
  traceId: string;
  code: number;
  msg: string;
  result: HomeInfoResult;
}

export interface HomeInfoResult {
  roomInfoList: RoomInfoList[];
}

export interface RoomInfoList {
  roomId: number;
  roomName: null | string;
  createTime: number | null;
  groupList: any[];
  deviceList: DeviceList[];
}

export interface DeviceList {
  logicDeviceType: number;
  isOwner: boolean;
  cid: string;
  uuid: string;
  macID: string;
  subDeviceNo: number;
  subDeviceType: null;
  deviceName: string;
  deviceImg: string;
  configModule: string;
  deviceRegion: string;
  type: string;
  deviceType: string;
  authKey: null;
  connectionType: string;
  currentFirmVersion: null;
  createTime: number;
  sharedPeople: any[];
  deviceStatus: string;
  connectionStatus: string;
  mode: null;
  speed: null;
  extension: Extension;
  deviceProp: null;
}

export interface Extension {
  airQuality: number;
  airQualityLevel: number;
  mode: string;
  fanSpeedLevel: string;
}
