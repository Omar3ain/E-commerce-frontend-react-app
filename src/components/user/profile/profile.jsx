import React, { fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './profile.module.css';

function profile() {
    const { user } = useSelector(state => state.user);
}
