import React, { useState, useEffect } from 'react'
import './home.css'
import NavCards from '../../components/navCards/NavCards'


export default function Home() {
    return (
        <div className="home">
            <div className="navCards">
                <NavCards />
            </div>
        </div>
    )
}

