import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message, Input } from "antd";
import moment from "moment";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper, FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput, Title } from "../../../../Components/UI/Elements";
// import {
//     getCustomer,
//     addCustomer,
//   removeCustomer,
//   updateCustomer
// } from "./CustomerAction";
// import SingleCustomer from "./SingleCustomer";

class InvestorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedSectors: [],
      isTextInputOpen: false,
      addingCustomer: false,
      name: "",
      type: "",
      singleCustomer: "",
      editInd: true,
      currentData: "",
    };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.  getCustomer(this.props.orgId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value });
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
    handleAddCustomer = () => {
      const {   addCustomer, customers } = this.props;
      const { name, editInd, addingCustomer, isTextInputOpen } = this.state;
      let customer = { name,
        orgId: this.props.orgId,
        userId:this.props.userId,
         editInd };
    
      let exist =
      customers && customers.some((element) => element.name === name);
    
      // if (exist) {
      //   message.error(
      //     "Can't create as another source type exists with the same name!"
      //   );
      // } else {
           addCustomer(customer,this.props.orgId ,() => console.log("add sector callback"));
        this.setState({
          name: "",
          singleCustomer: "",
          isTextInputOpen: false,
          editInd: true,
        });
      // }
    };
    
  handleDeleteCustomer = (customerTypeId = { customerTypeId }) => {
     this.props.removeCustomer(customerTypeId);
    // this.setState({ name: "", singleCustomer: "" });
  };
  handleupdateCustomer = (name, customerTypeId, editInd, cb) => {
     this.props.updateCustomer(name, customerTypeId, editInd, cb);
    this.setState({ name: "", singleCustomer: "",customerTypeId:"", editInd: true });
  };

  componentDidMount() {
    const {   getCustomer,orgId } = this.props;
    console.log();
       getCustomer(orgId);
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingCustomer,
      fetchingCustomerError,
      customerListData,
      addingCustomer,
      updatingCustomer,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      name,
      singleCustomer,
      linkedSectors,
    } = this.state;
    if (fetchingCustomer) return <BundleLoader/>;
    //if (fetchingSectorsError) return <p>We are unable to load data</p>;
    return (
      <>
        <FlexContainer flexWrap="nowrap">
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
            <div style={{ width: "18vw", display: "flex" }}>
              <Input
                placeholder="Search by Name"
                width={"100%"}
                // onSearch={(value) => {
                //   props.inputCandidateDataSearch(value);
                //   props.setCurrentData(value);

                // }}
                onChange={(e) => this.handleSearchChange(e)}
                value={this.props.currentData}
              />
              <Button
                type={this.props.currentData ? "primary" : "danger"}
                // onClick={() => {
                //   this.props.searchSectorName(this.state.currentData);
                // }}
              >
                Submit
              </Button>
              &nbsp;
              <Button
                type={this.props.currentData ? "primary" : "danger"}
                onClick={() => {
                  this.handleClear();
                }}
              >
                <FormattedMessage id="app.clear" defaultMessage="Clear" />
              </Button>
            </div>

            <FlexContainer flexDirection="column">
              {/* <Title style={{ padding: 8 }}>Types Of Documents</Title> */}
             {/* <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {customerListData.length &&
                  customerListData.map((customer, i) => (
                    <SingleCustomer
                      key={i}
                      value={singleCustomer}
                      name1="singleCustomer"
                      customer={customer}
                      linkedSectors={linkedSectors}
                      updatingCustomer={updatingCustomer}
                      handleChange={this.handleChange}
                      handleupdateCustomer={this.handleupdateCustomer}
                      handleDeleteCustomer={this.handleDeleteCustomer}
                      handleClear={this.handleClear}
                      handleSearchChange={this.handleSearchChange}
                      currentData={this.state.currentData}
                      setCurrentData={this.setCurrentData}
                    />
                  ))}
              </MainWrapper> */}
            </FlexContainer>
            {isTextInputOpen ? (
              <FlexContainer
                alignItems="center"
                style={{ marginLeft: "0.3125em", marginTop: "0.3125em" }}
              >
                <br />
                <br />
                <TextInput
                  placeholder="Add Customer"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!name}
                  Loading={addingCustomer}
                  onClick={this.handleAddCustomer}
                  style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </FlexContainer>
            ) : (
              <>
                <br />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    loading={addingCustomer}
                    onClick={this.toggleInput}
                  >
                    {/* Add More */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </FlexContainer>
                {/* <h4>Updated on {moment(this.props.sectors && this.props.sectors.length && this.props.sectors[0].updationDate).format("ll")} by {this.props.sectors && this.props.sectors.length && this.props.sectors[0].name}</h4> */}
              </>
            )}
          </MainWrapper>
      
       
        </FlexContainer>
        <h4>Updated on {moment(this.props.customerListData && this.props.customerListData.length && this.props.customerListData[0].updationDate).format("ll")} by {this.props.customerListData && this.props.customerListData.length && this.props.customerListData[0].updatedBy}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ catgCustomer,auth }) => ({
  addingCustomer: catgCustomer.addingCustomer,
  addingCustomerError: catgCustomer.addingCustomerError,
  customerListData: catgCustomer.customerListData,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingCustomer: catgCustomer.removingCustomer,
removingCustomerError: catgCustomer.removingCustomerError,
fetchingCustomer: catgCustomer.fetchingCustomer,
fetchingCustomerError: catgCustomer.fetchingCustomerError,

updatingCustomer: catgCustomer.updatingCustomer,
updatingCustomerError: catgCustomer.updatingCustomerError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //     getCustomer,
    //     addCustomer,
    //   removeCustomer,
    //   updateCustomer,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InvestorList);
