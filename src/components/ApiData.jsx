import React from 'react';
import CoinCard from './CoinCard.jsx';

function ApiData({apiData, minMarketCap, setMinMarketCap}){

    //I just moved this from App.jsx into here
    // Filter and sort data based on minimum market cap and 24h change
    const filteredAndSortedData = apiData ? apiData
        .filter(coin => {
            if (!minMarketCap) return true;
            return coin.market_cap >= parseInt(minMarketCap);
        })
        .sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0))
        : [];

    if (!apiData) return null; 

    return(
        <>      
            {/* Filter Controls */}
            {/* moved from app.jsx */}
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
            {/* moved from app.jsx */}
            <div className="api-data">
                <h2 className="text-blue-900">Top Performers by 24h % Change</h2>
                <div className="crypto-list">
                    {filteredAndSortedData.slice(0, 10).map((coin, index) => (
                    <CoinCard 
                        coin={coin} 
                        rank={index +1} 
                        key={coin.id} 
                    />
                    ))} 
                </div>
            </div>
        </>
    )
}

export default ApiData;