import { useContext } from 'react';
import { Container, Row, Col, Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';
import LanguageContext from './LanguageContext'; // ✅ Import global language context

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const DisciplinaryChart = () => {
  const { language } = useContext(LanguageContext); // ✅ Use global state

  const playersData = [
    { id: 1, name: "João Palhinha", yellow: 12, red: 1, team: "Fulham" },
    { id: 2, name: "Nicolò Zaniolo", yellow: 10, red: 2, team: "Aston Villa" },
    { id: 3, name: "Bruno Guimarães", yellow: 9, red: 1, team: "Newcastle" },
    { id: 4, name: "Casemiro", yellow: 8, red: 2, team: "Manchester United" },
    { id: 5, name: "Alexis Mac Allister", yellow: 8, red: 1, team: "Liverpool" },
    { id: 6, name: "Douglas Luiz", yellow: 7, red: 1, team: "Aston Villa" },
    { id: 7, name: "Rodri", yellow: 7, red: 1, team: "Manchester City" },
    { id: 8, name: "Yves Bissouma", yellow: 6, red: 2, team: "Tottenham" },
    { id: 9, name: "Mario Lemina", yellow: 6, red: 1, team: "Wolves" },
    { id: 10, name: "Conor Gallagher", yellow: 6, red: 0, team: "Chelsea" }
  ];

  const translations = {
    en: {
      title: "Premier League Disciplinary Records",
      description: "Players with the most yellow and red cards this season",
      yellowCards: "Yellow Cards",
      redCards: "Red Cards",
      players: "Players",
      cards: "Cards",
      switchToFrench: "Français",
      tooltip: "Yellow: {yellow}\nRed: {red}\nTeam: {team}",
      chartTitle: "Disciplinary Records"
    },
    fr: {
      title: "Records Disciplinaires de la Premier League",
      description: "Joueurs avec le plus de cartons jaunes et rouges cette saison",
      yellowCards: "Cartons Jaunes",
      redCards: "Cartons Rouges",
      players: "Joueurs",
      cards: "Cartons",
      switchToFrench: "Français",
      tooltip: "Jaunes: {yellow}\nRouges: {red}\nÉquipe: {team}",
      chartTitle: "Records Disciplinaires"
    }
  };

  const t = translations[language];

  const chartData = {
    labels: playersData.map(player => player.name),
    datasets: [
      {
        label: t.yellowCards,
        data: playersData.map(player => player.yellow),
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      },
      {
        label: t.redCards,
        data: playersData.map(player => player.red),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: t.chartTitle,
        font: {
          size: 18
        }
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context) {
            const player = playersData.find(p => p.name === context.label);
            return `Team: ${player.team}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: t.cards,
          font: {
            size: 14
          }
        }
      },
      x: {
        title: {
          display: true,
          text: t.players,
          font: {
            size: 14
          }
        }
      }
    }
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
              aria-label={language === 'en' ? "Switch to French" : "Passer en Anglais"}
            >
              {language === 'en' ? t.switchToFrench : "English"}
            </Button> */}
          </div>
          <p className="lead">{t.description}</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <div style={{ height: '500px' }} aria-label={t.chartTitle}>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h3>{language === 'en' ? "Player Details" : "Détails des Joueurs"}</h3>
          <div className="d-flex flex-wrap gap-2">
            {playersData.map(player => (
              <OverlayTrigger
                key={player.id}
                placement="top"
                overlay={
                  <Tooltip>
                    {t.tooltip
                      .replace('{yellow}', player.yellow)
                      .replace('{red}', player.red)
                      .replace('{team}', player.team)}
                  </Tooltip>
                }
              >
                <Button variant="outline-secondary" aria-label={`${player.name} - ${player.yellow} ${t.yellowCards}, ${player.red} ${t.redCards}`}>
                  {player.name}
                </Button>
              </OverlayTrigger>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DisciplinaryChart;
