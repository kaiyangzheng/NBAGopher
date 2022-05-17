import React, { useEffect, useState } from 'react'
import { ArrowUpwardSharp, ArrowDownwardSharp } from '@material-ui/icons'
import './improvingplayers.css'

export default function ImprovingPlayers({ tableData }) {

    return (
        <div className="improvingPlayers">
            <h3 className="improvingPlayersTitle">Improving Players</h3>
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
                <span className="subtitle">Min. 70% Games Played | Improved statistics may not be reflected in table</span>
            </div>

        </div>
    )
}
