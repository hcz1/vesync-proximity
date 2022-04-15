import "dotenv/config";
import { logAttempt, logSuccess, logUserRoomStatus } from "../utils";
import vesync_init from "./vesync_init";
import { wifi_init } from "./wifi_init";

const init = async () => {
  const vesyncApi = await vesync_init();
  const getSignalLevel = wifi_init();
  const handleInsideRoom = async () => {
    logAttempt("Turn fan on");
    await vesyncApi.sendMessage(true).catch(() => {
      console.error("Error: Turn fan on");
    });
    logSuccess("Turn fan on");
  };
  const handleOutsideRoom = async () => {
    logAttempt("Turn fan off");
    await vesyncApi.sendMessage(false).catch(() => {
      console.error("Error: Turn fan off");
    });
    logSuccess("Turn fan off");
  };
  const handleRoomFanStatus = async (
    isOutsideRoom: boolean,
    isFanOn: boolean
  ) => {
    logUserRoomStatus(isOutsideRoom);
    if (isOutsideRoom && isFanOn) {
      await handleOutsideRoom();
    } else if (!isOutsideRoom && !isFanOn) {
      await handleInsideRoom();
    }
  };
  return { ...vesyncApi, getSignalLevel, handleRoomFanStatus };
};

export default init;
