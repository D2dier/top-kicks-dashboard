import { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LanguageContext from './LanguageContext';

const PlayerComparison = () => {
  const { language } = useContext(LanguageContext);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  const players = [
    { id: 1, name: "Erling Haaland", team: "Manchester City", goals: 36, assists: 7, yellowCards: 3, redCards: 0, appearances: 35 },
    { id: 2, name: "Harry Kane", team: "Tottenham", goals: 30, assists: 5, yellowCards: 2, redCards: 0, appearances: 38 },
    { id: 3, name: "Kevin De Bruyne", team: "Manchester City", goals: 7, assists: 16, yellowCards: 4, redCards: 0, appearances: 32 },
    { id: 4, name: "Mohamed Salah", team: "Liverpool", goals: 19, assists: 12, yellowCards: 1, redCards: 0, appearances: 38 },
    { id: 5, name: "Bukayo Saka", team: "Arsenal", goals: 14, assists: 11, yellowCards: 5, redCards: 0, appearances: 38 },
    { id: 6, name: "Bruno Fernandes", team: "Manchester United", goals: 8, assists: 8, yellowCards: 7, redCards: 0, appearances: 37 },
    { id: 7, name: "Rodri", team: "Manchester City", goals: 4, assists: 6, yellowCards: 7, redCards: 1, appearances: 36 },
    { id: 8, name: "João Palhinha", team: "Fulham", goals: 3, assists: 0, yellowCards: 12, redCards: 1, appearances: 35 },
    { id: 9, name: "James Milner", team: "Brighton", goals: 1, assists: 2, yellowCards: 4, redCards: 0, appearances: 18 },
    { id: 10, name: "Casemiro", team: "Manchester United", goals: 4, assists: 3, yellowCards: 8, redCards: 2, appearances: 28 }
  ];

  const translations = {
    en: {
      title: "Player Comparison",
      description: "Compare Premier League player statistics",
      selectPlayer: "Select Player",
      goals: "Goals",
      assists: "Assists",
      yellowCards: "Yellow Cards",
      redCards: "Red Cards",
      appearances: "Appearances",
      team: "Team",
      compare: "Compare",
      switchToFrench: "Français",
      noPlayerSelected: "Please select two players to compare"
    },
    fr: {
      title: "Comparaison de Joueurs",
      description: "Comparez les statistiques des joueurs de Premier League",
      selectPlayer: "Sélectionner un joueur",
      goals: "Buts",
      assists: "Passes décisives",
      yellowCards: "Cartons jaunes",
      redCards: "Cartons rouges",
      appearances: "Matchs joués",
      team: "Équipe",
      compare: "Comparer",
      switchToFrench: "Français",
      noPlayerSelected: "Veuillez sélectionner deux joueurs à comparer"
    }
  };

  const t = translations[language];

  const handleCompare = () => {
    if (player1 && player2) {
      const p1 = players.find(p => p.id === parseInt(player1));
      const p2 = players.find(p => p.id === parseInt(player2));
      return (
        <Row className="mt-4 g-4">
          <Col md={6}><PlayerCard player={p1} t={t} /></Col>
          <Col md={6}><PlayerCard player={p2} t={t} /></Col>
        </Row>
      );
    }
    return (
      <Row className="mt-4">
        <Col>
          <Card className="text-center py-4">
            <Card.Text>{t.noPlayerSelected}</Card.Text>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1>{t.title}</h1>
            {/* <Button
              variant="outline-primary"
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            >
              {language === 'en' ? t.switchToFrench : "English"}
            </Button> */}
          </div>
          <p className="lead">{t.description}</p>
        </Col>
      </Row>

      <Row className="g-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>{t.selectPlayer} 1</Form.Label>
            <Form.Select value={player1 || ""} onChange={(e) => setPlayer1(e.target.value)}>
              <option value="">{t.selectPlayer}</option>
              {players.map(player => (
                <option key={player.id} value={player.id}>
                  {player.name} ({player.team})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>{t.selectPlayer} 2</Form.Label>
            <Form.Select value={player2 || ""} onChange={(e) => setPlayer2(e.target.value)}>
              <option value="">{t.selectPlayer}</option>
              {players.map(player => (
                <option key={player.id} value={player.id}>
                  {player.name} ({player.team})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {handleCompare()}
    </Container>
  );
};

const PlayerCard = ({ player, t }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">{player.name}</h4>
        <small>{player.team}</small>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs={6} className="mb-3 text-center">
            <h5 className="text-primary">{player.goals}</h5>
            <small>{t.goals}</small>
          </Col>
          <Col xs={6} className="mb-3 text-center">
            <h5 className="text-primary">{player.assists}</h5>
            <small>{t.assists}</small>
          </Col>
          <Col xs={6} className="mb-3 text-center">
            <h5 className="text-warning">{player.yellowCards}</h5>
            <small>{t.yellowCards}</small>
          </Col>
          <Col xs={6} className="mb-3 text-center">
            <h5 className="text-danger">{player.redCards}</h5>
            <small>{t.redCards}</small>
          </Col>
          <Col xs={12} className="text-center">
            <h5 className="text-success">{player.appearances}</h5>
            <small>{t.appearances}</small>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PlayerComparison;
