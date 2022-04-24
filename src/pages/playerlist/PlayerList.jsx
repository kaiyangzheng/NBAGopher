import React, { useEffect, useState } from 'react'
import './playerlist.css'
import FeaturedPlayers from '../../components/featuredplayers/FeaturedPlayers'
import MVPCandidates from '../../components/MVPcandidates/MVPCandidates'
import PlayerSearch from '../../components/playerSearch/PlayerSearch'
import { ClipLoader, BarLoader, BeatLoader, BounceLoader, CircleLoader, ClimbingBoxLoader } from "react-spinners";


export default function PlayerList() {
    const [componentsLoading, setComponentsLoading] = useState({ "FeaturedPlayers": true, "MVPCandidates": true, "PlayerSearch": false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isFalse = Object.values(componentsLoading).every(value => value === false);
        if (isFalse) {
            setLoading(false);
        }
    }, [componentsLoading])

    return (
        <>
            {loading && <div className="loading-container" style={{ position: "absolute", top: '50%', left: '50%' }}><ClipLoader /> </div>}
            <div className="playerlist">
                <div className="playerSearch">
                    <PlayerSearch setComponentsLoading={setComponentsLoading} componentsLoading={componentsLoading} />
                </div>
                <FeaturedPlayers setComponentsLoading={setComponentsLoading} componentsLoading={componentsLoading} />
                <div className="mvpCandidates">
                    <MVPCandidates setComponentsLoading={setComponentsLoading} componentsLoading={componentsLoading} />
                </div>

            </div>
        </>
    )

}
