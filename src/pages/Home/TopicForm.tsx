import { FC } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

type FormData = {
  topic: string;
};

const TopicForm: FC<{ client: Paho.MQTT.Client | undefined }> = ({
  client,
}) => {
  const { register, formState, handleSubmit } = useFormContext<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (client) {
      client.subscribe(data.topic);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="topic"
        >
          Topic
          <input
            {...register('topic', {
              required: { value: true, message: 'This field is required' },
            })}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-2 mb-4"
            id="topic"
            type="text"
            placeholder="ENGO651/Waika"
          />
          {formState.errors.topic?.message && (
            <p className="text-red-500 text-xs italic mt-1">
              {formState.errors.topic?.message}
            </p>
          )}
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-2"
      >
        Subscribe to Topic
      </button>
    </form>
  );
};

export default TopicForm;
