import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import TopScorers from './TopScorers';
import TopAssists from './TopAssists';
import DisciplinaryChart from './DisciplinaryCharts';
import AppearancesTable from './AppearancesTable';
// import SettingsPage from './SettingsPage';
import PlayerComparison from './PlayerComparison';
import LanguageContext from './LanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [language, setLanguage] = useState('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="top-scorers" element={<TopScorers />} />
            <Route path="assists" element={<TopAssists />} />
            <Route path="cards" element={<DisciplinaryChart />} />
            <Route path="appearances" element={<AppearancesTable />} />
            {/* <Route path="settings" element={<SettingsPage />} /> */}
            <Route path="comparison" element={<PlayerComparison />} />
          </Route>
        </Routes>
      </Router>
    </LanguageContext.Provider>
  );
};

export default App;
