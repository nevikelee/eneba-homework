import { useState } from 'react';
import PageContainer from './PageContainer';

import SearchBar from './SearchBar';
import LocaleSelector from './LocaleSelector';
import UserActions from './UserActions';
import { Menu, X } from 'lucide-react'
import './Navigation.css';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuClosing, setIsMenuClosing] = useState(false);

    const closeMenu = () => {
      setIsMenuClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsMenuClosing(false);
      }, 300); // must match animation duration
    };


  return (
    <div className="outerWrapper">
      <PageContainer>
        <div className="nav">
            <button 
            className="mobileMenuToggle" 
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={28} color="#fff" />
          </button>
          <img
            src="https://static.eneba.games/branding/v2/logoFull.svg"
            alt="Eneba logo"
            className="logo"
          />

          <SearchBar />

          <div className="desktopOnly">
            <LocaleSelector />
          </div>



          <div className="right">
            <UserActions />
          </div>
        </div>
      </PageContainer>


        {isMenuOpen && (
          <div className={`menuOverlay ${isMenuClosing ? 'closing' : ''}`} onClick={closeMenu}>
             <div className={`menuContent ${isMenuClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="menuHeader">
                   <img src="https://static.eneba.games/branding/v2/logoFull.svg" alt="logo" className="logo" style={{width: '102px'}} />
                   <button className="closeMenu" onClick={closeMenu}> <X className="closeMenu" size={30} strokeWidth={0.75}/></button>
                </div>
                <nav className="menuNav">
                   <a href="#">Categories</a>
                   <a href="#">Cheap Games</a>
                   <a href="#">Windows keys</a>
                   <a href="#">Surfshark</a>
                   <a href="#">X-mas gifts</a>
                   <a href="#">GOTY '25</a>
                   <a href="#">Valorant & Roblox</a>
                </nav>

                <div className="menuSection">
                    <hr />
                        <LocaleSelector fontSize={20}/>
                    <hr />
                </div>


             </div>
          </div>
        )}
    </div>
  );
};

export default Navigation;
