import React, {  useEffect,lazy,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm,Input } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput, } from "../../../Components/UI/Elements";
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
if (props.fetchingItemTask) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-between">
    <div class=" flex w-[18vw]" style={{marginTop:"12px"}} >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div>
            <div className="add-region">
              {addingRegion ? (
                  <div>
                      <input 
                      style={{border:"2px solid black"}}
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
          {events.length ? (
  events
    .slice() 
    .sort((a, b) => a.eventType.localeCompare(b.eventType)) 
    .map((region, i) => (
            <div className="card9" key={region.eventTypeId}>
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
                <div className="region">{region.eventType}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div className="actions">
                {/* Edit button */}
                {editingId === region.eventTypeId ? (
                    <div>
                        <button onClick={() => handleUpdateEvent(region)}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   style={{fontSize:"1rem"}} onClick={() => editRegion(region.eventTypeId, region.eventType)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeEvents(region.eventTypeId)}
                      >
                <DeleteOutlined 
                  style={{
                  
                    color: "red",
                  }}
              // onClick={() => 
              //     props.removeServiceLine(item.eventTypeId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
        ))
        ) : (
            <p>No Data Available</p>
          )}
  <div class=" font-bold">Updated on {dayjs(props.events && props.events.length && props.events[0].updationDate).format('YYYY-MM-DD')} by {props.events && props.events.length && props.events[0].name}</div>
      </div>
  );
};

const mapStateToProps = ({ events,auth }) => ({
  addingEvents: events.addingEvents,
  addingEventsError: events.addingEventsError,
  events: events.events,
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
