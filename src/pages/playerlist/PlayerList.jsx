import React, { useEffect, useState } from 'react'
import './playerlist.css'
import FeaturedPlayers from '../../components/featuredplayers/FeaturedPlayers'
import MVPCandidates from '../../components/MVPcandidates/MVPCandidates'
import PlayerSearch from '../../components/playerSearch/PlayerSearch'
import {
    ScaleLoader
} from "react-spinners";


export default function PlayerList() {
    const [componentsLoading, setComponentsLoading] = useState({ "FeaturedPlayers": true, "MVPCandidates": true, "PlayerSearch": false });
    const [loading, setLoading] = useState(true);

    // Featured Players Data

    const [featuredPlayers, setFeaturedPlayers] = useState({ "scorer": "", "passer": "", "defender": "" })
    const [featuredScorerData, setFeaturedScorerData] = useState({})
    const [featuredPasserData, setFeaturedPasserData] = useState({})
    const [featuredDefenderData, setFeaturedDefenderData] = useState({})

    const getFeaturedPlayers = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/featured_players", requestOptions)
        const featuredPlayers = await response.json()
        setFeaturedPlayers(featuredPlayers)
    }

    const getFeaturedPlayersData = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const scorerResponse = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/${featuredPlayers["featured_scorer_id"]}`, requestOptions)
        const scorerData = await scorerResponse.json()
        setFeaturedScorerData(scorerData)
        const passerResponse = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/${featuredPlayers["featured_passer_id"]}`, requestOptions)
        const passerData = await passerResponse.json()
        setFeaturedPasserData(passerData)
        const defenderResponse = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/${featuredPlayers["featured_defender_id"]}`, requestOptions)
        const defenderData = await defenderResponse.json()
        setFeaturedDefenderData(defenderData)
        setComponentsLoading({ ...componentsLoading, "FeaturedPlayers": false })
    }

    useEffect(() => {
        getFeaturedPlayers()
    }, [])

    useEffect(() => {
        getFeaturedPlayersData()
    }, [featuredPlayers])

    // MVP Candidates Data

    const [mvpCandidates, setMvpCandidates] = useState([])
    const [mvpCandidatesData, setMvpCandidatesData] = useState({})
    const [retrieveData, setRetrieveData] = useState(true)
    const [tableData, setTableData] = useState([])

    const getMVPCandidates = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/mvp_candidates", requestOptions)
        const mvpPlayers = await response.json()
        setMvpCandidates(mvpPlayers);
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
        setMvpCandidatesData(mvpCandidatesData => ({ ...mvpCandidatesData, [playerId]: playerData }))
    }

    useEffect(() => {
        getMVPCandidates()
    }, [])

    useEffect(() => {
        for (let i = 0; i < mvpCandidates.length; i++) {
            let playerId = mvpCandidates[i]
            getPlayerData(playerId);
        }
        setRetrieveData(false);
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
        setTableData(dataList.splice(0, 3))
        setComponentsLoading({ ...componentsLoading, "MVPCandidates": false })
    }, [mvpCandidatesData])

    useEffect(() => {
        let isFalse = Object.values(componentsLoading).every(value => value === false);
        if (isFalse) {
            setLoading(false);
        }
    }, [componentsLoading])

    return (
        <>
            {loading && <div className="loading-container" style={{ position: "absolute", top: '50%', left: '50%' }}>< ScaleLoader /> </div>}
            <div className="playerlist">
                {!loading && <div>
                    <div className="playerSearch">
                        <PlayerSearch setComponentsLoading={setComponentsLoading} componentsLoading={componentsLoading} />
                    </div>
                    <div className="featuredPlayers">
                        <FeaturedPlayers setComponentsLoading={setComponentsLoading} componentsLoading={componentsLoading} featuredPlayers={featuredPlayers} featuredScorerData={featuredScorerData} featuredPasserData={featuredPasserData} featuredDefenderData={featuredDefenderData} />
                    </div>
                    <div className="mvpCandidates">
                        <MVPCandidates setComponentsLoading={setComponentsLoading} componentsLoading={componentsLoading} mvpCandidates={mvpCandidates} mvpCandidatesData={mvpCandidatesData} retrieveData={retrieveData} tableData={tableData} setRetrieveData={setRetrieveData} setTableData={setTableData} />
                    </div>
                </div>}
            </div>
        </>
    )

}