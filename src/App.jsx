import "./App.css";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import Listing from "./components/Listing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/videos" element={<Listing />} />
          <Route path="/videos/:id" element={<VideoPlayer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
