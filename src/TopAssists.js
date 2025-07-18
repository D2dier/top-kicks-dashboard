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

const TopAssists = () => {
  const { language, setLanguage } = useContext(LanguageContext); // ✅ Use global language

  const assistsData = [
    { id: 1, name: "Kevin De Bruyne", assists: 16, team: "Manchester City" },
    { id: 2, name: "Mohamed Salah", assists: 12, team: "Liverpool" },
    { id: 3, name: "Bukayo Saka", assists: 11, team: "Arsenal" },
    { id: 4, name: "Leandro Trossard", assists: 10, team: "Arsenal" },
    { id: 5, name: "Michael Olise", assists: 9, team: "Crystal Palace" },
    { id: 6, name: "Trent Alexander-Arnold", assists: 9, team: "Liverpool" },
    { id: 7, name: "James Maddison", assists: 8, team: "Tottenham" },
    { id: 8, name: "Andy Robertson", assists: 8, team: "Liverpool" },
    { id: 9, name: "Bruno Fernandes", assists: 8, team: "Manchester United" },
    { id: 10, name: "Jack Grealish", assists: 7, team: "Manchester City" }
  ];

  const translations = {
    en: {
      title: "Premier League Assist Leaders",
      description: "The 10 players with the most assists in the current Premier League season",
      assists: "Assists",
      players: "Players",
      switchToFrench: "Français",
      tooltip: "Assists: {assists}\nTeam: {team}",
      chartTitle: "Assists Provided"
    },
    fr: {
      title: "Meilleurs Passeurs de la Premier League",
      description: "Les 10 joueurs avec le plus de passes décisives dans la saison actuelle de Premier League",
      assists: "Passes décisives",
      players: "Joueurs",
      switchToFrench: "Français",
      tooltip: "Passes: {assists}\nÉquipe: {team}",
      chartTitle: "Passes Décisives"
    }
  };

  const t = translations[language];

  const chartData = {
    labels: assistsData.map(player => player.name),
    datasets: [
      {
        label: t.assists,
        data: assistsData.map(player => player.assists),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
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
            const player = assistsData.find(p => p.name === context.label);
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
          text: t.assists
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
            {assistsData.map(player => (
              <OverlayTrigger
                key={player.id}
                placement="top"
                overlay={
                  <Tooltip>
                    {t.tooltip
                      .replace('{assists}', player.assists)
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

export default TopAssists;
