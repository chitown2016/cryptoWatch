import { useState } from 'react'
import './App.css'
import ApiData from './components/ApiData'

function App() {
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

  //moved all the divs that had jobs into components
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
      <ApiData 
        apiData={apiData}
        minMarketCap={minMarketCap}
        setMinMarketCap={setMinMarketCap}
      />
    </>
  )
}

export default App
