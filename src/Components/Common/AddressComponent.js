import React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditAddressField from "../Forms/Edit/EditAddressField";
import AddAddressField from "../Forms/Edit/AddAddressField";
export default class AddressComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isAdd: false,
    };
  }
  toggleEdit = () =>
    this.setState({
      isEditing: !this.state.isEditing,
      isAdd: false,
    });
  toggleAdd = () =>
    this.setState({
      isAdd: !this.state.isAdd,
      isEditing: false,
    });
  render() {
    const { editable, addAddress, components, ...rest } = this.props;
    console.log(components);
    return (
      <>
        <div style={{ width: "100%", height: "100%" }}>
          {editable && (
           <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
              <BorderColorIcon
                tooltipTitle="Edit"
                iconType="edit"
                handleIconClick={this.toggleEdit} 
                className=" !text-red-600 cursor-pointer !text-icon "
              />
              &nbsp;
              {addAddress && (
                <BorderColorIcon
                  tooltipTitle="Add Address"
                  iconType="environment"
                  handleIconClick={this.toggleAdd}
                     className=" !text-red-600 cursor-pointer !text-icon "
                />
              )}
            </div>
          )}
          {this.state.isEditing ? (
           <div class=" flex flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto flex-col">
              <EditAddressField
                components={components}
                toggleEdit={this.toggleEdit}
                {...rest}
              />
            </div>
          ) : this.state.isAdd ? (
            <div class=" flex flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto flex-col">
              <AddAddressField
                components={components}
                toggleAdd={this.toggleAdd}
                {...rest}
              />
            </div>
          ) : (
                <StaticAddressField components={components} />
              )}  
        </div>
      </>
    );
  }
}
/**
 * sho static address with label and value
 */
function StaticAddressField({
  components: {
    address1,
    address2,
    street,
    town,
    city,
    state,
    country,
    postalCode,
    latitude,
    longitude,
    Won,
    Lost,
    actualFunnel,
  },
}) {
  return (
    <div>
      <div style={{ fontSize: 12 }}>     
        <div>
          {(address1 && address1) || ""}&nbsp;
          {(address2 && address2) || ""}&nbsp;
          {(street && street) || ""}
          <div>
            {(!city && town && town) || ""}&nbsp;
            {(city && city) || ""}
            {(state && state) || ""}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          {(country && country) || ""}&nbsp;
          {(postalCode && postalCode) || ""}&nbsp;
        </div>
      </div>

      {/* {/ {postalCode && postalCode || '' } /} */}
      {actualFunnel && (
        <div class=" flex flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto flex-col">
          <div 
            style={{
              flexBasis: "40%",
              fontWeight: 400,
              margin: 0,
              color: "#444",
            }}
          >
            Win/Loss{" "}
          </div >{" "}
          <div  style={{ margin: "0.3rem" }}>
            {" "}
            {actualFunnel && actualFunnel.toFixed(2)}
          </div >
        </div>
      )}
    </div>
  );
}
