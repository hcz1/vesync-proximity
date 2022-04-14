import axios from "axios";

const http = axios.create({
  baseURL: "https://smartapi.vesync.com/",
  responseType: "json",
});
export enum BodyMethod {
  GET_FIRMWARE_UPDATE_INFO_LIST = "getFirmwareUpdateInfoList",
  LOGIN_V2 = "loginV2",
  BYPASS_V2 = "bypassV2",
  GET_HOME_DEVICE_STATUS = "getHomeDeviceStatus",
  GET_HOME_INFO = "getHomeInfo",
  GET_HOME_DETAIL = "getHomeDetail",
  GET_HOME_LIST = "getHomeList",
  DEVICES = "devices",
}
const toggleBody = (state: boolean) => ({
  payload: {
    source: "APP",
    method: "setSwitch",
    data: {
      id: 0,
      enabled: state,
    },
  },
});
const post = async <T>(url: string, body: any, headers?: any) =>
  http.post<T>(url, body, { tz: "Europe/London", ...headers });
export type BodyProps = {
  username?: string;
  password?: string;
  token?: string;
  accountID?: string;
  method: BodyMethod;
  cidList?: string[];
  cid?: string;
  toggle?: boolean;
  deviceList?: Array<{ subDeviceNo: number; cid: string }>;
  homeId?: number;
};
const body = ({
  username,
  password,
  token,
  accountID,
  method,
  cidList,
  toggle,
  cid,
  deviceList,
  homeId,
}: BodyProps) => ({
  ...(typeof toggle === "boolean" ? toggleBody(toggle) : {}),
  userType: "1",
  userCountryCode: "GB",
  phoneOS: "iOS 15.4.1",
  acceptLanguage: "en",
  phoneBrand: "iPhone",
  timeZone: "Europe/London",
  appVersion: "VeSync 3.2.20 build6",
  traceId: Date.now(),
  configModule: "WiFiBTOnboarding_AirPurifier_Core200S_EU",
  ...(token ? { token } : {}),
  ...(homeId ? { homeId } : {}),
  ...(password ? { password } : {}),
  ...(accountID ? { accountID } : {}),
  ...(username ? { email: username } : {}),
  ...(method ? { method } : {}),
  ...(cidList ? { cidList } : {}),
  ...(cid ? { cid } : {}),
  ...(method === BodyMethod.GET_FIRMWARE_UPDATE_INFO_LIST
    ? { macIDList: [] }
    : {}),
  ...(deviceList ? { deviceList } : {}),
  ...([
    BodyMethod.GET_HOME_DEVICE_STATUS,
    BodyMethod.GET_HOME_INFO,
    BodyMethod.GET_HOME_DETAIL,
  ].includes(method)
    ? { debugMode: false }
    : {}),
});

export { http, post, body };
