import React, {useState} from 'react';
import Header from './components/Header';
import Hero  from './components/Hero';
import Footer from "./components/footer";
import SecondPage from './components/SecondPage';
import './App.css'


function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="App">
    <div>
      <Header />
      <Hero handlePageChange={handlePageChange}/>
      <Footer/>
    </div>
    {currentPage === 'second' && <SecondPage />}
    </div>
  );
}

export default App;
