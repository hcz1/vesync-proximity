import init from "./init";
import { outsideRoom } from "./utils";

const run = async () => {
  const {
    fanPowerStatus,
    getSignalLevel,
    handleRoomFanStatus,
    initialRoomStatus,
  } = await init();
  let isActive = false;
  let isOutsideRoom = initialRoomStatus;

  setInterval(async () => {
    if (!isActive) {
      isActive = true;
      const signal_level = await getSignalLevel();
      const currIsOutsideRoom = outsideRoom(signal_level);
      if (isOutsideRoom !== currIsOutsideRoom) {
        const isFanOn = await fanPowerStatus();
        await handleRoomFanStatus(currIsOutsideRoom, isFanOn);
      }
      isActive = false;
      isOutsideRoom = outsideRoom(signal_level);
    }
  }, 2000);
};
run();
