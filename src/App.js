import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import "./scss/style.scss";
import Channel from './component/Channel';
import Coco from './component/Coco';
import Miki from './component/Miki';
import Gundang from './component/Gundang';
import Envelope from './component/Envelope';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/channel" element={<Channel />} />
          <Route path="/coco" element={<Coco />} />
          <Route path="/miki" element={<Miki />} />
          <Route path="/gundang" element={<Gundang />} />
          <Route path="/envelope" element={<Envelope />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
