import React, {  useEffect,lazy,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../Config/Auth";
import { Tooltip } from "antd";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm,Input } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from "dayjs";
import {
  getEvents,
  getEventCount,
  addEvents,
   removeEvents,
  updateEvents,
  searchEventName,
  ClearReducerDataOfEvent
} from "./EventAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../Components/UI/Layout";

const Event = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [events, setEvents] = useState(props.events);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newEventName, setEventName] = useState('');
  useEffect(() => {
      props.getEvents(); 
      props.getEventCount(props.orgId) 
  }, [])

  const editRegion = (eventTypeId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(eventTypeId);
      setEventName(name);
  };



  const handleAddEvent = () => {
      setAddingRegion(true);
      setEventName("")
  };

  const handleUpdateEvent=(region)=>{
      console.log(region)
      let data={
        eventTypeId:region.eventTypeId,
        eventType:newEventName
       
      }
props.updateEvents(data,region.eventTypeId)
setEditingId(null);
  }

  const handleEvent = () => {
      // if (newRegionName.trim() !== '') {
      //     console.log("New Region:", newRegionName);
      //     const newRegion = {
      //         id: Date.now(),
      //         item: newRegionName
      //     };
      //     setRegions([...regions, newRegion]);
      //     setNewRegionName('');
      //     setAddingRegion(false);
      // }
      let data={
        eventType:newEventName,
        orgId:props.orgId,
      }
      props.addEvents(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getEvents();
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchEventName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setEventName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.events.length > 0) {
        
        setEvents(props.events);
      }
    }, [props.events]);

// console.log(regions)
if (props.fetchingEvents) {
return <div><BundleLoader/></div>;
}
const {
  userId,
  user,
 
} = props;
  return (
 
      <div>
    <div class=" flex flex-row justify-end">
    <div class=" flex w-[18vw] mt-7px mr-2" >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div>
          <div class="w-[2rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"eventType"}`}>
    <div className="circle-icon !text-base cursor-pointer text-[green]">
      <Tooltip placement="top" title="Download XL">
        <DownloadIcon />
      </Tooltip>
    </div>
  </a>
</div>
            <div className="add-region">
              {addingRegion ? (
                  <div>
                      <input 
                      style={{border:"2px solid black",width:"54%"}}
                          type="text" 
                          placeholder="Events"
                          value={newEventName} 
                          onChange={(e) => setEventName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingItemTask}
                      onClick={handleEvent}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddEvent}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[65vh] !mt-2" >
          {!props.fetchingEvents && events.length === 0 ? <NodataFoundPage /> : events.slice().sort((a, b) => a.eventType.localeCompare(b.eventType)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold   border-[#0000001f]  border  shadow-[#a3abb980] bg-white text-[#444] mt-1  p-2 justify-between items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.eventTypeId}>
            {/* Region name display or input field */}
            
            {editingId === region.eventTypeId ? (
                <input
                style={{border:"2px solid black"}}
                    type="text"
                    placeholder="Events"
                    value={newEventName}
                    onChange={(e) => setEventName(e.target.value)}
                />
            ) : (
                <div >{region.eventType}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div className="flex items-center">
                {/* Edit button */}
                {editingId === region.eventTypeId ? (
                    <div>
                        <button onClick={() => handleUpdateEvent(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon    className=" !text-icon text-red-600 cursor-pointer " onClick={() => editRegion(region.eventTypeId, region.eventType)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeEvents(region.eventTypeId,props.orgId)}
                      >
              <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                 </Popconfirm>
            </div>
        </div>
      ))}
      </MainWrapper>
            </div>
  <div class=" font-bold">Updated on {dayjs(props.events && props.events.length && props.events[0].updationDate).format('YYYY-MM-DD')} by {props.events && props.events.length && props.events[0].name}</div>
      </div>
  );
};

const mapStateToProps = ({ events,auth }) => ({
  addingEvents: events.addingEvents,
  addingEventsError: events.addingEventsError,
  events: events.events,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  // removingEvents: event.removingEvents,
  // removingEventsError: event.removingEventsError,
     updatingEvents: events.updatingEvents,
     updatingEventsError: events.updatingEventsError,
  fetchingEvents: events.fetchingEvents,
  eventCount:events.eventCount,
  fetchingEventsError: events.fetchingEventsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEvents,
      getEventCount,
      addEvents,
       removeEvents,
       updateEvents,
       ClearReducerDataOfEvent,
       searchEventName,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Event);
