import React, { useContext } from 'react';
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
import LanguageContext from './LanguageContext'; // ✅ Import context

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const TopScorers = () => {
  const { language, setLanguage } = useContext(LanguageContext); // ✅ Use context

  // Mock data for top scorers
  const scorersData = [
    { id: 1, name: "Erling Haaland", goals: 36, team: "Manchester City" },
    { id: 2, name: "Harry Kane", goals: 30, team: "Tottenham" },
    { id: 3, name: "Ivan Toney", goals: 20, team: "Brentford" },
    { id: 4, name: "Mohamed Salah", goals: 19, team: "Liverpool" },
    { id: 5, name: "Callum Wilson", goals: 18, team: "Newcastle" },
    { id: 6, name: "Marcus Rashford", goals: 17, team: "Manchester United" },
    { id: 7, name: "Gabriel Martinelli", goals: 15, team: "Arsenal" },
    { id: 8, name: "Ollie Watkins", goals: 15, team: "Aston Villa" },
    { id: 9, name: "Aleksandar Mitrović", goals: 14, team: "Fulham" },
    { id: 10, name: "Bukayo Saka", goals: 14, team: "Arsenal" }
  ];

  const translations = {
    en: {
      title: "Premier League Top Scorers",
      description: "The 10 players with the most goals in the current Premier League season",
      goals: "Goals",
      players: "Players",
      switchToFrench: "Français",
      tooltip: "Goals: {goals}\nTeam: {team}",
      chartTitle: "Goals Scored"
    },
    fr: {
      title: "Meilleurs Buteurs de la Premier League",
      description: "Les 10 joueurs avec le plus de buts dans la saison actuelle de Premier League",
      goals: "Buts",
      players: "Joueurs",
      switchToFrench: "Français",
      tooltip: "Buts: {goals}\nÉquipe: {team}",
      chartTitle: "Buts Marqués"
    }
  };

  const t = translations[language];

  const chartData = {
    labels: scorersData.map(player => player.name),
    datasets: [
      {
        label: t.goals,
        data: scorersData.map(player => player.goals),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
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
            const player = scorersData.find(p => p.name === context.label);
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
          text: t.goals
        }
      },
      x: {
        title: {
          display: true,
          text: t.players
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
              <div style={{ height: '500px' }}>
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
            {scorersData.map(player => (
              <OverlayTrigger
                key={player.id}
                placement="top"
                overlay={
                  <Tooltip>
                    {t.tooltip
                      .replace('{goals}', player.goals)
                      .replace('{team}', player.team)}
                  </Tooltip>
                }
              >
                <Button variant="outline-secondary">
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

export default TopScorers;
