const OUTSIDE_THRESHOLD = -40;
export const outsideRoom = (signal_level: number) =>
  signal_level <= OUTSIDE_THRESHOLD;
export const userRoomStatusStr = (isOutsideRoom: boolean) =>
  isOutsideRoom ? "outside" : "inside";
export const logUserRoomStats = (isOutsideRoom: boolean) =>
  console.log(`User is ${userRoomStatusStr(isOutsideRoom)} room`);
