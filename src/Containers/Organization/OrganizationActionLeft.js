// import React, { Component, lazy, } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// const OrganizationHeaderTab = lazy(() =>
//   import("./Child/OrganizationHeader/OrganizationHeaderTab")
// );



// class OrganizationActionLeft extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//     };
//   }





//   render() {

//     return (
//       <>
   

//       <OrganizationHeaderTab     handleOnClick={this.props.handleOnClick}/>
 
  
 
  
//       </>
//     );
//   }
// }
// const mapStateToProps = ({ auth, customer, contact, opportunity }) => ({
//   organizationDetailsList:auth.organizationDetailsList,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(OrganizationActionLeft);


import React, { Component, lazy, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const OrganizationHeaderTab = lazy(() =>
  import("./Child/OrganizationHeader/OrganizationHeaderTab")
);



class OrganizationActionLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }





  render() {

    return (
      <>
   

      <OrganizationHeaderTab
       activeTab={this.props.activeTab}
      organizationDetailsList={this.props.organizationDetailsList} 
      organizationDetails={this.props.organizationDetails}   
       handleOnClick={this.props.handleOnClick}/>
 
  
 
  
      </>
    );
  }
}
const mapStateToProps = ({ auth, customer, contact, opportunity }) => ({
  // organizationDetailsList:auth.organizationDetailsList,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationActionLeft);

