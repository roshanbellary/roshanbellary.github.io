import React from 'react';
import { useHistory } from "react-router-dom";
import './Math.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
function Math(props){
    return(
        <div>
        <Header></Header>
        <h1 class="Move">My Hitchhiker's Guide to Math, Meth and Everything In Between</h1>
        <p class="Shift">
            Math was quite literally the first subject that I've ever loved. I've done a lot of math competitions
            in elementary, middle and high school such as Math Kangaroo, MOEMS, Mathleague(Elementary, Middle, and High),
            AMC 8, AMC 10, and AIME to name a few. Although my interest in math was originally purely based on flexing
            my knowledge of the quadratic formula on friends ;), I've been transitioning to more research and proof based
            mathematics by taking classes in analysis and proofs. I'veattended camps in Number Theory, Combinatorics 
            and Linear Algebra while also taking online courses from MIT on Fourier Transforms and Differential Equations
            (Two pretty cool topics that are neatly related to Lin Alg). I am currently taking a course in Analysis 
            at Euler Circle which is a program that teaches high school students advanced mathematics. Although I don't plan
            on pursuing a full career in mathematics, I want to learn more about the wonderful world of math and apply what I've
            learned to my wanted career in software engineering(Proofs are hella important to CS algorithms).
        </p>
        <Footer></Footer>
    </div>
    )
}
export default Math;