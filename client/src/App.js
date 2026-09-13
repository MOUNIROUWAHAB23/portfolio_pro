import './App.css';
import React from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Projects } from './components/Projects';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Banner } from './components/Banner';
import { Skills } from './components/Skills';
import ChatBotWidget from './components/ChatBotWidget';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <ChatBotWidget />
    </div>
  );
}

export default App;
