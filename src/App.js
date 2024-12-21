import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import LogoutPage from "./Components/LogoutPage";

function App() {
  return (
    <div className="main">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
          <Route path="/logout" element={ <LogoutPage/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
