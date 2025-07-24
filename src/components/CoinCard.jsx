import React from 'react';

function CoinCard({coin, rank}){
    if(!coin) return null; //just for safety

    //all this stuff is also from app.jsx
    return(
        <>
            <div className="crypto-item">
                <div className="crypto-header">
                    <div className="rank-badge">{rank}</div>
                    <img 
                        src={coin.image} 
                        alt={`${coin.name} logo`} 
                        className="crypto-logo"
                    />
                    <h3>
                        {coin.name} ({coin.symbol.toUpperCase()})
                    </h3>
                </div>
                <p>Price: ${coin.current_price}</p>
                <p>Market Cap: ${coin.market_cap?.toLocaleString()}</p>
                <p className={`change-24h ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                  24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%
                </p>
            </div>
        </>
    )
}

export default CoinCard;