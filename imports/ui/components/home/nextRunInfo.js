import React from 'react';

import {getFormattedDate, getFormattedTime} from '../dateHelpers.js'

class NextRunInfo extends React.Component {
    getRunInfo(run) {
        let day = getFormattedDate(run.start);
        let start = getFormattedTime(run.start);

        let dist = "";
        let end = "";
        if (run.distance){
            dist = 'Distance: '+run.distance + ' km';
        }
        if (run.end){
            let date = new Date(run.end);
            end = ' to '+getFormattedTime(date);
        }
        return <div>
            <h4>{run.title}</h4>
            Date: {day}
            <br />
            Time: {start} {end}
            <br />
            {dist}
        </div>
    }

    render() {
        let result = <div>
                No upcoming runs. 
                <br />
                Consider planning a run or see our suggestions.
            </div>
        if (this.props.runs.length > 0) {
            let run = this.props.runs[0];

            result = this.getRunInfo(run);
        }
        return (
            <div>
                <h1>Upcoming Run</h1>
                {result}
            </div>
        )
    }
}

export default NextRunInfo;