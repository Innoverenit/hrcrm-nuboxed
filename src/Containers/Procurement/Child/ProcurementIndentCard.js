import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";



function ProcurementIndentCard(props) {

    useEffect(() => {
       
    }, [])
   


    return (
        <>
           
           <div className=' flex justify-end sticky top-28 z-auto'>
           <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
       <div className=" flex justify-between w-[100%]  p-2 bg-transparent font-bold sticky top-0 z-10">
       <div className=" md:w-[8.1rem]">Indent #</div>
        <div className=" md:w-[6.1rem]">Services</div>
        <div className=" md:w-[4.2rem] ">Supply</div>
        <div className="md:w-[5.8rem]">Installation</div>
        <div className="md:w-[8.5rem]">Created By</div>
        <div className="md:w-[8.5rem]">Send for approval</div>
        <div className="md:w-[8.5rem]">Approved By</div>
        <div className="w-12"></div>
      </div>
      {/* <InfiniteScroll
        dataLength={callListRangeByUserId.length}
        next={handleLoadMore}
      hasMore={hasMore}
        loader={fetchingCallListRangeByUserId?<div class="text-center">Loading...</div>:null}
        height={"75vh"}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
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
              <p> {dayjs(item.startDate).format("llll")}</p>
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
      </div>
      </div>

                   
    
            
        </>
    );
}





const mapStateToProps = ({ order, service, auth, user }) => ({

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProcurementIndentCard);

