import React from 'react';
import './About.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
function About(props){
    return(
        <div>
            <Header ></Header>
            <div class="paralax">
            </div>
            <h1 class = 'Title'>Roshan Bellary-A Professional Idiot</h1>
            <p class="Ramble">
                To whom it may concern: Hi guys! My name is Roshan Bellary, a 10th grader in California. I'm currently 16 years old, but
                3 years old in terms of maturity. I'm interested in math, business, physics and computer science and hope to attend MIT or Stanford.
                This is my website! Sure it's a little out of date, but I have to say that I did a pretty good job making it despite being
                a professional idiot. Please check out the accomplishments page if you wanna see me fail at flexing on you. I wrote this 
                website in react which is a cool language based on javascript developed by Facebook. If you wanna develop your own website
                (TLDR: Facebook did not pay me to market for them) then check out this link:
            </p>
            <div class = "Link">
            <a href="https://reactjs.org/">React Official Website</a>
            </div>
            <p class="Ramble">
                Have fun! And remember don't do school and stay in drugs.
            </p>
            <Footer></Footer>
        </div>
    );
}
export default About;