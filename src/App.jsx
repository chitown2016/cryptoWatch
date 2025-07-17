import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiData, setApiData] = useState(null)
  const [minMarketCap, setMinMarketCap] = useState('')

  const handleTestClick = () => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json', 
        'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {setApiData(json);
        console.log(json);
      })
      .catch(err => console.error(err));
  }

  // Filter and sort data based on minimum market cap and 24h change
  const filteredAndSortedData = apiData ? apiData
    .filter(coin => {
      if (!minMarketCap) return true;
      return coin.market_cap >= parseInt(minMarketCap);
    })
    .sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0))
    : [];

  return (
    <>
      <div>
      </div>
      <h1>Top Performing Coins</h1>
      <div className="card">
        
        <button onClick={handleTestClick}>
          Refresh List       
        </button>
      </div>
      
      {/* Filter Controls */}
      {apiData && (
        <div className="filter-controls">
          <label htmlFor="minMarketCap">Minimum Market Cap:</label>
          <select 
            id="minMarketCap"
            value={minMarketCap} 
            onChange={(e) => setMinMarketCap(e.target.value)}
            className="market-cap-select"
          >
            <option value="">All Coins</option>
            <option value="1000000000">$1 Billion+</option>
            <option value="10000000000">$10 Billion+</option>
            <option value="100000000000">$100 Billion+</option>
            <option value="1000000000000">$1 Trillion+</option>
          </select>
        </div>
      )}
      
      {/* Display API Data */}
      {apiData && (
        <div className="api-data">
          <h2>Top Performers by 24h % Change</h2>
          <div className="crypto-list">
            {filteredAndSortedData.slice(0, 10).map((coin, index) => (
              <div key={index} className="crypto-item">
                <div className="crypto-header">
                  <div className="rank-badge">#{index + 1}</div>
                  <img 
                    src={coin.image} 
                    alt={`${coin.name} logo`} 
                    className="crypto-logo"
                  />
                  <h3>{coin.name} ({coin.symbol.toUpperCase()})</h3>
                </div>
                <p>Price: ${coin.current_price}</p>
                <p>Market Cap: ${coin.market_cap?.toLocaleString()}</p>
                <p className={`change-24h ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                  24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      
    </>
  )
}

export default App
