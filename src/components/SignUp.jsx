import React, {Component} from 'react';
import {firebaseApp} from '../firebase';
import {Link} from 'react-router-dom'

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            error:{
                message:''
            }
        }
    }
    signUp(){
        console.log(this.state);
        const {email,password} = this.state;
        firebaseApp.auth().createUserWithEmailAndPassword(email,password)
            .catch(error=>{
               this.setState({error})
            })
    }
    render(){
        return (
            <div className="form-inline" style={{margin:'5%'}}>
                <h2>Sign Up</h2>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="email"
                        onChange={event=>this.setState({email:event.target.value})}
                        style={{marginRight:'5px'}}
                    />
                    <input
                        className="form-control"
                        type="password"
                        placeholder="password"
                        onChange={event=>this.setState({password:event.target.value})}
                        style={{marginRight:'5px'}}
                    />
                    <button className="btn btn-primary"
                            type="button" onClick={()=>this.signUp()}>Sign Up</button>

                </div>
                <div>{this.state.error.message}</div>
                <div><Link to={'/signin'}>Sign in instead</Link></div>
            </div>
        );
    }
}

export default SignUp