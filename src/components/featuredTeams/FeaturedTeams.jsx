import React, { useEffect, useState } from 'react'
import './featuredteams.css'

export default function FeaturedTeams({ featuredTeams, featuredTeamsData }) {
    let featuredOffenseData = featuredTeamsData[featuredTeams['featured_offense_id']]
    let featuredDefenseData = featuredTeamsData[featuredTeams['featured_defense_id']]
    let featuredOverallData = featuredTeamsData[featuredTeams['featured_overall_id']]

    return (
        <div className="featured">
            <div className="featuredItem">
                <div className="featuredTitleContainer">
                    <img src={`https://cdn.nba.com/logos/nba/${featuredOffenseData?.info?.id}/primary/L/logo.svg`} className="featuredTitleImg" />
                    <span className="featuredTitleText">{featuredOffenseData?.info?.name}</span>
                </div>
                <div className="featuredStatsContainer">
                    <span className="featuredStat">{featuredOffenseData?.basic?.ppg} <span className="featuredStatName">PPG</span></span>
                    <span className="featuredStat">{featuredOffenseData?.advanced?.ORTG} <span className="featuredStatName">ORTG</span></span>
                    <span className="featuredStat">{featuredOffenseData?.standings?.wins}-{featuredOffenseData?.standings?.losses} <span className="featuredStatName">Record</span></span>
                </div>
                <span className="featuredSub">Featured Offense</span>
            </div>
            <div className="featuredItem">
                <div className="featuredTitleContainer">
                    <img src={`https://cdn.nba.com/logos/nba/${featuredDefenseData?.info?.id}/primary/L/logo.svg`} className="featuredTitleImg" />
                    <span className="featuredTitleText">{featuredDefenseData?.info?.name}</span>
                </div>
                <div className="featuredStatsContainer">
                    <span className="featuredStat">{featuredDefenseData?.basic?.oopg} <span className="featuredStatName">Opp. PPG</span></span>
                    <span className="featuredStat">{featuredDefenseData?.advanced?.DRTG} <span className="featuredStatName">DRTG</span></span>
                    <span className="featuredStat">{featuredDefenseData?.standings?.wins}-{featuredDefenseData?.standings?.losses} <span className="featuredRecord"></span><span className="featuredStatName">Record</span></span>
                </div>
                <span className="featuredSub">Featured Defense</span>
            </div>
            <div className="featuredItem">
                <div className="featuredTitleContainer">
                    <img src={`https://cdn.nba.com/logos/nba/${featuredOverallData?.info?.id}/primary/L/logo.svg`} className="featuredTitleImg" />
                    <span className="featuredTitleText">{featuredOverallData?.info?.name}</span>
                </div>
                <div className="featuredStatsContainer">
                    <span className="featuredStat">{featuredOverallData?.basic?.ppg} <span className="featuredStatName">PPG</span></span>
                    <span className="featuredStat">{featuredOverallData?.advanced?.NRTG} <span className="featuredStatName">NRTG</span></span>
                    <span className="featuredStat">{featuredOverallData?.standings?.wins}-{featuredOverallData?.standings?.losses} <span className="featuredStatName">Record</span></span>
                </div>
                <span className="featuredSub">Featured Overall</span>
            </div>

        </div>
    )
}