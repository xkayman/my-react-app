import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { convertTemp } from '../functions/convertTemp';

interface CityProps {
  city: {
    name: string; temp: number; condition: string; icon: string;
    rainChance: number; rainAmount: number; windSpeed: number; windDir: string; cloudiness: number;
  };
}

export const WeatherDetails = ({ city }: CityProps) => {
  const unit = useSelector((state: RootState) => state.settings.unit);
  const displayTemp = convertTemp(city.temp, unit).toFixed(1);

  return (
    <div style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 style={{ fontSize: '2rem', margin: 0 }}>{city.name} {city.icon}</h2>
        <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4f46e5' }}>{displayTemp}°{unit}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
        <div style={{ background: '#e0f2fe', padding: '15px', borderRadius: '15px', borderLeft: '5px solid #0ea5e9' }}>
          <div style={{ color: '#0369a1', fontWeight: 'bold' }}>💨 Wiatr</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{city.windSpeed} km/h</div>
          <div style={{ fontSize: '0.8rem', color: '#0ea5e9' }}>Kierunek: {city.windDir}</div>
        </div>

        {}
        <div style={{ background: '#e0e7ff', padding: '15px', borderRadius: '15px', borderLeft: '5px solid #6366f1' }}>
          <div style={{ color: '#4338ca', fontWeight: 'bold' }}>💧 Opady</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{city.rainChance}%</div>
          <div style={{ fontSize: '0.8rem', color: '#6366f1' }}>{city.rainAmount} mm/m²</div>
        </div>

        {}
        <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '15px', borderLeft: '5px solid #64748b' }}>
          <div style={{ color: '#334155', fontWeight: 'bold' }}>☁️ Chmury</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{city.cloudiness}%</div>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{city.condition}</div>
        </div>
      </div>
    </div>
  );
};