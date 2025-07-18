import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import LanguageContext from './LanguageContext';
import homeImage from './img/home-image.jpg';

const Home = () => {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const translations = {
    en: {
      welcome: "Welcome to Premier League Stats",
      intro: "Explore comprehensive statistics from the world's most exciting football league",
      topScorers: "Top Goal Scorers",
      topAssists: "Top Assists",
      mostCards: "Most Cards",
      mostAppearances: "Most Appearances",
      playerComparison: "Player Comparison",
      viewStats: "View Stats",
    },
    fr: {
      welcome: "Bienvenue sur les statistiques de la Premier League",
      intro: "Découvrez des statistiques complètes de la ligue de football la plus excitante du monde",
      topScorers: "Meilleurs buteurs",
      topAssists: "Meilleurs passeurs",
      mostCards: "Cartons les plus reçus",
      mostAppearances: "Plus d'apparitions",
      playerComparison: "Comparaison de Joueurs",
      viewStats: "Voir les stats",
    }
  };

  const t = translations[language || 'en'];

  const statsCards = [
    { id: 1, title: t.topScorers, icon: "🥅", route: "/top-scorers" },
    { id: 2, title: t.topAssists, icon: "⚽", route: "/assists" },
    { id: 3, title: t.mostCards, icon: "🟨", route: "/cards" },
    { id: 4, title: t.mostAppearances, icon: "👟", route: "/appearances" },
    { id: 5, title: t.playerComparison, icon: "🔍", route: "/comparison" }
  ];

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="bg-primary text-white py-3">
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col>
              <h1 className="mb-0">{t.welcome}</h1>
            </Col>
          </Row>
        </Container>
      </header>

      <main className="flex-grow-1 py-5">
        <Container>
          <Row className="mb-5">
            <Col>
              <Image 
                src={homeImage} 
                alt="Premier League banner" 
                fluid 
                className="rounded shadow"
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <p className="lead text-center">{t.intro}</p>
            </Col>
          </Row>

          <Row className="g-4">
            {statsCards.map((card) => (
              <Col key={card.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                    <span className="display-4 mb-3">{card.icon}</span>
                    <Card.Title className="text-center">{card.title}</Card.Title>
                    <Button 
                      variant="primary" 
                      className="mt-auto"
                      onClick={() => navigate(card.route)}
                    >
                      {t.viewStats}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>

      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col>
              <p className="text-center mb-0">
                {language === 'en' 
                  ? "© 2025 Premier League Stats Dashboard" 
                  : "© 2025 Tableau de bord des statistiques de la Premier League"}
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
