
import './App.css';
import HomePage from "./components/Home/StartingPage";
import MasonList from './components/masonListpage/MasonList';
import Profile from './components/MasonProfile/Profile';
import { Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element ={<HomePage></HomePage>}/>
        <Route path = "masonListpage" element={<MasonList></MasonList>}/>
        <Route path = "profile" element = {<Profile></Profile>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
