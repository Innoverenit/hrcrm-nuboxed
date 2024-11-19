import React,{useState} from "react";
import TocIcon from '@mui/icons-material/Toc';
import { StyledSelect } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { connect } from "react-redux";
import { Avatar,  Tooltip } from "antd";


const Option = StyledSelect.Option;

function VendorActionLeft (props) {
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
    const [pageNo, setPage] = useState(0);

    // useEffect(() => {
    //     if (props.viewType === "card") {
    //       props.getSupplierCount(props.userId);
    //     } else if (props.viewType === "all") {
    //       props.getSupplierAllCount(props.orgId);
    //     } 
    //   }, [props.viewType, props.userId, props.orgId]);
    
        const {
            user,
            viewType,
            setVendorViewType,
        } = props;
// const {
//         transcript,
//         listening,
//         resetTranscript,
//         browserSupportsSpeechRecognition
//       } = useSpeechRecognition();
//       useEffect(() => {
//         // props.getCustomerRecords();
//         if (transcript) {
//           console.log(">>>>>>>", transcript);
//           setCurrentData(transcript);
//         }
//         }, [ transcript]);
//         const handleChange = (e) => {
//             setCurrentData(e.target.value);
        
//             if (searchOnEnter&&e.target.value.trim() === "") {  //Code for Search
//               setPage(pageNo + 1);
//             //   props.getLeads(props.userId, pageNo, "creationdate");
//             //   props.ClearReducerDataOfLead()
//               setSearchOnEnter(false);
//             }
//           };
//           const handleSearch = () => {
//             if (currentData.trim() !== "") {
//               // Perform the search
//               props.inputDataSearch(currentData);
//               setSearchOnEnter(true);  //Code for Search
//             } else {
//               console.error("Input is empty. Please provide a value.");
//             }
//           };
//           const suffix = (
//             <MicIcon
//               onClick={SpeechRecognition.startListening}
//               style={{
//                 fontSize: 16,
//                 color: '#1890ff',
//               }}
        
//             />
//           );

        return (
            <div class="flex items-center">

                <Tooltip
                    title="Card View">
{/* <Badge
          size="small"
          count={(props.viewType === "card" && props.countSupplier.supplierCount) || 0}
          overflowCount={999}
        > */}
                    <span class=" mr-2 text-sm cursor-pointer"
                        onClick={() => setVendorViewType("card")}
                        style={{
                            color: viewType === "card" && "#1890ff",
                        }}
                    >

                        <Avatar style={{ background: viewType === "card" ? "#f279ab" : "#28a355" }}>
                            <TocIcon className="text-white" /></Avatar>

                    </span>
                    {/* </Badge> */}
                </Tooltip>

                <Tooltip title="ALL vendor">
                {/* <Badge
          size="small"
          count={(props.viewType === "all" && props.allCountSupplier.AllSupplierCount) || 0}
          overflowCount={999}
        > */}
                    <span class=" mr-2 text-sm cursor-pointer"
                        onClick={() => setVendorViewType("all")}
                        style={{
                            color: viewType === "all" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#28a355" }}>
                            <div className="text-white">ALL</div></Avatar>

                    </span>
                    {/* </Badge> */}
                </Tooltip>
                <Tooltip title="Deleted List">
                {/* <Badge
          size="small"
          count={(props.viewType === "all" && props.allCountSupplier.AllSupplierCount) || 0}
          overflowCount={999}
        > */}
                    <span class=" mr-2 text-sm cursor-pointer"
                        onClick={() => setVendorViewType("delete")}
                        style={{
                            color: viewType === "delete" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: viewType === "delete" ? "#f279ab" : "#28a355" }}>
                        <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  /></Avatar>

                    </span>
                    {/* </Badge> */}
                </Tooltip>

                &nbsp;&nbsp;
                {/* <div class=" ml-6 h-6 w-60 max-sm:w-[11rem]">
                <Input
          placeholder="Search by Name or Sector"
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />
                  

                </div> */}

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
            // inputDataSearch,
            // setSuppliersDashboardType,
            // setSelectedTimeInterval,
            // setTimeRange,
            // getSupplierCount,
            // getSupplierAllCount
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(VendorActionLeft);
