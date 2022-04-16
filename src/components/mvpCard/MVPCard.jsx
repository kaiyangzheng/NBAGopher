import React, { useState, useEffect } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './MVPcard.css'

export default function MVPCard() {
    const [mvpCandidates, setMvpCandidates] = useState([])
    const [mvpCandidatesData, setMvpCandidatesData] = useState({})
    const [PredictedMVP, setPredictedMVP] = useState([])
    const [PredictedMVPData, setPredictedMVPData] = useState({})
    const [averageTop30PPGData, setAverageTop30PPGData] = useState({})
    const [chartData, setChartData] = useState([])

    const getMVPCandidates = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/mvp_candidates", requestOptions)
        const MVPCandidates = await response.json()
        setMvpCandidates(MVPCandidates);
    }

    const getMVPcandidatesData = async (playerId) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/${playerId}`, requestOptions)
        const playerData = await response.json()
        setMvpCandidatesData(PredictedMVPData => ({ ...PredictedMVPData, [playerId]: playerData }))
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
        getMVPCandidates()
    }, [])

    useEffect(() => {
        getAverageTop30PPGData()
    }, [])

    useEffect(() => {
        for (let i = 0; i < mvpCandidates.length; i++) {
            let playerId = mvpCandidates[i]
            getMVPcandidatesData(playerId);
        }
    }, [mvpCandidates])

    useEffect(() => {
        let dataList = []
        for (let i = 0; i < mvpCandidates.length; i++) {
            let playerId = mvpCandidates[i]
            let playerData = mvpCandidatesData[playerId]
            if (playerData) {
                let data = {
                    id: playerId,
                    "Name": playerData['player_info']?.first_name + " " + playerData['player_info']?.last_name,
                    "Position": playerData['player_info']?.pos_full,
                    "PPG": parseFloat(playerData['player_basic_latest']?.ppg),
                    "APG": parseFloat(playerData['player_basic_latest']?.apg),
                    "RPG": parseFloat(playerData['player_basic_latest']?.rpg),
                    "TS%": parseFloat(playerData['player_advanced_latest']?.TS_pctg),
                    "BPM": parseFloat(playerData['player_advanced_latest']?.BPM),
                }
                dataList.push(data)
            }
        }
        dataList.sort(function (first, second) {
            return second['BPM'] - first['BPM'];
        })
        setPredictedMVP(dataList[0])
    }, [mvpCandidatesData])

    useEffect(() => {
        setPredictedMVPData(mvpCandidatesData[PredictedMVP?.id])
    }, [PredictedMVP])

    useEffect(() => {
        let dataList = []
        let stats = ['ppg', 'apg', 'rpg', 'spg', 'bpg', 'TS_pctg', 'AST_pctg', 'TRB_pctg', 'STL_pctg', 'BLK_pctg', 'BPM']
        let statNames = ['PPG', 'APG', 'RPG', 'SPG', 'BPG', 'TS%', 'AST%', 'REB%', 'STL%', 'BLK%', 'BPM']
        for (let i = 0; i < stats.length; i++) {
            if (i < 5) {
                dataList.push({
                    name: statNames[i],
                    average: averageTop30PPGData?.['average_basic_stats']?.[stats[i]],
                    mvp: PredictedMVPData?.['player_basic_latest']?.[stats[i]],
                })
            } else {
                dataList.push({
                    name: statNames[i],
                    average: averageTop30PPGData?.['average_advanced_stats']?.[stats[i]],
                    mvp: PredictedMVPData?.['player_advanced_latest']?.[stats[i]],
                })
            }
        }
        setChartData([...dataList])
    }, [PredictedMVPData])

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
                    <BarChart data={chartData} margin={{ left: -35 }}>
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
