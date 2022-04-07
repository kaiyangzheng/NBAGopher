import React from 'react'
import './playerlist.css'
import FeaturedPlayers from '../../components/featuredplayers/FeaturedPlayers'
import MVPCandidates from '../../components/MVPcandidates/MVPCandidates'
import PlayerSearch from '../../components/playerSearch/PlayerSearch'

export default function PlayerList() {
    return (
        <div className="playerlist">
            <FeaturedPlayers />
            <div className="mvpCandidates">
                <MVPCandidates />
            </div>
            <div className="playerSearch">
                <PlayerSearch />
            </div>
        </div>
    )
}
