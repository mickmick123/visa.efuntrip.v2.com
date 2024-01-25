import{Z as l,$ as n,a0 as c}from"./index-6280b85b.js";const o="http://api.dev.efuntrip.com/api/",g=l({id:"contents",state:()=>({counter:{},todayTasks:{},tomorrowTasks:{},todayServices:{},onProcessPageServices:{},pendingPageServices:{},listClientsPaginate:{},contactType:{},branchList:{},groupList:{},contactTypeList:{},internalUsers:{},clientServices:{}}),actions:{async getNumbers(){this.counter={loading:!0},n.get(`${o}${c.GET_DASHBOARD_STATISTICS}`,null).then(e=>{this.counter=e.data}).catch(e=>{console.log(e)})},async getContactTypeList(){this.contactTypeList={},n.get(`${o}${c.GET_CONTACT_TYPE_LIST}`,null).then(e=>{this.contactTypeList=e.data.map(t=>({value:t.name,text:t.name,id:t.id}))}).catch(e=>{console.log(e)})},async getContactType(){this.contactType={},n.get(`${o}${c.GET_CONTACT_TYPE}`,null).then(e=>{this.contactType=e}).catch(e=>{console.log(e)})},async getBranches(){this.branchList={},n.get(`${o}${c.GET_BRANCHES}`,null).then(e=>{this.branchList=e.data.branches.map(t=>({value:t.id,text:t.name}))}).catch(e=>{console.log(e)})},async getGroups(){this.groupList={},n.get(`${o}${c.GET_MANAGE_GROUPS}`,null).then(e=>{this.groupList=e.data.groups.map(t=>({value:t.id,text:t.name}))}).catch(e=>{console.log(e)})},async getTodayServices(e,t,s,a){this.todayServices={},n.get(`${o}${c.GET_TODAY_SERVICES}/${e}?page=${t}&sort=created_at-asc&date=${s}&search=${a}`,null).then(i=>{this.todayServices=i.data.data}).catch(i=>{console.log(i)})},async getClients(e,t,s,a){this.listClientsPaginate={},n.get(`${o}${c.GET_CLIENTS_PAGINATE}/${e}?page=${t}&sort=id-desc&search=${a}&branch=${s}`,null).then(i=>{this.listClientsPaginate=i.data}).catch(i=>{console.log(i)})},async getOnProcessServices(e,t,s){this.onProcessPageServices={},n.get(`${o}${c.GET_ON_PROCESS_SERVICES}/${e}?page=${t}&sort=created_at-asc&search=${s}`,null).then(a=>{this.onProcessPageServices=a.data.data}).catch(a=>{console.log(a)})},async getPendingServices(e,t,s){this.pendingPageServices={},n.get(`${o}${c.GET_PENDING_SERVICES}/${e}?page=${t}&sort=created_at-asc&search=${s}`,null).then(a=>{this.pendingPageServices=a.data.data}).catch(a=>{console.log(a)})},async getTodayTasks(){this.todayTasks={},n.get(`${o}${c.GET_TODAY_TASKS}`,null).then(e=>{this.todayTasks=e.data.data}).catch(e=>{console.log(e)})},async getTomorrowTasks(){this.tomorrowTasks={},n.get(`${o}${c.GET_TOMORROW_TASK}`,null).then(e=>{this.tomorrowTasks=e.data.data}).catch(e=>{console.log(e)})},async getInternalUsers(){this.internalUsers={},n.get(`${o}${c.GET_INTERNAL_USERS}`,null).then(e=>{this.internalUsers=e.data.map(t=>{const s=t;let a=!1,i=!1;return Object.keys(t.roles).forEach(function(r){t.roles[r].name=="master"&&(a=!0),t.roles[r].name=="employee"&&(i=!0)}),s.admin=a,s.employee=i,s})}).catch(e=>{console.log(e)})},async getClientServices(e,t){this.clientServices={},n.get(`${o}${c.GET_CLIENTS_SERVICES}/${e}/${t}`,null).then(s=>{this.clientServices=s.data}).catch(s=>{console.log(s)})}}});export{g as u};
