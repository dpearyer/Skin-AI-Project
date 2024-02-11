import React, {useState} from 'react';
import './HeaderStyles.css';
import Logo from './skinailogo.png';
import chatbot from './chatbot.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="header">
      <div className="header-container">
        <a href="./skinailogo.png">
          <img src={Logo} alt="SkinAI Logo" className="logo"/>
        </a>
        <a href="./chatbot.png">
          <img src={chatbot} alt="Chatbot Logo" className="chatbot"/>
        </a>
      </div>
      <div classnae="header-right">
      </div>

    </header>
  );
};

export default Header
