import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class HomePage extends Component {
    render() {
        return (
            <div  style={{textAlign:'center'}}>
                <h3 >HOME PAGE</h3>
                <Link to='/login' >Login</Link>
                <br/>
                <Link to='/signup'>Sign Up</Link>
            </div>
        )
    }
}

export default HomePage
