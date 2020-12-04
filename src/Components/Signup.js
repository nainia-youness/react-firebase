import React, { Component } from 'react'
import {Form,Card,Button,Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {FireBaseContext} from './Firebase'
import {Link} from 'react-router-dom'

class Signup extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             password:'',
             email:'',
             passwordConfirm:'',
             pseudo:'',
             error:'',
        }
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.passwordConfirmHandler = this.passwordConfirmHandler.bind(this);
        this.pseudoHandler = this.pseudoHandler.bind(this)
        this.Submit = this.Submit.bind(this)
    }
    static contextType = FireBaseContext

    emailHandler(event) { 
           this.setState({email: event.target.value}); 
         }

    passwordHandler(event) { 
        this.setState({password: event.target.value}); 
    }

    passwordConfirmHandler(event) { 
        this.setState({passwordConfirm: event.target.value}); 
    }

    pseudoHandler(event) { 
        this.setState({pseudo: event.target.value}); 
    }

    Submit(){
        if(this.state.pseudo!=="" && this.state.email!=="" && this.state.password!=="" && this.state.passwordConfirm!=="" && this.state.password===this.state.passwordConfirm)
             this.context.signupUser(this.state.email,this.state.password)
                .then((authUser)=>{
                    return this.context.user(authUser.user.uid).set(
                        {
                            pseudo:this.state.pseudo,
                            email:this.state.email
                        }
                    )
                })
                .then(user=>{
                    this.setState({
                        email:'',
                        pseudo:'',
                        passwordConfirm:'',
                        password:'',
                        error:''
                    },()=>{this.props.history.push('/login')})
                    
                })
                .catch(error=>{
                    console.log(error)
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
                    <h2>Sign Up</h2>
                </Card.Body>
                <Form>
                    <Form.Group id="pseudo">
                        <Form.Label>Pseudo</Form.Label>
                        <Form.Control type="email" name="pseudo" value={this.state.pseudo} onChange={this.pseudoHandler} required></Form.Control>
                    </Form.Group>
                </Form>
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
                <Form>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password confirmation</Form.Label>
                        <Form.Control type="password" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.passwordConfirmHandler} required></Form.Control>
                    </Form.Group>
                </Form>
                <Button type="submit" onClick={this.Submit}>Sign up</Button>
            </Card>
            <div style={{textAlign:'center'}}>Already have an acount? <Link to='/login'>Login</Link></div>
            {this.state.error!=="" && <div style={{textAlign:'center',color:'red',borderColor:'red',borderStyle:'double'}}>{this.state.error.message}</div>}
            </Container>
        </>
        )
    }
}

export default Signup