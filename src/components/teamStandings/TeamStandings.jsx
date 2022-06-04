import React, { useState, useEffect } from 'react'
import './teamstandings.css'

export default function TeamStandings({ westStandings, eastStandings }) {
    return (
        <div className="teamStandings">
            <h3 className="teamStandingsTitle">
                Standings
            </h3>
            <table className="teamStandingsTable">
                <tr className="teamStandingsTr">
                    <th className="teamStandingsTh">
                        Rk
                    </th>
                    <th className="teamStandingsTh">
                        Western Conference
                    </th>
                    <th className="teamStandingsTh">
                        Eastern Conference
                    </th>
                </tr>
                {westStandings.map((team, index) => {
                    return (
                        <tr className="teamStandingsTr" key={index}>
                            <td className="teamStandingsTd">
                                {index + 1}
                            </td>
                            <td className="teamStandingsTd">
                                <div className="teamContainer">
                                    <img src={`https://cdn.nba.com/logos/nba/${westStandings[index][0]}/primary/L/logo.svg`} alt="" className="teamImg" />
                                    <span className="teamName">
                                        {westStandings[index][1]['info']['name']}
                                        <br />
                                        ({westStandings[index][1]['wins']}-{westStandings[index][1]['losses']})
                                    </span>
                                </div>
                            </td>
                            <td className="teamStandingsTd">
                                <div className="teamContainer">
                                    <img src={`https://cdn.nba.com/logos/nba/${eastStandings[index][0]}/primary/L/logo.svg`} alt="" className="teamImg" />
                                    <span className="teamName">
                                        {eastStandings[index][1]['info']['name']}
                                        <br />
                                        ({eastStandings[index][1]['wins']}-{eastStandings[index][1]['losses']})
                                    </span>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}
