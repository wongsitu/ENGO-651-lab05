import { FC } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

type FormData = {
  message: string;
};

const MessageForm: FC<{
  client: Paho.MQTT.Client | undefined;
  topic: string;
  messages: string[];
}> = ({ client, topic, messages }) => {
  const { register, formState, handleSubmit, reset } =
    useFormContext<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (client) {
      const message = new Paho.MQTT.Message(data.message);

      message.destinationName = topic;
      client.send(message);
      reset();
    }
  };

  return (
    <>
      <div className="bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-4 overflow-auto h-80">
        {messages.map((msg) => (
          <div
            key={msg}
            className="p-2 mb-2 rounded border border-gray-400 bg-gray-400 w-fit text-white ml-auto"
          >
            {msg}
          </div>
        ))}
      </div>
      <form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mr-2 w-full"
          htmlFor="message"
        >
          <input
            {...register('message', {
              required: { value: true, message: 'This field is required' },
            })}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
    </>
  );
};

export default MessageForm;
