import React from 'react'
import './playerpredictions.css'

import FutureStatsSearch from '../../components/futureStatsSearch/FutureStatsSearch'
import MVPCard from '../../components/mvpCard/MVPCard'
import DPOYCard from '../../components/dpoyCard/DPOYCard'
import MIPCard from '../../components/mipCard/MIPCard'
import SMOYCard from '../../components/smoyCard/SMOYCard'
import ROYCard from '../../components/royCard/ROYCard'

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
            <div className="mip">
                <MIPCard />
            </div>
            <div className="smoy">
                <SMOYCard />
            </div>
            <div className="roy">
                <ROYCard />
            </div>
        </div>
    )
}
