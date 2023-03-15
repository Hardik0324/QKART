import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8083/api/v1`,
};

function App() {
  return (
    <Switch>
      <Route exact path="/"><Products/></Route>
      <Route exact path="/register"><Register/></Route>
      <Route exact path="/login"><Login/></Route>
    </Switch>
  );
}

export default App;
