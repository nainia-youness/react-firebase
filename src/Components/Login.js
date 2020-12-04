import React, { Component } from 'react'
import {Form,Card,Button,Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import {FireBaseContext} from './Firebase'

class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             password:'',
             email:'',
             error:'',
        }
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.Submit = this.Submit.bind(this)
    }
    static contextType = FireBaseContext
    emailHandler(event) { 
           this.setState({email: event.target.value}); 
         }

    passwordHandler(event) { 
        this.setState({password: event.target.value}); 
    }


    Submit(){
        if(this.state.email!=='' && this.state.password!=='')
            this.context.loginUser(this.state.email,this.state.password)
                .then(user=>{
                    this.setState({
                        email:'',
                        password:'',
                        error:''
                    },()=>{this.props.history.push('/welcome')})
                })
                .catch(error=>{
                    this.setState({
                        error:error
                    })
                })
    }
    

    render() {
        return (
        <>
            <Container classname="d-flex align-items-center justify-content-center">
            <Card style={{textAlign:'center'}}>
                <Card.Body>
                    <h2>Login</h2>
                </Card.Body>
                <Form>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={this.state.email} onChange={this.emailHandler} required></Form.Control>
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group id="passwordd">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={this.state.password} onChange={this.passwordHandler} required></Form.Control>
                    </Form.Group>
                </Form>
                <Button type="submit" onClick={this.Submit}>Sign up</Button>
            </Card>
            <div style={{textAlign:'center'}}>don t have an acount? <Link to='/signup'>Sign up</Link></div>
            <div style={{textAlign:'center'}}>forget password? <Link to='/forgetpassword'>Restore Password</Link></div>
            {this.state.error!=="" && <div style={{textAlign:'center',color:'red',borderColor:'red',borderStyle:'double'}}>{this.state.error.message}</div>}
            </Container>
        </>
        )
    }
}

export default Login
