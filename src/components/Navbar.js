import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { 
  House, 
  Trophy, 
  Activity, 
  Person, 
  People,
  Gear,
  List,
  Globe
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import LanguageContext from '../LanguageContext'; // 🔹 Import context

const BilingualNavbar = () => {
  const { language, setLanguage } = useContext(LanguageContext); // 🔹 Use context
  const [expanded, setExpanded] = useState(false);

  const translations = {
    en: {
      home: "Home",
      topScorers: "Top Scorers",
      assists: "Assists",
      cards: "Cards",
      appearances: "Appearances",
      comparison: "Player Comparison",
      settings: "Settings",
      toggleLanguage: "Toggle Language",
      currentLanguage: "EN",
      otherLanguage: "FR"
    },
    fr: {
      home: "Accueil",
      topScorers: "Meilleurs Buteurs",
      assists: "Passes Décisives",
      cards: "Cartons",
      appearances: "Apparitions",
      comparison: "Comparaison de Joueurs",
      settings: "Paramètres",
      toggleLanguage: "Changer de langue",
      currentLanguage: "FR",
      otherLanguage: "EN"
    }
  };

  const t = translations[language];

  const navItems = [
    { path: "/", icon: <House className="me-1" />, text: t.home },
    { path: "/top-scorers", icon: <Trophy className="me-1" />, text: t.topScorers },
    { path: "/assists", icon: <Activity className="me-1" />, text: t.assists },
    { path: "/cards", icon: <FontAwesomeIcon icon={faDiamond} className="me-1" />, text: t.cards },
    { path: "/appearances", icon: <Person className="me-1" />, text: t.appearances },
    { path: "/comparison", icon: <People className="me-1" />, text: t.comparison },
    //{ path: "/settings", icon: <Gear className="me-1" />, text: t.settings }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en'); // 🔹 Updates context
  };

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className="shadow"
    >
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Trophy className="me-2" />
          <span>Premier League Stats</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <List />
        </Navbar.Toggle>
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {navItems.map((item, index) => (
              <Nav.Link 
                key={index} 
                href={item.path}
                className="d-flex align-items-center"
              >
                {item.icon}
                {item.text}
              </Nav.Link>
            ))}
          </Nav>
          
          <div className="d-flex">
            <Button
              variant="outline-light"
              onClick={toggleLanguage}
              className="d-flex align-items-center"
              aria-label={t.toggleLanguage}
            >
              <Globe className="me-1" />
              {t.currentLanguage}/{t.otherLanguage}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BilingualNavbar;
