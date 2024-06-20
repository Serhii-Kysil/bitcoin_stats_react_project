import { BitcoinPage } from "../pages/BitcoinPage/BitcoinPage";
import "./App.css";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="container">
      <Toaster position="top-right" />
      <BitcoinPage />
    </div>
  );
}

export default App;
