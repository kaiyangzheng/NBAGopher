import React, { useState, useEffect } from 'react'
import './DPOYCard.css'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function DPOYCard() {
    const [DPOYPrediction, setDPOYPrediction] = useState([])
    const [DPOYPredictionData, setDPOYPredictionData] = useState({})
    const [averageTop30PPGData, setAverageTop30PPGData] = useState({})
    const [chartData, setChartData] = useState([])
    const [name, setName] = useState('')


    const getDPOYPrediction = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/player/predicted_dpoy", requestOptions)
        const DPOYPrediction = await response.json()
        setDPOYPrediction(DPOYPrediction?.id);
    }

    const getDPOYPredictionData = async (playerId) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/${playerId}`, requestOptions)
        const playerData = await response.json()
        setDPOYPredictionData(DPOYPredictionData => ({ ...DPOYPredictionData, [playerId]: playerData }))
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
        getDPOYPrediction()
    }, [])

    useEffect(() => {
        getAverageTop30PPGData()
    }, [])

    useEffect(() => {
        getDPOYPredictionData(DPOYPrediction)
    }, [DPOYPrediction])

    useEffect(() => {
        let dataList = []
        let stats = ['rpg', 'spg', 'bpg', 'TRB_pctg', 'STL_pctg', 'BLK_pctg', 'DBPM']
        let statNames = ['RPG', 'SPG', 'BPG', 'REB%', 'STL%', 'BLK%', 'DBPM']
        for (let i = 0; i < stats.length; i++) {
            if (i < 3) {
                dataList.push({
                    name: statNames[i],
                    average: averageTop30PPGData?.['average_basic_stats']?.[stats[i]],
                    dpoy: DPOYPredictionData?.[DPOYPrediction]?.['player_basic_latest']?.[stats[i]]
                })
            } else {
                dataList.push({
                    name: statNames[i],
                    average: averageTop30PPGData?.['average_advanced_stats']?.[stats[i]],
                    dpoy: DPOYPredictionData?.[DPOYPrediction]?.['player_advanced_latest']?.[stats[i]]
                })
            }
        }
        setChartData([...dataList])
        setName(DPOYPredictionData?.[DPOYPrediction]?.['player_info']?.['first_name'] + ' ' + DPOYPredictionData?.[DPOYPrediction]?.['player_info']?.['last_name'])
    }, [DPOYPredictionData])

    return (
        <div className="DPOYCard">
            <div className="DPOYItem">
                <h3>DPOY Prediction</h3>
                <div className="DPOYTitleContainer">
                    <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${DPOYPrediction}.png`} alt="" className="DPOYTitleImg" />
                    <span className="DPOYTitleText">{DPOYPredictionData?.[DPOYPrediction]?.['player_info']?.['first_name']} {DPOYPredictionData?.[DPOYPrediction]?.['player_info']?.['last_name']}</span>
                </div>
                <div className="DPOYStatsContainer">
                    <div className="DPOYStat">{DPOYPredictionData?.[DPOYPrediction]?.['player_basic_latest']?.['rpg']} <span className="DPOYStatName">RPG</span></div>
                    <div className="DPOYStat">{DPOYPredictionData?.[DPOYPrediction]?.['player_basic_latest']?.['spg']} <span className="DPOYStatName">SPG</span></div>
                    <div className="DPOYStat">{DPOYPredictionData?.[DPOYPrediction]?.['player_basic_latest']?.['bpg']} <span className="DPOYStatName">BPG</span></div>
                    <div className="DPOYStat">{DPOYPredictionData?.[DPOYPrediction]?.['player_advanced_latest']?.['TRB_pctg']} <span className="DPOYStatName">REB%</span></div>
                    <div className="DPOYStat">{DPOYPredictionData?.[DPOYPrediction]?.['player_advanced_latest']?.['STL_pctg']} <span className="DPOYStatName">STL%</span></div>
                    <div className="DPOYStat">{DPOYPredictionData?.[DPOYPrediction]?.['player_advanced_latest']?.['BLK_pctg']} <span className="DPOYStatName">BLK%</span></div>
                    <div className="DPOYStat">{DPOYPredictionData?.[DPOYPrediction]?.['player_advanced_latest']?.['DBPM']} <span className="DPOYStatName">DBPM</span></div>
                </div>
            </div>
            <div className="DPOYChart">
                <h3>{DPOYPredictionData?.[DPOYPrediction]?.['player_info']?.['first_name']} {DPOYPredictionData?.[DPOYPrediction]?.['player_info']?.['last_name']} vs. 75th Percentile</h3>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <BarChart data={chartData} margin={{ left: -35 }}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 20]} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="dpoy" fill="#8884d8" name={name} />
                        <Bar dataKey="average" fill="#82ca9d" name="75th Percentile" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
