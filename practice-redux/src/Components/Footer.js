import React from 'react';
import {connect} from 'react-redux';

import FilterLink from './FilterLink';

const Footer = () => {
    return (
        <p>
            Show:
            {' '}
            <FilterLink filter='SHOW_ALL'>All</FilterLink>
            {' '}
            <FilterLink filter='SHOW_ACTIVE'> Active</FilterLink>
            {' '}
            <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
        </p>
    )
}

export default Footer;
