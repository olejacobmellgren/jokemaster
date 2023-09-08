import { Route, Routes } from 'react-router-dom';
import Mainpage from './pages/MainPage';

function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Mainpage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
