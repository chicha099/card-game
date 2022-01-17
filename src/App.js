import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Game from './components/Game/Game';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Menu} />
          <Route path='/game' component={Game} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
