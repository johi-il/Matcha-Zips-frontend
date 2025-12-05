import React from 'react'
import Button from "./components/Button.jsx"
import Page_layout from './components/OutfitLayout.jsx';
import Navbar from './components/Navbar.jsx'
import OutfitForm from './components/OutfitForm.jsx';



function App() {
  return (
    <div>
      <Navbar/>
      <Page_layout/>
      < Button />
      <OutfitForm/>

    </div>
  );
}

export default App
