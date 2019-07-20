import React from 'react';

import {getRunInfo} from '../formatHelpers.js'

class NextRunInfo extends React.Component {

    render() {
        let result = <div>
                No upcoming runs. 
                <br />
                Consider planning a run or see our suggestions.
            </div>
        if (this.props.runs.length > 0) {
            let run = this.props.runs[0];

            result = getRunInfo(run);
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