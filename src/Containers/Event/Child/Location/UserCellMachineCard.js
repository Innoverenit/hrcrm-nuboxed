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
        <div className=" mt-4 ml-5" >
          <Button
            type="primary"
            onClick={handleSaveMachine}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className='flex sticky z-auto'>
        <div className="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className="flex w-[100%] p-1 bg-transparent font-bold sticky  z-10">
            <div className=""></div>
            <div className="w-[22.12rem]">
          Equipment
            </div>
          </div>
          {props.userMachineCard.map((item, index) => (
            <div key={index}>
              <div className="flex rounded mt-1 bg-white h-8 items-center p-1">
                <div className="flex w-[36.1rem] max-sm:w-full">
                  <div className="flex justify-between text-xs font-semibold font-poppins">
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
