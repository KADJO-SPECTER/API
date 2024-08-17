import Photos from "./components/Photos";
import Simpsons from "./components/Simpsons";

const App = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 30}}>
      <Simpsons />
      <Photos/>
    </div>
  );
};

export default App;
