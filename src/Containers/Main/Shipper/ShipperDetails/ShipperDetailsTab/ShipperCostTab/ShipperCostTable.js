import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  handleUpdateShipperCostModal,
  setEditShipperCost,
  getCostShipperList,
  updateCostShipper,
} from "../../../ShipperAction";
import {  } from "../../../../Suppliers/SuppliersAction"
import { Tooltip,Input ,Button} from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
//import UpdateShipperCostModal from "./UpdateShipperCostModal";
import { OnlyWrapCard } from '../../../../../../Components/UI/Layout';
import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";


class ShipperCostTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      breadCumb: false,
      breadCumb1: false,
      value: 1,
      dailyCustomInd: 1,
      showDel: false,
      translatedMenuItems: [],
      editingId: null, // Track the ID of the row being edited
      editValues: {}
    };
  }
  componentDidMount() {
    this.props.getCostShipperList (this.props.shipperId);
    this.fetchMenuTranslations();
  }
 
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
       
       
       "279",// "Source" 0
       "325",  // Destination 1
       "657",  // price 2
       
            ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
    // this.props.updateCostShipper()
  };


  handleEdit = (item) => {
    this.setState({
      editingId: item.shippingTransferCostId,
      editValues: {
        source: item.source,
        destination: item.destination,
        price: item.price,
        shippingTransferCostId:item.shippingTransferCostId
      },
    });
  };
  handleInputChange = (field, value) => {
    this.setState({
      editValues: {
        ...this.state.editValues,
        [field]: value,
      },
    });
  }; 


  handleSave = () => {
    const { editValues } = this.state;
    console.log("Saved values:", editValues);
    let data={
      source:editValues.source,
      destination:editValues.destination,
      price:editValues.price,
      userId:this.props.userId,
    }
    this.props.updateCostShipper(data,editValues.shippingTransferCostId)
    this.setState({ editingId: null }); // Exit editing mode
  };

  // Function to cancel editing
  handleCancel = () => {
    this.setState({ editingId: null }); // Exit editing mode without saving
  };


  render() {
    const { editingId, editValues } = this.state;
    return (
<>

 <div className=' flex  sticky h-[78vh]  z-auto'>
          <OnlyWrapCard style={{ backgroundColor: "#eaedf1" }}>
            <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
              <div className="font-bold font-poppins text-[#00A2E8] text-base md:w-[7.1rem]">{this.state.translatedMenuItems[0]}</div>
              <div className="font-bold font-poppins text-xs md:w-[11.12rem]">
                {/* {this.state.translatedMenuItems[1]} */}
                Destination
                </div>
              <div className="font-bold font-poppins text-xs md:w-[4.8rem] ">{this.state.translatedMenuItems[2]}</div>
              <div className=" md:w-[3.1rem]"></div>

            </div>
            {/* <InfiniteScroll
        dataLength={customerByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingCustomers?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      > */}

           {/* {this.props.costShipperList.map((item) => {
              return (
                <div>
                  <div className="flex rounded justify-between  mt-1 bg-white h-8 items-center"
                  >
                    <div class="flex ">

                      <div className=" flex font-medium flex-col border-l-2 border-green-500 bg-[#eef2f9]   md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        <h4 class=" text-xs  font-poppins">
                       {item.source}
                        </h4>

                      </div>


                      <div className=" flex font-medium flex-col items-center justify-center h-8 ml-gap  bg-[#eef2f9] md:w-[11.1rem] max-sm:flex-row w-full max-sm:justify-between  ">


                        <h4 class=" text-xs  font-poppins">
                          {item.destination}
                        </h4>

                      </div>

                    </div>
               
                    <div className=" flex font-medium flex-col md:w-[24rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">


                      <div class=" text-xs  font-poppins text-center">
                        {item.price}

                      </div>
                    </div>
                              
                  </div>
                </div>


              )
            })}  */}


{this.props.costShipperList.map((item) => {
          const isEditing = editingId === item.shippingTransferCostId;

          return (
            <div key={item.shippingTransferCostId}>
              <div className="flex rounded justify-between mt-1 bg-white h-8 items-center">
                <div className="flex">
                  {/* Source Field */}
                  <div className="flex font-medium flex-col border-l-2 border-green-500 bg-[#eef2f9] md:w-[10rem] w-full max-sm:justify-between">
                    {isEditing ? (
                      <Input
                        value={editValues.source}
                        onChange={(e) => this.handleInputChange('source', e.target.value)}
                        size="small"
                      />
                    ) : (
                      <h4 className="text-xs font-poppins">{item.source}</h4>
                    )}
                  </div>

                  {/* Destination Field */}
                  <div className="flex font-medium flex-col items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[11.1rem] w-full max-sm:justify-between">
                    {isEditing ? (
                      <Input
                        value={editValues.destination}
                        onChange={(e) => this.handleInputChange('destination', e.target.value)}
                        size="small"
                      />
                    ) : (
                      <h4 className="text-xs font-poppins">{item.destination}</h4>
                    )}
                  </div>
                </div>

                {/* Price Field */}
                <div className="flex font-medium flex-col md:w-[24rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] w-full max-sm:justify-between">
                  {isEditing ? (
                    <Input
                      value={editValues.price}
                      onChange={(e) => this.handleInputChange('price', e.target.value)}
                      size="small"
                    />
                  ) : (
                    <div className="text-xs font-poppins text-center">{item.price}</div>
                  )}
                </div>

                {/* Edit, Save, and Cancel Buttons */}
                <div className="ml-4">
                  {isEditing ? (
                    <>
                      <Button
                        icon={<SaveOutlined />}
                        size="small"
                        type="primary"
                        onClick={this.handleSave}
                        style={{ marginRight: 8 }}
                      />
                      <Button
                        icon={<CloseOutlined />}
                        size="small"
                        onClick={this.handleCancel}
                      />
                    </>
                  ) : (
                    <Button
                      icon={<EditOutlined />}
                      size="small"
                      onClick={() => this.handleEdit(item)}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}

          </OnlyWrapCard>
        </div>
        {/* <UpdateShipperCostModal
          handleUpdateShipperCostModal={
            this.props.handleUpdateShipperCostModal
          }
          updateShipperContactModal={this.props.updateShipperCostModal}
        /> */}
        </>
    );
  }
}

const mapStateToProps = ({ shipper,auth, suppliers }) => ({
    contactShipper: suppliers.contactShipper,
    userId: auth.userDetails.userId,
    costShipperList:shipper.costShipperList,
    fetchingCosttShipperById: shipper.fetchingCostShipperById,

  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getCostShipperList,
        handleUpdateShipperCostModal,
        setEditShipperCost,
        updateCostShipper
      },
      dispatch
    );
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShipperCostTable);