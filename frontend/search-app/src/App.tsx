import GamesPage from "./pages/GamesPage";
import PageContainer from "./components/PageContainer";

import "./index.css";

function App() {
  return (
    <>
      {/* <Navigation /> */}

      <main className="mainPage">
        <PageContainer>
          <GamesPage />
        </PageContainer>
      </main>
    </>
  );
}

export default App;
