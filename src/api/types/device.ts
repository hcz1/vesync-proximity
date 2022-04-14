// Generated by https://quicktype.io

export interface DeviceResponse {
  traceId: string;
  code: number;
  msg: string;
  result: Result;
}

export interface Result {
  deviceList: DeviceList[];
}

export interface DeviceList {
  cid: string;
  subDeviceNo: number;
  currentFirmVersion: null;
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