import React, { useEffect, useState } from 'react'
import './featuredplayers.css'

export default function FeaturedPlayers({ setComponentsLoading, componentsLoading, featuredPlayers, featuredScorerData, featuredPasserData, featuredDefenderData }) {
    const [displayBlk, setDisplayBlk] = useState(true);

    useEffect(() => {
        if (parseFloat(featuredDefenderData?.['player_advanced_latest']?.BLK_pctg) < featuredDefenderData?.['player_advanced_latest']?.STL_pctg) {
            setDisplayBlk(false)
        }
    }, [featuredDefenderData])

    return (
        <div className="featured">
            <div className="featuredItem">
                <div className="featuredTitleContainer">
                    <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${featuredPlayers?.['featured_scorer_id']}.png`} alt="" className="featuredTitleImg" />
                    <span className="featuredTitleText">{featuredScorerData?.['player_info']?.first_name} {featuredScorerData?.['player_info']?.last_name}</span>
                </div>
                <div className="featuredStatsContainer">
                    <span className="featuredStat">{featuredScorerData?.['player_basic_latest']?.ppg} <span className="featuredStatName">PPG</span></span>
                    <span className="featuredStat">{parseFloat(featuredScorerData?.['player_advanced_latest']?.TS_pctg) * 100} <span className="featuredStatName">TS%</span></span>
                    <span className="featuredStat">{featuredScorerData?.['player_advanced_latest']?.OBPM} <span className="featuredStatName">OBPM</span></span>
                </div>
                <span className="featuredSub">Featured Scorer</span>
            </div>
            <div className="featuredItem">
                <div className="featuredTitleContainer">
                    <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${featuredPlayers?.['featured_passer_id']}.png`} alt="" className="featuredTitleImg" />
                    <span className="featuredTitleText">{featuredPasserData?.['player_info']?.first_name} {featuredPasserData?.['player_info']?.last_name}</span>
                </div>
                <div className="featuredStatsContainer">
                    <span className="featuredStat">{featuredPasserData?.['player_basic_latest']?.apg} <span className="featuredStatName">APG</span></span>
                    <span className="featuredStat">{featuredPasserData?.['player_advanced_latest']?.AST_pctg} <span className="featuredStatName">AST%</span></span>
                    <span className="featuredStat">{featuredPasserData?.['player_advanced_latest']?.OBPM} <span className="featuredStatName">OBPM</span></span>
                </div>
                <span className="featuredSub">Featured Passer</span>
            </div>
            <div className="featuredItem">
                <div className="featuredTitleContainer">
                    <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${featuredPlayers?.['featured_defender_id']}.png`} alt="" className="featuredTitleImg" />
                    <span className="featuredTitleText">{featuredDefenderData?.['player_info']?.first_name} {featuredDefenderData?.['player_info']?.last_name}</span>
                </div>
                <div className="featuredStatsContainer">
                    <span className="featuredStat">{displayBlk ? featuredDefenderData?.['player_basic_latest']?.bpg : featuredDefenderData?.['player_basic_latest']?.spg} <span className="featuredStatName">{displayBlk ? "BPG" : "SPG"}</span></span>
                    <span className="featuredStat">{displayBlk ? featuredDefenderData?.['player_advanced_latest']?.BLK_pctg : featuredDefenderData?.['player_advanced_latest']?.STL_pctg} <span className="featuredStatName">{displayBlk ? "BLK%" : "STL%"}</span></span>
                    <span className="featuredStat">{featuredDefenderData?.['player_advanced_latest']?.DBPM} <span className="featuredStatName">DBPM</span></span>
                </div>
                <span className="featuredSub">Featured Defender</span>
            </div>
        </div>
    )
}
