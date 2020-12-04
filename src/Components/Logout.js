import React, { Component } from 'react'
import {Form} from 'react-bootstrap'
import {FireBaseContext} from './Firebase'
import {withRouter} from 'react-router-dom'
class Logout extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             checked:false
        }
        this.handleSwitch = this.handleSwitch.bind(this);
    }
    static contextType = FireBaseContext
    handleSwitch() { 
        this.setState({checked: !this.state.checked}); 
    }

    componentDidUpdate(PrevState,PrevProps){
        if(this.state.checked!==PrevState.checked){
            if(this.state.checked===true)
            {
                console.log('loged out')
                this.context.signOutUser()
                this.props.history.push('/login')
            }
        }
    }

    
    render() {
        return (
            <>
                <Form style={{textAlign:'right'}}>
                    <Form.Check bsSize='large'
                        type="switch"
                        id="custom-switch"
                        label="Click Here To logout"
                        checked={this.state.checked}
                        onChange={this.handleSwitch}
                    />
                </Form>
            </>
        )
    }
}

export default withRouter(Logout)
