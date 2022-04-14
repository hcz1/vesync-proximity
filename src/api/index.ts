import crypto from "crypto";
import {
  CommandResponse,
  DeviceResponse,
  HomeDetailReponse,
  HomeInfoResponse,
  HomeListResponse,
} from "./types";
import { body, BodyMethod, BodyProps, post } from "./http";
import { LoginReponse } from "./types/login";

const USERNAME = process.env.VESYNC_USERNAME as string;
const PASSWORD = process.env.VESYNC_PASSWORD as string;

export const vesyncApi = () => {
  let _accountID: string;
  let _token: string | undefined;
  let _body = (props: BodyProps) =>
    body({ accountID: _accountID, token: _token, ...props });
  async function login(
    username: string = USERNAME,
    password: string = PASSWORD
  ) {
    const pwdHashed = crypto.createHash("md5").update(password).digest("hex");
    const response = await post<LoginReponse>(
      "cloud/v2/user/loginV2",
      body({ username, password: pwdHashed, method: BodyMethod.LOGIN_V2 })
    );

    if (!response || !response.data) {
      throw new Error("Invalid login response from Vesync API.");
    }

    const { result } = response.data;
    _accountID = result.accountID;
    _token = result.token;
  }
  async function getHomeId() {
    const { data } = await post<HomeListResponse>(
      "cloud/v1/homeManaged/getHomeList",
      _body({
        method: BodyMethod.GET_HOME_LIST,
      })
    );
    return data.result.homeList[0].homeId;
  }
  async function getHomeDetail() {
    const { data } = await post<HomeDetailReponse>(
      "cloud/v1/homeManaged/getHomeDetail",
      _body({
        method: BodyMethod.GET_HOME_DETAIL,
      })
    );
    return data;
  }
  async function getHomeInfo(homeId: number, room: string = "Study") {
    const { data } = await post<HomeInfoResponse>(
      "cloud/v1/homeManaged/getHomeInfo",
      _body({
        method: BodyMethod.GET_HOME_INFO,
        homeId,
      })
    );
    return data.result.roomInfoList.find((_room) => _room?.roomName === room);
  }

  const sendMessage = (cid: string) => async (toggle: boolean) => {
    await post<CommandResponse>(
      "/cloud/v2/deviceManaged/bypassV2",
      _body({
        method: BodyMethod.BYPASS_V2,
        cid,
        toggle,
      }),
      { tk: _token, accountid: _accountID }
    );
  };

  const fanPowerStatus = (cid: string) => async () => {
    const response = await post<DeviceResponse>(
      "/cloud/v1/homeManaged/getHomeDeviceStatus",
      _body({
        method: BodyMethod.GET_HOME_DEVICE_STATUS,
        deviceList: [
          {
            subDeviceNo: 0,
            cid,
          },
        ],
      }),
      { tk: _token, accountid: _accountID }
    );
    return response.data.result.deviceList[0].deviceStatus == "on";
  };
  return {
    login,
    sendMessage,
    fanPowerStatus,
    getHomeInfo,
    getHomeDetail,
    getHomeId,
  };
};
