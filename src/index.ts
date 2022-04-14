import "dotenv/config";
import init from "./init";

import { outsideRoom, logUserRoomStats } from "./utils";

const run = async () => {
  const { sendMessage, fanPowerStatus, getSignalLevel } = await init();
  const signal_level = await getSignalLevel();
  let isActive = false;
  let isOutsideRoom = outsideRoom(signal_level);
  logUserRoomStats(isOutsideRoom);
  setInterval(async () => {
    if (!isActive) {
      isActive = true;
      const signal_level = await getSignalLevel();
      console.log("Signal Level", signal_level);
      const currIsOutsideRoom = outsideRoom(signal_level);
      if (isOutsideRoom !== currIsOutsideRoom) {
        logUserRoomStats(currIsOutsideRoom);
        const isFanOn = await fanPowerStatus();
        if (currIsOutsideRoom && isFanOn) {
          console.log("Attempt: Turn fan off");
          await sendMessage(false).catch(() => {
            console.error("Error: Turn fan off");
          });
          console.log("Success: Turn fan off");
        } else if (!currIsOutsideRoom && !isFanOn) {
          console.log("Attempt: Turn fan on");
          await sendMessage(true).catch(() => {
            console.error("Error: Turn fan on");
          });
          console.log("Success: Turn fan on");
        }
      }
      isActive = false;
      isOutsideRoom = outsideRoom(signal_level);
    }
  }, 2000);
};
run();
