import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Components/Main";
import Home from "./Components/Home";

function App() {
  return (
    <div className="main">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
          <Route path="/home" element={ <Home/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
