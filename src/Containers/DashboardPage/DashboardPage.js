import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components';
import { MainWrapper } from "../../Components/UI/Layout";
import { BundleLoader } from "../../Components/Placeholder";
import {
    setReionalDashViewType,   
  } from "../DashboardPage/RegionalDashAction";
import dayjs from "dayjs";
import RegionalDashboardHeader from "./Child/RegionalDashboardHeader";
import RegionalSales from "./Child/RegionalSales";
import FullFillMentJumpstartBox from "../Dashboard/FullFillMentJumpstartBox";
import InvestorRegionalJumpstartBox from "./Child/InvestorRegionalJumpstartBox";
class DashboardPage extends Component {
  state = { currentData: "",
  filter:"creationdate",
  currentUser:"",
  isMobile: false, };

  componentDidMount() {
    // Check if isMobile is stored in localStorage
    const storedIsMobile = localStorage.getItem('isMobile');
    this.setState({ isMobile: storedIsMobile ? JSON.parse(storedIsMobile) : window.innerWidth <= 768 });
  
    window.addEventListener('resize', this.handleResize);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  
  handleResize = () => {
    const isMobile = window.innerWidth <= 768;
    this.setState({ isMobile });
  
    // Store isMobile in localStorage
    localStorage.setItem('isMobile', JSON.stringify(isMobile));
  };
 
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleChange = (e) => {
    this.setState({ currentData: e.target.value })
   
  };


  render() {
    const {isMobile } = this.state;
    const {
      addCustomerModal,
      handleCustomerModal,
    } = this.props;
    return (
      <React.Fragment>
        <RegionalDashboardHeader

            currentUser={this.state.currentUser}
           viewType={this.props.viewType}
           setReionalDashViewType={this.props.setReionalDashViewType}
          handleClear={this.handleClear}
          handleChange={this.handleChange}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
          handleFilterChange={this.handleFilterChange}
          filter={this.state.filter}
        />
   
        <Suspense fallback={<BundleLoader />}>
        <MainWrapper style={{marginTop:"1rem",overflow:"hidden",height:"21rem"}}
    >
          <div class=" h-[44vh] max-sm:h-[36rem] max-sm:overflow-x-auto">
         <div class="flex justify-between  max-sm:flex-col">
        
           <div class="w-[53%] max-sm:w-wk">
           <CardElement>
        
           <div class=" flex flex-col " >
           <div className="font-bold flex-col justify-center flex text-lg">Sales</div>
              {/* { props.viewType==="card"  ?  */}
              <RegionalSales
                  
                      />
           
            {/* :(
              
          null
          )} */}
  


    </div>
    </CardElement>
    </div>
  

     <div class="w-[47%] max-sm:w-wk">
     <CardElement>
     <div class=" flex flex-col" >
     
       <div className="font-bold flex-col justify-center flex text-lg">FulFillment</div>
       <FullFillMentJumpstartBox
                  
                  />
      </div>

      
   
    </CardElement>
    </div>
    
    </div>


  
    </div>
    </MainWrapper>
    <MainWrapper style={{marginTop:"1rem",overflow:"none",height:"21rem"}}
    >
    <div class=" h-[44vh]  max-sm:h-[36rem] max-sm:overflow-x-auto">
         <div class="flex justify-between  max-sm:flex-col">
       
           <div class="w-[53%] max-sm:w-wk">
           <CardElement>
           <div className="font-bold flex-col justify-center flex text-lg">Investment</div>
           <div class=" flex flex-col " >
          
     

    <div class=" flex justify-between" >
                
    <InvestorRegionalJumpstartBox
                  
                  /> 
                 
                    {/* { viewType==="ALL" || this.state.activeButton==="Customer" ? ( <CustomerGoogleMap
                    handleMapClick={this.handleMapClick}
                      />)
              
           
            :(
              
          null
          )} */}
               
            </div> 

    </div>
        </CardElement>
    </div>

     <div class="w-[47%] max-sm:w-wk">
  
     <div class=" flex flex-col " >
       <div class=" flex flex-col  justify-between" >
     
      
      


 
 


   
      </div>

  
      
    </div>
    </div>
 
    </div>


  
    </div>
    </MainWrapper>
        </Suspense> 
     
      
  
 
         
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ dashboardRegional, auth }) => ({
  userId: auth.userDetails.userId,
  viewType: dashboardRegional.viewType,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setReionalDashViewType,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
const CardElement = styled.div`
 
border-radius: 0.75rem;
    border: 3px solid #EEEEEE;
    background-color: rgb(255,255,255);
    box-shadow: 0 0.25em 0.62em #aaa;
    height: 18rem;
    color: rgb(68,68,68);
    margin: 1em;
    padding: 0.2rem;
    width: 42vw;
    display: flex;
    flex-direction: column;
  @media only screen and (max-width: 600px) {
    width:  -webkit-fill-available;
    
  }
`
