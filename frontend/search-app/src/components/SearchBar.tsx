import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

function SearchBar() {
    const [query, setQuery] = useState('');

    const handleClear = () => {
        setQuery('');
    };


    return (
        // TODO: Fix submit action
        <form style={styles.search} action="http://localhost:8080/api/games">

            <div style={styles.iconWrapper}>
                <Search size={20} color="#fff" />
            </div>

            <div style={styles.inputContainer}>
                <input 
                    type="text" 
                    name="search" 
                    aria-label="Search" 
                    placeholder="Search for games" 
                    style={styles.searchInput}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div style={styles.iconWrapper}>
                {query.length > 0 && (
                    <X size={20} color="#fff" style={{ cursor: 'pointer' }} 
                        onClick={handleClear}
                    />
                )}
            </div>
        </form>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    search: {
        flex: '0 1 100%',
        display: 'flex',
        alignItems: 'center',
        height: '40px',       
        border: '1px solid #fff',
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    inputContainer: {
        flex: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        width: '100%',
        height: '100%',       
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#fff',
        fontSize: '16px',
        padding: '0 8px',
        lineHeight: 'normal',
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        width: '40px',
        justifyContent: 'center',
    }
}

export default SearchBar;