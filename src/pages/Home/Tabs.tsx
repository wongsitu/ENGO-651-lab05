import cn from 'classnames';
import { Dispatch, FC, SetStateAction } from 'react';

type TabProps = {
  currentTab: 'CONNECT' | 'MESSAGES';
  setCurrentTab: Dispatch<SetStateAction<'CONNECT' | 'MESSAGES'>>;
  isConnected: boolean;
};

const Tabs: FC<TabProps> = ({ currentTab, setCurrentTab, isConnected }) => (
  <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 mb-3">
    <li className="mr-2">
      <button
        type="button"
        aria-current="page"
        className={cn(
          currentTab === 'CONNECT'
            ? 'text-blue-600 border-blue-600 active'
            : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300',
          'inline-block p-4 border-b-2 rounded-t-lg',
        )}
        onClick={() => setCurrentTab('CONNECT')}
      >
        Connect
      </button>
    </li>
    {isConnected && (
      <li className="mr-2">
        <button
          type="button"
          className={cn(
            currentTab === 'MESSAGES'
              ? 'text-blue-600 border-blue-600 active'
              : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300',
            'inline-block p-4 border-b-2 rounded-t-lg',
          )}
          onClick={() => setCurrentTab('MESSAGES')}
        >
          Messages
        </button>
      </li>
    )}
  </ul>
);

export default Tabs;
