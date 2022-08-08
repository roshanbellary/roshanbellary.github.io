import './App.css';
import Description from '../Components/Description/Description';
import Math from '../Components/Math/Math';
import Physics from '../Components/Physics/Physics';
import Computer from '../Components/Computers/Computers';
import Navigation from '../Components/Navigation/Navigation';
import Resume from '../Components/Resume/Resume';
import {React, useEffect} from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import MatrixBackground from '../Components/MatrixBackground/Matrix.js';
function App(){
  useEffect(() => {
    AOS.init();
    AOS.init({
      mirror:true,
      once: false,
    })
  }, []);
  return(
    <div className="App">
      <MatrixBackground/>
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
