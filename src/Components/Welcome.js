import React, { Component } from 'react'
import Logout from './Logout'
import {FireBaseContext} from './Firebase'
import {withRouter} from 'react-router-dom'
class Welcome extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             userSession:null,
             userData:null
        }
    }
    static contextType = FireBaseContext






    componentDidMount()
    {
            window.listener = this.context.auth.onAuthStateChanged(user=>{
                user ? this.setState({
                    userSession:user
                }):
                this.props.history.push('/')
            })
    }

    componentDidUpdate(PrevState,PrevProps){
        if(this.state.userSession!==PrevState.userSession){
            if(this.state.userSession!==null)
            {
                //console.log(this.state.userSession.uid)
                this.context.user(this.state.userSession.uid)
                .get()
                .then((doc)=>{
                    if(doc && doc.exists){
                        const myData=doc.data()
                        this.setState({
                            userData:myData
                        })
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
            }
        }
    }

    componentWillUnmount(){
        window.listener()
    }

    render() {
        return (
            <>
                {this.state.userSession===null && <p style={{textAlign:'center',color:'blue'}}>Loading...</p>}
                {this.state.userSession!==null && this.state.userData!==null  &&
                <>
                    <Logout></Logout>
                    <h3 style={{textAlign:'center'}}>WELCOME {this.state.userData.pseudo}</h3>
                </>
                }
                {this.state.userSession!==null && this.state.userData===null &&
                <>
                    <Logout></Logout>
                    <h3 style={{textAlign:'center'}}>WELCOME</h3>
                </>}
               
            </>
        )
    }
}

export default withRouter(Welcome)
