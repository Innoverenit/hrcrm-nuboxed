import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, message } from "antd";
import { bindActionCreators } from "redux";
import { StyledSteps } from "../../../../Components/UI/Antd";
import FirstInvoiceProjectPage from "./FirstInvoiceProjectPage";


const Step = StyledSteps.Step;
class InvoiceProjectStepper extends Component {
  //   componentDidMount() {
  //   this.props.getCandidatesTotalBillingsForInvoice(this.props.customerId,this.props.projectId,this.props.month,this.props.year);
  // }
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      customerId:"",
      projectId:"",
      month:"",
      year:"",
    };
  }


handleMonth = (e) => {
  this.setState({
    month: e.target.value
  });
};
handleYear = (e) => {
  this.setState({
    year: e.target.value
  });
};
handleProjectId = (e) => {
  this.setState({
    projectId: e.target.value
  }
  
  );
  console.log(this.state.projectId);

};

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
    // this.props.getCandidatesTotalBillingsForInvoice(this.state.customerId,this.state.projectId,this.state.month,this.state.year);
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };
 


  render() {
  
    const steps = [
      {
        title: "First",
        content: <FirstInvoiceProjectPage
        />,
       
      },
  
    
    ];
    const { current } = this.state;
    return (
      <>
        <StyledSteps current={current}>
          <Step
            // title={<ShoppingCartOutlined style={{ fontSize: "1.37em" }} />}
            title={<i class="fas fa-cube" style={{ fontSize: "1.37em" }}></i>}
            // type="shopping-cart"
            // description="Indent"
          />
          <Step
            title={<i class="fas fa-truck"></i>}
            // type="user"
            // description="Supplier Data"
          />
          {/* <Step
            title={
              <i style={{ fontSize: "1.37em" }} class="fas fa-file-invoice"></i>
            }
        
          /> */}
        </StyledSteps>
        <div style={{ minHeight: "40vh" }}>{steps[current].content}</div>
        <div class=" flex justify-end " >
          <div className="steps-action">
            {current < steps.length - 1 && (
              <>
                {current > 1 ? null : (
                  <>
                    <Button
                      type="primary"
                      onClick={() => {
                        this.next();
                        // this.allDataSubmit()
                    }}
                      style={{ marginTop: "5px" }}
                    // disabled={this.props.serachedData === null}
                    >
                      Next
                    </Button>
                  </>
                )}
              </>
            )}

            {current > 0 && (
              <Button style={{ marginTop: "2px" }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ invoice,task,projects }) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceProjectStepper);