import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { FontAwesomeIcon } from '@fortawesome/fontawesome-free'
import './mvpcandidates.css'

export default function MVPCandidates({ setComponentsLoading, componentsLoading, mvpCandidates, mvpCandidatesData, retrieveData, tableData, setRetrieveData, setTableData }) {
    const [sortDirection, setSortDirection] = useState({})

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: "Name", headerName: "Name", width: 150 },
        { field: "Position", headerName: "Position", width: 150 },
        { field: "PPG", headerName: "PPG", width: 150 },
        { field: "APG", headerName: "APG", width: 150 },
        { field: "RPG", headerName: "RPG", width: 150 },
        { field: "TS%", headerName: "TS%", width: 150 },
        { field: "BPM", headerName: "BPM", width: 150 },
    ]

    const handleSort = (property) => {
        if (sortDirection[property] == undefined || sortDirection[property] == "asc") {
            setTableData([...tableData].sort(function (first, second) {
                return second[property] - first[property];
            }))
            setSortDirection({ [property]: "desc" });
        }
        else if (sortDirection[property] == "desc") {
            setTableData([...tableData].sort(function (first, second) {
                return first[property] - second[property];
            }))
            setSortDirection({ [property]: 'asc' })
        }
    }


    return (
        <div className="mvpcandidates">
            <h3 className="mvpcandidatesTitle">
                Top MVP Candidates
            </h3>
            <table className="mvpcandidatesTable">
                <tr className="mvpcandidatesTr">
                    <th className="mvpcandidatesTh">Name</th>
                    <th className="mvpcandidatesTh">Position</th>
                    <th className="mvpcandidatesTh sort" onClick={() => { handleSort('PPG') }}>{sortDirection['PPG'] == undefined && <i className="fas fa-sort"></i>}{sortDirection['PPG'] == 'asc' && <i className="fas fa-sort-up"></i>}{sortDirection['PPG'] == 'desc' && <i className="fas fa-sort-down"></i>} PPG</th>
                    <th className="mvpcandidatesTh sort" onClick={() => { handleSort('APG') }}>{sortDirection['APG'] == undefined && <i className="fas fa-sort"></i>}{sortDirection['APG'] == 'asc' && <i className="fas fa-sort-up"></i>}{sortDirection['APG'] == 'desc' && <i className="fas fa-sort-down"></i>} APG</th>
                    <th className="mvpcandidatesTh sort" onClick={() => { handleSort('RPG') }}>{sortDirection['RPG'] == undefined && <i className="fas fa-sort"></i>}{sortDirection['RPG'] == 'asc' && <i className="fas fa-sort-up"></i>}{sortDirection['RPG'] == 'desc' && <i className="fas fa-sort-down"></i>} RPG</th>
                    <th className="mvpcandidatesTh sort" onClick={() => { handleSort('TS%') }}>{sortDirection['TS%'] == undefined && <i class="fas fa-sort"></i>}{sortDirection['TS%'] == 'asc' && <i className="fas fa-sort-up"></i>}{sortDirection['TS%'] == 'desc' && <i className="fas fa-sort-down"></i>} TS%</th>
                    <th className="mvpcandidatesTh sort" onClick={() => { handleSort('BPM') }}>{sortDirection['BPM'] == undefined && <i class="fas fa-sort"></i>}{sortDirection['BPM'] == 'asc' && <i className="fas fa-sort-up"></i>}{sortDirection['BPM'] == 'desc' && <i className="fas fa-sort-down"></i>} BPM</th>
                </tr>
                {tableData.map((data, index) => {
                    return (
                        <tr className="mvpcandidatesTr" key={index}>
                            <td className="mvpcandidatesTdName">
                                <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${data.id}.png`} alt="" className="playerImg" />
                                <span className="name">{data.Name}</span>
                            </td>
                            <td className="mvpcandidatesTd">{data.Position}</td>
                            <td className="mvpcandidatesTd">{data.PPG}</td>
                            <td className="mvpcandidatesTd">{data.APG}</td>
                            <td className="mvpcandidatesTd">{data.RPG}</td>
                            <td className="mvpcandidatesTd">{data['TS%']}</td>
                            <td className="mvpcandidatesTd">{data.BPM}</td>

                        </tr>

                    )
                })}
            </table>
        </div >
    )
}
