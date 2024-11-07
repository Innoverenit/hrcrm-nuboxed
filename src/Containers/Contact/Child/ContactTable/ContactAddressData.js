import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SaveIcon from '@mui/icons-material/Save';
import { Button } from "antd";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Switch, Popconfirm } from "antd";
import {
  getContactAddressData,
  addContactAddress,
  // updateContactAddress,
  addContactMand,
} from "../../ContactAction";

const AddressTable = (props) => {
  const [activeSwitchIndex, setActiveSwitchIndex] = useState(null);
  const [addresses, setAddresses] = useState(props.contactAddress);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    props.getContactAddressData(props.item.contactId, "Contact");
  }, []);

  useEffect(() => {
    if (props.contactAddress.length > 0) {
      setAddresses(props.contactAddress);
    }
  }, [props.contactAddress]);

  const handleSave = async (index) => {
    try {
      const results = await geocodeByAddress(currentAddress);
      const latLng = await getLatLng(results[0]);
      const [street, city, state, country, postalCode] = currentAddress.split(
        ", "
      );
      const updatedAddresses = [...addresses];
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        street: street,
        city: city,
        postalCode: postalCode,
        state: state,
        country: country,
        longitude: latLng.lng,
        latitude: latLng.lat,
      };

      if (updatedAddresses[index].addressId) {
        console.log(updatedAddresses[index])
        // Call update API if addressId is present
        // props.updateContactAddress(
        //   updatedAddresses[index],
        //   "Contact",
        //   props.item.contactId
        // );
      } else {
        // Call add API if addressId is empty (new address)
        props.addContactAddress(
          updatedAddresses[index],
          "Contact",
          props.item.contactId
        );
      }

      setAddresses(updatedAddresses);
      setEditingIndex(null);
      setCurrentAddress(""); // Reset currentAddress after saving
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleAddRow = () => {
    const newAddress = {
      addressId: "",
      addressType: null,
      address1: "",
      address2: "",
      town: null,
      street: "",
      city: "",
      postalCode: "",
      state: "",
      country: "",
      longitude: "",
      latitude: "",
      creatorId: null,
      employeeId: null,
      contactPersonId: null,
      countryCode: null,
      houseNo: null,
      country_alpha2_code: null,
      country_alpha3_code: null,
      xlAddress: null,
      primaryInd: false,
    };
    setAddresses([...addresses, newAddress]);
    setEditingIndex(addresses.length); // Start editing the newly added row
    setCurrentAddress(""); // Reset currentAddress when adding a new row
  };

  const handleChange = (address) => {
    setCurrentAddress(address);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setCurrentAddress(
      `${addresses[index].street}, ${addresses[index].city}, ${addresses[index].state}, ${addresses[index].country}, ${addresses[index].postalCode}`
    );
  };

  const handleSwitchChange = (index, checked, item) => {
    if (checked) {
      setActiveSwitchIndex(index); // Set the index of the active switch
      const updatedAddresses = addresses.map((address, idx) => ({
        ...address,
        primaryInd: idx === index,
      }));
      setAddresses(updatedAddresses);
    } else {
      setActiveSwitchIndex(null); // Clear the active switch index
      const updatedAddresses = addresses.map((address) => ({
        ...address,
        primaryInd: false,
      }));
      setAddresses(updatedAddresses);
    }
    props.addContactMand(item.addressId, checked);
    console.log(checked);
  };

  return (
    <div className="address-table">
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Switch</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((item, index) => (
            <tr key={item.addressId || index}>
              <td>
                {editingIndex === index ? (
                  <PlacesAutocomplete
                    value={currentAddress}
                    onChange={handleChange}
                    onSelect={handleChange}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <input
                          {...getInputProps({
                            placeholder: "Search Address...",
                            className: "location-search-input",
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion) => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                            const style = suggestion.active
                              ? {
                                  backgroundColor: "#fafafa",
                                  cursor: "pointer",
                                }
                              : {
                                  backgroundColor: "#ffffff",
                                  cursor: "pointer",
                                };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                ) : (
                  <>
                    {item.street}, {item.city}, {item.state}, {item.country},{" "}
                    {item.postalCode}
                  </>
                )}
              </td>
              <td>
                <Popconfirm
                  title="Are you sure you want to switch?"
                  onConfirm={() => handleSwitchChange(index, !item.primaryInd, item)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Switch
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    checked={item.primaryInd}
                    disabled={
                      activeSwitchIndex !== null && activeSwitchIndex !== index
                    }
                  />
                </Popconfirm>
              </td>
              <td>
                {editingIndex === index ? (
                  <>
                    <SaveIcon onClick={() => handleSave(index)} />
                    <Button onClick={() => setEditingIndex(null)}>Cancel</Button>
                  </>
                ) : (
                  <BorderColorIcon onClick={() => handleEdit(index)} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={handleAddRow}>Add Row</Button>
    </div>
  );
};

const mapStateToProps = ({ sector, auth, contact }) => ({
  contactAddress: contact.contactAddress,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactAddressData,
      addContactAddress,
      // updateContactAddress,
      addContactMand,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddressTable);

