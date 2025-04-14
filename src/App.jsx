import Input from "./components/ui/input/input";
import Logo from "./components/ui/logo/logo";

function App() {
  return (
    <div>
      <Logo />
      <div>
        <label htmlFor="test">Test</label>
        <Input id="test" placeholder="hola" />
      </div>
      <button className="button">Iniciar sesión</button>
    </div>
  );
}

export default App;
