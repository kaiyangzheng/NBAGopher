import React from 'react'
import './trends.css'
import ImprovingPlayers from '../../components/improvingPlayers/ImprovingPlayers'
import DecliningPlayers from '../../components/decliningPlayers/DecliningPlayers'
import FeaturedTrendingPlayers from '../../components/featuredTrendingPlayers/FeaturedTrendingPlayers'

export default function trends() {
    return (
        <div className="trends">
            <FeaturedTrendingPlayers />
            <ImprovingPlayers />
            <DecliningPlayers />
        </div>
    )
}
