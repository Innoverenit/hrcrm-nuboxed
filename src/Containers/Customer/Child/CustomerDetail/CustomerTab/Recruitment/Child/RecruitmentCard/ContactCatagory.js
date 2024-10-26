import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip, Icon } from "antd";
import axios from "axios";
// import {
//   getCatagoryByContactId,
//   // addCatagoryByContactId,
//   // deleteCategoryByContactId,
// } from "../../../../../../../Contact/ContactAction";
class ContactCatagory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: "",
    };
  }

  showInput = () =>
    this.setState({ inputVisible: true }, () => this.input.focus());

  handleInputChange = (e) => this.setState({ inputValue: e.target.value });

  // handleInputConfirm = () => {
  //   const { inputValue } = this.state;
  //   const {
  //     contact: { contactId },
  //     catagoryByContactId,
  //     addCatagoryByContactId,
  //   } = this.props;
  //   if (inputValue) {
  //     addCatagoryByContactId({
  //       category: inputValue,
  //       contactId: contactId,
  //     });
  //   }
  //   this.setState({
  //     inputVisible: false,
  //     inputValue: "",
  //   });
  // };
  // handleTopicDelete = ({ categoryId, contactId }) => {
  //   const { deleteCategoryByContactId } = this.props;
  //   deleteCategoryByContactId(categoryId, contactId);
  // };

  saveInputRef = (input) => (this.input = input);

  // componentDidMount = () => {
  //   this.props.getCatagoryByContactId(this.props.contact.contactId);
  // };

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const {
      fetchingCatagoryByContactId,
      fetchingCatagoryByContactIdError,
      catagoryByContactId,
    } = this.props;
    console.log(catagoryByContactId.length);
    if (fetchingCatagoryByContactId) {
      return <p>fetching categories ...</p>;
    }
    if (fetchingCatagoryByContactIdError) {
      return <p>error fetching categories ...</p>;
    }
    return (
      <div style={{ height: 50 }}>
        {catagoryByContactId &&
          catagoryByContactId.map((category, index) => {
            console.log(category);
            const isLongTopic = category.category.length >= 20;
            const categoryElem = (
              <Tag
                key={category.categoryId}
                color="blue"
                // closable
                // onClose={() => this.handleTopicDelete(category)}
                style={{ marginBottom: "0.4rem" }}
              >
                {isLongTopic
                  ? `${category.category.slice(0, 20)}...`
                  : category.category}
              </Tag>
            );
            return isLongTopic ? (
              <Tooltip title={category.category} key={category.categoryId}>
                {categoryElem}
              </Tooltip>
            ) : (
              categoryElem
            );
          })}
        {/* {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            // onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )} */}
        {/* {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: "#fff", borderStyle: "dashed" }}
            // disabled={this.props.catagoryByContactId.length === 5}
            visible={catagoryByContactId.length !== 5}
            // disabled={false}
          >
            <Icon /> category
          </Tag>
        )} */}
      </div>
    );
  }
}

const mapStateToProps = ({ contact }) => ({
  // fetchingCatagoryByContactId: contact.fetchingCatagoryByContactId,
  // fetchingCatagoryByContactIdError: contact.fetchingCatagoryByContactIdError,
  // catagoryByContactId: contact.catagoryByContactId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCatagoryByContactId,
      // addCatagoryByContactId,
      // deleteCategoryByContactId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactCatagory);
