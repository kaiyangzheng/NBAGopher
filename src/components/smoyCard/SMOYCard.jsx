import React, { useState, useEffect } from 'react'
import './SMOYCard.css'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SMOYCard({ SMOYPrediction, SMOYPredictionData, SMOYStatsDiff, SMOYStats, chartData, name }) {

    let stats = ['ppg', 'apg', 'rpg', 'TS_pctg', 'BPM'];
    let statNames = ['PPG', 'APG', 'RPG', 'TS%', 'BPM'];

    return (
        <div className="SMOYCard">
            <div className="SMOYItem">
                <h3>6MOY Prediction</h3>
                <div className="SMOYTitleContainer">
                    <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${SMOYPrediction}.png`} alt="" className="SMOYTitleImg" />
                    <span className="SMOYTitleText">{SMOYPredictionData?.['player_info']?.['first_name']} {SMOYPredictionData?.['player_info']?.['last_name']}</span>
                </div>
                <div className="SMOYStatsContainer">
                    {stats.map((stat, index) => {
                        let statDiff = Math.round(SMOYStatsDiff[index] * 100) / 100;
                        return <div className="SMOYStat">{SMOYStats[index]}  <span className="SMOYStatName">{statNames[index]}</span></div>
                    })}
                </div>
            </div >
            <div className="SMOYChart">
                <h3>{name} vs. 75th Percentile</h3>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <BarChart data={chartData} margin={{ left: -25 }}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 20]} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="SMOY" fill="#8884d8" name={name} />
                        <Bar dataKey="average" fill="#82ca9d" name="75th Percentile" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div >
    )
}
