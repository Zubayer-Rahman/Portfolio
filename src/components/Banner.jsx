import React from 'react'
import './Banner.css'
import Galaxy from './Galaxy';
import TextType from './TextType.jsx';
import GradientText from './GradientText.jsx';

const Banner = () => {
  return (
    <div className="banner-container">
        <div className="particles-background">
            <Galaxy 
              mouseRepulsion={true}
              mouseInteraction={true}
              density={1.5}
              glowIntensity={0.5}
              saturation={0.8}
              hueShift={1500}
            />
        </div>
        
        <div className="banner-content">
            <h1>
              <TextType 
                text={["HELLO, I AM ZUBAYER RAHMAN", "WELCOME TO MY PORTFOLIO", "EXPLORE MY WORK"]}
                typingSpeed={65}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="_"
              />
            </h1>
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={10}
              showBorder={false}
              className="gradient-text"
            >
              I am a Software Engineer
            </GradientText>

            <button>See Now</button>
        </div>
    </div>
  )
}

export default Banner