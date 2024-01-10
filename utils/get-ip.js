import os from "os";
export const getIP = () => os?.networkInterfaces()?.Ethernet?.pop()?.address;
