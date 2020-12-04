import React, { Component } from 'react'
import {Form,Card,Button,Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import {FireBaseContext} from './Firebase'
import {withRouter} from 'react-router-dom'

class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             error:'',
             successMessage:''
        }
        this.emailHandler = this.emailHandler.bind(this);
        this.Submit = this.Submit.bind(this)
    }
    static contextType = FireBaseContext
    emailHandler(event) { 
           this.setState({email: event.target.value}); 
         }


    Submit(){
        if(this.state.email!=='')
            this.context.passwordReset(this.state.email)
            .then(()=>{
                this.setState({
                    error:"",
                    successMessage:'check your email '+this.state.email+' to reset the password'
                })
                setTimeout(()=>{
                    this.props.history.push('/login')
                },7000)
            })
            .catch((error)=>{
                this.setState({
                    error:error,
                    successMessage:''
                })
            })
    }
    

    render() {
        return (
        <>
            <Container classname="d-flex align-items-center justify-content-center">
            <Card style={{textAlign:'center'}}>
                <Card.Body>
                    <h2>Restore Password</h2>
                </Card.Body>
                <Form>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={this.state.email} onChange={this.emailHandler} required></Form.Control>
                    </Form.Group>
                </Form>
                <Button type="submit" onClick={this.Submit}>Confirm</Button>
            </Card>
            <div style={{textAlign:'center'}}>Already Signed in? <Link to='/login'>Login</Link></div>
            {this.state.error!=="" && <div style={{textAlign:'center',color:'red',borderColor:'red',borderStyle:'double'}}>{this.state.error.message}</div>}
            {this.state.successMessage!=="" && <div style={{textAlign:'center',color:'green',borderColor:'green',borderStyle:'double'}}>{this.state.successMessage}</div>}
            </Container>
        </>
        )
    }
}

export default withRouter(Login)