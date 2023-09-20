import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file


const App = () => {
  const cohortName = '2302-ACC-ET-WEB-PT';
  const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

  const [players, setPlayers] = useState([]);

  const fetchAllPlayers = async () => {
    try {
      const response = await fetch(`${APIURL}players`);
      if (response.ok) {
        const data = await response.json();
        setPlayers(data.data.players);
      } else {
        console.error('Error fetching players:', response.status);
      }
    } catch (err) {
      console.error('Uh oh, trouble fetching players!', err);
    }
  };

  const renderAllPlayers = (playerList) => {
    try {
      if (playerList && playerList.length > 0) {
        const playerContainerHTML = playerList.map((player) => (
          <div key={player.id}>
            <h2>{player.name}</h2>
            <p>Breed: {player.breed}</p>
            <p>Status: {player.status}</p>
            <img src={player.imageUrl} alt={player.name} />
            <button onClick={() => removePlayer(player.id)}>Remove</button>
          </div>
        ));

        return playerContainerHTML;
      }
    } catch (err) {
      console.error('Uh oh, trouble rendering players!', err);
    }
  };

  const removePlayer = async (playerId) => {
    try {
      const response = await fetch(`${APIURL}players/${playerId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Player removed successfully, update the player list
        fetchAllPlayers();
      } else {
        console.error('Error removing player:', response.status);
      }
    } catch (err) {
      console.error(`Whoops, trouble removing player #${playerId} from the roster!`, err);
    }
  };

  useEffect(() => {
    fetchAllPlayers();
  }, []);

  return (
    <div>
      <h1>Puppy Bowl Roster</h1>
      <div id="all-players-container">
        {renderAllPlayers(players)}
      </div>
    </div>
  );
};

export default App;
