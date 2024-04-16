import * as types from "./ProfileActionTypes";
const initialState = {
  addEducationModal: false,
  addVisaModal:false,
  addTrainingModal: false,
  addEmploymentModal: false,
  addPersonalModal: false,
  addBankModal: false,
  addMapModal: false,
  addPersonalDetailsModal: false,
  addSalaryModal: false,
  deleteBank: false,
  deleteEducation: false,
  deleteEmployment: false,
  deleteEmergency: false,
  deletePersonal: false,
  deleteTraining: false,
  setEditingEducation: {},
  setEditingEmployment: {},
  setEditingBank: {},
  setEditingTraining: {},
  setEditingPersonal: {},
  employee: {},
  setEditingSalary: {},

  linkingEmailStatus: false,
  linkingEmailStatusError: false,

  addingEducationDetails: false,
  addingTrainingDetails: false,
  addingPersonalDetails: false,
  addingEmploymentDetails: false,
  addingBankDetails: false,
  addingPersonalDocumentDetails: false,

  updateEducationModal: false,
  updateEmploymentModal: false,
  updatepersonalModal: false,
  updateTrainingModal: false,
  updateBankModal: false,
  updatePersonalDetailsModal: false,
  updateSalaryModal: false,

  fetchingVisaDetails: false,
   fetchingVisaDetailsError: false,
   visaDetails:[],

   updatingProfileEquipment: false,
   updatingProfileEquipmentError: false,

  updatingBankDetails: false,
  updatingTrainingDetails: false,
  updatingPersonalDetails: false,
  updatingEmploymentDetails: false,
  updatingEducationDetails: false,
  updatingPersonalDocumentDetails: false,

  fetchingEducationDetails: false,
  fetchingEducationDetailsError: false,
  eduDetails: [],

  fetchingTrainingDetails: false,
  fetchingTrainingDetailsError: false,
  trainingDetails: [],

  fetchingEmploymentDetails: false,
  fetchingEmploymentDetailsError: false,
  employmentDetails: [],

  fetchingBankDetails: false,
  fetchingBankDetailsError: false,
  bankDetails: [],

  fetchingEquipmentEmployee: false,
  fetchingEquipmentEmployeeError: false,
  employeeEquipment:[],

  updateVisaModal:false,

  fetchingPersonalDetails: false,
  fetchingPersonalDetailsError: false,
  personalDetails: [],

  fetchingDocumentDetails: false,
  fetchingDocumentDetailsError: false,
  documentDetails: [],

  fetchingDocumentsById: false,
  fetchingDocumentsByIdError: false,
  documentsById: [],

  fetchingPerformance: false,
  fetchingPerformanceError: false,
  performanceList:[],



  addingSalaryDetails: false,
  addingSalaryDetailsError: false,

  fetchingEmployeeSalaryDetails: false,
  fetchingEmployeeSalaryDetailsError: false,
  salaryDetails: [],

  updatingEmployeeSalaryDetails: false,
  updatingEmployeeSalaryDetailsError: false,


  deleteVisa: false, 
  deleteVisaError: false ,

  setCurrentPersonalData: {},

  documentUploadModal: false,

  deleteEmployeeSalary: false,

  addContractModal: false,

  addingContractDetails: false,
  addingContractDetailsError: false,

  fetchingContractDetails: false,
  fetchingContractDetailsError: false,
  contractDetails: [],

  setEditingContract: {},

  updateContractModal: false,

  fetchingLinkedUsersDocument: false,
   fetchingLinkedUsersDocumentError: false,
   linkedUserDocument:[],

   setEditingVisa:{},

  updatingEmploymentDetails: false,
  updatingEmploymentDetailsError: false,

  addingEmailProfile:false,
  addingEmailProfileError:false,

  // addEmailModal: false,
  addEmailProfileModal:false,
  addWebsiteModal:false,
  addUpdateEmailModal: false,

  fetchingEmailProfileCredential:false,
  fetchingEmailProfileCredentialError:false,
  emailProfileCredential:[]

};
export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_EMERGENCY_ADDRESS:
      return {
        ...state,
        setCurrentPersonalData: {
          ...state.setCurrentPersonalData,
          address: state.setCurrentPersonalData.address.map((item) => {
            if (item.addressId === action.payload.address.addressId) {
              return action.payload.address;
            } else {
              return item;
            }
          }),
        },
      };
    case types.HANDLE_EDUCATION_MODAL:
      return { ...state, addEducationModal: action.payload };

      case types.HANDLE_VISA_MODAL:
        return { ...state, addVisaModal: action.payload };
  

    case types.HANDLE_TRAINING_MODAL:
      return { ...state, addTrainingModal: action.payload };

    case types.HANDLE_EMPLOYMENT_MODAL:
      return { ...state, addEmploymentModal: action.payload };
    case types.HANDLE_PERSONAL_MODAL:
      return { ...state, addPersonalModal: action.payload };

    case types.HANDLE_BANK_MODAL:
      return { ...state, addBankModal: action.payload };

    case types.HANDLE_PERSONAL_DETAILS_MODAL:
      return { ...state, addPersonalDetailsModal: action.payload };

    case types.HANDLE_SALARY_MODAL:
      return { ...state, addSalaryModal: action.payload };

    case types.HANDLE_MAP_MODAL:
      return { ...state, addMapModal: action.payload };

    case types.HANDLE_UPDATE_EDUCATION_MODAL:
      return { ...state, updateEducationModal: action.payload };

    case types.HANDLE_UPDATE_EMPLOYMENT_MODAL:
      return { ...state, updateEmploymentModal: action.payload };

    case types.HANDLE_UPDATE_PERSONAL_MODAL:
      return { ...state, updatePersonalModal: action.payload };

    case types.HANDLE_UPDATE_TRAINING_MODAL:
      return { ...state, updateTrainingModal: action.payload };

    case types.HANDLE_UPDATE_BANK_MODAL:
      return { ...state, updateBankModal: action.payload };

    case types.HANDLE_UPDATE_PERSONAL_DETAILS_MODAL:
      return { ...state, updatePersonalDetailsModal: action.payload };

    case types.HANDLE_UPDATE_SALARY_MODAL:
      return { ...state, updateSalaryModal: action.payload };

    //ADD EDUCATION
    case types.ADD_EDUCATIONAL_DETAILS_REQUEST:
      return { ...state, addingEducationDetails: true };
    case types.ADD_EDUCATIONAL_DETAILS_SUCCESS:
      return {
        ...state,
        addingEducationDetails: false,
        addEducationModal: false,
      };
    case types.ADD_EDUCATIONAL_DETAILS_FAILURE:
      return {
        ...state,
        addingEducationDetails: false,
        addingEducationDetailsError: true,
      };

    //UPDATE EDUCATION
    case types.UPDATE_EDUCATIONAL_DETAILS_REQUEST:
      return { ...state, updatingEducationDetails: true };
    case types.UPDATE_EDUCATIONAL_DETAILS_SUCCESS:
      return {
        ...state,
        updatingEducationDetails: false,
        updateEducationModal: false,
        eduDetails: state.eduDetails.map((education, i) => {
          if (education.id === action.payload.id) {
            return action.payload;
          } else {
            return education;
          }
        }),
      };
    case types.UPDATE_EDUCATIONAL_DETAILS_FAILURE:
      return {
        ...state,
        updatingEducationDetails: false,
        updatingEducationDetailsError: true,
      };

    //ADD TRAINING
    case types.ADD_TRAINING_DETAILS_REQUEST:
      return { ...state, addingTrainingDetails: true };
    case types.ADD_TRAINING_DETAILS_SUCCESS:
      return {
        ...state,
        addingTrainingDetails: false,
        addTrainingModal: false,
      };
    case types.ADD_TRAINING_DETAILS_FAILURE:
      return {
        ...state,
        addingTrainingDetails: false,
        addingTrainingDetailsError: true,
      };

    //UPDATE TRAINING
    case types.UPDATE_TRAINING_DETAILS_REQUEST:
      return { ...state, updatingTrainingDetails: true };
    case types.UPDATE_TRAINING_DETAILS_SUCCESS:
      return {
        ...state,
        updatingTrainingDetails: false,
        updateTrainingModal: false,
        trainingDetails: state.trainingDetails.map((training, i) => {
          if (training.id === action.payload.id) {
            return action.payload;
          } else {
            return training;
          }
        }),
      };
    case types.UPDATE_TRAINING_DETAILS_FAILURE:
      return {
        ...state,
        updatingTrainingDetails: false,
        updatingTrainingDetailsError: true,
      };
    //ADD EMPLOYMENT
    case types.ADD_EMPLOYMENT_DETAILS_REQUEST:
      return { ...state, addingEmploymentDetails: true };
    case types.ADD_EMPLOYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        addingEmploymentDetails: false,
        addEmploymentModal: false,
      };
    case types.ADD_EMPLOYMENT_DETAILS_FAILURE:
      return {
        ...state,
        addingEmploymentDetails: false,
        addingEmploymentDetailsError: true,
      };

    //UPDATE EMPLOYMENT
    case types.UPDATE_EMPLOYMENT_DETAILS_REQUEST:
      return { ...state, updatingEmploymentDetails: true };
    case types.UPDATE_EMPLOYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        updatingEmploymentDetails: false,
        updateEmploymentModal: false,
        employmentDetails: state.employmentDetails.map((employment, i) => {
          if (employment.id === action.payload.id) {
            return action.payload;
          } else {
            return employment;
          }
        }),
      };
    case types.UPDATE_EMPLOYMENT_DETAILS_FAILURE:
      return {
        ...state,
        updatingEmploymentDetails: false,
        updatingEmploymentDetailsError: true,
      };
    //ADD PERSONAL
    case types.ADD_PERSONAL_DETAILS_REQUEST:
      return { ...state, addingPersonalDetails: true };
    case types.ADD_PERSONAL_DETAILS_SUCCESS:
      return {
        ...state,
        addingPersonalDetails: false,
        addPersonalModal: false,
      };
    case types.ADD_PERSONAL_DETAILS_FAILURE:
      return {
        ...state,
        addingPersonalDetails: false,
        addingPersonalDetailsError: true,
      };

    //UPDATE PERSONAL
    case types.UPDATE_PERSONAL_DETAILS_REQUEST:
      return { ...state, updatingPersonalDetails: true };
    case types.UPDATE_PERSONAL_DETAILS_SUCCESS:
      return {
        ...state,
        updatingPersonalDetails: false,
        updatePersonalModal: false,

        personalDetails: state.personalDetails.map((personal, i) => {
          if (personal.id === action.payload.id) {
            return action.payload;
          } else {
            return personal;
          }
        }),
      };
    case types.UPDATE_PERSONAL_DETAILS_FAILURE:
      return {
        ...state,
        updatingPersonalDetails: false,
        updatingPersonalDetailsError: true,
      };

    //ADD DOCUMENT
    case types.ADD_DOCUMENT_DETAILS_REQUEST:
      return { ...state, addingPersonalDocumentDetails: true };
    case types.ADD_DOCUMENT_DETAILS_SUCCESS:
      return {
        ...state,
        addingPersonalDocumentDetails: false,
        addPersonalDetailsModal: false,
      };
    case types.ADD_DOCUMENT_DETAILS_FAILURE:
      return {
        ...state,
        addingPersonalDocumentDetails: false,
        addingPersonalDocumentDetailsError: true,
        addPersonalDetailsModal: false,
      };

    //UPDATE DOCUMENT
    case types.UPDATE_DOCUMENT_DETAILS_REQUEST:
      return { ...state, updatingPersonalDocumentDetails: true };
    case types.UPDATE_DOCUMENT_DETAILS_SUCCESS:
      return {
        ...state,
        updatingPersonalDocumentDetails: false,
        updatePersonalDetailsModal: false,

        personalDetails: state.personalDetails.map((personal, i) => {
          if (personal.id === action.payload.id) {
            return action.payload;
          } else {
            return personal;
          }
        }),
      };
    case types.UPDATE_DOCUMENT_DETAILS_FAILURE:
      return {
        ...state,
        updatingPersonalDocumentDetails: false,
        updatingPersonalDocumentDetailsError: true,
      };

    //ADD BANK
    case types.ADD_BANK_DETAILS_REQUEST:
      return { ...state, addingBankDetails: true };
    case types.ADD_BANK_DETAILS_SUCCESS:
      return { ...state, addingBankDetails: false, addBankModal: false };
    case types.ADD_BANK_DETAILS_FAILURE:
      return {
        ...state,
        addingBankDetails: false,
        addingBankDetailsError: true,
      };

    //UPDATE BANK

    case types.UPDATE_BANK_DETAILS_REQUEST:
      return { ...state, updatingBankDetails: true };
    case types.UPDATE_BANK_DETAILS_SUCCESS:
      return {
        ...state,
        updatingBankDetails: false,
        updateBankModal: false,
        bankDetails: state.bankDetails.map((bank, i) => {
          if (bank.id === action.payload.id) {
            return action.payload;
          } else {
            return bank;
          }
        }),
      };
    case types.UPDATE_BANK_DETAILS_FAILURE:
      return {
        ...state,
        updatingBankDetails: false,
        updatingBankDetailsError: true,
      };
    //FETCH EMPLOYEE EDUCATION DETAILS
    case types.GET_EMPLOYEE_EDUCATION_DETAILS_REQUEST:
      return { ...state, fetchingEducationDetails: true };
    case types.GET_EMPLOYEE_EDUCATION_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingEducationDetails: false,
        eduDetails: action.payload,
      };
    case types.GET_EMPLOYEE_EDUCATION_DETAILS_FAILURE:
      return {
        ...state,
        fetchingEducationDetails: false,
        fetchingEducationDetailsError: true,
      };

    //FETCH EMPLOYEE TRAINING DETAILS
    case types.GET_EMPLOYEE_TRAINING_DETAILS_REQUEST:
      return { ...state, fetchingTrainingDetails: true };
    case types.GET_EMPLOYEE_TRAINING_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingTrainingDetails: false,
        trainingDetails: action.payload,
      };
    case types.GET_EMPLOYEE_TRAINING_DETAILS_FAILURE:
      return {
        ...state,
        fetchingTrainingDetails: false,
        fetchingTrainingDetailsError: true,
      };

    //FETCH EMPLOYEE EMPLOYMENT DETAILS
    case types.GET_EMPLOYEE_EMPLOYMENT_DETAILS_REQUEST:
      return { ...state, fetchingEmploymentDetails: true };
    case types.GET_EMPLOYEE_EMPLOYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingEmploymentDetails: false,
        employmentDetails: action.payload,
      };
    case types.GET_EMPLOYEE_EMPLOYMENT_DETAILS_FAILURE:
      return {
        ...state,
        fetchingEmploymentDetails: false,
        fetchingEmploymentDetailsError: true,
      };

    //FETCH EMPLOYEE BANK DETAILS
    case types.GET_EMPLOYEE_BANK_DETAILS_REQUEST:
      return { ...state, fetchingBankDetails: true };
    case types.GET_EMPLOYEE_BANK_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingBankDetails: false,
        bankDetails: action.payload,
      };
    case types.GET_EMPLOYEE_BANK_DETAILS_FAILURE:
      return {
        ...state,
        fetchingBankDetails: false,
        fetchingBankDetailsError: true,
      };

    //FETCH EMPLOYEE PERSONAL DETAILS
    case types.GET_PERSONAL_DETAILS_REQUEST:
      return { ...state, fetchingPersonalDetails: true };
    case types.GET_PERSONAL_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingPersonalDetails: false,
        personalDetails: action.payload,
      };
    case types.GET_PERSONAL_DETAILS_FAILURE:
      return {
        ...state,
        fetchingPersonalDetails: false,
        fetchingPersonalDetailsError: true,
      };

    //FETCH EMPLOYEE DOCUMENT DETAILS
    case types.GET_DOCUMENT_DETAILS_REQUEST:
      return { ...state, fetchingDocumentDetails: true };
    case types.GET_DOCUMENT_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingDocumentDetails: false,
        documentDetails: action.payload,
      };
    case types.GET_DOCUMENT_DETAILS_FAILURE:
      return {
        ...state,
        fetchingDocumentDetails: false,
        fetchingDocumentDetailsError: true,
      };

    //Add,Edit & Delete Skills

  


    case types.GET_OPPORTUNITY_DOCUMENTS_REQUEST:
      return {
        ...state,
        fetchingDocumentsById: true,
        fetchingDocumentsByIdError: false,
      };
    case types.GET_OPPORTUNITY_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingDocumentsById: false,
        fetchingDocumentsByIdError: false,
        documentsByOpportunityId: action.payload,
      };
    case types.GET_OPPORTUNITY_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocumentsById: false,
        fetchingDocumentsByIdError: true,
      };
    case types.DELETE_BANK_REQUEST:
      return { ...state, deleteBank: true };
    case types.DELETE_BANK_SUCCESS:
      return {
        ...state,
        deleteBank: false,
        // addCallModal: false,
        bankDetails: state.bankDetails.filter(
          (item) => item.id !== action.payload
        ),
      };
    case types.DELETE_BANK_FAILURE:
      return { ...state, deleteBank: false, deleteBankError: false };
    //education
    case types.DELETE_EDUCATION_REQUEST:
      return { ...state, deleteEducation: true };
    case types.DELETE_EDUCATION_SUCCESS:
      return {
        ...state,
        deleteEducation: false,
        // addCallModal: false,
        eduDetails: state.eduDetails.filter(
          (item) => item.id !== action.payload
        ),
      };

    case types.DELETE_EDUCATION_FAILURE:
      return { ...state, deleteEducation: false, deleteBankError: false };

    //EMPLOYMENT
    case types.DELETE_EMPLOYMENT_REQUEST:
      return { ...state, deleteEmployment: true };
    case types.DELETE_EMPLOYMENT_SUCCESS:
      return {
        ...state,
        deleteEmployment: false,
        // addCallModal: false,
        employmentDetails: state.employmentDetails.filter(
          (item) => item.id !== action.payload
        ),
      };
    case types.DELETE_EMPLOYMENT_FAILURE:
      return {
        ...state,
        deleteEmployment: false,
        deleteEmploymentError: false,
      };

    //EMERGENCY
    case types.DELETE_EMERGENCY_REQUEST:
      return { ...state, deleteEmergency: true };
    case types.DELETE_EMERGENCY_SUCCESS:
      return {
        ...state,
        deleteEmergency: false,
        // addCallModal: false,
        personalDetails: state.personalDetails.filter(
          (item) => item.id !== action.payload
        ),
      };
    case types.DELETE_EMERGENCY_FAILURE:
      return {
        ...state,
        deleteEmergency: false,
        deleteEmergencyError: false,
      };

    //TRAINING
    case types.DELETE_TRAINING_REQUEST:
      return { ...state, deleteTraining: true };
    case types.DELETE_TRAINING_SUCCESS:
      return {
        ...state,
        deleteTraining: false,
        // addCallModal: false,
        trainingDetails: state.trainingDetails.filter(
          (item) => item.id !== action.payload
        ),
      };
    case types.DELETE_TRAINING_FAILURE:
      return {
        ...state,
        deleteTraining: false,
        deleteTrainingError: false,
      };

    //PERSONAL
    case types.DELETE_PERSONAL_REQUEST:
      return { ...state, deletePersonal: true };
    case types.DELETE_PERSONAL_SUCCESS:
      return {
        ...state,
        deletePersonal: false,
        // addCallModal: false,
        documentDetails: state.documentDetails.filter(
          (item) => item.id !== action.payload
        ),
      };
    case types.DELETE_PERSONAL_FAILURE:
      return {
        ...state,
        deletePersonal: false,
        deletePersonalError: false,
      };

    case types.SET_EDUCATION_EDIT:
      return { ...state, setEditingEducation: action.payload };

    case types.SET_EMPLOYMENT_EDIT:
      return { ...state, setEditingEmployment: action.payload };

    case types.SET_BANK_EDIT:
      return { ...state, setEditingBank: action.payload };

    case types.SET_TRAINING_EDIT:
      return { ...state, setEditingTraining: action.payload };

    case types.SET_PERSONAL_EDIT:
      return { ...state, setEditingPersonal: action.payload };

    case types.SET_PERSONAL_CURRENT:
      return { ...state, setCurrentPersonalData: action.payload };

    case types.SET_DOCUMENT_EDIT:
      return { ...state, setEditingDocument: action.payload };

    case types.SET_SALARY_EDIT:
      return { ...state, setEditingSalary: action.payload };
    //ADD SALARY
    case types.ADD_SALARY_DETAILS_REQUEST:
      return { ...state, addingSalaryDetails: true };
    case types.ADD_SALARY_DETAILS_SUCCESS:
      return {
        ...state,
        addingSalaryDetails: false,
        addSalaryModal: false,
      };
    case types.ADD_SALARY_DETAILS_FAILURE:
      return {
        ...state,
        addingSalaryDetails: false,
        addingSalaryDetailsError: true,
      };

    //FETCH EMPLOYEE SALARY DETAILS
    case types.GET_EMPLOYEE_SALARY_DETAILS_REQUEST:
      return { ...state, fetchingEmployeeSalaryDetails: true };
    case types.GET_EMPLOYEE_SALARY_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingEmployeeSalaryDetails: false,
        salaryDetails: action.payload,
      };
    case types.GET_EMPLOYEE_SALARY_DETAILS_FAILURE:
      return {
        ...state,
        fetchingEmployeeSalaryDetails: false,
        fetchingEmployeeSalaryDetailsError: true,
      };

    /**
     * handle upload document  modal
     */
    case types.HANDLE_DOCUMENT_UPLOAD_MODAL:
      return { ...state, documentUploadModal: action.payload };

    //UPDATE EMPLOYEE SALARY DETAILS

    case types.UPDATE_EMPLOYEE_SALARY_DETAILS_REQUEST:
      return { ...state, updatingEmployeeSalaryDetails: true };
    case types.UPDATE_EMPLOYEE_SALARY_DETAILS_SUCCESS:
      return {
        ...state,
        updatingEmployeeSalaryDetails: false,
        updateSalaryModal: false,
        salaryDetails: state.salaryDetails.map((salary, i) => {
          if (salary.salaryDetailsId === action.payload.salaryDetailsId) {
            return action.payload;
          } else {
            return salary;
          }
        }),
      };
    case types.UPDATE_EMPLOYEE_SALARY_DETAILS_FAILURE:
      return {
        ...state,
        updatingEmployeeSalaryDetails: false,
        updatingEmployeeSalaryDetailsError: true,
      };

    //DELETE  EMPLOYEE SALARY
    case types.DELETE_EMPLOYEE_SALARY_REQUEST:
      return { ...state, deleteEmployeeSalary: true };
    case types.DELETE_EMPLOYEE_SALARY_SUCCESS:
      return {
        ...state,
        deleteEmployeeSalary: false,
        // addCallModal: false,
        salaryDetails: state.salaryDetails.filter(
          (item) => item.id !== action.payload
        ),
      };

    case types.DELETE_EMPLOYEE_SALARY_FAILURE:
      return { ...state, deleteEmployeeSalary: false };


    case types.HANDLE_CONTRACT_MODAL:
      return { ...state, addContractModal: action.payload };

    //ADD CONTRACT
    case types.ADD_CONTRACT_DETAILS_REQUEST:
      return { ...state, addingContractDetails: true };
    case types.ADD_CONTRACT_DETAILS_SUCCESS:
      return {
        ...state,
        addingContractDetails: false,
        addContractModal: false,
      };
    case types.ADD_CONTRACT_DETAILS_FAILURE:
      return {
        ...state,
        addingContractDetails: false,
        addingContractDetailsError: true,
      };

    //FETCH EMPLOYEE Contract DETAILS
    case types.GET_EMPLOYEE_CONTRACT_DETAILS_REQUEST:
      return { ...state, fetchingContractDetails: true };
    case types.GET_EMPLOYEE_CONTRACT_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingContractDetails: false,
        contractDetails: action.payload,
      };
    case types.GET_EMPLOYEE_CONTRACT_DETAILS_FAILURE:
      return {
        ...state,
        fetchingContractDetails: false,
        fetchingContractDetailsError: true,
      };

      case types.SET_CONTRACT_EDIT:
        return { ...state, setEditingContract: action.payload };

        case types.HANDLE_UPDATE_CONTRACT_MODAL:
          return { ...state, updateContractModal: action.payload };

    //UPDATE cONTRACT
    case types.UPDATE_CONTRACT_DETAILS_REQUEST:
      return { ...state, updatingContractDetails: true };
    case types.UPDATE_CONTRACT_DETAILS_SUCCESS:
      return {
        ...state,
        updatingContractDetails: false,
        updateContractModal: false,
        contractDetails: state.contractDetails.map((employment, i) => {
          if (employment.id === action.payload.id) {
            return action.payload;
          } else {
            return employment;
          }
        }),
      };
    case types.UPDATE_CONTRACT_DETAILS_FAILURE:
      return {
        ...state,
        updatingContractDetails: false,
        updatingContractDetailsError: true,
      };

      case types.HANDLE_EMAIL_PROFILE_MODAL:
      return { ...state, addEmailProfileModal: action.payload };

      case types.HANDLE_UPDATE_EMAIL_MODAL:
      return { ...state, addUpdateEmailModal: action.payload };

    case types.SET_EMAIL_EDIT:
      return { ...state, setEditingEmail: action.payload };

      case types.ADD_EMAIL_PROFILE_CREDENTIAL_REQUEST:
      return { ...state, addingEmailProfile: true };
    case types.ADD_EMAIL_PROFILE_CREDENTIAL_SUCCESS:
      return {
        ...state,
        addingEmailProfile: false,
        //   addEmailModal: false
      };
    case types.ADD_EMAIL_PROFILE_CREDENTIAL_FAILURE:
      return {
        ...state,
        addingEmailProfile: false,
        addingEmailProfileError: true,
      };

      case types.GET_EMAIL_PROFILE_CREDENTIAL_REQUEST:
      return { ...state, fetchingEmailProfileCredential: true };
    case types.GET_EMAIL_PROFILE_CREDENTIAL_SUCCESS:
      return {
        ...state,
        fetchingEmailProfileCredential: false,
        emailProfileCredential: action.payload,
      };
    case types.GET_EMAIL_PROFILE_CREDENTIAL_FAILURE:
      return {
        ...state,
        fetchingEmailProfileCredential: false,
        fetchingEmailProfileCredentialError: true,
      };

      case types.LINK_EMAIL_STATUS_REQUEST:
        return { ...state, linkingEmailStatus: true };
      case types.LINK_EMAIL_STATUS_SUCCESS:
        return {
          ...state,
          linkingEmailStatus: false,
          emailProfileCredential: state.emailProfileCredential.filter(
            (item) => item.defaultInd === action.payload
          ),
          // cancelOrder: action.payload,
          // candidateByUserId: action.payload,
          // addTeamTransferModal: false,
        };
      case types.LINK_EMAIL_STATUS_FAILURE:
        return {
          ...state,
          linkingEmailStatus: false,
          linkingEmailStatusError: true,
        };


        case types.GET_LINKED_USERS_DOCUMENT_REQUEST:
          return { ...state, fetchingLinkedUsersDocument: true };
        case types.GET_LINKED_USERS_DOCUMENT_SUCCESS:
          return { ...state, fetchingLinkedUsersDocument: false, linkedUserDocument: action.payload };
        case types.GET_LINKED_USERS_DOCUMENT_FAILURE:
          return { ...state, fetchingLinkedUsersDocument: false, fetchingLinkedUsersDocumentError: true };


          case types.ADD_VISA_DETAILS_REQUEST:
            return { ...state, addingVisaDetails: true };
          case types.ADD_VISA_DETAILS_SUCCESS:
            return {
              ...state,
              addingVisaDetails: false,
              addVisaModal: false,
            };
          case types.ADD_VISA_DETAILS_FAILURE:
            return {
              ...state,
              addingVisaDetails: false,
              addingVisaDetailsError: true,
            };


            case types.GET_VISA_DETAILS_REQUEST:
              return { ...state, fetchingVisaDetails: true };
            case types.GET_VISA_DETAILS_SUCCESS:
              return {
                ...state,
                fetchingVisaDetails: false,
                visaDetails: action.payload,
              };
            case types.GET_VISA_DETAILS_FAILURE:
              return {
                ...state,
                fetchingVisaDetails: false,
                fetchingVisaDetailsError: true,
              };

              case types.DELETE_VISA_REQUEST:
                return { ...state, deleteVisa: true };
              case types.DELETE_VISA_SUCCESS:
                return {
                  ...state,
                  deleteVisa: false,
                  // addCallModal: false,
                  visaDetails: state.visaDetails.filter(
                    (item) => item.visaId !== action.payload
                ), 
                };
          
              case types.DELETE_VISA_FAILURE:
                return { ...state, deleteVisa: false, deleteVisaError: true };
          
                case types.HANDLE_UPDATE_VISA_MODAL:
                  return { ...state, updateVisaModal: action.payload };
            
                  case types.SET_VISA_EDIT:
                    return { ...state, setEditingVisa: action.payload };

                        //UPDATE EDUCATION
    case types.UPDATE_VISA_DETAILS_REQUEST:
      return { ...state, updatingVisaDetails: true };
    case types.UPDATE_VISA_DETAILS_SUCCESS:
      return {
        ...state,
        updatingVisaDetails: false,
        updateVisaModal: false,
        visaDetails: state.visaDetails.map((visa, i) => {
          if (visa.visaId === action.payload.visaId) {
            return action.payload;
          } else {
            return visa;
          }
        }),
      };
    case types.UPDATE_VISA_DETAILS_FAILURE:
      return {
        ...state,
        updatingVisaDetails: false,
        updatingVisaDetailsError: true,
      };


      case types.GET_PERFORMANCE_LIST_REQUEST:
        return {
          ...state,
          fetchingPerformance: true,
          fetchingPerformanceError: false,
        };
      case types.GET_PERFORMANCE_LIST_SUCCESS:
        return {
          ...state,
          fetchingPerformance: false,
          performanceList: action.payload,
        };
      case types.GET_PERFORMANCE_LIST_FAILURE:
        return {
          ...state,
          fetchingPerformance: false,
          fetchingPerformanceError: true,
        };


        
        case types.UPDATE_PROFILE_EQUIPMENT_REQUEST:
          return { ...state, updatingProfileEquipment: true };
        case types.UPDATE_PROFILE_EQUIPMENT_SUCCESS:
          // return { ...state, updatingDocuments: false, Documents: [...state.Documents, action.payload] };
          return {
            ...state,
            updatingProfileEquipment: false,
            // serviceLine: state.serviceLine.map((document) =>
            //   document.serviceLineId === action.payload.serviceLineId
            //     ? action.payload
            //     : document
            // ),
          };
        case types.UPDATE_PROFILE_EQUIPMENT_FAILURE:
          return {
            ...state,
            updatingProfileEquipment: false,
            updatingProfileEquipmentError: true,
          };

          case types.GET_EMPLOYEE_EQUIPMENT_REQUEST:
            return { ...state,  fetchingEquipmentEmployee: true };
          case types.GET_EMPLOYEE_EQUIPMENT_SUCCESS:
            return {
              ...state,
              fetchingEquipmentEmployee: false,
               employeeEquipment: action.payload,
            };
          case types.GET_EMPLOYEE_EQUIPMENT_FAILURE:
            return {
              ...state,
              fetchingEquipmentEmployee: false,
              fetchingEquipmentEmployeeError: true,
            };

    default:
      return state;
  }
};
