import './App.css';
import DododocsRouter from './router/index.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
function App() {
  return (
    // <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <DododocsRouter />
    </Provider>

    // </PersistGate>
  );
}

export default App;
