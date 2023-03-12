import { Dispatch, FC, SetStateAction } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

type FormData = {
  host: string;
  port: number;
};

const ConnectionForm: FC<{
  isConnected: boolean;
  client: Paho.MQTT.Client;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
}> = ({ isConnected, client, setIsConnected }) => {
  const { register, formState, handleSubmit } = useFormContext<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (isConnected) {
      if (client) client.disconnect();
    } else {
      client.connect({
        onSuccess: () => {
          setIsConnected(true);
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="host"
          >
            Host
            <input
              {...register('host', {
                required: { value: true, message: 'This field is required' },
              })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-2"
              id="host"
              type="text"
              placeholder="test.mosquitto.org"
              disabled={isConnected}
            />
            {formState.errors.host?.message && (
              <p className="text-red-500 text-xs italic mt-1">
                {formState.errors.host?.message}
              </p>
            )}
          </label>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="port"
          >
            Port
            <input
              {...register('port', {
                required: { value: true, message: 'This field is required' },
              })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-2"
              id="port"
              type="number"
              placeholder="8081"
              disabled={isConnected}
            />
            {formState.errors.port?.message && (
              <p className="text-red-500 text-xs italic mt-1">
                {formState.errors.port?.message}
              </p>
            )}
          </label>
        </div>
      </div>
      {isConnected ? (
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full mb-2"
        >
          Disconnect
        </button>
      ) : (
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-2"
        >
          Connect
        </button>
      )}
    </form>
  );
};

export default ConnectionForm;
