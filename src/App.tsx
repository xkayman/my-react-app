import { useState } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { setUnit, toggleFavorite, type TemperatureUnit } from './slices/settingsSlice';
import { citiesData } from './constants/cities';
import { WeatherDetails } from './components/weatherDetails';
import { Forecast } from './components/Forecast';

const CityPage = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const city = citiesData.find((c) => c.id === Number(cityId));
  if (!city) return <div style={{ padding: '20px' }}>Nie znaleziono miasta.</div>;

  return (
    <div>
      <WeatherDetails city={city} />
      <Forecast days={city.forecast} />
    </div>
  );
};

const FavoritesPage = () => {
  const favoritesIds = useSelector((state: RootState) => state.settings.favorites);
  const favoriteCities = citiesData.filter(city => favoritesIds.includes(city.id));

  return (
    <div>
      <h2 style={{ color: '#1e293b', fontWeight: 500 }}>Twoje ulubione ⭐</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
        {favoriteCities.map(city => (
          <Link key={city.id} to={`/city/${city.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ padding: '15px', background: 'white', borderRadius: '12px', textAlign: 'center', border: '2px solid #cbd5e1' }}>
              <h3 style={{ margin: 0, color: '#1e293b', fontWeight: 400 }}>{city.name} {city.icon}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  const currentUnit = useSelector((state: RootState) => state.settings.unit);
  const favorites = useSelector((state: RootState) => state.settings.favorites);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = citiesData.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontWeight: 600 }}>Aplikacja Pogodowa</h1>
          <nav style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <Link to="/" style={{ fontWeight: 500, color: '#4f46e5', textDecoration: 'none' }}>Strona główna</Link>
            <Link to="/favorites" style={{ fontWeight: 500, color: '#4f46e5', textDecoration: 'none' }}>Ulubione ({favorites.length})</Link>
          </nav>
        </div>
        
        <div style={{ background: '#f1f5f9', padding: '8px', borderRadius: '12px', border: '2px solid #cbd5e1' }}>
          {(['C', 'F', 'K'] as TemperatureUnit[]).map((u) => (
            <button
              key={u}
              onClick={() => dispatch(setUnit(u))}
              style={{
                marginLeft: '5px',
                padding: '6px 12px',
                cursor: 'pointer',
                backgroundColor: currentUnit === u ? '#4f46e5' : 'transparent',
                color: currentUnit === u ? 'white' : '#4f46e5',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 500
              }}
            >°{u}</button>
          ))}
        </div>
      </header>

      <div style={{ display: 'flex', gap: '30px' }}>
        <aside style={{ minWidth: '260px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '2px solid #cbd5e1' }}>
            <input
              type="text"
              placeholder="Szukaj miasta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '2px solid #cbd5e1', marginBottom: '15px', outline: 'none', fontWeight: 400 }}
            />
            <h3 style={{ marginTop: 0, fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>Miejscowości</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredCities.map((city) => (
                <div key={city.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  background: '#f8fafc', 
                  padding: '10px', 
                  borderRadius: '10px', 
                  border: '2px solid #cbd5e1' 
                }}>
                  <Link to={`/city/${city.id}`} style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 400 }}>
                    {city.name} {city.icon}
                  </Link>
                  <button onClick={() => dispatch(toggleFavorite(city.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
                    {favorites.includes(city.id) ? '⭐' : '☆'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<div style={{ textAlign: 'center', marginTop: '40px', background: 'white', padding: '40px', borderRadius: '20px', border: '2px solid #cbd5e1' }}><h2>Wybierz miasto z listy</h2></div>} />
            <Route path="/city/:cityId" element={<CityPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;