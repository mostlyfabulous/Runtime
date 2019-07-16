import React from 'react';
import NextRunInfo from './nextRunInfo.js';

class NextRun extends React.Component {
    render() {
        if (this.props.loadingRuns === false && this.props.runsExists === true){
            return (
                <NextRunInfo runs={this.props.runEvents}/>
            );
        }
        else return (<div className='spinner'/>);
    }
}

export default NextRun;