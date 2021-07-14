import { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { PageLayout } from "./components/PageLayout";
import { DevicesPage } from "./pages/DevicesPage";
import { MyHousePage } from "./pages/MyHousePage";
import { TestPage } from "./pages/TestPage";
import { Header } from "./components/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PageLayout>
          <Header></Header>
        </PageLayout>
        <Switch>
          <Route exact path="/" component={ TestPage }></Route>
          <Route path="/devices" component={ DevicesPage }></Route>
          <Route path="/myhouse" component={ MyHousePage }></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
