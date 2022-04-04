import React from 'react'
import { NotificationsNone, Language, Settings } from '@material-ui/icons'
import './topbar.css'

export default function TopBar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topbarLeft">
                    <span className="logoLeft">NBA</span><span className="logoRight">Gopher</span>
                </div>
                <div className="topbarRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topbarIconBadge">
                            2
                        </span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="topbarIconBadge">
                            2
                        </span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                    </div>
                </div>
            </div>
        </div>
    )
}
