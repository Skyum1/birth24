import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import "./scss/style.scss";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
