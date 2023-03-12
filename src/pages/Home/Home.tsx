/* eslint-disable no-nested-ternary */
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'; // theme css file
import L from 'leaflet';
import { useMemo, useState } from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { FormProvider, useForm } from 'react-hook-form';
import ConnectionForm from './ConnectionForm';
import TopicForm from './TopicForm';
import Tabs from './Tabs';
import MessageForm from './MessageForm';
import { StatusType } from './types';
import { MessageSchema, StatusSchema } from './schemas';
import { Collapse } from '../../components/Collapse';

const redMarker = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
  className: 'red-marker',
});

const greenMarker = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
  className: 'green-marker',
});

const blueMarker = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
  className: 'green-marker',
});

const Home = () => {
  const [open, setOpen] = useState(true);
  const [subscribed, setSubcribed] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<
    { [key: string]: { message: string }[] } | undefined
  >(undefined);
  const [status, setStatus] = useState<StatusType[]>([]);
  const [currentTab, setCurrentTab] = useState<
    'CONNECT' | 'MESSAGES' | 'SHARE_STATUS'
  >('CONNECT');
  const connectionFormMethods = useForm({
    mode: 'onChange',
    defaultValues: {
      host: 'test.mosquitto.org',
      port: 8081,
    },
  });
  const topicFormMethods = useForm({
    mode: 'onChange',
    defaultValues: {
      topic: 'ENGO651/Waika/my temperature',
    },
  });

  const messageFormMethods = useForm({
    mode: 'onChange',
    defaultValues: {
      message: '',
    },
  });

  const position = { lat: 51.0447, lng: -114.0719 };

  const host = connectionFormMethods.watch('host');
  const port = connectionFormMethods.watch('port');
  const topic = topicFormMethods.watch('topic');
  const client = useMemo(
    () =>
      new Paho.MQTT.Client(
        import.meta.env.PROD
          ? `wss://${host}:${port}/mqtt`
          : `ws://${host}:${port}/mqtt`,
        `${Math.random() * 10000}`,
      ),
    [host, port],
  );

  client.onConnectionLost = () => {
    setIsConnected(false);
    setCurrentTab('CONNECT');
  };
  client.onMessageArrived = (message) => {
    const payload = JSON.parse(message.payloadString);

    if (MessageSchema.safeParse(payload).success) {
      setMessages((state) => ({
        ...state,
        [topic]: state && state[topic] ? [...state[topic], payload] : [payload],
      }));
    } else if (StatusSchema.safeParse(payload).success) {
      setStatus((state) => [...state, payload]);
    }
  };

  return (
    <div className="relative">
      <div className="p-4 absolute top-0 left-0 right-0 z-[9999] bg-white">
        <Tabs
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isConnected={isConnected}
          open={open}
          setOpen={setOpen}
        />
        <Collapse open={open} collapsedHeight={0}>
          <>
            {currentTab === 'CONNECT' && (
              <>
                <FormProvider {...connectionFormMethods}>
                  <ConnectionForm
                    isConnected={isConnected}
                    client={client}
                    setIsConnected={setIsConnected}
                  />
                  {isConnected && (
                    <div
                      className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                      role="alert"
                    >
                      <div className="flex">
                        <div className="py-1">
                          <svg
                            className="fill-current h-6 w-6 text-teal-500 mr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold">Connected to MQTTX</p>
                          <p className="text-sm">
                            Make sure to subscribe to a topic before sending any
                            message
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </FormProvider>
              </>
            )}
            {currentTab === 'MESSAGES' && (
              <>
                {subscribed ? (
                  <>
                    <button
                      type="submit"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full mb-2"
                      onClick={() => {
                        client.unsubscribe(topic);
                        setSubcribed(false);
                      }}
                    >
                      Unsubscribe
                    </button>
                    <FormProvider {...messageFormMethods}>
                      <MessageForm
                        client={client}
                        topic={topic}
                        messages={messages ? messages[topic] || [] : []}
                      />
                    </FormProvider>
                  </>
                ) : (
                  <FormProvider {...topicFormMethods}>
                    <TopicForm client={client} setSubcribed={setSubcribed} />
                  </FormProvider>
                )}
              </>
            )}
          </>
        </Collapse>
      </div>
      <div className="h-screen">
        <MapContainer center={position} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup chunkedLoading>
            {status.map((el, idx) => (
              <Marker
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                position={{
                  lat: el.latitude,
                  lng: el.longitude,
                }}
                icon={
                  el.temperature <= 10
                    ? greenMarker
                    : el.temperature >= 30
                    ? redMarker
                    : blueMarker
                }
              >
                <Popup>
                  <p>Temperature: {el.temperature}C</p>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default Home;
