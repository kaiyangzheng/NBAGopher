import React, { useState, useEffect } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ROYCard.css'

export default function ROYCard({ ROYPrediction, ROYPredictionData, ROYStats, chartData, name }) {

    let stats = ['ppg', 'apg', 'rpg', 'TS_pctg', 'BPM'];
    let statNames = ['PPG', 'APG', 'RPG', 'TS%', 'BPM'];


    return (
        <div className="ROYCard">
            <div className="ROYItem">
                <h3>ROY Prediction</h3>
                <div className="ROYTitleContainer">
                    <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${ROYPrediction}.png`} alt="" className="ROYTitleImg" />
                    <span className="ROYTitleText">{name}</span>
                </div>
                <div className="ROYStatsContainer">
                    {stats.map((stat, index) => {
                        return <div className="ROYStat" key={index}>
                            {ROYStats[index]} <span className="ROYStatName">{statNames[index]}</span>
                        </div>
                    })}
                </div>
            </div>
            <div className="ROYChart">
                <h3>{name} vs. 75th Percentile</h3>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <BarChart data={chartData} margin={{ left: -25 }}>
                        <XAxis dataKey="name" />
                        <YAxis type="number" domain={[0, 20]} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="roy" fill="#8884d8" name={name} />
                        <Bar dataKey="average" fill="#82ca9d" name="75th Percentile" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
