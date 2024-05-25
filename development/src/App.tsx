import { Button } from "@/components/ui/button";
import Navbar from "./components/shared/Navbar/Navbar";

function App() {
  return (
    <>
      <div className="h-screen w-full bg-primary">
        <Navbar />
        <Button variant={"default"}>asdf</Button>
      </div>
    </>
  );
}

export default App;
