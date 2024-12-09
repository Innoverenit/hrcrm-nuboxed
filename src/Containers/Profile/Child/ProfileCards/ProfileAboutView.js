import React, { Component } from "react";
class ProfileAboutView extends Component {
  render() {
    const {
      user: {
        currency,
        designation,
        department,

        label,
        metaData,
      },
      toggleViewType,
    } = this.props;
    console.log("***************", this.props);
    return (
      <>
        <div class=" flex justify-end" >
       
        </div>
        <ProfileItemRow label="Currency" value={currency} />
        <ProfileItemRow label="Designation" value={designation} />
        <ProfileItemRow label="Function" value={department} />
        <ProfileItemRow label="Level" value={label} />
        <ProfileItemRow
          label="Manager"
        />
      </>
    );
  }
}

export default ProfileAboutView;

const ProfileItemRow = ({ label, value }) => {
  return (
    <div  class=" flex items-center flex-no-wrap m-2"
    >
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk">{label}</div>
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk -ml-1" >{value}</div>
    </div>
  );
};
