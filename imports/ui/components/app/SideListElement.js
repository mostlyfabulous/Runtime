import React from 'react';
import {connect} from 'react-redux';
import { withAccount } from '../accounts/connector.js'
import {changePage} from '../../actions/index';

class SideListElement extends React.Component {
    handleClick = () => {
        this.props.changePage(this.props.page);
    }

    render() {
        let highlight = ""
        if (this.props.current === this.props.page)
            highlight = 'current';

        return (
            <li id={highlight} onClick={this.handleClick}>{this.props.title}</li>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        current: state.pages
    };
}

const SideListContainer = withAccount(SideListElement);

export default connect(mapStateToProps, {changePage})(SideListContainer);
