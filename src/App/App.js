import './App.css';
import Matrix from '../Components/MatrixBackground/Matrix.js';
import Description from '../Components/Description/Description';
import Math from '../Components/Math/Math';
import Physics from '../Components/Physics/Physics';
import Computer from '../Components/Computers/Computers';
import Navigation from '../Components/Navigation/Navigation';
import Resume from '../Components/Resume/Resume';
import {React, useEffect} from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
function App(){
  useEffect(() => {
    AOS.init();
  }, []);
  return(
    <div className="App" style={{background:"#000000"}}>
        <Navigation/>
        <Description/>
        <Computer/>
        <Math/>
        <Physics/>
        <Resume/>
      </div>
  );
}

export default App;
