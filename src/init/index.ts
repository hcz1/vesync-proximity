import vesync_init from "./vesync_init";
import { wifi_init } from "./wifi_init";

const init = async () => {
  const vesyncApi = await vesync_init();
  const getSignalLevel = wifi_init();
  return { ...vesyncApi, getSignalLevel };
};

export default init;
