import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import {
  House,
  Trophy,
  Activity,
  Person,
  People,
  Github,
  Database,
  Info
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import LanguageContext from '../LanguageContext';

const Footer = () => {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate(); // ✅ Hook

  const translations = {
    en: {
      quickLinks: "Quick Links",
      home: "Home",
      topScorers: "Top Scorers",
      assists: "Assists",
      cards: "Cards",
      appearances: "Appearances",
      settings: "Settings",
      comparison: "Player Comparison",
      dataSources: "Data Sources",
      githubRepo: "GitHub Repository",
      apiCredit: "Data provided by Football Data API",
      copyright: "© 2025 Premier League Dashboard. All rights reserved.",
      switchToFrench: "Français"
    },
    fr: {
      quickLinks: "Liens Rapides",
      home: "Accueil",
      topScorers: "Meilleurs Buteurs",
      assists: "Passes Décisives",
      cards: "Cartons",
      appearances: "Apparitions",
      settings: "Paramètres",
      comparison: "Comparaison de Joueurs",
      dataSources: "Sources de Données",
      githubRepo: "Dépôt GitHub",
      apiCredit: "Données fournies par Football Data API",
      copyright: "© 2025 Tableau de Bord Premier League. Tous droits réservés.",
      switchToFrench: "English"
    }
  };

  const t = translations[language] || translations['en'];

  const navItems = [
    { path: "/", icon: <House className="me-2" />, text: t.home },
    { path: "/top-scorers", icon: <Trophy className="me-2" />, text: t.topScorers },
    { path: "/assists", icon: <Activity className="me-2" />, text: t.assists },
    { path: "/cards", icon: <FontAwesomeIcon icon={faDiamond} className="me-2" />, text: t.cards },
    { path: "/appearances", icon: <Person className="me-2" />, text: t.appearances },
    { path: "/comparison", icon: <People className="me-1" />, text: t.comparison }
  ];

  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col lg={4} className="mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-3">{t.quickLinks}</h5>
            <Nav className="flex-column">
              {navItems.map((item, index) => (
                <Nav.Link
                  key={index}
                  onClick={() => navigate(item.path)}
                  className="text-white-50 d-flex align-items-center px-0 py-1"
                  style={{ cursor: 'pointer' }}
                >
                  {item.icon}
                  {item.text}
                </Nav.Link>
              ))}
            </Nav>
          </Col>

          <Col lg={4} className="mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-3">{t.dataSources}</h5>
            <div className="d-flex flex-column">
              <div className="text-white-50 d-flex align-items-center">
                <Github className="me-2" />
                {t.githubRepo}
              </div>
              <div className="text-white-50 d-flex align-items-center">
                <Database className="me-2" />
                {t.apiCredit}
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <h5 className="text-uppercase mb-3">
              <Info className="me-2" />
              {language === 'en' ? 'About' : 'À Propos'}
            </h5>
            <p className="text-white-50 small">
              {language === 'en'
                ? "A comprehensive dashboard for Premier League statistics and player comparisons."
                : "Un tableau de bord complet pour les statistiques de la Premier League et les comparaisons de joueurs."}
            </p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <p className="text-white-50 small text-center mb-0">
              {t.copyright}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
