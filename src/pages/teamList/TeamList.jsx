import React, { useState, useEffect } from 'react'
import './teamlist.css'

import FeaturedTeams from '../../components/featuredTeams/FeaturedTeams'
import TeamStandings from '../../components/teamStandings/TeamStandings';
import TeamPlayoffsBracket from '../../components/teamPlayoffsBracket/TeamPlayoffsBracket';
<<<<<<< HEAD

import {
    ScaleLoader
} from "react-spinners";
=======
>>>>>>> 73d2d6fa8376ef8b0db9ca68c688a3e81e999aa6

export default function TeamList() {
    const [loadingItems, setLoadingItems] = useState({'featuredTeams': true, 'teamStandings': true, 'teamPlayoffsBracket': true});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if (!loadingItems.featuredTeams && !loadingItems.teamStandings && !loadingItems.teamPlayoffsBracket) {
            setLoading(false);
        }
    }, [loadingItems])

    const [featuredTeams, setFeaturedTeams] = useState({});
    const [featuredTeamsData, setFeaturedTeamsData] = useState({});

    const getTeamData = async (teamId) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }

        const response = await fetch(`https://nbagopher-api.herokuapp.com/team/stats/compiled/${teamId}`, requestOptions)
        const teamData = await response.json()
        return teamData
    }

    const getFeaturedTeams = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/team/featured", requestOptions)
        const featuredTeams = await response.json()
        setFeaturedTeams(featuredTeams)
    }

    const getFeaturedTeamsData = async () => {
        let featuredTeamsData = {}
        for (let team in featuredTeams) {
            let id = featuredTeams[team]
            console.log(id)
            let teamData = await getTeamData(id)
            featuredTeamsData[id] = teamData
        }
        setFeaturedTeamsData(featuredTeamsData)
    }

    useEffect(() => {
        getFeaturedTeams();
    }, [])

    useEffect(() => {
        getFeaturedTeamsData();
        setLoadingItems({...loadingItems, 'featuredTeams': false})
    }, [featuredTeams])

    const [standings, setStandings] = useState([]);
    const [objStandings, setObjStandings] = useState({});
    const [westStandings, setWestStandings] = useState([]);
    const [eastStandings, setEastStandings] = useState([]);

    const getStandings = async () => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/team/standings", requestOptions)
        const standings = await response.json()
        setObjStandings(standings)
        setStandings(Object.entries(standings))
    }

    useEffect(() => {
        getStandings();
    }, [])

    useEffect(() => {
        let westStandings = standings.filter((team) => {
            return team[1].info.conference == "West"
        })

        let eastStandings = standings.filter((team) => {
            return team[1].info.conference == "East"
        })

        westStandings.sort((a, b) => {
            return parseInt(b[1].wins - a[1].wins)
        })

        eastStandings.sort((a, b) => {
            return parseInt(b[1].wins - a[1].wins)
        })

        setWestStandings(westStandings)
        setEastStandings(eastStandings)
        setLoadingItems({...loadingItems, 'teamStandings': false})
    }, [standings])

    const [playoffsData, setPlayoffsData] = useState({});
    const [teamInfo, setTeamInfo] = useState({});

    const getPlayoffsData = async() =>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/team/playoffs/info", requestOptions)
        const playoffsData = await response.json()
        setPlayoffsData(playoffsData)
    }

    const getTeamInfo = async() =>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/team/info", requestOptions)
        const teamInfo = await response.json()
        setTeamInfo(teamInfo)
    }

    useEffect(() => {
        getPlayoffsData();
        setLoadingItems({...loadingItems, 'teamPlayoffsBracket': false})
    }, [])

    useEffect(()=>{
        getTeamInfo();
    }, [])
    
    return (
        <div className="teamlist">
<<<<<<< HEAD
            {loading && <div className="loading-container" style={{ position: "absolute", top: '50%', left: '50%' }}>< ScaleLoader /> </div>}
            {!loading && <div>
                <div className="featuredTeams">
                    <FeaturedTeams featuredTeams={featuredTeams} featuredTeamsData={featuredTeamsData} />
                </div>
                <div className="playoffsBracket">
                    <TeamPlayoffsBracket playoffsData={playoffsData} teamInfo={teamInfo} objStandings={objStandings}/>
                </div>
                <div className="standings">
                    <TeamStandings westStandings={westStandings} eastStandings={eastStandings} />
                </div>
            </div>}
=======
            <div className="featuredTeams">
                <FeaturedTeams featuredTeams={featuredTeams} featuredTeamsData={featuredTeamsData} />
            </div>
            <div className="standings">
                <TeamStandings westStandings={westStandings} eastStandings={eastStandings} />
            </div>
            <div className="playoffsBracket">
                <TeamPlayoffsBracket />
            </div>
>>>>>>> 73d2d6fa8376ef8b0db9ca68c688a3e81e999aa6
        </div>
    )
}
