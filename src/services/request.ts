import { fetchWrapper } from '../helpers'
import axios from 'axios'
import { APIs } from './apis'
import { postHelper } from '../helpers/axiosHelper'
const baseUrl = `${import.meta.env.VITE_APP_API_BASE}`
export const addClient = async (
  contact_alternate: any,
  branches: any,
  groups: any,
  gender: any,
  civil_status: any,
  first_name: any,
  last_name: any,
  middle_name: any,
  nationalities: any,
  birth_country: any,
  birth_date: any,
  address: any,
  email: any,
  height: any,
  weight: any,
  passport: any,
  passport_expiration_date: any,
  extended_expiration_date: any,
  first_expiration_date: any,
  arrival_date: any,
  expiration_date: any,
  icard_expiration_date: any,
  icard_issue_date: any,
  contact_numbers: any,
  visa_type: any,
) => {
  const res = await fetchWrapper.post(`${baseUrl}${APIs.ADD_CLIENT}`, {
    contact_alternate,
    branches,
    groups,
    gender,
    civil_status,
    first_name,
    last_name,
    middle_name,
    nationalities,
    birth_country,
    birth_date,
    address,
    email,
    height,
    weight,
    passport,
    passport_expiration_date,
    extended_expiration_date,
    first_expiration_date,
    arrival_date,
    expiration_date,
    icard_expiration_date,
    icard_issue_date,
    contact_numbers,
    visa_type,
  })

  return res
}

export const addContactType = async (name: any) => {
  const res = await fetchWrapper.post(`${baseUrl}${APIs.ADD_CONTACT_TYPE_LIST}`, {
    name,
  })

  return res
}

export const deleteContactType = async (id: any) => {
  const res = await fetchWrapper.post(`${baseUrl}${APIs.DELETE_CONTACT_TYPE_LIST}`, {
    id,
  })

  return res
}

export const addUser = async (first_name: any, middle_name: any, last_name: any, email: any, password: any) => {
  const res = await fetchWrapper.post(`${baseUrl}${APIs.ADD_USER}`, {
    first_name,
    last_name,
    middle_name,
    email,
    password,
  })

  return res
}

export const updateUserRoles = async (id: any, admin: any, employee: any) => {
  const res = await fetchWrapper.post(`${baseUrl}${APIs.UPDATE_USER_ROLES}`, {
    id,
    admin,
    employee,
  })

  return res
}

export const changeUserPassword = async (id: any, password: any) => {
  const res = await fetchWrapper.post(`${baseUrl}${APIs.CHANGE_PASSWORD}`, {
    id,
    password,
  })

  return res
}

export const addClientRemarks = async (id: any, remarks: any) => {
  const res = await fetchWrapper.post(`${baseUrl}${APIs.ADD_CLIENTS_REMARK}`, {
    id,
    remarks,
  })

  return res
}

export const exportExcelClientSummary = async (options: any) => {
  const res = await postHelper(`${baseUrl}${APIs.EXPORT_EXCEL_CLIENT_SUMMARY}`, options)

  return res.data
}

export const getClientServices = async (id: any) => {
  const res = await fetchWrapper.get(`${baseUrl}${APIs.GET_MEMBER_SERVICES}/${id}`, null)

  return res
}

export const getClientProfile = async (id: any) => {
  const res = await fetchWrapper.get(`${baseUrl}${APIs.GET_CLIENTS_PROFILE}/${id}`, null)

  return res
}

export const getClientDocuments = async (id: any) => {
  const res = await fetchWrapper.get(`${baseUrl}${APIs.GET_DOCUMENTS_BY_CLIENT}/${id}`, null)

  return res
}

export const getAllDocumentTypes = async () => {
  const res = await fetchWrapper.post(`${baseUrl}${APIs.GET_ALL_DOCUMENT_TYPE}`, null)

  return res
}

export const uploadClientDocument = async (params: any) => {
  const res = await fetchWrapper.post(`${baseUrl}${APIs.UPLOAD_DOCUMENTS_BY_CLIENT}/${params.client_id}`, {
    client_id: params.client_id,
    data: [
      params
    ]
  })

  return res
}

export const getClientRemarks = async (id: any) => {
  const res = await fetchWrapper.get(`${baseUrl}${APIs.GET_CLIENTS_REMARKS}/${id}`, null)

  return res
}

export const getTransactionHistory = async (id: any) => {
  const res = await fetchWrapper.get(`${baseUrl}${APIs.GET_TRANSACTION_HISTORY}/${id}/0`, null)

  return res
}

export const addClientFund = async (params: any) => {
  const res = await fetchWrapper.post(`${baseUrl}${APIs.ADD_CLIENT_FUND}`, {
    ...params
  })

  return res
}

export const getClientBySearch = async (search: any) => {
  const res = await fetchWrapper.get(`${baseUrl}${APIs.CLIENTS_SEARCH}?search=${search}&branch_id=1&is_member_search=false`, null)

  return res
}

export const getGroupBySearch = async (search: any) => {
  const res = await fetchWrapper.get(`${baseUrl}${APIs.GROUPS_SEARCH}?search=${search}`, null)

  return res
}

export const getClientPackages = async (id: any) => {
  const res = await fetchWrapper.get(`${baseUrl}${APIs.GET_CLIENTS_PACKAGES}/${id}`, null)

  return res
}

export const addClientPackage = async (client_id: any) => {
  const res = await fetchWrapper.post(`${baseUrl}${APIs.ADD_CLIENT_PACKAGE}`, {
    client_id: client_id
  })

  return res
}

export const getPackageServices = async (client_id: any, package_number: any) => {
  const res = await fetchWrapper.get(`${baseUrl}${APIs.GET_CLIENTS_SERVICES}/${client_id}/${package_number}`, null)

  return res
}

export const getServices = async () => {
  const res = await fetchWrapper.get(`${baseUrl}${APIs.GET_SERVICES}`, null)

  return res
}

export const addClientService = async (params: any) => {
  const res = await fetchWrapper.post(`${baseUrl}${APIs.ADD_CLIENT_SERVICE}`, {
    ...params
  })

  return res
}

export const payClientService = async (params: any) => {
  const res = await fetchWrapper.post(`${baseUrl}${APIs.ADD_CLIENT_PAYMENT}`, {
    ...params
  })

  return res
}



