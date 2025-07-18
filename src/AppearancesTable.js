import { useContext, useMemo, useState } from 'react';
import { Container, Row, Col, Table, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';
import LanguageContext from './LanguageContext'; // ✅ Import global context

const playersData = [
    { id: 1, name: "James Milner", appearances: 619, team: "Brighton", position: "Midfielder / Milieu" },
    { id: 2, name: "Fernandinho", appearances: 504, team: "Manchester City", position: "Midfielder / Milieu" },
    { id: 3, name: "Jordan Henderson", appearances: 492, team: "Liverpool", position: "Midfielder / Milieu" },
    { id: 4, name: "David Silva", appearances: 436, team: "Manchester City", position: "Midfielder / Milieu" },
    { id: 5, name: "César Azpilicueta", appearances: 425, team: "Chelsea", position: "Defender / Défenseur" },
    { id: 6, name: "Kyle Walker", appearances: 412, team: "Manchester City", position: "Defender / Défenseur" },
    { id: 7, name: "Ashley Young", appearances: 408, team: "Everton", position: "Defender / Défenseur" },
    { id: 8, name: "Hugo Lloris", appearances: 405, team: "Tottenham", position: "Goalkeeper / Gardien" },
    { id: 9, name: "Raheem Sterling", appearances: 399, team: "Chelsea", position: "Forward / Attaquant" },
    { id: 10, name: "Kevin De Bruyne", appearances: 392, team: "Manchester City", position: "Midfielder / Milieu" }
  ];

const AppearancesTable = () => {
  const { language } = useContext(LanguageContext); // ✅ Use global state
  const [sortConfig, setSortConfig] = useState({ key: 'appearances', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  

  const translations = {
    en: {
      title: "Premier League Appearance Leaders",
      description: "Players with the most Premier League appearances in their careers",
      name: "Player",
      appearances: "Apps",
      team: "Team",
      position: "Position",
      switchToFrench: "Français",
      showing: "Showing",
      of: "of",
      records: "records"
    },
    fr: {
      title: "Joueurs avec le plus d'apparitions en Premier League",
      description: "Joueurs avec le plus d'apparitions en Premier League dans leur carrière",
      name: "Joueur",
      appearances: "Matchs",
      team: "Équipe",
      position: "Poste",
      switchToFrench: "Français",
      showing: "Affichage",
      of: "sur",
      records: "enregistrements"
    }
  };

  const t = translations[language];

  const sortedPlayers = useMemo(() => {
    const sortableItems = [...playersData];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [playersData, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <CaretUpFill className="ms-1" /> : 
      <CaretDownFill className="ms-1" />;
  };

  const totalPages = Math.ceil(playersData.length / itemsPerPage);
  const currentItems = sortedPlayers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          <div className="table-responsive">
            <Table striped bordered hover className="shadow-sm">
              <thead className="bg-light">
                <tr>
                  <th onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>
                    {t.name}{getSortIcon('name')}
                  </th>
                  <th onClick={() => requestSort('appearances')} style={{ cursor: 'pointer' }}>
                    {t.appearances}{getSortIcon('appearances')}
                  </th>
                  <th onClick={() => requestSort('team')} style={{ cursor: 'pointer' }}>
                    {t.team}{getSortIcon('team')}
                  </th>
                  <th onClick={() => requestSort('position')} style={{ cursor: 'pointer' }}>
                    {t.position}{getSortIcon('position')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(player => (
                  <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{player.appearances}</td>
                    <td>{player.team}</td>
                    <td>{player.position}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              {t.showing} {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, playersData.length)} {t.of} {playersData.length} {t.records}
            </div>
            <Pagination>
              <Pagination.Prev 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AppearancesTable;
