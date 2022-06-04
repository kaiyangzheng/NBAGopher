import React, { useState, useEffect } from 'react'
import './teamlist.css'

import FeaturedTeams from '../../components/featuredTeams/FeaturedTeams'
import TeamStandings from '../../components/teamStandings/TeamStandings';

export default function TeamList() {
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
    }, [featuredTeams])

    const [standings, setStandings] = useState([]);
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
    }, [standings])


    return (
        <div className="teamlist">
            <div className="featuredTeams">
                <FeaturedTeams featuredTeams={featuredTeams} featuredTeamsData={featuredTeamsData} />
            </div>
            <div className="standings">
                <TeamStandings westStandings={westStandings} eastStandings={eastStandings} />
            </div>
        </div>
    )
}
