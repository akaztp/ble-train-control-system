export const deviceId: string = NRF.getAddress();
export const shortDeviceId: string = deviceId.substr(12);
console.log('I shall say this only once!');
