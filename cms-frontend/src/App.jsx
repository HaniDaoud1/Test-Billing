import Cards from "./components/Cards";
import { useSelector } from "react-redux";
import SearchPage from "./components/SearchPage";

function App() {
  const search = useSelector((state) => state.cart.search);
  return (<>
    <div className="bg-green-50 py-5 min-h-screen mt-31 sm:mt-36">
    <>
      <h1 className="text-3xl md:text-5xl mb-5 mx-5 ">List of clients <span className="text-zinc-300 text-sm md:text-xl">at this moment</span></h1>
      <Cards /></>
    </div>
    
    </>
  );
}

export default App;
