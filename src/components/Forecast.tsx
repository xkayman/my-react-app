import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { convertTemp } from '../functions/convertTemp';

interface DayForecast {
  day: string;
  temp: number;
  icon: string;
}

export const Forecast = ({ days }: { days: DayForecast[] }) => {
  const unit = useSelector((state: RootState) => state.settings.unit);

  return (
    <div style={{ 
      marginTop: '30px', 
      padding: '25px', 
      background: 'white', 
      borderRadius: '20px', 
      border: '2px solid #cbd5e1'
    }}>
      <h3 style={{ 
        fontSize: '1.1rem', 
        color: '#1e293b', 
        marginBottom: '20px',
        borderLeft: '4px solid #4f46e5',
        paddingLeft: '15px',
        fontWeight: 500
      }}>
        Prognoza na najbliższe 5 dni
      </h3>
      
      <div style={{ display: 'flex', gap: '15px' }}>
        {days.map((item, index) => (
          <div 
            key={index} 
            style={{ 
              background: '#f8fafc',
              border: '2px solid #cbd5e1', 
              padding: '15px 10px', 
              borderRadius: '16px',
              textAlign: 'center',
              flex: '1'
            }}
          >
            <p style={{ margin: '0 0 10px 0', fontWeight: 500, color: '#64748b', fontSize: '0.85rem' }}>
              {item.day}
            </p>
            
            <div style={{ fontSize: '2.2rem', margin: '12px 0' }}>
              {item.icon}
            </div>
            
            <p style={{ margin: 0, fontWeight: 400, color: '#1e293b', fontSize: '1.1rem' }}>
              {convertTemp(item.temp, unit).toFixed(0)}°{unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};