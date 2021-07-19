import { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { PageLayout } from "./components/PageLayout";
import { DevicesPage } from "./pages/DevicesPage";
import { MyHousePage } from "./pages/MyHousePage";
import { TestPage } from "./pages/TestPage";
import { GenerateDataPage } from "./pages/GenerateDataPage";
import { Header } from "./components/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PageLayout>
          <Header></Header>
        </PageLayout>
        <div style={{marginTop: "20px", marginLeft: "10px", marginRight: "10px"}}>  
        <Switch>
          <Route exact path="/" component={ TestPage }></Route>
          <Route path="/devices" component={ DevicesPage }></Route>
          <Route path="/myhouse" component={ MyHousePage }></Route>
          <Route path="/generatedata" component={ GenerateDataPage }></Route>
        </Switch>
        </div>
      </div>
    );
  }
}

export default App;
