import React, {Component} from 'react';
import {completedGoalRef} from "../firebase"
import {connect} from 'react-redux';
import {setCompleted} from "../actions/index"
import index from "../reducers/index";

class CompleteGoalList extends Component{
    componentDidMount(){
        completedGoalRef.on('value',snap=>{
            let completeGoals = [];
            snap.forEach(completeGoal => {
                const {email,title} = completeGoal.val();
                completeGoals.push( {email,title});
            })
            console.log('completeGoals',completeGoals);
            this.props.setCompleted(completeGoals);
        })
    }
    clearCompleted(){
        completedGoalRef.set([]);
    }
    render(){

        return(
            <div>{
                this.props.completeGoals.map(
                    (completeGoal, index)=>{
                        const {title,email}=completeGoal;
                        return (
                        <div key={index}>
                        <strong>{title}</strong> completed by <em>{email}</em>
                        </div>
                        )
                    }
                )
            }

            <button
            className="btn btn-primary"
            onClick={()=>this.clearCompleted()}
            >Clear All</button>
            </div>
        );
    }
}
function mapStateToProps(state){
    const {completeGoals}=state;
    return {
        completeGoals
    }
}
export default connect(mapStateToProps,{setCompleted})(CompleteGoalList);