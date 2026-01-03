import React from 'react';

import SearchBar from './SearchBar';
import LocaleSelector from './LocaleSelector';
import UserActions from './UserActions';

const Navigation = () => {
  return (
    <div style={styles.outerWrapper}>
      <header style={styles.header}>
        <div style={styles.nav}>
          <a style={styles.logoGroup}>
            <img
              src="https://static.eneba.games/branding/v2/logoFull.svg"
              alt="Eneba logo"
              style={styles.logoImage}
            />
          </a>

          <SearchBar />
          <LocaleSelector />

          <div style={styles.rightSection}>
            <UserActions />
          </div>
        </div>
      </header>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    outerWrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
    },
    header: {
        margin: '0 auto',
        width: '100%',
        maxWidth: '1240px',
        padding: '0 20px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginLeft: '20%',
    },
    logoGroup: {
        marginRight: '30px',
        display: 'flex',
        alignItems: 'center',
    },
    logoImage: {
        height: '45px',
        width: 'auto',
        display: 'block',
    },
};

export default Navigation;