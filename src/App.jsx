import Header from "./Header";
import Footer from "./Footer";
import Transition from "./Transition";
import { BlockChainProvider } from "./BlockChainContext";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BlockChainProvider>
        <Header />
        <Transition />
        <Footer />
      </BlockChainProvider>
    </div>
  );
}

export default App;
