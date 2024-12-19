import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getFunctions,
} from "../../../Containers/Settings/Function/FunctionAction";
import {  StyledCreatable1 } from "../../UI/Elements";
import { FlexContainer } from "../../UI/Layout";
import { get, uniqBy } from "lodash";
import {
  getContactListByUserId,
} from "../../../Containers/Contact/ContactAction";
import { getContactListByCustomerId, getAllCustomerListByUserId, getAllCustomerData } from "../../../Containers/Customer/CustomerAction";
import { getAllCandidateListByUserId, getFilteredEmailContact } from "../../../Containers/Candidate/CandidateAction";
import { getAllUsersByOrganizationId } from "../../../Containers/Call/CallAction";
import { getCountries } from "../../../Containers/Auth/AuthAction";
import { getAllShipper } from "../../../Containers/Main/Shipper/ShipperAction"
import { getTimeZone, getAllDialCodeList } from "../../../Containers/Auth/AuthAction";
import { getCurrency } from "../../../Containers/Auth/AuthAction";
import { getDocuments } from "../../../Containers/Settings/Documents/DocumentsAction";
import { getSectors } from "../../../Containers/Settings/Sectors/SectorsAction";
import { getCustomerListByUserId } from "../../../Containers/Customer/CustomerAction";
import { getEmployeelist } from "../../../Containers/Employees/EmployeeAction";
import { getPartnerListByUserId, getAllPartnerListByUserId } from "../../../Containers/Partner/PartnerAction";
import {
  getDesignations,
} from "../../../Containers/Settings/Designation/DesignationAction";
import { getAllOpportunityData } from "../../../Containers/Opportunity/OpportunityAction";
import { getTasks } from "../../../Containers/Settings/Task/TaskAction";
import { getExpenses } from "../../../Containers/Settings/Expense/ExpenseAction";
import { getEvents } from "../../../Containers/Settings/Event/EventAction";
import { getDepartments } from "../../../Containers/Settings/Department/DepartmentAction";
import { getEducations } from "../../../Containers/Settings/Educations/EducationAction";
import { getRoles } from "../../../Containers/Settings/Category/Role/RoleAction";
import { getSources } from "../../../Containers/Settings/Category/Source/SourceAction";
import { getDropDownRegions } from "../../../Containers/Settings/Category/Region/RegionAction";
class SearchSelect1 extends Component {
  componentDidMount() {
    const {
      opportunityId,
      userId,
      organizationId,
      customerId,
      selectType,
      getContactListByUserId,
      getAllPartnerListByUserId,
      getContactListByCustomerId,
      getAllCustomerListByUserId,
      getAllCustomerData,
      getAllCandidateListByUserId,
      getAccounts,
      getAllUsersByOrganizationId,
      getDeliveryUser,
      getOpportunities,
      getCountries,
      getCurrency,
      getSources,
      getDropDownRegions,
      getOnlySalesUser,
      getAllDialCodeList,
      getAllShipper,
      getProducts,
      getTimeZone,
      getProcess,
      getAllProcessStages,
      getProcessStages,
      handleUserModal,
      getDepartments,
      getDepartment,
      getLeadsAccounts,
      getFilteredEmailContact,
      getDocuments,
      getSectors,
      getRoles,
      getFunctions,
      getDesignations,
      getCustomerListByUserId,
      getPartnerListByUserId,
      getTasks,
      getExpenses,
      getEvents,
      getEducations,
      getAllOpportunityData,
    } = this.props;
    console.log(opportunityId);
    if (selectType === "contactList") {
      console.log("inside getContacts");
      getContactListByUserId(userId);
    }
    if (selectType === "contactListFilter") {
      console.log("inside getContacts");
      getContactListByUserId(userId);
    }
    if (selectType === "departmentListFilter") {
      //console.log("inside getContacts");
      getDepartments();
    }
    if (selectType === "contactOpportunityList") {
      console.log("inside getContacts");
      getContactListByCustomerId(customerId);
    }
    if (selectType === "candidateList") {
      getAllCandidateListByUserId(userId);
    }
    if (selectType === "name") {
      getAllCustomerListByUserId(userId);
    }
    if (selectType === "customerName") {
      getAllCustomerData(userId);
    }
    if (selectType === "allOppoName") {
      getAllOpportunityData(userId);
    }
    if (selectType === "contactsName") {
      getFilteredEmailContact(userId);
    }

    if (selectType === "department") {
      getDepartment();
    }
    if (selectType === "account") {
      getAccounts(userId);
    }
    if (selectType === "sectorName") {
      getSectors();
    }

    if (selectType === "roleType") {
      getRoles(organizationId);
    }

    if (selectType === "designationType") {
      getDesignations();
    }
    if (selectType === "educationType") {
      getEducations();
    }
    if (selectType === "leadsaccount") {
      getLeadsAccounts(userId);
    }
    if (selectType === "user") {
      getAllUsersByOrganizationId();
    }
    if (selectType === "salesuser") {
      getOnlySalesUser();
    }
    if (selectType === "opportunity") {
      getOpportunities(userId);
    }
    if (selectType === "process") {
      getProcess();
    }
    if (selectType === "stage") {
      console.log("inside stages");
      getAllProcessStages();
    }
    if (selectType === "sourceName") {
      getSources(organizationId);
    }
    if (selectType === "DRegion") {
      getDropDownRegions(organizationId);
    }
    if (selectType === "country") {
      getCountries();
    }
    if (selectType === "dialCode") {
      getAllDialCodeList();
    }
    if (selectType === "shipper") {
      getAllShipper(this.props.organizationId);
    }
    if (selectType === "currencyName") {
      getCurrency();
    }

    if (selectType === "product") {
      getProducts();
    }
    if (selectType === "timeZone") {
      getTimeZone();
    }
    if (selectType === "level") {
      // getLevels();
    }
    if (selectType === "deliveryUsers") {
      getDeliveryUser();
    }
    if (selectType === "documentTypeName") {
      getDocuments();
    }
    if (selectType === "customerList") {
      getCustomerListByUserId(userId);
    }
    if (selectType === "employee") {
      getEmployeelist(userId);
    }
    if (selectType === "partnerList") {
      getPartnerListByUserId(userId);
    }
    if (selectType === "partnerListName") {
      getAllPartnerListByUserId(userId);
    }

    if (selectType === "taskType") {
      getTasks();
    }

    if (selectType === "expenseType") {
      getExpenses();
    }

    if (selectType === "eventType") {
      getEvents();
    }
    if (selectType === "functionType") {
      getFunctions();
    }
    if (selectType === "departmentName") {
      getDepartments();
    }

  }
  handleChange = (
    option,
    field,
    setFieldValue,
    fillAnother,
    setFieldTouched
  ) => {
    this.props.changeCallback && this.props.changeCallback(option);
    if (this.props.selectType === "product") {
      console.log(fillAnother, option);
      console.log(setFieldValue);
      this.props.changeCallback(option);
      console.log(fillAnother[0], option.category);
      // setTimeout(() => {
      //     setFieldValue(fillAnother[0], option.category)
      //     setFieldValue(fillAnother[1], option.baseCost)
      //     setFieldValue(fillAnother[2], option.currency)
      //     setFieldValue(fillAnother[3], option.subCategory)
      // }, 1)
      // setFieldTouched(fillAnother[0], true)
    }
    if (this.props.isMulti) {
      const arr = [];
      option.map((item) => {
        arr.push(item.value);
      });
      setFieldValue(field.name, arr);
    } else {
      setFieldValue(field.name, option.value);
      if (Array.isArray(fillAnother)) {
        setFieldValue(fillAnother[0], option.latitude);
        setFieldValue(fillAnother[1], option.longitude);
      } else {
        setFieldValue(fillAnother, option.countryCurrencyCode);
      }
    }
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props.name, true);
  };
  handleCreate = (option) => {
    if (this.props.selectType === "user") {
      this.props.handleUserModal(true);
    }
    if (this.props.selectType === "contact") {
      this.props.handleContactModal(true);
    }
    if (this.props.selectType === "account") {
      this.props.handleAccountModal(true);
    }
    if (this.props.selectType === "opportunity") {
      this.props.handleOpportunityModal(true);
    }
  };

  setDefaultValue = (options) => {
    const { defaultValue } = this.props;
    if (defaultValue) {
      if (Array.isArray(defaultValue)) {
        console.log("array default value", defaultValue);
        return defaultValue;
      } else {
        console.log(defaultValue);
        if (!defaultValue.hasOwnProperty("label")) {
          const newDefaultValue =
            options && options.find((l) => l.value === defaultValue.value);
          return newDefaultValue;
        } else {
          console.log("default value", defaultValue);
          return [defaultValue];
        }
      }
    } else {
      return [];
    }
  };
  render() {
    // console.log(this.props)
    const {
      sectors,
      functions,
      designations,
      roles,
      educations,
      isColumnWithoutNoCreate,
      documents,
      contactByUserId,
      contactByCustomerId,
      customerByUserId,
      partnerByUserId,
      allpartnerByUserId,
      allcandidatesByUserId,
      employees,
      processStages,
      allUsersListByOrganizationId,
      allcustomersByUserId,
      contacts,
      accounts,
      departments,
      filteredContact,
      allCustomerData,
      department,
      opportunities,
      sources,
      regionsDropDown,
      timeZone,
      level,
      deliveryUsers,
      delivery,
      stages,
      isColumn,
      process,
      countries,
      dialcodeList,
      allShipperList,
      currencies,
      products,
      selectType,
      allOpportunityData,
      defaultValue,
      placeholder,
      width,
      isShadow,
      Left,
      margintop,
      label,
      menuPlacement,
      isRequired,
      isDisabled,
      fillAnother,
      accountId,
      leadsAccounts,
      filterOption,
      notLinked,
      noLabel,
      inlineLabel,
      fetchingAllUserByOraganizationId,
      fetchingContacts,
      fetchingAccounts,
      fetchingOpportunities,
      fetchingOnlySalesUsers,
      fetchingStages,
      fetchingSources,
      fetchingCountries,
      fetchingCurrencies,
      allProcessStages,
      tasks,
      expenses,
      events,
      form: { touched, errors, setFieldValue, setFieldTouched },
      field,
      ...rest
    } = this.props;
    // console.log(process);
    // console.log(accounts);
    // console.log(allProcessStages);
    // console.log(contacts);
    let options = null;

    if (selectType === "contactListFilter") {
      if (notLinked) {
        options = contactByUserId
          .filter((contact) => {
            if (!contact.customerId) {
              console.log("inside >>>>>>>", notLinked);
              return contact;
            }
          })
          .sort((a, b) => (a.firstName < b.firstName ? -1 : 1))
          .map((item, i) => ({
            value: item.contactId,
            label: `${item.firstName || ""} ${item.middleName ||
              ""} ${item.lastName || ""}`,
            color: "#FF8B00",
          }));
      } else {
        if (filterOption && filterOption.filterType === "account") {
          console.log(filterOption.filterValue)
          options = contactByUserId
            .filter((contact) => {
              debugger;
              if (
                !filterOption.filterValue ||
                !filterOption.filterValue.length
              ) {
                return contact;
              } else if (
                Array.isArray(filterOption.filterValue) &&
                contact.customerId === filterOption.filterValue[0]
              ) {
                console.log(filterOption);
                return contact;
              } else if (contact.customerId === filterOption.filterValue) {
                console.log(filterOption);
                return contact;
              }
            })
            .sort((a, b) => (a.firstName < b.firstName ? -1 : 1))
            .map((item, i) => ({
              value: item.contactId,
              label: `${item.firstName || ""} ${item.middleName ||
                ""} ${item.lastName || ""}`,
              color: "#FF8B00",
            }));
        } else {
          console.log("##################   account is not selected");
          options = contactByUserId
            .sort((a, b) => (a.firstName < b.firstName ? -1 : 1))
            .map((item, i) => ({
              value: item.contactId,
              label: `${item.firstName || ""} ${item.middleName ||
                ""} ${item.lastName || ""}`,
              color: "#FF8B00",
            }));
        }
      }
      // const customOption = ({ label, value }) => <h3>{`${label}---${value}`}</h3>
    }



    if (selectType === "departmentListFilter") {
      if (notLinked) {
        options = departments
          .filter((department) => {
            if (!department.sectorId) {
              console.log("inside >>>>>>>", notLinked);
              return department;
            }
          })
          //.sort((a, b) => (a.firstName < b.firstName ? -1 : 1))
          .sort((a, b) => {
            const departmentNameA = a.departmentName && a.departmentName.toLowerCase();
            const departmentNameB = b.departmentName && b.departmentName.toLowerCase();
            if (departmentNameA < departmentNameB) {
              return -1;
            }
            if (departmentNameA > departmentNameB) {
              return 1;
            }

            // names must be equal
            return 0;
          }
          )
          .map((item, i) => ({
            value: item.departmentId,
            label: item.departmentName,

            color: "#FF8B00",
          }));
      } else {
        if (filterOption && filterOption.filterType === "candidate") {
          console.log(filterOption.filterValue)
          options = departments
            .filter((department) => {
              debugger;
              if (
                !filterOption.filterValue ||
                !filterOption.filterValue.length
              ) {
                return department;
              } else if (
                Array.isArray(filterOption.filterValue) &&
                department.sectorId === filterOption.filterValue[0]
              ) {
                console.log(filterOption);
                return department;
              } else if (department.sectorId === filterOption.filterValue) {
                console.log(filterOption);
                return department;
              }
            })
            //.sort((a, b) => (a.firstName < b.firstName ? -1 : 1))
            .map((item, i) => ({
              value: item.departmentId,
              label: item.departmentName,
              color: "#FF8B00",
            }));
        } else {
          console.log("##################   account is not selected");
          options = departments
            //.sort((a, b) => (a.firstName < b.firstName ? -1 : 1))
            .map((item, i) => ({
              value: item.departmentId,
              label: item.departmentName,
              color: "#FF8B00",
            }));
        }
      }
      // const customOption = ({ label, value }) => <h3>{`${label}---${value}`}</h3>
    }
    if (selectType === "leadsaccount") {
      options = leadsAccounts
        .sort((a, b) => (a.accountName < b.accountName ? -1 : 1))
        .map((item, i) => ({
          value: item.leadsId,
          label: item.accountName,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }
    if (selectType === "account") {
      options = accounts
        .sort((a, b) => (a.accountName < b.accountName ? -1 : 1))
        .map((item, i) => ({
          value: item.accountId,
          label: item.accountName,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }
    if (selectType === "departments") {
      options = departments
        .sort((a, b) => (a.department_name < b.department_name ? -1 : 1))
        .map((item, i) => ({
          value: item.department,
          label: item.department,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }
    if (selectType === "department") {
      options = department
        .sort((a, b) => (a.department_name < b.department_name ? -1 : 1))
        .map((item, i) => ({
          value: item.department_name,
          label: item.department_name,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }
    if (selectType === "user") {
      options = allUsersListByOrganizationId
        .sort((a, b) => (a.firstName < b.firstName ? -1 : 1))
        .filter((a) => a.emailValidationInd)
        .map((item, i) => ({
          value: item.userId,
          label: `${item.firstName || ""} ${item.middleName ||
            ""} ${item.lastName || ""}`,
          color: "#FF8B00",
        }));
    }
    if (selectType === "salesuser") {
      console.log(this.props.onlySalesUsers);
      debugger;
      options = this.props.onlySalesUsers
        // .sort((a, b) => (a.firstName < b.firstName ? -1 : 1))
        // .filter((a) => a.emailValidationInd)
        .map((item, i) => ({
          value: item.userId,
          label: item.firstName,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}-----${value}`}</h3>
    }
    if (selectType === "opportunity") {
      if (notLinked) {
        options = opportunities
          .filter((opportunity) => {
            if (!opportunity.accountId) {
              console.log("inside >>>>>>>", notLinked);
              return opportunity;
            }
          })
          .sort((a, b) => (a.firstName < b.firstName ? -1 : 1))
          .map((item, i) => ({
            value: item.opportunityId,
            label: `${item.opportunityName || ""}`,
            color: "#FF8B00",
          }));
      } else {
        if (filterOption && filterOption.filterType == "account") {
          options = opportunities
            .filter((opportunity) => {
              if (!filterOption.filterValue.length) {
                console.log(
                  "*************************************************"
                );
                return opportunity;
              }
              // else if (Array.isArray(filterOption.filterValue) && contact.accountId === filterOption.filterValue[0]) {
              //     console.log(filterOption)
              //     return contact
              // }
              else if (
                Array.isArray(filterOption.filterValue) &&
                opportunity.accountId === filterOption.filterValue[0]
              ) {
                console.log(
                  "##################################################"
                );
                return opportunity;
              }
            })
            .sort((a, b) => (a.opportunityName < b.opportunityName ? -1 : 1))
            .map((item, i) => ({
              value: item.opportunityId,
              label: item.opportunityName,
              color: "#FF8B00",
            }));
        } else {
          options = opportunities
            .sort((a, b) => (a.opportunityName < b.opportunityName ? -1 : 1))
            .map((item, i) => ({
              value: item.opportunityId,
              label: item.opportunityName,
              color: "#FF8B00",
            }));
        }
      }
      // const customOption = ({ label, value }) => <h3>{`${label}-----${value}`}</h3>
    }
    if (selectType === "stages") {
      if (notLinked) {
        options = allProcessStages
          .filter((allProcessStages) => {
            if (!allProcessStages.processId) {
              console.log("inside >>>>>>>", notLinked);
              return allProcessStages;
            }
          })
          .sort((a, b) => (a.stageName < b.stageName ? -1 : 1))
          .map((item, i) => ({
            value: item.processId,
            label: `${item.stageName || ""}`,
            color: "#FF8B00",
          }));
      } else {
        if (filterOption && filterOption.filterType === "process") {
          options = allProcessStages
            .filter((allProcessStages) => {
              if (
                !filterOption.filterValue ||
                !filterOption.filterValue.length
              ) {
                return allProcessStages;
              } else if (
                Array.isArray(filterOption.filterValue) &&
                allProcessStages.processId === filterOption.filterValue[0]
              ) {
                console.log(filterOption);
                return allProcessStages;
              } else if (
                allProcessStages.processId === filterOption.filterValue
              ) {
                console.log(filterOption);
                return allProcessStages;
              }
            })
            .sort((a, b) => (a.stageName < b.stageName ? -1 : 1))
            .map((item, i) => ({
              value: item.processId,
              label: `${item.stageName || ""} `,
              color: "#FF8B00",
            }));
        } else {
          console.log("##################   process is not selected");
          options = allProcessStages
            .sort((a, b) => (a.stageName < b.stageName ? -1 : 1))
            .map((item, i) => ({
              value: item.processId,
              label: `${item.stageName || ""} `,
              color: "#FF8B00",
            }));
        }
      }
      const customOption = ({ label, value }) => (
        <h3>{`${label}---${value}`}</h3>
      );
    }
    // if (selectType === "stage") {
    //   options = processStages
    //     .sort((a, b) => (a.stageName < b.stageName ? -1 : 1))
    //     .map((item, i) => ({
    //       value: item.stageId,
    //       label: item.stageName,
    //       color: "#FF8B00"
    //     }));

    //   // const customOption = ({ label, value }) => <h3>{`${label}---${value}`}</h3>
    // }

    if (selectType === "process") {
      options = process
        .sort((a, b) => (a.processName < b.processName ? -1 : 1))
        .map((item, i) => ({
          value: item.processId,
          label: item.processName,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}---${value}`}</h3>
    }

    if (selectType === "sourceName") {
      options = sources
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((item, i) => ({
          value: item.sourceId,
          label: item.name,
          color: "#FF8B00",
        }));
    }
    if (selectType === "customerName") {
      options = allCustomerData
        .sort((a, b) => (a.customerName < b.customerName ? -1 : 1))
        .map((item, i) => ({
          value: item.customerId,
          label: item.name,
          color: "#FF8B00",
        }));
    }
    if (selectType === "allOppoName") {
      options = allOpportunityData
        .sort((a, b) => (a.allOppoName < b.allOppoName ? -1 : 1))
        .map((item, i) => ({
          label: `${item.opportunityName || ""}`,
          value: item.opportunityId,
          color: "#FF8B00",
        }));
    }
    if (selectType === "contactsName") {
      options = filteredContact
        .sort((a, b) => (a.contactsName < b.contactsName ? -1 : 1))
        .map((item, i) => ({
          label: `${item.fullName || ""}`,
          value: item.contactId,
          color: "#FF8B00",
        }));
    }

    if (selectType === "DRegion") {
      options = regionsDropDown
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((item, i) => ({
          value: item.regionsId,
          label: item.regions,
          color: "#FF8B00",
        }));
    }
    if (selectType === "country") {
      debugger;
      options = countries.map((item, i) => ({
        value: item.countryAlpha3Code,
        label: item.countryName,
        flag: item.countryFlag,
        countryDialCode: item.countryDialCode,
        countryCurrencyCode: item.countryCurrencyCode,
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
        color: "#FF8B00",
      }));
    }
    if (selectType === "dialCode") {
      options = dialcodeList.map((item, i) => ({
        label: `+${item.country_dial_code}`,
        value: `+${item.country_dial_code}`,
      }));;
    }
    if (selectType === "shipper") {
      options = allShipperList.map((item, i) => ({
        label: `+${item.shipperName}`,
        value: `+${item.shipperId}`,
      }));;
    }
    if (selectType === "currencyName") {
      options = currencies.map((item, i) => ({
        value: item.currency_name,
        label: item.currency_name,
        color: "#FF8B00",
      }));
    }



    if (selectType === "timeZone") {
      options = timeZone.map((item, i) => ({
        label: `${item.zoneName}`,
        value: `${item.timezoneId}`,
      }));
      // options.filter((item, i) => options.indexOf())
      options = uniqBy(options, "value");
      // const customOption = ({ label, value }) => <h3>{`${label}-----${value}`}</h3>
    }
    if (selectType === "level") {
      options = level.map((item, i) => ({
        label: `${item.level}`,
        value: `${item.level}`,
      }));
      // options.filter((item, i) => options.indexOf())
      options = uniqBy(options, "value");
      // const customOption = ({ label, value }) => <h3>{`${label}-----${value}`}</h3>
    }

    if (selectType === "deliveryUsers") {
      options = deliveryUsers.map((item, i) => ({
        label: `${item.firstName}`,
        value: `${item.userId}`,
      }));
      // options.filter((item, i) => options.indexOf())
      options = uniqBy(options, "value");
      // const customOption = ({ label, value }) => <h3>{`${label}-----${value}`}</h3>
    }

    if (selectType === "documentTypeName") {
      options = documents
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .map((item, i) => ({
          value: item.documentTypeId,
          label: item.documentTypeName,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }
    if (selectType === "sectorName") {
      // debugger;
      options = sectors
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .sort((a, b) => {
          const sectorNameA = a.sectorName && a.sectorName.toLowerCase();
          const sectorNameB = b.sectorName && b.sectorName.toLowerCase();
          if (sectorNameA < sectorNameB) {
            return -1;
          }
          if (sectorNameA > sectorNameB) {
            return 1;
          }

          // names must be equal
          return 0;
        }
        )
        .map((item, i) => ({
          value: item.sectorId,
          label: item.sectorName,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }
    if (selectType === "designationType") {
      // debugger;
      options = designations
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .sort((a, b) => {
          const designationNameA = a.designationType && a.designationType.toLowerCase();
          const designationNameB = b.designationType && b.designationType.toLowerCase();
          if (designationNameA < designationNameB) {
            return -1;
          }
          if (designationNameB > designationNameB) {
            return 1;
          }

          // names must be equal
          return 0;
        }
        )
        .map((item, i) => ({
          value: item.designationTypeId,
          label: item.designationType,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }
    if (selectType === "roleType") {
      // debugger;
      options = roles
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))

        .sort((a, b) => {
          const roleNameA = a.roleType && a.roleType.toLowerCase();
          const roleNameB = b.roleType && b.roleType.toLowerCase();
          if (roleNameA < roleNameB) {
            return -1;
          }
          if (roleNameA > roleNameB) {
            return 1;
          }

          // names must be equal
          return 0;
        }
        )
        .map((item, i) => ({
          value: item.roleTypeId,
          label: item.roleType,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }

    if (selectType === "educationType") {
      debugger;
      options = educations
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .map((item, i) => ({
          value: item.educationTypeId,
          label: item.educationType,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }

    if (selectType === "contactList") {
      options = contactByUserId
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .map((item, i) => ({
          value: item.contactId,
          label: `${item.firstName || ""} ${item.middleName ||
            ""} ${item.lastName || ""}`,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }
    if (selectType === "contactOpportunityList") {
      <>
        {contactByCustomerId.length ?
          options = contactByCustomerId
            // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
            .map((item, i) => ({
              value: item.contactId,
              label: `${item.firstName || ""} ${item.middleName ||
                ""} ${item.lastName || ""}`,
              color: "#FF8B00",
            }))
          : null}
      </>
    }

    if (selectType === "customerList") {
      options = customerByUserId
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .map((item, i) => ({
          value: item.customerId,
          label: item.name,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }

    if (selectType === "employee") {
      options = employees
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .map((item, i) => ({
          value: item.employeeId,
          label: item.fullName,
          // `${item.firstName || ""} ${item.middleName ||
          //   ""} ${item.lastName || ""}`,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }

    if (selectType === "partnerList") {
      options = partnerByUserId
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .map((item, i) => ({
          value: item.partnerId,
          label: item.partnerName,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }
    if (selectType === "partnerListName") {
      options = allpartnerByUserId
        //  .sort((a, b) => (a.partnerName.toLowerCase()< b.partnerName.toLowerCase() ? -1 : 1))
        .sort((a, b) => {
          const accountNameA = a.partnerName && a.partnerName.toLowerCase();
          const accountNameB = b.partnerName && b.partnerName.toLowerCase();
          if (accountNameA < accountNameB) {
            return -1;
          }
          if (accountNameA > accountNameB) {
            return 1;
          }

          // names must be equal
          return 0;
        }
        )
        .map((item, i) => ({
          value: item.partnerId,
          label: item.partnerName,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }

    if (selectType === "candidateList") {
      options = allcandidatesByUserId
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .map((item, i) => ({
          value: item.candidateId,
          label: item.fullName,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }

    if (selectType === "name") {
      options = allcustomersByUserId
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .map((item, i) => ({
          value: item.customerId,
          label: item.name,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }

    if (selectType === "product") {
      options = products.map((item, i) => ({
        label: item.productName,
        value: item.productId,
        maxDiscount: item.maxDiscount,
        baseCost: item.baseCost,
        category: item.category,
        currency: item.currency,
        description: item.description,
        subCategory: item.subCategory,
      }));
    }
    if (selectType === "taskType") {
      debugger;
      options = tasks
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .map((item, i) => ({
          value: item.taskTypeId,
          label: item.taskType,
          color: "#FF8B00",
        }));
    }

    if (selectType === "expenseType") {
      debugger;
      options = tasks
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .map((item, i) => ({
          value: item.expenseTypeId,
          label: item.expenseType,
          color: "#FF8B00",
        }));
    }
    if (selectType === "functionType") {
      debugger;
      options = functions
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .map((item, i) => ({
          value: item.functionTypeId,
          label: item.functionType,
          color: "#FF8B00",
        }));
    }

    if (selectType === "eventType") {
      // debugger;
      options = events
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .map((item, i) => ({
          value: item.eventTypeId,
          label: item.eventType,
          color: "#FF8B00",
        }));
    }

    if (selectType === "departmentName") {
      // debugger;
      options = departments
        // .sort((a, b) => (a.sourceName < b.sourceName ? -1 : 1))
        .map((item, i) => ({
          value: item.departmentId,
          label: item.departmentName,
          color: "#FF8B00",
        }));

      // const customOption = ({ label, value }) => <h3>{`${label}----${value}`}</h3>
    }
    if (isColumnWithoutNoCreate) {
      // The searchselect without create component will work on calling ( isColumnWithoutNoCreate)
      return (
        <>
          {!noLabel && (
            <div class=" text-xs font-bold font-poppins" style={{ flexBasis: "32%" }}>{label}</div>
          )}
          <StyledCreatable1
            classNamePrefix="sales"
            label={placeholder}
            formatCreateLabel={() => undefined}
            isRequired={isRequired}
            placeholder={placeholder}
            options={options}
            menuPlacement={menuPlacement}
            width={width}
            isShadow={isShadow}
            Left={Left}
            margintop={margintop}
            name={field.name}
            isMulti={this.props.isMulti || false}
            {...field}
            {...rest}
            onChange={(option) =>
              this.handleChange(
                option,
                field,
                setFieldValue,
                fillAnother,
                setFieldTouched
              )
            }
            isCreatable={false}
            onCreateOption={this.handleCreate}
            defaultValue={this.setDefaultValue(options)}
            isDisabled={isDisabled}
            // isLoading={
            //   fetchingAllUserByOraganizationId ||
            //   fetchingOnlySalesUsers ||
            //   fetchingContacts ||
            //   fetchingAccounts ||
            //   fetchingOpportunities ||
            //   fetchingStages ||
            //   fetchingSources ||
            //   fetchingCountries 
            //   // ||
            //   // fetchingCurrencies
            // }
            // defaultValue={defaultValue ? [{
            //     value: defaultValue.value,
            //     label: options.find(option => {
            //         console.log('000000000000000000000000000000000')
            //         console.log(option)
            //         console.log(defaultValue)
            //         if (option.value === defaultValue.value) {
            //             console.log(option.label)
            //             return option.label
            //         }else{
            //             return 'asdads'
            //         }

            //     })
            // }] : ''}
            // defaultValue={defaultValue ? Array.isArray(defaultValue) && defaultValue.find(option => option.value === field.value) : ''}
            value={
              options
                ? options.find((option) => option.value === field.value)
                : ""
            }
            onBlur={() => setFieldTouched(field.name, true)}
          />

          {/* <AddUserModal addUserModal={this.props.addUserModal} handleUserModal={this.props.handleUserModal}/> */}

          {get(touched, field.name) && get(errors, field.name) && (
            <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
          )}
        </>
      );
    }

    return (
      <>
        <FlexContainer>
          <FlexContainer alignItems="center" flexWrap={inlineLabel && "nowrap"}>
            {!noLabel && (
              <div class=" text-xs font-bold font-poppins" style={{ flexBasis: "32%" }}>{label}</div>
            )}
            <StyledCreatable1
              classNamePrefix="sales"
              label={placeholder}
              isRequired={isRequired}
              menuPlacement={menuPlacement} // menuPlacement={"top"}
              placeholder={placeholder}
              options={options}
              isShadow={isShadow}
              width={width}
              Left={Left}
              margintop={margintop}
              name={field.name}
              isMulti={this.props.isMulti || false}
              {...field}
              {...rest}
              onChange={(option) =>
                this.handleChange(
                  option,
                  field,
                  setFieldValue,
                  fillAnother,
                  setFieldTouched
                )
              }
              isCreatable={false}
              onCreateOption={this.handleCreate}
              defaultValue={this.setDefaultValue(options)}
              isDisabled={isDisabled}
              // isLoading={
              //   fetchingAllUserByOraganizationId ||
              //   fetchingContacts ||
              //   fetchingOnlySalesUsers ||
              //   fetchingAccounts ||
              //   fetchingOpportunities ||
              //   fetchingStages ||
              //   fetchingSources ||
              //   fetchingCountries
              //   // fetchingCurrencies
              // }
              // defaultValue={defaultValue ? [{
              //     value: defaultValue.value,
              //     label: options.find(option => {
              //         console.log('000000000000000000000000000000000')
              //         console.log(option)
              //         console.log(defaultValue)
              //         if (option.value === defaultValue.value) {
              //             console.log(option.label)
              //             return option.label
              //         }else{
              //             return 'asdads'
              //         }

              //     })
              // }] : ''}
              // defaultValue={defaultValue ? Array.isArray(defaultValue) && defaultValue.find(option => option.value === field.value) : ''}
              value={
                options
                  ? options.find((option) => option.value === field.value)
                  : ""
              }
              onBlur={() => setFieldTouched(field.name, true)}
            />
          </FlexContainer>
        </FlexContainer>
        {/* <AddUserModal addUserModal={this.props.addUserModal} handleUserModal={this.props.handleUserModal}/> */}

        {get(touched, field.name) && get(errors, field.name) && (
          <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
        )}
      </>
    );
  }
}


const mapStateToProps = ({ shipper, auth, call, document, source, role, functions, contact, region, opportunity, customer, employee, partner, sector, candidate, designations, education, tasks, expenses, events, departments }) => ({
  countries: auth.countries,
  currencies: auth.currencies,
  fetchingCountries: auth.fetchingCountries,
  fetchingCurrencies: auth.fetchingCurrencies,
  userId: auth.userDetails.userId,
  designations: designations.designations,
  educations: education.educations,
  organizationId: auth.userDetails.organizationId,
  allUsersListByOrganizationId: call.allUsersListByOrganizationId,
  fetchingAllUserByOraganizationId: call.fetchingAllUserByOraganizationId,
  timeZone: auth.timeZone,
  documents: document.documents,
  sectors: sector.sectors,
  roles: role.roles,
  contactByUserId: contact.contactByUserId,
  customerByUserId: customer.customerByUserId,
  partnerByUserId: partner.partnerByUserId,
  customerId: customer.customer.customerId,
  contactByCustomerId: customer.contactByCustomerId,
  employees: employee.employees,
  allpartnerByUserId: partner.allpartnerByUserId,
  allcandidatesByUserId: candidate.allcandidatesByUserId,
  candidateByUserId: candidate.candidateByUserId,
  tasks: tasks.tasks,
  expenses: expenses.expenses,
  events: events.events,
  allShipperList: shipper.allShipperList,
  functions: functions.functions,
  departments: departments.departments,
  allcustomersByUserId: customer.allcustomersByUserId,
  sources: source.sources,
  dialcodeList: auth.dialcodeList,
  regionsDropDown: region.regionsDropDown,
  allCustomerData: customer.allCustomerData,
  allOpportunityData: opportunity.allOpportunityData,
  filteredContact: candidate.filteredContact,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactListByUserId,
      getContactListByCustomerId,
      getAllCandidateListByUserId,
      getAllCustomerListByUserId,
      getCustomerListByUserId,
      getPartnerListByUserId,
      getAllPartnerListByUserId,
      // getAccounts,
      // getLeadsAccounts,
      getAllUsersByOrganizationId,
      // getOnlySalesUser,
      // getOpportunities,
      getCountries,
      getCurrency,
      getSources,
      getDropDownRegions,
      // getProducts,
      // getDeliveryUser,
      getTimeZone,
      getAllDialCodeList,
      getDepartments,
      getAllShipper,
      getDocuments,
      getEmployeelist,
      getSectors,
      getRoles,
      getDesignations,
      getTasks,
      getExpenses,
      getEvents,
      getEducations,
      getFunctions,
      getAllCustomerData,
      getAllOpportunityData,
      getFilteredEmailContact
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SearchSelect1);
