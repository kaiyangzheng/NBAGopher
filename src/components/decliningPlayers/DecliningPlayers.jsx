import React, { useEffect, useState } from 'react'
import { ArrowUpwardSharp, ArrowDownwardSharp } from '@material-ui/icons'
import './decliningplayers.css'

export default function ImprovingPlayers() {
    const [trendingPlayers, setTrendingPlayers] = useState([])
    const [improvingPlayerIds, setImprovingPlayerIds] = useState([]);
    const [improvingPlayersData, setImprovingPlayersData] = useState({});
    const [tableData, setTableData] = useState([]);
    const getTrendingPlayers = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            credentials: 'include',
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/player/trending_players", requestOptions)
        const trendingPlayers = await response.json()
        setTrendingPlayers(trendingPlayers);
    }

    const getPlayerData = async (playerId) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            credentials: 'include',
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/${playerId}`, requestOptions)
        const playerData = await response.json()
        setImprovingPlayersData(improvingPlayersData => ({ ...improvingPlayersData, [playerId]: playerData }))
    }

    useEffect(() => {
        getTrendingPlayers();
    }, [])

    useEffect(() => {
        let improvingPlayersIds = [];
        for (let i = 0; i < trendingPlayers.length; i++) {
            if (!trendingPlayers[i].is_improving) {
                improvingPlayersIds.push(trendingPlayers[i].id);
            }
        }
        setImprovingPlayerIds(improvingPlayersIds);
    }, [trendingPlayers])

    useEffect(() => {
        for (let i = 0; i < improvingPlayerIds.length; i++) {
            let playerId = improvingPlayerIds[i]
            getPlayerData(playerId);
        }
    }, [improvingPlayerIds])

    useEffect(() => {
        let dataList = []
        for (let i = 0; i < improvingPlayerIds.length; i++) {
            {
                let playerId = improvingPlayerIds[i]
                let playerData = improvingPlayersData[playerId]
                if (playerData) {
                    let data = {
                        id: playerId,
                        "Name": playerData['player_info']?.first_name + " " + playerData['player_info']?.last_name,
                        "Position": playerData['player_info']?.pos_abbr,
                        "PPG": parseFloat(playerData['player_basic_latest']?.ppg),
                        "PPG_diff": Math.round(parseFloat(playerData['player_basic_latest']?.ppg) - parseFloat(playerData['player_basic_prev']?.ppg), 1),
                        "APG": parseFloat(playerData['player_basic_latest']?.apg),
                        "APG_diff": Math.round(parseFloat(playerData['player_basic_latest']?.apg) - parseFloat(playerData['player_basic_prev']?.apg), 1),
                        "RPG": parseFloat(playerData['player_basic_latest']?.rpg),
                        "RPG_diff": Math.round(parseFloat(playerData['player_basic_latest']?.rpg) - parseFloat(playerData['player_basic_prev']?.rpg), 1),
                        "TS%": parseFloat(playerData['player_advanced_latest']?.TS_pctg),
                        "TS%_diff": (parseFloat(playerData['player_advanced_latest']?.TS_pctg) - parseFloat(playerData['player_advanced_prev']?.TS_pctg)).toString().slice(0, 5),
                        "BPM": parseFloat(playerData['player_advanced_latest']?.BPM),
                        "BPM_diff": Math.round(parseFloat(playerData['player_advanced_latest']?.BPM) - parseFloat(playerData['player_advanced_prev']?.BPM), 1),
                    }
                    dataList.push(data);
                }
            }
        }
        setTableData(dataList.splice(0, 5));
    }, [improvingPlayersData])

    return (
        <div className="improvingPlayers">
            <h3 className="improvingPlayersTitle">Declining Players</h3>
            <table className="improvingPlayersTable">
                <tr className="improvingPlayersTr">
                    <th className="improvingPlayersTh">Player</th>
                    <th className="improvingPlayersTh">Position</th>
                    <th className="improvingPlayersTh">PPG</th>
                    <th className="improvingPlayersTh">APG</th>
                    <th className="improvingPlayersTh">RPG</th>
                    <th className="improvingPlayersTh">TS%</th>
                    <th className="improvingPlayersTh">BPM</th>
                </tr>
                {tableData.map((player, index) => {
                    return (
                        <tr className="improvingPlayersTr" key={index}>
                            <td className="improvingPlayer">
                                <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`} alt="" className="improvingPlayerImg" />
                                <td className="improvingPlayerName">{player.Name}</td>
                            </td>
                            <td className="improvingPlayersTd">{player.Position}</td>
                            <td className="improvingPlayersTd"><div className="statContainer">{player.PPG} <span className="diff">{player.PPG_diff >= 0 && "+"}{player.PPG_diff} {player.PPG_diff >= 0 ? <ArrowUpwardSharp className="arrowIcon increase" /> : <ArrowDownwardSharp className="arrowIcon decrease" />}</span></div></td>
                            <td className="improvingPlayersTd"><div className="statContainer">{player.APG} <span className="diff">{player.APG_diff >= 0 && "+"}{player.APG_diff} {player.APG_diff >= 0 ? <ArrowUpwardSharp className="arrowIcon increase" /> : <ArrowDownwardSharp className="arrowIcon decrease" />}</span></div></td>
                            <td className="improvingPlayersTd"><div className="statContainer">{player.RPG} <span className="diff">{player.RPG_diff >= 0 && "+"}{player.RPG_diff} {player.RPG_diff >= 0 ? <ArrowUpwardSharp className="arrowIcon increase" /> : <ArrowDownwardSharp className="arrowIcon decrease" />}</span></div></td>
                            <td className="improvingPlayersTd"><div className="statContainer">{player['TS%']} <span className="diff">{player['TS%_diff'] >= 0 && "+"}{player['TS%_diff']} {player['TS%_diff'] >= 0 ? <ArrowUpwardSharp className="arrowIcon increase" /> : <ArrowDownwardSharp className="arrowIcon decrease" />}</span></div></td>
                            <td className="improvingPlayersTd"><div className="statContainer">{player.BPM} <span className="diff">{player.BPM_diff >= 0 && "+"}{player.BPM_diff} {player.BPM_diff >= 0 ? <ArrowUpwardSharp className="arrowIcon increase" /> : <ArrowDownwardSharp className="arrowIcon decrease" />}</span></div></td>
                        </tr>
                    )
                })}
            </table>
            <div className="subtitleContainer">
                <span className="subtitle">Min. 70% Games Played | Declined statistics may not be reflected in table</span>
            </div>
        </div>
    )
}
