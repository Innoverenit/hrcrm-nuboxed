import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Autocomplete, TextField } from '@mui/material';

import { createMachinaryCell, getLocationMachine, getUserMachineCard } from "../../Child/Location/LocationAction";

const UserCellMachineCrd = (props) => {
  const [selectedMachines, setSelectedMachines] = useState([]);

  const handleChangeMachine = (event, newValue) => {
    setSelectedMachines(newValue);
  };

  useEffect(() => {
    props.getLocationMachine();
    props.getUserMachineCard(props.currentItems.user);
  }, [props.currentItems.user]);

  useEffect(() => {
    const preSelectedUsers = props.userMachineCard.map(user => ({
      machinaryId: user.machinaryId,
      name: user.name
    }));
    setSelectedMachines(preSelectedUsers);
  }, [props.userMachineCard]);

  const handleSaveMachine = () => {
    let data = {
      equipmentIds: selectedMachines.map(machine => machine.machinaryId),
      user: props.currentItems.user,
    };
    props.createMachinaryCell(data);
    console.log("Selected Machines: ", data.equipmentIds); // Log selected machines as array of values
  };

  return (
    <>
      <div className="flex">
        <div className="ml-2">
          {/* <div className="block">Machine</div> */}
          <Autocomplete
            multiple
            options={props.locationMachine}
            getOptionLabel={(option) => option.name}
            value={selectedMachines}
            onChange={handleChangeMachine}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Machine"
                placeholder="Select Machine"
              />
            )}
            style={{ width: 548 }}
          />
        </div>
        <div style={{ marginTop: "18px", marginLeft: "21px" }}>
          <Button
            type="primary"
            onClick={handleSaveMachine}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className='flex justify-end sticky z-auto'>
        <div className="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className="flex w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=""></div>
            <div className="md:w-[22.12rem]">
          Equipment
            </div>
          </div>
          {props.userMachineCard.map((item, index) => (
            <div key={index}>
              <div className="flex rounded-xl mt-2 bg-white h-12 items-center p-3">
                <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
                  <div className="flex justify-between text-sm font-semibold font-poppins">
                    {item.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth, location }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  userMachineCard: location.userMachineCard,
  locationMachine: location.locationMachine,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createMachinaryCell,
      getUserMachineCard,
      getLocationMachine
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCellMachineCrd);
