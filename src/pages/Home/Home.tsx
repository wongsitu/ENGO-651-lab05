import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'; // theme css file
import { DateRange, Range } from 'react-date-range';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useLocations } from '../../services/locations/locations';
import { format } from '../../utils/format';
import useDebounce from '../../hooks/useDebounce';
import ConnectionForm from './ConnectionForm';
import TopicForm from './TopicForm';
import Tabs from './Tabs';
import MessageForm from './MessageForm';

const Home = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState<'CONNECT' | 'MESSAGES'>(
    'CONNECT',
  );
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
      topic: 'ENGO651/Waika',
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
  const clientId = `${Math.random() * 10000}`;
  const client = useMemo(
    () => new Paho.MQTT.Client(host, Number(port), clientId),
    [host, port, clientId],
  );

  client.onConnectionLost = () => {
    setIsConnected(false);
    setCurrentTab('CONNECT');
  };
  client.onMessageArrived = (message) => {
    setMessages((state) => [...state, message.payloadString]);
  };

  return (
    <div className="relative">
      <div className="p-4 absolute top-0 left-0 right-0 z-[9999] bg-white">
        <Tabs
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isConnected={isConnected}
        />
        {currentTab === 'CONNECT' && (
          <>
            <FormProvider {...connectionFormMethods}>
              <ConnectionForm
                isConnected={isConnected}
                client={client}
                setIsConnected={setIsConnected}
              />
            </FormProvider>
            {isConnected && (
              <FormProvider {...topicFormMethods}>
                <TopicForm client={client} />
              </FormProvider>
            )}
          </>
        )}
        {currentTab === 'MESSAGES' && (
          <FormProvider {...messageFormMethods}>
            <MessageForm client={client} topic={topic} messages={messages} />
          </FormProvider>
        )}
      </div>

      <div className="h-screen">
        <MapContainer center={position} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* <MarkerClusterGroup chunkedLoading>
            {locations.map((el, idx) =>
              el.properties.latitude && el.properties.longitude ? (
                <Marker
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  position={{
                    lat: parseFloat(el.properties.latitude),
                    lng: parseFloat(el.properties.longitude),
                  }}
                >
                  <Popup>
                    <p>Issue date: {el.properties.issueddate}</p>
                    <p>Work class group: {el.properties.workclassgroup}</p>
                    <p>Contractor name: {el.properties.contractorname}</p>
                    <p>community name: {el.properties.communityname}</p>
                    <p>Original adress: {el.properties.originaladdress}</p>
                  </Popup>
                </Marker>
              ) : null,
            )}
          </MarkerClusterGroup> */}
        </MapContainer>
      </div>
    </div>
  );
};

export default Home;
