import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { MessageType } from './types';

type FormData = {
  message: string;
};

const MessageForm: FC<{
  client: Paho.MQTT.Client;
  topic: string;
  messages: MessageType[];
}> = ({ client, topic, messages }) => {
  const [{ longitude, latitude }, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((response) => {
      setLocation((state) => ({
        ...state,
        latitude: response.coords.latitude,
        longitude: response.coords.longitude,
      }));
    });
  }, []);

  const { register, formState, handleSubmit, reset } =
    useFormContext<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (client) {
      const payload = {
        message: data.message,
      };
      const message = new Paho.MQTT.Message(JSON.stringify(payload));

      message.destinationName = topic;
      client.send(message);
      reset();
    }
  };

  const onShareLocation = () => {
    const scaled = Math.random() * 100 - 40;
    const temperature = Math.round(scaled);

    const payload = {
      latitude,
      longitude,
      temperature,
    };
    const message = new Paho.MQTT.Message(JSON.stringify(payload));

    message.destinationName = topic;
    client.send(message);
  };

  return (
    <>
      <div className="bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-4 overflow-auto h-32">
        {messages.map((msg) => (
          <div
            key={msg.message}
            className="p-2 mb-2 rounded border border-gray-400 bg-gray-400 w-fit text-white ml-auto"
          >
            {msg.message}
          </div>
        ))}
      </div>
      <form
        className="flex items-center mb-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mr-2 w-full"
          htmlFor="message"
        >
          <input
            {...register('message', {
              required: { value: true, message: 'This field is required' },
            })}
            className="appearance-none block bg-gray-200 text-gray-700 w-full border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="message"
            type="text"
            placeholder="message"
          />
          {formState.errors.message?.message && (
            <p className="text-red-500 text-xs italic mt-1">
              {formState.errors.message?.message}
            </p>
          )}
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </form>
      <button
        type="button"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
        onClick={onShareLocation}
      >
        Share status
      </button>
    </>
  );
};

export default MessageForm;
