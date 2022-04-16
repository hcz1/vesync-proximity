const OUTSIDE_THRESHOLD = -40;
export const outsideRoom = (signal_level: number) =>
  signal_level <= OUTSIDE_THRESHOLD;
export const userRoomStatusStr = (isOutsideRoom: boolean) =>
  isOutsideRoom ? "outside" : "inside";
export const logUserRoomStatus = (isOutsideRoom: boolean) =>
  console.log(`User is ${userRoomStatusStr(isOutsideRoom)} room`);
export const logAttempt = (attemptStr: string) =>
  console.log(`Attempt: ${attemptStr}`);
export const logSuccess = (attemptStr: string) =>
  console.log(`Success: ${attemptStr}`);
