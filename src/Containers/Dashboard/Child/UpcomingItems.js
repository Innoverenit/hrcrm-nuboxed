import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {
  SubTitle,
} from "../../../Components/UI/Elements";

class UpcomingItems extends Component {
  handleCallback = () => { };
  handleChange = (checked) => {
    console.log("afskajshfkashfjkaskf", checked);
    const { updateTodoEvent, updateTodoCall, updateTodoTask,todo, ratingValue } = this.props;
    console.log(todo);
  
  };
  render() {
    const { upComing, ratingValue } = this.props;
 
   
    // let contactName = todo.metaData && todo.metaData.contacts;
    // let accountName = todo.metaData && todo.metaData.accounts;
    // let opportunity = todo.metaData && todo.metaData.opportunity;
  
    // const add = todo.metaData && todo.metaData.Address;
    
  

    return (
      <>
        <div 
        //style={{overflow:"scroll" }}
        >
          <div>
            <div class=" flex">
            
              {/* {show && ( */}
              
            
              <SubTitle style={{ fontSize: 12, marginLeft: "1.56em" }}>
                 {`${upComing.eventType} ${upComing.userName}   on  ${dayjs(upComing.date).format("ll")} `}
               
                 </SubTitle>
            </div>
          </div>

               

             
         
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ dashboard, event }) => ({

});
const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpcomingItems);
