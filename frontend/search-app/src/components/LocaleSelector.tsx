import "./LocaleSelector.css";
interface LocaleSelectorProps {
  fontSize?: number;
}

function LocaleSelector({ fontSize = 14 }: LocaleSelectorProps) {
  const mockSettings = {
    icon_url: "https://static.eneba.games/flags/lang/v2/lithuania.svg",
    language: "English",
    region: "EU",
    currency: "EUR",
  };

  return (
    <div className="container">
      <button className="button">
        <img
          src={mockSettings.icon_url}
          alt="Region flag"
          className="icon"
          style={{ height: `${fontSize + 4}px` }}
        />
        <span className="text" style={{ fontSize: `${fontSize}px` }}>
          {mockSettings.language} {mockSettings.region} |{" "}
          {mockSettings.currency}
        </span>
      </button>
    </div>
  );
}

export default LocaleSelector;
