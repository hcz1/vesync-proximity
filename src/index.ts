import init from "./init";

import { outsideRoom } from "./utils";

const run = async () => {
  const { fanPowerStatus, getSignalLevel, handleRoomFanStatus } = await init();
  const signal_level = await getSignalLevel();
  const isFanOn = await fanPowerStatus();
  let isActive = false;
  let isOutsideRoom = outsideRoom(signal_level);
  await handleRoomFanStatus(isOutsideRoom, isFanOn);
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
