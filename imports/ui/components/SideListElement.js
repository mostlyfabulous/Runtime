import React from 'react';
import {connect} from 'react-redux';
import {changePage} from '../actions/index';

class SideListElement extends React.Component {
    handleClick = () => {
        this.props.changePage(this.props.page);
    }

    render() {
        let highlight = ""
        if (this.props.current === this.props.page)
            highlight = 'current';

        return (
            <div id={highlight} onClick={this.handleClick}>{this.props.title}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        current: state.pages
    };
}

export default connect(mapStateToProps, {changePage})(SideListElement);
