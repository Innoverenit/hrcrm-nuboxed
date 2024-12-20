import React, { useState, useEffect,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { base_url2 } from "../../../../Config/Auth";
import { getCountries } from "../../../Auth/AuthAction";
import { getAllVat } from "../../SettingsAction"
import { Button, Input, Select, message } from "antd";
const { Option } = Select;

function VatTable(props) {
  const [editingItemId, setEditingItemId] = useState(null); // Track the item being edited
  const [editedData, setEditedData] = useState({ country: "", value: "" }); // Hold the edited country and value

  useEffect(() => {
    props.getAllVat();
    props.getCountries();
  }, []);

  // Handle entering edit mode
  function handleEdit(item) {
    setEditingItemId(item.id); // Set the item to edit
    setEditedData({ country: item.country, value: item.value }); // Pre-fill fields with current data
  }

  // Handle canceling the edit
  function handleCancel() {
    setEditingItemId(null); // Exit editing mode
    setEditedData({ country: "", value: "" }); // Reset the edited data
  }

  // Handle updating VAT with Authorization Header
  async function handleUpdateVat(id) {
    try {
      const token = sessionStorage.getItem("token") || ""; // Get token from sessionStorage

      await axios.put(
        `${base_url2}/vat/${id}`,
        {
          country: editedData.country, // Send the selected country
          value: editedData.value,
        },
        {
          headers: {
            Authorization: "Bearer " + token, // Set the Authorization header
          },
        }
      );

      message.success("VAT updated successfully!");
      setEditingItemId(null); // Exit editing mode
      props.getAllVat(); // Fetch the latest VAT list after the update
    } catch (error) {
      console.error("Error updating VAT", error);
      message.error("Failed to update VAT.");
    }
  }

  // Handle key press to save changes (when Enter is pressed)
  function handleKeyPress(e, id) {
    if (e.key === "Enter") {
      handleUpdateVat(id);
    }
  }

  // Handle country selection change
  function handleCountryChange(value) {
    setEditedData({ ...editedData, country: value });
  }

  return (
    <>
      <div>
        <div className="flex justify-end sticky flex-col z-auto">
          <div className="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
            <div className="flex rounded max-sm:hidden w-[99%] mt-1 p-1 bg-transparent font-bold sticky top-0 z-10">
              <div className="w-[33rem] md:w-[33rem]">
               Name
              </div>
              <div className="w-[4.5rem] md:w-[4.5rem]">Value %</div>
            </div>

            {props.allVat.map((item) => {
              return (
                <div key={item.id}>
                  <div className="flex items-center justify-between p-2 bg-white shadow-md rounded mb-2">
                    {editingItemId === item.id ? (
                      <>
                      <div className="flex flex-col mb-4 w-full max-w-[15rem]"> 
                        <label className="font-semibold mb-2">Country</label> 
                        <Select
                          value={editedData.country}
                          onChange={handleCountryChange}
                          className="w-full overflow-hidden whitespace-nowrap text-ellipsis border border-gray-300 rounded-md" // Tailwind styles for dropdown
                          dropdownStyle={{ maxWidth: '15rem' }} 
                        >
                          {props.countries.map((option) => (
                            <Option
                              key={option.country_id}
                              value={option.country_name}
                              className="overflow-hidden whitespace-nowrap text-ellipsis"
                            >
                              <div className="truncate" style={{ width: "15rem" }}>
                                {option.country_name}
                              </div>
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <div className="flex flex-col mb-4 w-full max-w-[15rem]"> 
                        <label className="font-semibold mb-2">Value</label> 
                        <Input
                          value={editedData.value}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              value: e.target.value,
                            })
                          }
                          onKeyPress={(e) => handleKeyPress(e, item.id)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    
                      {/* Action Buttons */}
                      <div className="flex gap-4 mt-6 justify-start">
                        <Button
                          onClick={() => handleUpdateVat(item.id)}
                          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={handleCancel}
                          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                    
                    
                    ) : (
                      <>
                        {/* Display current data */}
                        <div className="w-[10rem] ">{item.country}</div>
                        <div>{item.value}</div>
                        <Button onClick={() => handleEdit(item)}>Edit</Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  allVat: settings.allVat,
  countries: auth.countries,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllVat,
      getCountries,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(VatTable);
