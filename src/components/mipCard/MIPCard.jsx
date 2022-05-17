import React, { useState, useEffect } from 'react'
import './MIPCard.css'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MIPCard({ MIPPrediction, MIPPredictionData, MIPStats, MIPStatsDiff, chartData, name }) {

    let stats = ['ppg', 'apg', 'rpg', 'TS_pctg', 'BPM'];
    let statNames = ['PPG', 'APG', 'RPG', 'TS%', 'BPM'];

    return (
        <div className="MIPCard">
            <div className="MIPItem">
                <h3>MIP Prediction</h3>
                <div className="MIPTitleContainer">
                    <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${MIPPrediction}.png`} alt="" className="MIPTitleImg" />
                    <span className="MIPTitleText">{MIPPredictionData?.['player_info']?.['first_name']} {MIPPredictionData?.['player_info']?.['last_name']}</span>
                </div>
                <div className="MIPStatsContainer">
                    {stats.map((stat, index) => {
                        let statDiff = Math.round(MIPStatsDiff[index] * 100) / 100;
                        return <div className="MIPStat">{MIPStats[index]} <span className={statDiff >= 0 ? "MIPStatChange increase" : "MIPStatChange decrease"}>({statDiff >= 0 && "+"}{statDiff})</span> <span className="MIPStatName">{statNames[index]}</span></div>
                    })}
                </div>
            </div>
            <div className="MIPChart">
                <h3>{name} vs. 75th Percentile</h3>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <BarChart data={chartData} margin={{ left: -25 }}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 20]} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="mip" fill="#8884d8" name={name} />
                        <Bar dataKey="average" fill="#82ca9d" name="75th Percentile" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    )
}
