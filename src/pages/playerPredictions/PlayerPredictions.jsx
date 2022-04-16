import React from 'react'
import './playerpredictions.css'

import FutureStatsSearch from '../../components/futureStatsSearch/FutureStatsSearch'
import MVPCard from '../../components/mvpCard/MVPCard'
import DPOYCard from '../../components/dpoyCard/DPOYCard'

export default function PlayerPredictions() {
    return (
        <div className="playerPredictions">
            <div className="playerSearch">
                <FutureStatsSearch />
            </div>
            <div className="mvp">
                <MVPCard />
            </div>
            <div className="dpoy">
                <DPOYCard />
            </div>
        </div>
    )
}
