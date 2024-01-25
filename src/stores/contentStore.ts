import { defineStore } from 'pinia'

import { fetchWrapper } from '../helpers'
import { APIs } from '../services/apis'

const baseUrl = `${import.meta.env.VITE_APP_API_BASE}`

export const useContentStore = defineStore({
  id: 'contents',
  state: () => ({
    counter: {},
    todayTasks: {},
    tomorrowTasks: {},
    todayServices: {},
    onProcessPageServices: {},
    pendingPageServices: {},
    listClientsPaginate: {},
    contactType: {},
    branchList: {},
    groupList: {},
    contactTypeList: {},
    internalUsers: {},
    clientServices: {}
  }),
  actions: {
    async getNumbers() {
      this.counter = { loading: true }
      fetchWrapper
        .get(`${baseUrl}${APIs.GET_DASHBOARD_STATISTICS}`, null)
        .then((res) => {
          this.counter = res.data
        })
        .catch((error: any) => {
          console.log(error)
        })
    },
    async getContactTypeList() {
      this.contactTypeList = {}
      fetchWrapper
        .get(`${baseUrl}${APIs.GET_CONTACT_TYPE_LIST}`, null)
        .then((res) => {
          this.contactTypeList = res.data.map((b: any) => {
            return {
              value: b.name,
              text: b.name,
              id: b.id,
            }
          })
        })
        .catch((error: any) => {
          console.log(error)
        })
    },

    async getContactType() {
      this.contactType = {}
      fetchWrapper
        .get(`${baseUrl}${APIs.GET_CONTACT_TYPE}`, null)
        .then((res) => {
          this.contactType = res
        })
        .catch((error: any) => {
          console.log(error)
        })
    },
    async getBranches() {
      this.branchList = {}
      fetchWrapper
        .get(`${baseUrl}${APIs.GET_BRANCHES}`, null)
        .then((res) => {
          this.branchList = res.data.branches.map((b: any) => {
            return {
              value: b.id,
              text: b.name,
            }
          })
        })
        .catch((error: any) => {
          console.log(error)
        })
    },
    async getGroups() {
      this.groupList = {}
      fetchWrapper
        .get(`${baseUrl}${APIs.GET_MANAGE_GROUPS}`, null)
        .then((res) => {
          this.groupList = res.data.groups.map((b: any) => {
            return {
              value: b.id,
              text: b.name,
            }
          })
        })
        .catch((error: any) => {
          console.log(error)
        })
    },
    async getTodayServices(per_page: Number, page: Number, date: any, search: any) {
      this.todayServices = {}
      fetchWrapper
        .get(
          `${baseUrl}${APIs.GET_TODAY_SERVICES}/${per_page}?page=${page}&sort=created_at-asc&date=${date}&search=${search}`,
          null,
        )
        .then((res) => {
          this.todayServices = res.data.data
        })
        .catch((error: any) => {
          console.log(error)
        })
    },

    async getClients(per_page: Number, page: Number, branch: any, search: any) {
      this.listClientsPaginate = {}
      fetchWrapper
        .get(
          `${baseUrl}${APIs.GET_CLIENTS_PAGINATE}/${per_page}?page=${page}&sort=id-desc&search=${search}&branch=${branch}`,
          null,
        )
        .then((res) => {
          this.listClientsPaginate = res.data
        })
        .catch((error: any) => {
          console.log(error)
        })
    },

    async getOnProcessServices(per_page: Number, page: Number, search: any) {
      this.onProcessPageServices = {}
      fetchWrapper
        .get(
          `${baseUrl}${APIs.GET_ON_PROCESS_SERVICES}/${per_page}?page=${page}&sort=created_at-asc&search=${search}`,
          null,
        )
        .then((res) => {
          this.onProcessPageServices = res.data.data
        })
        .catch((error: any) => {
          console.log(error)
        })
    },

    async getPendingServices(per_page: Number, page: Number, search: any) {
      this.pendingPageServices = {}
      fetchWrapper
        .get(
          `${baseUrl}${APIs.GET_PENDING_SERVICES}/${per_page}?page=${page}&sort=created_at-asc&search=${search}`,
          null,
        )
        .then((res) => {
          this.pendingPageServices = res.data.data
        })
        .catch((error: any) => {
          console.log(error)
        })
    },

    async getTodayTasks() {
      this.todayTasks = {}
      fetchWrapper
        .get(`${baseUrl}${APIs.GET_TODAY_TASKS}`, null)
        .then((res) => {
          this.todayTasks = res.data.data
        })
        .catch((error: any) => {
          console.log(error)
        })
    },
    async getTomorrowTasks() {
      this.tomorrowTasks = {}
      fetchWrapper
        .get(`${baseUrl}${APIs.GET_TOMORROW_TASK}`, null)
        .then((res) => {
          this.tomorrowTasks = res.data.data
        })
        .catch((error: any) => {
          console.log(error)
        })
    },
    async getInternalUsers() {
      this.internalUsers = {}
      fetchWrapper
        .get(`${baseUrl}${APIs.GET_INTERNAL_USERS}`, null)
        .then((res) => {
          this.internalUsers = res.data.map((u: any) => {
            const newUser = u
            var isMaster = false
            var isEmployee = false
            Object.keys(u.roles).forEach(function (key) {
              if (u.roles[key].name == 'master') {
                isMaster = true
              }
              if (u.roles[key].name == 'employee') {
                isEmployee = true
              }
            })
            newUser.admin = isMaster
            newUser.employee = isEmployee
            return newUser
          })
        })
        .catch((error: any) => {
          console.log(error)
        })
    },
    async getClientServices(client_id: any, package_number: any) {
      this.clientServices = {}
      fetchWrapper.get(`${baseUrl}${APIs.GET_CLIENTS_SERVICES}/${client_id}/${package_number}`, null)
        .then((res) => {
          this.clientServices = res.data
        })
        .catch((error: any) => {
          console.log(error)
        })
    },
  },
})
