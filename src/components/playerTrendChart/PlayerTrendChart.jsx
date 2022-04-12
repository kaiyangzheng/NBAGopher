import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './playertrendchart.css'

export default function PlayerTrendChart({ playerId, role }) {
    const [playerData, setPlayerData] = useState({});
    const [chartData, setChartData] = useState([]);

    const getPlayerData = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }

        const response = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/by_season/${playerId}`, requestOptions)
        const playerData = await response.json()
        setPlayerData(playerData);
    }

    useEffect(() => {
        getPlayerData();
    }, [])

    useEffect(() => {
        let basic_stats = playerData.player_basic_stats;
        let advanced_stats = playerData.player_advanced_stats;
        basic_stats = basic_stats?.sort((a, b) => a.season - b.season);
        advanced_stats = advanced_stats?.sort((a, b) => a.season - b.season);
        let data = [];
        for (let i = 0; i < advanced_stats?.length; i++) {
            if (role === "o") {
                data.push({
                    season: basic_stats[i].season,
                    ppg: parseFloat(basic_stats[i].ppg),
                    apg: parseFloat(basic_stats[i].apg),
                    TSPctg: parseFloat(advanced_stats[i].TS_pctg),
                    OBPM: parseFloat(advanced_stats[i].OBPM)
                })
            } else {
                data.push({
                    season: basic_stats[i].season,
                    rpg: parseFloat(basic_stats[i].rpg),
                    spg: parseFloat(basic_stats[i].spg),
                    bpg: parseFloat(basic_stats[i].bpg),
                    DBPM: parseFloat(advanced_stats[i].DBPM)
                })
            }
        }
        setChartData([...data]);
    }, [playerData])

    if (chartData.length === 0) {
        console.log('loading');
    } else {
        return (
            <div className="playerTrendChart">
                {role == "o" && <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <LineChart data={chartData}>
                        <XAxis dataKey={"season"} stroke='#5550bd' />
                        <Line type="monotone" dataKey="ppg" stroke="#009933" name="PPG" />
                        <Line type="monotone" dataKey="apg" stroke="#ff0000" name="APG" />
                        <Line type="monotone" dataKey="TSPctg" stroke="#cc00ff" name="TS%" />
                        <Line type="monotone" dataKey="OBPM" stroke='#5550bd' />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                    </LineChart>
                </ResponsiveContainer>}
                {role == "d" && <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <LineChart data={chartData}>
                        <XAxis dataKey={"season"} stroke='#5550bd' />
                        <Line type="monotone" dataKey="rpg" stroke="#009933" name="RPG" />
                        <Line type="monotone" dataKey="spg" stroke="#ff0000" name="SPG" />
                        <Line type="monotone" dataKey="bpg" stroke="#cc00ff" name="BPG" />
                        <Line type="monotone" dataKey="DBPM" stroke='#5550bd' />
                        <Tooltip />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>}
            </div>
        )
    }

}
