import React, {Component} from 'react';
import {connect} from 'react-redux';

import Link from './Link';

class FilterLink extends Component {

    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate() //React method that updates the state of the component.
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const { store } = this.context;
        const state = store.getState();
        return (
            <Link active={props.filter === state.visibilityFilter}
                onClick={() =>
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    })
                }
            >
                {props.children}
            </Link>
        )
    }
}
FilterLink.contextTypes = {
    store: React.PropTypes.object
}

const mapStateToLinkProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: ownProps.filter
            })
        }
    }
};

export default connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(FilterLink)