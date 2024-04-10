import React,{useEffect,useState} from "react";
import TocIcon from '@mui/icons-material/Toc';
import { StyledSelect } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import {
    inputDataSearch, setSuppliersDashboardType, setSelectedTimeInterval,
    setTimeRange,getSupplierCount,getSupplierAllCount
} from "./SuppliersAction";
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { connect } from "react-redux";
import { Avatar, Input, Tooltip,Badge } from "antd";
import { FormattedMessage } from "react-intl";
import { AudioOutlined } from "@ant-design/icons"

const Option = StyledSelect.Option;

function SuppliersActionLeft (props) {
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
    const [pageNo, setPage] = useState(0);

    useEffect(() => {
        if (props.viewType === "card") {
          props.getSupplierCount(props.userId);
        } else if (props.viewType === "all") {
          props.getSupplierAllCount(props.orgId);
        } 
      }, [props.viewType, props.userId, props.orgId]);
    
        const {
            user,
            viewType,
            setSuppliersViewType,
        } = props;
const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
      useEffect(() => {
        // props.getCustomerRecords();
        if (transcript) {
          console.log(">>>>>>>", transcript);
          setCurrentData(transcript);
        }
        }, [ transcript]);
        const handleChange = (e) => {
            setCurrentData(e.target.value);
        
            if (searchOnEnter&&e.target.value.trim() === "") {  //Code for Search
              setPage(pageNo + 1);
            //   props.getLeads(props.userId, pageNo, "creationdate");
            //   props.ClearReducerDataOfLead()
              setSearchOnEnter(false);
            }
          };
          const handleSearch = () => {
            if (currentData.trim() !== "") {
              // Perform the search
              props.inputDataSearch(currentData);
              setSearchOnEnter(true);  //Code for Search
            } else {
              console.error("Input is empty. Please provide a value.");
            }
          };
          const suffix = (
            <AudioOutlined
              onClick={SpeechRecognition.startListening}
              style={{
                fontSize: 16,
                color: '#1890ff',
              }}
        
            />
          );

        return (
            <div class="flex items-center">

                <Tooltip
                    title={<FormattedMessage id="app.cardview" defaultMessage="Card View" />}>
<Badge
          size="small"
          count={(props.viewType === "card" && props.countSupplier.supplierCount) || 0}
          overflowCount={999}
        >
                    <span class=" md:mr-2 text-sm cursor-pointer"
                        onClick={() => setSuppliersViewType("card")}
                        style={{
                            color: viewType === "card" && "#1890ff",
                        }}
                    >

                        <Avatar style={{ background: viewType === "card" ? "#f279ab" : "#4bc076" }}>
                            <TocIcon className="text-white" /></Avatar>

                    </span></Badge>
                </Tooltip>

                <Tooltip title="ALL Suppliers">
                <Badge
          size="small"
          count={(props.viewType === "all" && props.allCountSupplier.AllSupplierCount) || 0}
          overflowCount={999}
        >
                    <span class=" md:mr-2 text-sm cursor-pointer"
                        onClick={() => setSuppliersViewType("all")}
                        style={{
                            color: viewType === "all" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
                            <div className="text-white">ALL</div></Avatar>

                    </span>
                    </Badge>
                </Tooltip>

                &nbsp;&nbsp;
                <div class=" ml-6 h-6 w-60">
                <Input
          placeholder="Search by Name or Sector"
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />
                  

                </div>

            </div>
        );
}

const mapStateToProps = ({ auth, suppliers }) => ({
    user: auth.userDetails,
    dateRangeList: suppliers.dateRangeList,
    startDate: suppliers.startDate,
    endDate: suppliers.endDate,
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    countSupplier:suppliers.countSupplier,
    allCountSupplier:suppliers.allCountSupplier
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            inputDataSearch,
            setSuppliersDashboardType,
            setSelectedTimeInterval,
            setTimeRange,
            getSupplierCount,
            getSupplierAllCount
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliersActionLeft);
