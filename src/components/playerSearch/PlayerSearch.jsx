import React, { useState } from 'react'
import './playersearch.css'
import TextField from '@material-ui/core/TextField';

export default function PlayerSearch() {
    const season = 2021;
    const [searchValue, setSearchValue] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const handleSearchPlayers = async () => {
        if (searchValue == '') {
            return;
        }
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch(`https://data.nba.net/data/10s/prod/v1/${season}/players.json`, requestOptions)
        const players = await response.json();
        let filter = players.league.standard.filter(player => (player.firstName.toLowerCase() + ' ' + player.lastName.toLowerCase()).includes(searchValue.toLowerCase()))
        setFilteredPlayers(filter);
    }
    return (
        <div className="playerSearchWrapper">
            <div className="searchbar">
                <TextField id="standard-basic" label="Search Players..." variant="standard" style={{ width: "100%" }} autoComplete="off" onChange={(e) => { setSearchValue(e.target.value); handleSearchPlayers() }} />
            </div>
            <div className="searchResults">
                {searchValue != '' && <ul className="searchList">
                    {filteredPlayers.map((player, index) => {
                        return (
                            <li key={index} className="searchListItem fadeInDown">
                                <div className="title">
                                    <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player?.personId}.png`} alt="" className="titleImg" />
                                    <span className="searchName">{player.firstName + ' ' + player.lastName}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>}
            </div>
        </div>
    )
}