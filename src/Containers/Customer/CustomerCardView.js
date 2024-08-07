import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { GroupView } from "../../Components/Common";
import {
  getCustomerRequirement,
  getLatestCustomer,
  getCustomerCloser,
  getAllCustomerByCloser,
  getAllCustomerByAlphabet,
  getAllCustomerByPosition,
  handleCustomerDrawerModal,
  handleUpdateCustomerDrawerModal,
  setEditCustomer,
} from "../Customer/CustomerAction";
const SingleCardView = lazy(() =>
  import("./SingleCardView")
);
const AddCustomerDrawerModal = lazy(() =>
  import("./AddCustomerDrawerModal")
);
const UpdateCustomerDrawerModal = lazy(() =>
  import("./Child/CustomerTable/UpdateCustomerDrawerModal")
);

class CustomerCardView extends Component {

  componentDidMount() {
    const {
      user: { userId },
      getLatestCustomer,
      getCustomerRequirement,
      getCustomerCloser,
    } = this.props;
    const startDate = dayjs()
      .startOf("month")
      .toISOString();
    const endDate = dayjs()
      .endOf("month")
      .toISOString();
    if (userId) {
      // getCustomerListByUserId(userId);
      getLatestCustomer(userId);
      // getCustomerRequirement(userId);
      // getCustomerCloser(userId, startDate, endDate);
    }
  }
  handleOnViewMoreTopValue = () => {
    const {
      user: { userId },
      getAllCustomerByAlphabet,
    } = this.props;

    if (userId) {
      getAllCustomerByAlphabet(userId);
    }
  };
  handleOnViewMorePosition = () => {
    const {
      user: { userId },
      getAllCustomerByPosition,
    } = this.props;

    if (userId) {
      getAllCustomerByPosition(userId);
    }
  };
  handleOnViewMoreCloser = () => {
    const {
      user: { userId },
      getAllCustomerByCloser,
    } = this.props;
    const startDate = dayjs()
      .startOf("month")
      .toISOString();
    const endDate = dayjs()
      .endOf("month")
      .toISOString();

    if (userId) {
      getAllCustomerByCloser(userId, startDate, endDate);
    }
  };

  render() {
    const {
      user,
      fetchingCustomers,
      customerByUserId,
      latestCustomer,
      fetchinglatestCustomer,
      handleCustomerDrawerModal,
      handleUpdateCustomerDrawerModal,
      customerRequirement,
      fetchingCustomerRequirement,
      customerCloser,
      fetchingCustomerCloser,
      setEditCustomer
    } = this.props;

    return (
      <>
        <br />
        <div class="max-sm:overflow-x-auto h-[34rem]">
       
<div class="flex flex-col max-sm:flex-col">
        <GroupView
          groupTitle="ALL"
          isFetching={fetchinglatestCustomer}
          noData={!latestCustomer.length}
          isLoading={this.props.fetchingAllCustomerByAlphabet}
          length={latestCustomer.length}
          onViewmore={this.handleOnViewMoreTopValue}
        >
          {(isViewAll) =>
            !isViewAll ? (
              <div class=" flex max-sm:flex-col">
                {latestCustomer &&
                  latestCustomer.slice(0, 5).map((customer, i) => {
                    return (
                      <SingleCardView
                        key={customer.customerId}
                        user={user}
                        handleCustomerDrawerModal={handleCustomerDrawerModal}
                        setEditCustomer={setEditCustomer}
                        customer={customer}
                        handleUpdateCustomerDrawerModal={handleUpdateCustomerDrawerModal}
                        // handleOpportunityDrawer={handleOpportunityDrawer}
                      />
                    );
                  })}
              </div>
            ) : (
              <div class=" flex">
                {latestCustomer &&
                  latestCustomer.map((customer, i) => {
                    return (
                      <SingleCardView
                        key={customer.customerId}
                        user={user}
                        handleCustomerDrawerModal={handleCustomerDrawerModal}
                        handleUpdateCustomerDrawerModal={handleUpdateCustomerDrawerModal}
                        setEditCustomer={setEditCustomer}
                        // stages={stages}
                        customer={customer}
                      />
                    );
                  })}
              </div>
            )
          }
        </GroupView>
        </div>
        </div>
        <AddCustomerDrawerModal />
        < UpdateCustomerDrawerModal
         
          />

      </>
    );
  }
}

const mapStateToProps = ({ auth, customer, account }) => ({
  user: auth.userDetails,
  customerCloser: customer.customerCloser,
  fetchingCustomerCloser: customer.fetchingCustomerCloser,
  latestCustomer: customer.latestCustomer,
  fetchinglatestCustomer: customer.fetchinglatestCustomer,
  fetchinglatestCustomerError: customer.fetchinglatestCustomerError,

  customerRequirement: customer.customerRequirement,
  fetchingCustomerRequirement: customer.fetchingCustomerRequirement,
  fetchingAllCustomerByCloser: customer.fetchingAllCustomerByCloser,
  fetchingAllCustomerByPosition: customer.fetchingAllCustomerByPosition,

  customerByUserId: customer.customerByUserId,
  fetchingCustomerCloser: customer.fetchingCustomerCloser,
  customerCloser: customer.customerCloser,


  customerByUserId: customer.customerByUserId,
  fetchingAllCustomerByAlphabet: customer.fetchingAllCustomerByAlphabet,
  fetchingCustomers: customer.fetchingCustomers,
  fetchingCustomersError: customer.fetchingCustomersError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLatestCustomer,
      getCustomerRequirement,
      getCustomerCloser,
      getAllCustomerByAlphabet,
      getAllCustomerByCloser,
      getAllCustomerByPosition,
      handleCustomerDrawerModal,
      handleUpdateCustomerDrawerModal,
      setEditCustomer,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCardView);
