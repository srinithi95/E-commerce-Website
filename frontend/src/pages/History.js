import React from 'react'
import { connect } from 'react-redux';
import { setIsLoggedIn} from '../redux/actions/userActions';

const History = ({
    

}) => {

    return (
        <div>
        <h2>Welcome to Purchase history</h2>
        <button>History</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(History)