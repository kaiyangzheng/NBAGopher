import React, { useState, useEffect } from 'react'
import './playerpredictions.css'

import FutureStatsSearch from '../../components/futureStatsSearch/FutureStatsSearch'
import MVPCard from '../../components/mvpCard/MVPCard'
import DPOYCard from '../../components/dpoyCard/DPOYCard'
import MIPCard from '../../components/mipCard/MIPCard'
import SMOYCard from '../../components/smoyCard/SMOYCard'
import ROYCard from '../../components/royCard/ROYCard'
import {
    ScaleLoader
} from "react-spinners";

export default function PlayerPredictions() {
    const [componentsLoading, setComponentsLoading] = useState({ "FutureStatsSearch": false, "MVPCard": true, "DPOYCard": true, "MIPCard": true, "SMOYCard": true, "ROYCard": true });
    const [loading, setLoading] = useState(true);
    const [averageTop30PPGData, setAverageTop30PPGData] = useState({})

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
        getAverageTop30PPGData()
    }, [])

    // MVP Data

    const [mvpCandidates, setMvpCandidates] = useState([])
    const [mvpCandidatesData, setMvpCandidatesData] = useState({})
    const [PredictedMVP, setPredictedMVP] = useState([])
    const [PredictedMVPData, setPredictedMVPData] = useState({})
    const [MVPChartData, setMVPChartData] = useState([])

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

    useEffect(() => {
        getMVPCandidates()
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
        setMVPChartData([...dataList])
        setComponentsLoading({ ...componentsLoading, "MVPCard": false })
    }, [PredictedMVPData])

    // DPOY Data

    const [DPOYPrediction, setDPOYPrediction] = useState([])
    const [DPOYPredictionData, setDPOYPredictionData] = useState({})
    const [DPOYChartData, setDPOYChartData] = useState([])
    const [DPOYName, setDPOYName] = useState('')

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

    useEffect(() => {
        getDPOYPrediction()
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
        setDPOYChartData([...dataList])
        setDPOYName(DPOYPredictionData?.[DPOYPrediction]?.['player_info']?.['first_name'] + ' ' + DPOYPredictionData?.[DPOYPrediction]?.['player_info']?.['last_name'])
        setComponentsLoading({ ...componentsLoading, "DPOYCard": false })
    }, [DPOYPredictionData])

    // MIP Data

    const [MIPPrediction, setMIPPrediction] = useState([])
    const [MIPPredictionData, setMIPPredictionData] = useState({})
    const [MIPStats, setMIPStats] = useState({})
    const [MIPStatsDiff, setMIPStatsDiff] = useState({})
    const [MIPChartData, setMIPChartData] = useState([])
    const [MIPName, setMIPName] = useState('')

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

    useEffect(() => {
        getMIPPrediction();
    }, [])

    useEffect(() => {
        getMIPPredictionData(MIPPrediction);
    }, [MIPPrediction])

    useEffect(() => {
        let statsDiff = [];
        let statsList = [];
        let stats = ['ppg', 'apg', 'rpg', 'TS_pctg', 'BPM'];
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
        setMIPChartData([...dataList])
        setMIPName(MIPPredictionData?.['player_info']?.['first_name'] + ' ' + MIPPredictionData?.['player_info']?.['last_name'])
        setComponentsLoading({ ...componentsLoading, "MIPCard": false })
    }, [MIPPredictionData])

    // SMOY Data

    const [SMOYPrediction, setSMOYPrediction] = useState([])
    const [SMOYPredictionData, setSMOYPredictionData] = useState({})
    const [SMOYStats, setSMOYStats] = useState({})
    const [SMOYStatsDiff, setSMOYStatsDiff] = useState({})
    const [SMOYChartData, setSMOYChartData] = useState([])
    const [SMOYName, setSMOYName] = useState('')
    const getSMOYPrediction = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/player/predicted_6moy", requestOptions)
        const SMOYPrediction = await response.json()
        setSMOYPrediction(SMOYPrediction?.id)
    }

    const getSMOYPredictionData = async (playerId) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/${playerId}`, requestOptions)
        const playerData = await response.json()
        setSMOYPredictionData(playerData);
    }

    useEffect(() => {
        getSMOYPrediction();
    }, [])

    useEffect(() => {
        getSMOYPredictionData(SMOYPrediction);
    }, [SMOYPrediction])

    useEffect(() => {
        let statsDiff = [];
        let statsList = [];
        let stats = ['ppg', 'apg', 'rpg', 'spg', 'bpg', 'TS_pctg', 'AST_pctg', 'TRB_pctg', 'STL_pctg', 'BLK_pctg', 'BPM']
        let playerBasicLatest = SMOYPredictionData?.player_basic_latest;
        let playerAdvancedLatest = SMOYPredictionData?.player_advanced_latest;
        for (let i = 0; i < stats.length; i++) {
            if (i < 5) {
                statsList.push(parseFloat(playerBasicLatest?.[stats[i]]))
            } else {
                statsList.push(parseFloat(playerAdvancedLatest?.[stats[i]]))
            }

        }
        setSMOYStats(statsList);
        setSMOYStatsDiff(statsDiff);
    }, [SMOYPredictionData])

    useEffect(() => {
        let stats = ['ppg', 'apg', 'rpg', 'spg', 'bpg', 'TS_pctg', 'AST_pctg', 'TRB_pctg', 'STL_pctg', 'BLK_pctg', 'BPM']
        let statNames = ['PPG', 'APG', 'RPG', 'SPG', 'BPG', 'TS%', 'AST%', 'REB%', 'STL%', 'BLK%', 'BPM']
        let dataList = []
        for (let i = 0; i < stats.length; i++) {
            if (i < 5) {
                dataList.push({
                    name: statNames[i],
                    average: averageTop30PPGData?.['average_basic_stats']?.[stats[i]],
                    SMOY: SMOYPredictionData?.['player_basic_latest']?.[stats[i]]
                })
            } else {
                dataList.push({
                    name: statNames[i],
                    average: averageTop30PPGData?.['average_advanced_stats']?.[stats[i]],
                    SMOY: SMOYPredictionData?.['player_advanced_latest']?.[stats[i]]
                })
            }
        }
        setSMOYChartData([...dataList])
        setSMOYName(SMOYPredictionData?.['player_info']?.['first_name'] + ' ' + SMOYPredictionData?.['player_info']?.['last_name'])
        setComponentsLoading({ ...componentsLoading, "SMOYCard": false })
    }, [SMOYPredictionData])

    // ROY Data

    const [ROYPrediction, setROYPrediction] = useState([])
    const [ROYPredictionData, setROYPredictionData] = useState({})
    const [ROYStats, setROYStats] = useState({})
    const [ROYChartData, setROYChartData] = useState([])
    const [ROYName, setROYName] = useState('')

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

    useEffect(() => {
        getROYPrediction()
    }, [])

    useEffect(() => {
        getROYPredictionData(ROYPrediction)
    }, [ROYPrediction])

    useEffect(() => {
        let statsList = [];
        let stats = ['ppg', 'apg', 'rpg', 'spg', 'bpg', 'TS_pctg', 'AST_pctg', 'TRB_pctg', 'STL_pctg', 'BLK_pctg', 'BPM']
        let playerBasicLatest = ROYPredictionData?.player_basic_latest;
        let playerAdvancedLatest = ROYPredictionData?.player_advanced_latest;
        for (let i = 0; i < stats.length; i++) {
            if (i < 5) {
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
        setROYChartData([...dataList])
        setROYName(ROYPredictionData?.['player_info']?.['first_name'] + ' ' + ROYPredictionData?.['player_info']?.['last_name'])
        setComponentsLoading({ ...componentsLoading, "ROYCard": false })
    }, [ROYPredictionData])

    useEffect(() => {
        let isFalse = Object.values(componentsLoading).every(value => value === false);
        if (isFalse) {
            setLoading(false);
        }
    }, [componentsLoading])

    return (
        <div className="playerPredictions">
            {loading && <div className="loading-container" style={{ position: "absolute", top: '50%', left: '50%' }}>< ScaleLoader /> </div>}
            {!loading && <div>
                <div className="playerSearch">
                    <FutureStatsSearch />
                </div>
                <div className="mvp">
                    <MVPCard PredictedMVP={PredictedMVP} chartData={MVPChartData} />
                </div>
                <div className="dpoy">
                    <DPOYCard DPOYPrediction={DPOYPrediction} DPOYPredictionData={DPOYPredictionData} chartData={DPOYChartData} name={DPOYName} />
                </div>
                <div className="mip">
                    <MIPCard MIPPrediction={MIPPrediction} MIPPredictionData={MIPPredictionData} MIPStats={MIPStats} MIPStatsDiff={MIPStatsDiff} chartData={MIPChartData} name={MIPName} />
                </div>
                <div className="smoy">
                    <SMOYCard SMOYPrediction={SMOYPrediction} SMOYPredictionData={SMOYPredictionData} SMOYStatsDiff={SMOYStatsDiff} SMOYStats={SMOYStats} chartData={SMOYChartData} name={SMOYName} />
                </div>
                <div className="roy">
                    <ROYCard ROYPrediction={ROYPrediction} ROYPredictionData={ROYPredictionData} ROYStats={ROYStats} chartData={ROYChartData} name={ROYName} />
                </div>
            </div>}
        </div>
    )
}
