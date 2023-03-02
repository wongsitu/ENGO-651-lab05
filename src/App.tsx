import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import Pages from './pages';
import './App.css';
import queryClient from './services/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Pages />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
