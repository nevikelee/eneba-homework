import Navigation from './components/Navigation';
import GamesPage from './pages/GamesPage';
import PageContainer from './components/PageContainer';

function App() {
  return (
    <>

      <Navigation />

      <main style={{ paddingTop: '80px' }}>
        <PageContainer>
          <GamesPage />
        </PageContainer>
      </main>


    </>
  );
}

export default App;
