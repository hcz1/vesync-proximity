import { vesyncApi } from "../api";
const vesync_init = async () => {
  const { login, sendMessage, fanPowerStatus, getHomeInfo, getHomeId } =
    vesyncApi();
  await login();
  const homeId = await getHomeId();
  const room = await getHomeInfo(homeId);
  const cid = room?.deviceList[0].cid;
  return {
    sendMessage: sendMessage(cid!),
    fanPowerStatus: fanPowerStatus(cid!),
  };
};
export default vesync_init;
