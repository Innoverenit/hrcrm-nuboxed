import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import FinaceRapairDrawerCard from "./FinaceRapairDrawerCard";

function FinaceRapairDrawer({ isModalOpen,modalData,title, setIsModalOpen, type, userId, startDate, endDate, 
  ordersData, hasMore,setHasMore,buttonName }) {
  
 

  return (
    <StyledDrawer
      // title={`${type.charAt(0).toUpperCase() + type.slice(1)} Orders`}
      title={`Orders - ${title}`}
     visible={isModalOpen}
      onClose={setIsModalOpen}
      width="55em"
      closable
      placement="right"
      destroyOnClose
      maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
      
    >
      <FinaceRapairDrawerCard
        type={type}
        userId={userId}
        modalData={modalData}
        hasMore={hasMore}
        setHasMore={setHasMore}
        buttonName={buttonName}
             />
    </StyledDrawer>
  );
}

const mapStateToProps = (state) => ({
  userId: state.auth.userDetails.userId,
  startDate: state.dashboard.startDate,
  endDate: state.dashboard.endDate,
  // Add more state mappings if needed
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  // Define any actions needed for this component
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FinaceRapairDrawer);
