   
import React, { useState, useEffect } from 'react'
import './teamstandings.css'

export default function TeamStandings({ westStandings, eastStandings }) {
    const [conference, setConference] = useState('west')
    const [selectedStandings, setSelectedStandings] = useState([]);

    useEffect(() => {
        setSelectedStandings(conference === 'west' ? westStandings : eastStandings)
    }, [conference])

    return (
        <div className="teamStandings">
            <h3 className="teamStandingsTitle">
                <div className={conference == 'west' ? "confButton border-right hover-underline-animation-left selected" : "confButton border-right hover-underline-animation-left"} onClick={() => setConference('west')}>
                    West Standings
                </div>
                <div className={conference == 'east' ? "confButton border-left hover-underline-animation-right selected" : "confButton border-left hover-underline-animation-right"} onClick={() => setConference('east')}>
                    East Standings
                </div>
            </h3>
            <table className="teamStandingsTable">
                <tr className="teamStandingsTr column">
                    <th className="teamStandingsTh">
                        Rk
                    </th>
                    <th className="teamStandingsTh tl-left">
                        Team
                    </th>
                    <th className="teamStandingsTh">
                        W
                    </th>
                    <th className="teamStandingsTh">
                        L
                    </th>
                    <th className="teamStandingsTh">
                        Win%
                    </th>
                    <th className="teamStandingsTh">
                        GB
                    </th>
                    <th className="teamStandingsTh">
                        Home
                    </th>
                    <th className="teamStandingsTh">
                        Away
                    </th>
                    <th className="teamStandingsTh">
                        L-10
                    </th>
                    <th className="teamStandingsTh">
                        Streak
                    </th>
                </tr>
                {selectedStandings.length == 0 && westStandings.map((team, index) => {
                    return (
                        <tr className={index >= 0 ? "teamStandingsTr border" : "teamStandingsTr"} key={index}>
                            <td className="teamStandingsTd">
                                {index + 1}
                            </td>
                            <td className="teamStandingsTd">
                                <div className="teamContainer">
                                    <img src={`https://cdn.nba.com/logos/nba/${westStandings[index][0]}/primary/L/logo.svg`} alt="" className="teamImg" />
                                    <span className="teamName">
                                        {westStandings[index][1]['info']['name']}
                                    </span>
                                </div>
                            </td>
                            <td className="teamStandingsTd">
                                {westStandings[index][1]['wins']}
                            </td>
                            <td className="teamStandingsTd">
                                {westStandings[index][1]['losses']}
                            </td>
                            <td className="teamStandingsTd">
                                {westStandings[index][1]['win_pctg']}
                            </td>
                            <td className="teamStandingsTd">
                                {westStandings[index][1]['games_back']}
                            </td>
                            <td className="teamStandingsTd">
                                {westStandings[index][1]['home_wins']}-{westStandings[index][1]['home_losses']}
                            </td>
                            <td className="teamStandingsTd">
                                {westStandings[index][1]['away_wins']}-{westStandings[index][1]['away_losses']}
                            </td>
                            <td className="teamStandingsTd">
                                {westStandings[index][1]['last_ten_wins']}-{westStandings[index][1]['last_ten_losses']}
                            </td>
                            <td className="teamStandingsTd">
                                {westStandings[index][1]['streak']}
                            </td>
                        </tr>
                    )
                })}
                {selectedStandings.length > 0 && selectedStandings.map((team, index) => {
                    return (
                        <tr className={index >= 0 ? "teamStandingsTr border" : "teamStandingsTr"} key={index}>
                            <td className="teamStandingsTd">
                                {index + 1}
                            </td>
                            <td className="teamStandingsTd">
                                <div className="teamContainer">
                                    <img src={`https://cdn.nba.com/logos/nba/${selectedStandings[index][0]}/primary/L/logo.svg`} alt="" className="teamImg" />
                                    <span className="teamName">
                                        {selectedStandings[index][1]['info']['name']}
                                    </span>
                                </div>
                            </td>
                            <td className="teamStandingsTd">
                                {selectedStandings[index][1]['wins']}
                            </td>
                            <td className="teamStandingsTd">
                                {selectedStandings[index][1]['losses']}
                            </td>
                            <td className="teamStandingsTd">
                                {selectedStandings[index][1]['win_pctg']}
                            </td>
                            <td className="teamStandingsTd">
                                {selectedStandings[index][1]['games_back']}
                            </td>
                            <td className="teamStandingsTd">
                                {selectedStandings[index][1]['home_wins']}-{westStandings[index][1]['home_losses']}
                            </td>
                            <td className="teamStandingsTd">
                                {selectedStandings[index][1]['away_wins']}-{westStandings[index][1]['away_losses']}
                            </td>
                            <td className="teamStandingsTd">
                                {selectedStandings[index][1]['last_ten_wins']}-{westStandings[index][1]['last_ten_losses']}
                            </td>
                            <td className="teamStandingsTd">
                                {selectedStandings[index][1]['streak']}
                            </td>
                        </tr>
                    )
                })
                }
            </table>
        </div>
    )
}