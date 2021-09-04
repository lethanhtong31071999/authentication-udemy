import CartFeature from "features/Cart";
import ProductFeature from "features/Product";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Switch>
          <Redirect exact from="/" to="/products" />
          <Route path="/products" component={ProductFeature} />
          <Route path="/cart">
            <CartFeature />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
