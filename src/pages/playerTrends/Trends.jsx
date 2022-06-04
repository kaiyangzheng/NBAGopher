import React, { useState, useEffect } from 'react'
import './trends.css'
import ImprovingPlayers from '../../components/improvingPlayers/ImprovingPlayers'
import DecliningPlayers from '../../components/decliningPlayers/DecliningPlayers'
import FeaturedTrendingPlayers from '../../components/featuredTrendingPlayers/FeaturedTrendingPlayers'
import {
    ScaleLoader
} from "react-spinners";

export default function Trends() {

    const [componentsLoading, setComponentsLoading] = useState({ "ImprovingPlayers": true, "DecliningPlayers": true, "FeaturedTrendingPlayers": true });
    const [loading, setLoading] = useState(true);

    // Trending Player Data

    const [trendingPlayers, setTrendingPlayers] = useState([])
    const [featuredTrendingData, setFeaturedTrendingData] = useState({});
    const [showTrendChart, setShowTrendChart] = useState({});

    const getTrendingFeaturedPlayers = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/player/featured_trending_players", requestOptions)
        const trendingPlayers = await response.json()
        setTrendingPlayers(trendingPlayers);
    }

    const getTrendingFeaturedPlayersData = async (playerId) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/${playerId}`, requestOptions)
        const playerData = await response.json()
        setFeaturedTrendingData(featuredTrendingData => ({ ...featuredTrendingData, [playerId]: playerData }))
    }

    useEffect(() => {
        getTrendingFeaturedPlayers();
    }, [])


    useEffect(() => {
        for (const [key, value] of Object.entries(trendingPlayers)) {
            setShowTrendChart(showTrendChart => ({ ...showTrendChart, [value]: false }))
            getTrendingFeaturedPlayersData(value);
        }
        setComponentsLoading({ ...componentsLoading, "FeaturedTrendingPlayers": false })
    }, [trendingPlayers])

    // Improving Player Data

    const [improvingPlayers, setImprovingPlayers] = useState([])
    const [improvingPlayerIds, setImprovingPlayerIds] = useState([]);
    const [improvingPlayersData, setImprovingPlayersData] = useState({});
    const [tableData, setTableData] = useState([]);

    const getImprovingPlayers = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/player/trending_players", requestOptions)
        const improvingPlayers = await response.json()
        setImprovingPlayers(improvingPlayers);
    }

    const getPlayerData = async (playerId) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/${playerId}`, requestOptions)
        const playerData = await response.json()
        setImprovingPlayersData(improvingPlayersData => ({ ...improvingPlayersData, [playerId]: playerData }))
    }

    useEffect(() => {
        getImprovingPlayers();
    }, [])

    useEffect(() => {
        let improvingPlayersIds = [];
        for (let i = 0; i < improvingPlayers.length; i++) {
            if (improvingPlayers[i].is_improving) {
                improvingPlayersIds.push(improvingPlayers[i].id);
            }
        }
        setImprovingPlayerIds(improvingPlayersIds);
    }, [improvingPlayers])

    useEffect(() => {
        for (let i = 0; i < improvingPlayerIds.length; i++) {
            let playerId = improvingPlayerIds[i]
            getPlayerData(playerId);
        }
    }, [improvingPlayerIds])

    useEffect(() => {
        let dataList = []
        for (let i = 0; i < improvingPlayerIds.length; i++) {
            {
                let playerId = improvingPlayerIds[i]
                let playerData = improvingPlayersData[playerId]
                if (playerData) {
                    let data = {
                        id: playerId,
                        "Name": playerData['player_info']?.first_name + " " + playerData['player_info']?.last_name,
                        "Position": playerData['player_info']?.pos_abbr,
                        "PPG": parseFloat(playerData['player_basic_latest']?.ppg),
                        "PPG_diff": Math.round(parseFloat(playerData['player_basic_latest']?.ppg) - parseFloat(playerData['player_basic_prev']?.ppg), 1),
                        "APG": parseFloat(playerData['player_basic_latest']?.apg),
                        "APG_diff": Math.round(parseFloat(playerData['player_basic_latest']?.apg) - parseFloat(playerData['player_basic_prev']?.apg), 1),
                        "RPG": parseFloat(playerData['player_basic_latest']?.rpg),
                        "RPG_diff": Math.round(parseFloat(playerData['player_basic_latest']?.rpg) - parseFloat(playerData['player_basic_prev']?.rpg), 1),
                        "TS%": parseFloat(playerData['player_advanced_latest']?.TS_pctg),
                        "TS%_diff": (parseFloat(playerData['player_advanced_latest']?.TS_pctg) - parseFloat(playerData['player_advanced_prev']?.TS_pctg)).toString().slice(0, 5),
                        "BPM": parseFloat(playerData['player_advanced_latest']?.BPM),
                        "BPM_diff": Math.round(parseFloat(playerData['player_advanced_latest']?.BPM) - parseFloat(playerData['player_advanced_prev']?.BPM), 1),
                    }
                    dataList.push(data);
                }
            }
        }
        setTableData(dataList.splice(0, 5));
        setComponentsLoading({ ...componentsLoading, "ImprovingPlayers": false })
    }, [improvingPlayersData])

    // Declining Player Data

    const [decliningPlayers, setdecliningPlayers] = useState([])
    const [decliningPlayerIds, setdecliningPlayerIds] = useState([]);
    const [decliningPlayersData, setdecliningPlayersData] = useState({});
    const [decliningTableData, setDecliningTableData] = useState([]);
    const getdecliningPlayers = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/player/trending_players", requestOptions)
        const decliningPlayers = await response.json()
        setdecliningPlayers(decliningPlayers);
    }

    const getDecliningPlayerData = async (playerId) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/${playerId}`, requestOptions)
        const playerData = await response.json()
        setdecliningPlayersData(decliningPlayersData => ({ ...decliningPlayersData, [playerId]: playerData }))
    }

    useEffect(() => {
        getdecliningPlayers();
    }, [])

    useEffect(() => {
        let improvingPlayersIds = [];
        for (let i = 0; i < decliningPlayers.length; i++) {
            if (!decliningPlayers[i].is_improving) {
                improvingPlayersIds.push(decliningPlayers[i].id);
            }
        }
        setdecliningPlayerIds(improvingPlayersIds);
    }, [decliningPlayers])

    useEffect(() => {
        for (let i = 0; i < decliningPlayerIds.length; i++) {
            let playerId = decliningPlayerIds[i]
            getDecliningPlayerData(playerId);
        }
    }, [decliningPlayerIds])

    useEffect(() => {
        let dataList = []
        for (let i = 0; i < decliningPlayerIds.length; i++) {
            {
                let playerId = decliningPlayerIds[i]
                let playerData = decliningPlayersData[playerId]
                if (playerData) {
                    let data = {
                        id: playerId,
                        "Name": playerData['player_info']?.first_name + " " + playerData['player_info']?.last_name,
                        "Position": playerData['player_info']?.pos_abbr,
                        "PPG": parseFloat(playerData['player_basic_latest']?.ppg),
                        "PPG_diff": Math.round(parseFloat(playerData['player_basic_latest']?.ppg) - parseFloat(playerData['player_basic_prev']?.ppg), 1),
                        "APG": parseFloat(playerData['player_basic_latest']?.apg),
                        "APG_diff": Math.round(parseFloat(playerData['player_basic_latest']?.apg) - parseFloat(playerData['player_basic_prev']?.apg), 1),
                        "RPG": parseFloat(playerData['player_basic_latest']?.rpg),
                        "RPG_diff": Math.round(parseFloat(playerData['player_basic_latest']?.rpg) - parseFloat(playerData['player_basic_prev']?.rpg), 1),
                        "TS%": parseFloat(playerData['player_advanced_latest']?.TS_pctg),
                        "TS%_diff": (parseFloat(playerData['player_advanced_latest']?.TS_pctg) - parseFloat(playerData['player_advanced_prev']?.TS_pctg)).toString().slice(0, 5),
                        "BPM": parseFloat(playerData['player_advanced_latest']?.BPM),
                        "BPM_diff": Math.round(parseFloat(playerData['player_advanced_latest']?.BPM) - parseFloat(playerData['player_advanced_prev']?.BPM), 1),
                    }
                    dataList.push(data);
                }
            }
        }
        setDecliningTableData(dataList.splice(0, 5));
        setComponentsLoading({ ...componentsLoading, "DecliningPlayers": false })
    }, [decliningPlayersData])

    useEffect(() => {
        let isFalse = Object.values(componentsLoading).every(value => value === false);
        if (isFalse) {
            setLoading(false);
        }
    }, [componentsLoading])

    return (
        <div className="trends">
            {loading && <div className="loading-container" style={{ position: "absolute", top: '50%', left: '50%' }}>< ScaleLoader /> </div>}
            {!loading && <div>
                <FeaturedTrendingPlayers trendingPlayers={trendingPlayers} featuredTrendingData={featuredTrendingData} showTrendChart={showTrendChart} setShowTrendChart={setShowTrendChart} />
                <ImprovingPlayers tableData={tableData} />
                <DecliningPlayers decliningTableData={decliningTableData} />
            </div>}
        </div>
    )
}