import React, { useEffect } from 'react';
import './Home.css';

export default () => {
  useEffect(() => {
    const textContainer = document.querySelector('.text-container')
    const words1 = "Manage employees easily."
    const words2 = "Let's start."

    animateText(textContainer, words1, 1, 50)
    setTimeout(() => {
      animateText(textContainer, words2, 2, 50)
    }, words1.length * 50 + 1000)
  }, [])

  const animateText = (element, text, number, speed) => {
    let index = 0;
    const fontSize = number === 1 ? "50px" : "75px"

    const type = () => {
      const currentText = text.substr(0, index);
      element.innerHTML = `<span style="font-size: ${fontSize}">${currentText}</span>`

      index++
      if (index <= text.length) {
        setTimeout(type, speed);
      }
    };

    type()
  }

  return (
    <div className="text-container"></div>
  );
}

