import React, {useEffect, useState} from 'react'
import './teamplayoffsbracket.css'
import _ from 'lodash'

export default function TeamPlayoffsBracket({playoffsData, teamInfo, objStandings}) {
    const [champion, setChampion] = useState(null);
    const [championData, setChampionData] = useState({});

    let westFirstRound = playoffsData.west_first_round;
    let eastFirstRound = playoffsData.east_first_round;

    let firstRoundOrder = {1: 1, 4: 2, 3: 3, 2: 4}
    let secondRoundOrder = {1:1, 8:1, 4:1, 5:1, 3:2, 6:2, 2:2, 7:2}

    westFirstRound = Object.keys(westFirstRound).map(team => {
        let returnValue = westFirstRound[team];
        let team1_id = returnValue.team1_id;
        let team2_id = returnValue.team2_id;
        let team1_standings = objStandings[team1_id];
        let team2_standings = objStandings[team2_id];
        returnValue['team1_standings'] = parseInt(team1_standings['conf_rank']);
        returnValue['team2_standings'] = parseInt(team2_standings['conf_rank']);
        return westFirstRound[team];
    })

    westFirstRound.sort((a, b)=>{
        let chosenATeam;
        if (a.team1_standings < a.team2_standings) {
            chosenATeam = a.team1_standings;
        }else{
            chosenATeam = a.team2_standings;
        }
        let chosenBTeam;
        if (b.team1_standings < b.team2_standings) {
            chosenBTeam = b.team1_standings;
        }else{
            chosenBTeam = b.team2_standings;
        }
        return firstRoundOrder[chosenATeam] - firstRoundOrder[chosenBTeam];
    })

    eastFirstRound = Object.keys(eastFirstRound).map(team => {
        let returnValue = eastFirstRound[team];
        let team1_id = returnValue.team1_id;
        let team2_id = returnValue.team2_id;
        let team1_standings = objStandings[team1_id];
        let team2_standings = objStandings[team2_id];
        returnValue['team1_standings'] = parseInt(team1_standings['conf_rank']);
        returnValue['team2_standings'] = parseInt(team2_standings['conf_rank']);
        return eastFirstRound[team];
    })

    eastFirstRound.sort((a, b)=>{
        let chosenATeam;
        if (a.team1_standings < a.team2_standings) {
            chosenATeam = a.team1_standings;
        }else{
            chosenATeam = a.team2_standings;
        }
        let chosenBTeam;
        if (b.team1_standings < b.team2_standings) {
            chosenBTeam = b.team1_standings;
        }else{
            chosenBTeam = b.team2_standings;
        }
        return firstRoundOrder[chosenATeam] - firstRoundOrder[chosenBTeam];
    })

    let westSemis = playoffsData.west_semis;
    let eastSemis = playoffsData.east_semis;

    westSemis = Object.keys(westSemis).map(team => {
        let returnValue = westSemis[team];
        let team1_id = returnValue.team1_id;
        let team2_id = returnValue.team2_id;
        let team1_standings = objStandings[team1_id];
        let team2_standings = objStandings[team2_id];
        returnValue['team1_standings'] = parseInt(team1_standings['conf_rank']);
        returnValue['team2_standings'] = parseInt(team2_standings['conf_rank']);
        return westSemis[team];
    })

    westSemis.sort((a, b)=>{
        let chosenATeam;
        if (a.team1_standings < a.team2_standings) {
            chosenATeam = a.team1_standings;
        }else{
            chosenATeam = a.team2_standings;
        }
        let chosenBTeam;
        if (b.team1_standings < b.team2_standings) {
            chosenBTeam = b.team1_standings;
        }else{
            chosenBTeam = b.team2_standings;
        }
        return secondRoundOrder[chosenATeam] - secondRoundOrder[chosenBTeam];
    })



    for (let i = 0; i < westSemis.length; i++) {
        let series = westSemis[i];
        let team1_id = series.team1_id;
        let team2_id = series.team2_id;
        let swap = false;
        if (i === 0){
            let topSeriesFirstRound = westFirstRound[0];
            let topSeriesFirstRoundTeam1 = topSeriesFirstRound.team1_id;
            let topSeriesFirstRoundTeam2 = topSeriesFirstRound.team2_id;
            if (team2_id  === topSeriesFirstRoundTeam1 || team2_id === topSeriesFirstRoundTeam2) {
                swap = true;
            }
        }
        if (i === 1){
            let secondSeriesFirstRound = westFirstRound[3];
            let secondSeriesFirstRoundTeam1 = secondSeriesFirstRound.team1_id;
            let secondSeriesFirstRoundTeam2 = secondSeriesFirstRound.team2_id;
            if (team1_id === secondSeriesFirstRoundTeam1 || team1_id === secondSeriesFirstRoundTeam2) {
                swap = true;
            }
        }
        if (swap){
            let temp = westSemis[i].team1_id;
            westSemis[i].team1_id = westSemis[i].team2_id;
            westSemis[i].team2_id = temp;
            temp = westSemis[i].team1_standings;
            westSemis[i].team1_standings = westSemis[i].team2_standings;
            westSemis[i].team2_standings = temp;
            temp = westSemis[i].team1_wins;
            westSemis[i].team1_wins = westSemis[i].team2_wins;
            westSemis[i].team2_wins = temp;
        }
    }



    eastSemis = Object.keys(eastSemis).map(team => {
        let returnValue = eastSemis[team];
        let team1_id = returnValue.team1_id;
        let team2_id = returnValue.team2_id;
        let team1_standings = objStandings[team1_id];
        let team2_standings = objStandings[team2_id];
        returnValue['team1_standings'] = parseInt(team1_standings['conf_rank']);
        returnValue['team2_standings'] = parseInt(team2_standings['conf_rank']);
        return eastSemis[team];
    })

    eastSemis.sort((a, b)=>{
        let chosenATeam;
        if (a.team1_standings < a.team2_standings) {
            chosenATeam = a.team1_standings;
        }else{
            chosenATeam = a.team2_standings;
        }
        let chosenBTeam;
        if (b.team1_standings < b.team2_standings) {
            chosenBTeam = b.team1_standings;
        }else{
            chosenBTeam = b.team2_standings;
        }
        return secondRoundOrder[chosenATeam] - secondRoundOrder[chosenBTeam];
    })

    for (let i = 0; i < eastSemis.length; i++) {
        let series = eastSemis[i];
        let team1_id = series.team1_id;
        let team2_id = series.team2_id;
        let swap = false;
        if (i === 0){
            let topSeriesFirstRound = eastFirstRound[0];
            let topSeriesFirstRoundTeam1 = topSeriesFirstRound.team1_id;
            let topSeriesFirstRoundTeam2 = topSeriesFirstRound.team2_id;
            if (team2_id  === topSeriesFirstRoundTeam1 || team2_id === topSeriesFirstRoundTeam2) {
                swap = true;
            }
        }
        if (i === 1){
            let secondSeriesFirstRound = eastFirstRound[3];
            let secondSeriesFirstRoundTeam1 = secondSeriesFirstRound.team1_id;
            let secondSeriesFirstRoundTeam2 = secondSeriesFirstRound.team2_id;
            if (team1_id === secondSeriesFirstRoundTeam1 || team1_id === secondSeriesFirstRoundTeam2) {
                swap = true;
            }
        }
        if (swap){
            let temp = eastSemis[i].team1_id;
            eastSemis[i].team1_id = eastSemis[i].team2_id;
            eastSemis[i].team2_id = temp;
            temp = eastSemis[i].team1_standings;
            eastSemis[i].team1_standings = eastSemis[i].team2_standings;
            eastSemis[i].team2_standings = temp;
            temp = eastSemis[i].team1_wins;
            eastSemis[i].team1_wins = eastSemis[i].team2_wins;
            eastSemis[i].team2_wins = temp;
        }
    }

    let westFinals = playoffsData.west_finals;
    let eastFinals = playoffsData.east_finals;


    westFinals = Object.keys(westFinals).map(team => {
        let returnValue = westFinals[team];
        let team1_id = returnValue.team1_id;
        let team2_id = returnValue.team2_id;
        let team1_standings = objStandings[team1_id];
        let team2_standings = objStandings[team2_id];
        returnValue['team1_standings'] = parseInt(team1_standings['conf_rank']);
        returnValue['team2_standings'] = parseInt(team2_standings['conf_rank']);
        return westFinals[team];
    })

    eastFinals = Object.keys(eastFinals).map(team => {
        let returnValue = eastFinals[team];
        let team1_id = returnValue.team1_id;
        let team2_id = returnValue.team2_id;
        let team1_standings = objStandings[team1_id];
        let team2_standings = objStandings[team2_id];
        returnValue['team1_standings'] = parseInt(team1_standings['conf_rank']);
        returnValue['team2_standings'] = parseInt(team2_standings['conf_rank']);
        return eastFinals[team];
    })

    if (westFinals[0].team1_id === westSemis[1].team1_id || westFinals[0].team1_id === westSemis[1].team2_id){
        let temp = westFinals[0].team1_id;
        westFinals[0].team1_id = westFinals[0].team2_id;
        westFinals[0].team2_id = temp;
        temp = westFinals[0].team1_standings;
        westFinals[0].team1_standings = westFinals[0].team2_standings;
        westFinals[0].team2_standings = temp;
        temp = westFinals[0].team1_wins;
        westFinals[0].team1_wins = westFinals[0].team2_wins;
        westFinals[0].team2_wins = temp;
    }

    if (eastFinals[0].team1_id === eastSemis[1].team1_id || eastFinals[0].team1_id === eastSemis[1].team2_id){
        let temp = eastFinals[0].team1_id;
        eastFinals[0].team1_id = eastFinals[0].team2_id;
        eastFinals[0].team2_id = temp;
        temp = eastFinals[0].team1_standings;
        eastFinals[0].team1_standings = eastFinals[0].team2_standings;
        eastFinals[0].team2_standings = temp;
        temp = eastFinals[0].team1_wins;
        eastFinals[0].team1_wins = eastFinals[0].team2_wins;
        eastFinals[0].team2_wins = temp;
    }

    let nbaFinals = playoffsData.nba_finals;

    nbaFinals = Object.keys(nbaFinals).map(team => {
        let returnValue = nbaFinals[team];
        let team1_id = returnValue.team1_id;
        let team2_id = returnValue.team2_id;
        let team1_standings = objStandings[team1_id];
        let team2_standings = objStandings[team2_id];
        returnValue['team1_standings'] = parseInt(team1_standings['conf_rank']);
        returnValue['team2_standings'] = parseInt(team2_standings['conf_rank']);
        return nbaFinals[team];
    })

    if (nbaFinals[0].team1_id === eastFinals[0].team1_id || nbaFinals[0].team1_id === eastFinals[0].team2_id){
        let temp = nbaFinals[0].team1_id;
        nbaFinals[0].team1_id = nbaFinals[0].team2_id;
        nbaFinals[0].team2_id = temp;
        temp = nbaFinals[0].team1_standings;
        nbaFinals[0].team1_standings = nbaFinals[0].team2_standings;
        nbaFinals[0].team2_standings = temp;
        temp = nbaFinals[0].team1_wins;
        nbaFinals[0].team1_wins = nbaFinals[0].team2_wins;
        nbaFinals[0].team2_wins = temp;
    }

    useEffect(()=>{
        if (nbaFinals.team1_wins == '4' || nbaFinals.team2_wins == '4') {
            setChampion(true);
        }else{
            setChampion(false);
        }
    }, [playoffsData])  

    useEffect(()=>{
        let data = {}
        if (nbaFinals.team1_wins == '4'){
            data['team_id'] = nbaFinals.team1_id;
        }else{
            data['team_id'] = nbaFinals.team2_id;
        }
        setChampionData(data);
    }, [playoffsData])

    return (
        <div className="teamPlayoffsBracket">
            <div className="teamPlayoffsTitle">
                <div class="blink_me">
                    <div className="circle">
                    </div>
                </div>
                Playoffs Bracket
            </div>
            <main id="tournament">
                <ul class="round round-1">
                    {westFirstRound.map((team, index) => {
                        let team1Id = team.team1_id;
                        let team2Id = team.team2_id;
                        let team1Name = teamInfo[team1Id].name;
                        let team2Name = teamInfo[team2Id].name;
                        let team1Wins = team.team1_wins;
                        let team2Wins = team.team2_wins;
                        let team1Standings = team.team1_standings;
                        let team2Standings = team.team2_standings;
                        return <>
                        <li className="spacer">&nbsp;</li>
                        <li className="game game-top">
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${team1Id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {team1Name} ({team1Standings})
                                <span>{team1Wins}</span>
                            </div>
                        </li>
                        <li className="game game-spacer">&nbsp;</li>
                        <li className="game game-bottom">
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${team2Id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {team2Name} ({team2Standings})
                                <span>{team2Wins}</span>
                            </div>
                        </li>
                        </>
                    })}
                    {eastFirstRound.map((team, index) => {
                        let team1Id = team.team1_id;
                        let team2Id = team.team2_id;
                        let team1Name = teamInfo[team1Id].name;
                        let team2Name = teamInfo[team2Id].name;
                        let team1Wins = team.team1_wins;
                        let team2Wins = team.team2_wins;
                        let team1Standings = team.team1_standings;
                        let team2Standings = team.team2_standings;
                        return <>
                        <li className="spacer">&nbsp;</li>
                        <li className="game game-top">
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${team1Id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {team1Name} ({team1Standings})
                                <span>{team1Wins}</span>
                            </div>
                        </li>
                        <li className="game game-spacer">&nbsp;</li>
                        <li className="game game-bottom">
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${team2Id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {team2Name} ({team2Standings})
                                <span>{team2Wins}</span>
                            </div>
                        </li>
                        </>
                    })}
                    <li className="spacer">&nbsp;</li>
                </ul>
                <ul class="round round-2">
                    {westSemis.map((team, index) => {
                        let team1Id = team.team1_id;
                        let team2Id = team.team2_id;
                        let team1Name = teamInfo[team1Id].name;
                        let team2Name = teamInfo[team2Id].name;
                        let team1Wins = team.team1_wins;
                        let team2Wins = team.team2_wins;
                        let team1Standings = team.team1_standings;
                        let team2Standings = team.team2_standings;
                        return <>
                        <li className="spacer">&nbsp;</li>
                        <li className="game game-top">
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${team1Id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {team1Name} ({team1Standings})
                                <span>{team1Wins}</span>
                            </div>
                        </li>
                        <li className="game game-spacer">&nbsp;</li>
                        <li className="game game-bottom">
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${team2Id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {team2Name} ({team2Standings})
                                <span>{team2Wins}</span>
                            </div>
                        </li>
                        </>
                    })}
                    {eastSemis.map((team, index) => {
                        let team1Id = team.team1_id;
                        let team2Id = team.team2_id;
                        let team1Name = teamInfo[team1Id].name;
                        let team2Name = teamInfo[team2Id].name;
                        let team1Wins = team.team1_wins;
                        let team2Wins = team.team2_wins;
                        let team1Standings = team.team1_standings;
                        let team2Standings = team.team2_standings;
                        return <>
                        <li className="spacer">&nbsp;</li>
                        <li className="game game-top">
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${team1Id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {team1Name} ({team1Standings})
                                <span>{team1Wins}</span>
                            </div>
                        </li>
                        <li className="game game-spacer">&nbsp;</li>
                        <li className="game game-bottom">
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${team2Id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {team2Name} ({team2Standings})
                                <span>{team2Wins}</span>
                            </div>
                        </li>
                        </>
                    })}
                    <li class="spacer">&nbsp;</li>
                </ul>
                <ul class="round round-3">
                    {westFinals.map((team, index) => {
                        let team1Id = team.team1_id;
                        let team2Id = team.team2_id;
                        let team1Name = teamInfo[team1Id].name;
                        let team2Name = teamInfo[team2Id].name;
                        let team1Wins = team.team1_wins;
                        let team2Wins = team.team2_wins;
                        let team1Standings = team.team1_standings;
                        let team2Standings = team.team2_standings;
                        return <>
                        <li className="spacer">&nbsp;</li>
                        <li className="game game-top">
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${team1Id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {team1Name} ({team1Standings})
                                <span>{team1Wins}</span>
                            </div>
                        </li>
                        <li className="game game-spacer">&nbsp;</li>
                        <li className="game game-bottom">
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${team2Id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {team2Name} ({team2Standings})
                                <span>{team2Wins}</span>
                            </div>
                        </li>
                        </>
                    })}
                    {eastFinals.map((team, index) => {
                        let team1Id = team.team1_id;
                        let team2Id = team.team2_id;
                        let team1Name = teamInfo[team1Id].name;
                        let team2Name = teamInfo[team2Id].name;
                        let team1Wins = team.team1_wins;
                        let team2Wins = team.team2_wins;
                        let team1Standings = team.team1_standings;
                        let team2Standings = team.team2_standings;
                        return <>
                        <li className="spacer">&nbsp;</li>
                        <li className="game game-top">
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${team1Id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {team1Name} ({team1Standings})
                                <span>{team1Wins}</span>
                            </div>
                        </li>
                        <li className="game game-spacer">&nbsp;</li>
                        <li className="game game-bottom">
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${team2Id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {team2Name} ({team2Standings})
                                <span>{team2Wins}</span>
                            </div>
                        </li>
                        </>
                    })}
                    <li class="spacer">&nbsp;</li>
                </ul>
                <ul class="round round-4">
                    
                    {nbaFinals.map(index=>{
                        let team1Id = index.team1_id;
                        let team2Id = index.team2_id;
                        let team1Name = teamInfo[team1Id].name;
                        let team2Name = teamInfo[team2Id].name;
                        let team1Wins = index.team1_wins;
                        let team2Wins = index.team2_wins;
                        let team1Standings = index.team1_standings;
                        let team2Standings = index.team2_standings;
                        return <>
                        <li className="spacer">&nbsp;</li>
                        <li className="game game-top">
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${team1Id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {team1Name} ({team1Standings})
                                <span>{team1Wins}</span>
                            </div>
                            </li>
                        <li className="game game-spacer-half">&nbsp;</li>
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/44/NBA_Finals_logo_%282022%29.svg/1200px-NBA_Finals_logo_%282022%29.svg.png" alt="" className="finals-img"/>
                        <li className="game game-spacer-half">&nbsp;</li>
                        <li className="game game-bottom">
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${team2Id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {team2Name} ({team2Standings})
                                <span>{team2Wins}</span>
                            </div>
                        </li>
                        </>
                    })}

                    <li class="spacer">&nbsp;</li>
                </ul>
                <ul className="round round-5">
                    <li className="space">&nbsp;</li>
                    <li className="game game-top">
                        {champion && 
                            <div className="teamPlayoffsContainer">
                                <img src={`https://cdn.nba.com/logos/nba/${champion.team_id}/primary/L/logo.svg`} className="teamImgPlayoffs" />
                                {teamInfo[champion.team_id].name} ({objStandings[champion.team_id]})
                            </div>
                        }
                    </li>
                </ul>
            </main>
        </div>
    )
}
