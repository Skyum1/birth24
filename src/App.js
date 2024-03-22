import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import "./scss/style.scss";
import Channel from './component/Channel';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/channel" element={<Channel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
