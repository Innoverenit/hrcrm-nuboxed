import React, { useEffect, useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip, Avatar } from "antd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component";
import { OnlyWrapCard } from '../../../Components/UI/Layout'

import { MultiAvatar2 } from "../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";

function ProcurementCiCard(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
  }, []);




//   const handleLoadMore = () => {
//     const callPageMapd = props.callListRangeByUserId && props.callListRangeByUserId.length &&props.callListRangeByUserId[0].pageCount
//     setTimeout(() => {
//       const {
//         getCallListRangeByUserId,
//         userDetails: { employeeId },
//       } = props;
//       if  (props.callListRangeByUserId)
//       {
//         if (page < callPageMapd) {
//           setPage(page + 1);
//         getCallListRangeByUserId(employeeId, page);
//         props.getEmployeelist();
//       }
//       if (page === callPageMapd){
//         setHasMore(false)
//       }
//     }
//     }, 100);
//   };

//   function handleSetCallNameId(item) {
//     setCurrentNameId(item);
//   }


  const {

  } = props;


  return (
    <>
       <div className=' flex justify-end sticky top-28 z-auto'>
       <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
       <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
       <div className=" md:w-[8.1rem]">CI #</div>
        <div className=" md:w-[6.1rem]">Created</div>
        <div className="w-12"></div>
      </div>
      {/* <InfiniteScroll
        dataLength={callListRangeByUserId.length}
        next={handleLoadMore}
      hasMore={hasMore}
        loader={fetchingCallListRangeByUserId?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
        endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
      
          {callListRangeByUserId.map((item) => {
             return (
              <div>
            <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
           >
              <div class="flex">
              <div class="flex  flex-col md:w-[8.23rem] max-sm:flex-row max-sm:justify-between w-full">
            <div> {item.callType}</div>
            </div>
            <div class="flex  flex-col md:w-[6.23rem] max-sm:flex-row max-sm:justify-between w-full">
            <p> {item.callPurpose}</p>
              </div>
              </div>
              <div class="flex md:w-[21rem]">
              <div class="flex  flex-col md:w-[5.12rem] max-sm:flex-row max-sm:justify-between w-full">
      
              <MultiAvatar2
                    primaryTitle={item.contactName}
                    imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
              
   
              </div>
              <div class="flex  flex-col md:w-[14.35rem] max-sm:flex-row max-sm:justify-between w-full">
              <p> {moment(item.startDate).format("llll")}</p>
              </div>
        
              </div>
              
              <div class="flex items-center md:w-[30rem]">

       
              <div class="flex flex-col w-[6%] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                    <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  handleCallNotesDrawerModal(true);
                  handleSetCallNameId(item);
                }}
                style={{ color: "green", cursor: "pointer", fontSize: "1rem" }}
              />
           </Tooltip>
                    </div>
                    <div>
                    <DeleteIcon  type="delete" style={{ cursor: "pointer",color:"red",fontSize:"1rem" }} 
                onClick={() => deleteCall(item.callId, employeeId)}
              />
                    </div>
                  </div>
              </div>
            </div>
            </div>
           )
          })}
   
      </InfiniteScroll> */}
      </OnlyWrapCard>
      </div>
    </>
  );
}
const mapStateToProps = ({ auth, call, employee }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
    },
    dispatch
  );

  export default connect(mapStateToProps, mapDispatchToProps)(ProcurementCiCard);

function NoDataComponent(props) {
  const { description, onClick, buttonText } = props;
  return (
    <div>
      <div class=" flex justify-center items-center flex-col">
        <p>{description || "We couldn't find relevant data"}</p>
      </div>
    </div>
  );
}




