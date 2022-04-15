const wifi = require("node-wifi");
type Connections = {
  signal_level: number;
}[];
export const wifi_init = () => {
  wifi.init({
    iface: null,
  });
  const getSignalLevel = async (): Promise<number> =>
    wifi
      .getCurrentConnections()
      .then((conn: Connections) => {
        const signal_level = conn[0].signal_level;
        console.log("Signal Level", signal_level);
        return signal_level;
      })
      .catch(() => {
        console.error("Error: Getting wifi signal level");
      });
  return getSignalLevel;
};
