import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Photo from "./features/Photo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Switch>
          <Redirect exact from="/" to="/photos" />
          <Route path="/photos" component={Photo} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
