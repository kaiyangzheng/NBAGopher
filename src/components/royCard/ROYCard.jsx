import React, { useState, useEffect } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ROYCard.css'

export default function ROYCard() {
    const [ROYPrediction, setROYPrediction] = useState([])
    const [ROYPredictionData, setROYPredictionData] = useState({})
    const [ROYStats, setROYStats] = useState({})
    const [averageTop30PPGData, setAverageTop30PPGData] = useState({})
    const [chartData, setChartData] = useState([])
    const [name, setName] = useState('')
    let stats = ['ppg', 'apg', 'rpg', 'TS_pctg', 'BPM'];
    let statNames = ['PPG', 'APG', 'RPG', 'TS%', 'BPM'];

    const getROYPrediction = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/player/predicted_roy", requestOptions)
        const ROYPrediction = await response.json()
        setROYPrediction(ROYPrediction.id);
    }

    const getROYPredictionData = async (playerId) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/${playerId}`, requestOptions)
        const playerData = await response.json()
        setROYPredictionData(playerData);
    }

    const getAverageTop30PPGData = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/player/average_stats_top_30_ppg", requestOptions)
        const averageTop30PPG = await response.json()
        setAverageTop30PPGData(averageTop30PPG)
    }

    useEffect(() => {
        getROYPrediction()
    }, [])

    useEffect(() => {
        getAverageTop30PPGData()
    }, [])


    useEffect(() => {
        getROYPredictionData(ROYPrediction)
    }, [ROYPrediction])

    useEffect(() => {
        let statsList = [];
        let playerBasicLatest = ROYPredictionData?.player_basic_latest;
        let playerAdvancedLatest = ROYPredictionData?.player_advanced_latest;
        for (let i = 0; i < stats.length; i++) {
            if (i < 3) {
                statsList.push(playerBasicLatest?.[stats[i]])
            } else {
                statsList.push(playerAdvancedLatest?.[stats[i]])
            }
        }
        setROYStats(statsList)
    }, [ROYPredictionData])

    useEffect(() => {
        let stats = ['ppg', 'apg', 'rpg', 'spg', 'bpg', 'TS_pctg', 'AST_pctg', 'TRB_pctg', 'STL_pctg', 'BLK_pctg', 'BPM']
        let statNames = ['PPG', 'APG', 'RPG', 'SPG', 'BPG', 'TS%', 'AST%', 'REB%', 'STL%', 'BLK%', 'BPM']
        let dataList = []
        for (let i = 0; i < stats.length; i++) {
            if (i < 5) {
                dataList.push({
                    name: statNames[i],
                    average: averageTop30PPGData?.['average_basic_stats']?.[stats[i]],
                    roy: ROYPredictionData?.['player_basic_latest']?.[stats[i]]
                })
            } else {
                dataList.push({
                    name: statNames[i],
                    average: averageTop30PPGData?.['average_advanced_stats']?.[stats[i]],
                    roy: ROYPredictionData?.['player_advanced_latest']?.[stats[i]]
                })
            }
        }
        setChartData([...dataList])
        setName(ROYPredictionData?.['player_info']?.['first_name'] + ' ' + ROYPredictionData?.['player_info']?.['last_name'])
    }, [ROYPredictionData])


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
