export const client = new Paho.MQTT.Client(
  window.location.hostname,
  Number(1883),
  'clientId',
);
