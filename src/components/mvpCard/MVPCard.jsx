import React, { useState, useEffect } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './MVPcard.css'

export default function MVPCard({ PredictedMVP, chartData }) {
    return (
        <div className="MVPCard">
            <div className="MVPItem">
                <h3>MVP Prediction</h3>
                <div className="MVPTitleContainer">
                    <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${PredictedMVP?.id}.png`} alt="" className="MVPTitleImg" />
                    <span className="MVPTitleText">{PredictedMVP?.Name}</span>
                </div>
                <div className="MVPStatsContainer">
                    <div className="MVPStat">{PredictedMVP?.PPG} <span className="MVPStatName">PPG</span></div>
                    <div className="MVPStat">{PredictedMVP?.APG} <span className="MVPStatName">APG</span></div>
                    <div className="MVPStat">{PredictedMVP?.RPG} <span className="MVPStatName">RPG</span></div>
                    <div className="MVPStat">{PredictedMVP?.['TS%']} <span className="MVPStatName">TS%</span></div>
                    <div className="MVPStat">{PredictedMVP?.BPM} <span className="MVPStatName">BPM</span></div>
                </div>
            </div>
            <div className="MVPChart">
                <h3>{PredictedMVP?.Name} vs. 75th Percentile</h3>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <BarChart data={chartData} margin={{ left: -25 }}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 20]} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="mvp" fill="#8884d8" name={PredictedMVP?.Name} />
                        <Bar dataKey="average" fill="#82ca9d" name="75th Percentile" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
