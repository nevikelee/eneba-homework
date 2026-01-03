function LocaleSelector() {
    let mockSettings = {
        icon_url: "https://static.eneba.games/flags/lang/v2/lithuania.svg",
        language: "English",
        region: "EU", 
        currency: "EUR"
    }

    return (
        <div style={styles.container}>
            <button style={styles.button}>

            <img 
                src={mockSettings.icon_url} 
                alt="Region flag" 
                style={styles.icon} 
            />
            <span style={styles.text}>
                {mockSettings.language} {mockSettings.region} | {mockSettings.currency}
            </span>

            </button>
            
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: 'fit-content',
        background: 'none',
        border: 'none',
        outline: 'none',
        borderRadius: '2px', 
        padding: '8px 12px', 
        color: '#fff',
        cursor: 'pointer',
        fontFamily: 'inherit',
    },
    icon: {
        height: '18px',
        width: 'auto',
        borderRadius: '2px',
    },
    text: {
        fontSize: '14px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
    }
}

export default LocaleSelector;