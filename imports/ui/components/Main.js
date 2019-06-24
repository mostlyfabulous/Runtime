import React from 'react';
import {connect} from 'react-redux';
import RunPlan from '../pages/RunPlan';
import History from '../pages/History';
import Preferences from '../pages/Preferences';

class Main extends React.Component {
    render() {
        let body = <RunPlan/>;
        if (this.props.page === 'history') {
            body = <History/>;
        } else if (this.props.page === 'preferences') {
          body = <Preferences/>;
        }



        return (
            <div>{body}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        page: state.pages
    };
}

export default connect(mapStateToProps)(Main);
