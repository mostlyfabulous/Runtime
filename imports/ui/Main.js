import React from 'react';
import {connect} from 'react-redux';
import RunPlan from './pages/RunPlan';
import History from './pages/History';

class Main extends React.Component {
    render() {
        let body = <RunPlan/>;
        if (this.props.page === 'history')
            body = <History/>;
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
