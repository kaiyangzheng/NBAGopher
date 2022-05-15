import React, { useState, useEffect } from 'react'
import './MIPCard.css'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MIPCard() {
    const [MIPPrediction, setMIPPrediction] = useState([])
    const [MIPPredictionData, setMIPPredictionData] = useState({})
    const [MIPStats, setMIPStats] = useState({})
    const [MIPStatsDiff, setMIPStatsDiff] = useState({})
    const [averageTop30PPGData, setAverageTop30PPGData] = useState({})
    const [chartData, setChartData] = useState([])
    const [name, setName] = useState('')
    let stats = ['ppg', 'apg', 'rpg', 'TS_pctg', 'BPM'];
    let statNames = ['PPG', 'APG', 'RPG', 'TS%', 'BPM'];


    const getMIPPrediction = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/player/predicted_mip", requestOptions)
        const MIPPrediction = await response.json()
        setMIPPrediction(MIPPrediction?.id)
    }

    const getMIPPredictionData = async (playerId) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/${playerId}`, requestOptions)
        const playerData = await response.json()
        setMIPPredictionData(playerData);
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
        getMIPPrediction();
    }, [])


    useEffect(() => {
        getAverageTop30PPGData();
    }, [])

    useEffect(() => {
        getMIPPredictionData(MIPPrediction);
    }, [MIPPrediction])

    useEffect(() => {
        let statsDiff = [];
        let statsList = [];
        let playerBasicLatest = MIPPredictionData?.player_basic_latest;
        let playerBasicPrev = MIPPredictionData?.player_basic_prev;
        let playerAdvancedLatest = MIPPredictionData?.player_advanced_latest;
        let playerAdvancedPrev = MIPPredictionData?.player_advanced_prev;
        for (let i = 0; i < stats.length; i++) {
            if (i < 3) {
                statsDiff.push(parseFloat(playerBasicLatest?.[stats[i]]) - parseFloat(playerBasicPrev?.[stats[i]]))
                statsList.push(parseFloat(playerBasicLatest?.[stats[i]]))
            } else {
                statsDiff.push(parseFloat(playerAdvancedLatest?.[stats[i]]) - parseFloat(playerAdvancedPrev?.[stats[i]]))
                statsList.push(parseFloat(playerAdvancedLatest?.[stats[i]]))
            }

        }
        setMIPStats(statsList);
        setMIPStatsDiff(statsDiff);
    }, [MIPPredictionData])

    useEffect(() => {
        let stats = ['ppg', 'apg', 'rpg', 'spg', 'bpg', 'TS_pctg', 'AST_pctg', 'TRB_pctg', 'STL_pctg', 'BLK_pctg', 'BPM']
        let statNames = ['PPG', 'APG', 'RPG', 'SPG', 'BPG', 'TS%', 'AST%', 'REB%', 'STL%', 'BLK%', 'BPM']
        let dataList = []
        for (let i = 0; i < stats.length; i++) {
            if (i < 5) {
                dataList.push({
                    name: statNames[i],
                    average: averageTop30PPGData?.['average_basic_stats']?.[stats[i]],
                    mip: MIPPredictionData?.['player_basic_latest']?.[stats[i]]
                })
            } else {
                dataList.push({
                    name: statNames[i],
                    average: averageTop30PPGData?.['average_advanced_stats']?.[stats[i]],
                    mip: MIPPredictionData?.['player_advanced_latest']?.[stats[i]]
                })
            }
        }
        setChartData([...dataList])
        setName(MIPPredictionData?.['player_info']?.['first_name'] + ' ' + MIPPredictionData?.['player_info']?.['last_name'])
    }, [MIPPredictionData])

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
