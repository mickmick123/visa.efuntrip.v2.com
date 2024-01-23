/*
  Current APIs
*/

export const APIs = {
  LOGIN_USER: 'v1/login',
  ADD_USER: 'v1/add-user',
  LOGOUT_USER: 'v1/logout',
  GET_CURRENT_USER: 'v1/user-information',
  GET_INTERNAL_USERS: 'v1/internal-users',
  UPDATE_USER_ROLES: 'v1/update-user-roles',
  CHANGE_PASSWORD: 'v1/change-password',

  GET_COUNTRIES: 'v1/countries',
  GET_NATIONALITIES: 'v1/nationalities',
  GET_ROLES: 'v1/roles',
  GET_ROLE: 'v1/roles/get-role',
  ADD_ROLE: 'v1/roles/add-role',
  GET_PERMISSIONS_BY_ROLE: 'v1/roles/get-role-permissions',
  UPDATE_ROLE_ACCESS: 'v1/roles/update-role-access',
  GET_PERMISSIONS: 'v1/permissions',

  /** DASHBOARD **/
  GET_MONTH_SUMMARY: 'v1/dashboard/get-month-summary',
  GET_DASHBOARD_STATISTICS: 'v1/dashboard/by-the-numbers',
  GET_MONTHLY_SUMMARY: 'v1/clients/get-monthly-summary',
  GET_PENDING_SERVICES: 'v1/clients/get-pending-services',
  GET_ON_PROCESS_SERVICES: 'v1/clients/get-on-process-services',
  GET_TODAY_SERVICES: 'v1/clients/get-today-services',
  /** END DASHBOARD **/

  /** CLIENTS **/
  GET_CLIENTS: 'v1/clients/manage-clients',
  GET_CLIENTS_PAGINATE: 'v1/clients/manage-clients-paginate',
  CLIENTS_SEARCH: 'v1/clients/search',
  ADD_CLIENT: 'v1/clients',
  ADD_TEMPORARY_CLIENT: 'v1/clients/add-temporary-client',
  GET_TODAY_TASKS: 'v1/clients/get-today-tasks',
  GET_PAST_TASKS: 'v1/clients/get-past-tasks',
  GET_TOMORROW_TASK: 'v1/clients/get-tomorrow-tasks',
  ADD_TOMORROW_TASK: 'v1/clients/add-tomorrow-tasks',
  UPDATE_PAST_TASK: 'v1/clients/update-past-tasks',
  GET_EMPLOYEES: 'v1/clients/get-employee',
  GET_REMINDERS: 'v1/clients/get-reminders',
  GET_ALL_USERS: 'v1/clients/get-all-users',
  GET_CONTACT_TYPE: 'v1/clients/get-contact-type',
  GET_CONTACT_TYPE_LIST: 'v1/clients/get-contact-type-list',
  ADD_CONTACT_TYPE_LIST: 'v1/clients/add-contact-type-list',
  DELETE_CONTACT_TYPE_LIST: 'v1/clients/delete-contact-type-list',
  CLIENTS_COM_SEARCH: 'v1/clients/search-com',
  // CLIENT PROFILE
  GET_CLIENTS_PROFILE: 'v1/clients',
  GET_CLIENTS_SERVICES: 'v1/clients/get-clients-services',
  GET_CLIENTS_PACKAGES: 'v1/clients/get-clients-packages', // used
  GET_CLIENT_GROUPS: 'v1/clients/get-clients-groups',
  ADD_CLIENT_SERVICE: 'v1/clients/add-client-service',
  EDIT_CLIENT_SERVICE: 'v1/clients/edit-client-service',
  ADD_CLIENT_PACKAGE: 'v1/clients/add-client-package',
  DELETE_CLIENT_PACKAGE: 'v1/clients/delete-client-package',
  ADD_CLIENT_FUND: 'v1/clients/add-client-fund',
  ADD_FUNTRIP_PACKAGE: 'v1/funtrip/add-package',
  UPDATE_FUNTRIP_PACKAGE: 'v1/funtrip/update-package',
  DELETE_FUNTRIP_PACKAGE: 'v1/funtrip/delete-package',
  GET_FUNTRIP_PACKAGE: 'v1/funtrip/get-packages',
  GET_DOCUMENTS_BY_CLIENT: 'v1/client-documents/client',
  GET_ALL_DOCUMENT_TYPE: 'v1/client-documents/document-type',
  UPLOAD_DOCUMENTS_BY_CLIENT: 'v1/client-documents/upload',
  DELETE_DOCUMENT_BY_CLIENT: 'v1/client-documents/delete-client-documents',
  UNPAID_SERVICES: 'v1/clients/unpaid-services',
  ADD_CLIENT_SERVICE_PAYMENT: 'v1/clients/add-service-payment',
  SWITCH_CLIENT_SERVICE_COST: 'v1/clients/switch-client-cost-level',
  GET_DOCUMENTS_ON_HAND: 'v1/clients/get-documents-on-hand',
  ADD_CLIENTS_REMARK: 'v1/clients/add-clients-remark',
  ADD_CLIENT_PAYMENT: 'v1/clients/add-client-payment',
  GET_CLIENTS_REMARKS: 'v1/clients/get-clients-remarks',
  GET_QR_DATA: 'v1/clients/get-qr-data',
  UPDATE_PASSPORT_MONITOR: 'v1/clients/update-passport-monitor',
  GET_PAYMENT_HISTORY: 'v1/clients/get-payment-hostory',
  UNDO_PAYMENT: 'v1/clients/undo-payment',
  GET_CLIENTS_BY_IDS: 'v1/clients/get-clients-by-ids',

  GET_PAY_SERVICES: 'v1/clients/get-pay-services',

  /** END CLIENTS **/

  /** GROUPS **/
  GET_GROUPS_PAGINATE: 'v1/groups/manage-groups-paginate',
  GET_MANAGE_GROUPS: 'v1/groups/manage-groups',
  GROUPS_SEARCH: 'v1/groups/search',
  EXPORT_EXCEL_GROUP_SUMMARY: 'v1/groups/group-summary',
  EXPORT_EXCEL_CLIENT_SUMMARY: 'v1/groups/client-services-by-id-excel',
  // EXPORT_EXCEL_GROUP_SUMMARY: 'v1/groups/export-excel',

  EXPORT_PDF_FUNDS_SUMMARY: 'v1/groups/export-funds-summary',

  // GROUP PROFILE
  GET_GROUP: 'v1/groups',
  GET_MEMBERS_BY_GROUP: 'v1/groups/members',
  GET_GROUP_MEMBERS: 'v1/groups/group-members',

  GET_GROUP_MEMBER_PACKAGES: 'v1/groups/member-packages', // using group id and client id
  GET_GROUP_MEMBER_PACKAGES_BYBATCH: 'v1/groups/packages-bybatch', // using group id
  GET_GROUP_MEMBER_PACKAGES_BYSERVICE: 'v1/groups/packages-byservice', // using group id

  BY_BATCH_MEMBER: 'v1/groups/by-batch-members', // using group id
  BY_MEMBERS_SERVICE: 'v1/groups/by-members-service',
  BY_SERVICE_MEMBER: 'v1/groups/by-service-members',

  GET_CURRENT_BATCH_PAGE: 'v1/groups/current-batch-page',

  // FOR EXPORT EXCEL
  GET_GROUP_MEMBER_BYSERVICE: 'v1/groups/byservice', // using group id
  GET_GROUP_MEMBER_BYBATCH: 'v1/groups/bybatch', // using group id
  GET_GROUP_SERVICES: 'v1/groups/by-group-services', // using group id

  GET_MEMBERS_AND_PACKAGES: 'v1/groups/members-packages',
  ADD_GROUP_MEMBERS: 'v1/groups/add-members',
  ADD_GROUP_SERVICES: 'v1/groups/add-services',
  ASSIGN_GROUP_ROLE: 'v1/groups/assign-role',
  GET_BRANCHES: 'v1/branches',
  UPDATE_GROUP_COMMISSION: 'v1/groups/update-group-commission', // update agent_com_id or client_com_id using group_id and com_type
  GET_GROUP_SERVICES_BY_PROFILE: 'v1/group-service-profile/services',
  GET_GROUP_FUNDS: 'v1/groups/get-funds',
  ADD_GROUP_FUNDS: 'v1/groups/add-funds',
  UPDATE_GROUP_SERVICES: 'v1/groups/edit-services',
  DELETE_GROUP_MEMBER: 'v1/groups/delete-member',
  GET_GROUP_MEMBER_SERVICES: 'v1/groups/client-services',
  GET_MEMBER_SERVICES: 'v1/groups/client-services-by-id',
  TRANSFER_SERVICES: 'v1/groups/transfer',
  TRANSFER_MEMBER: 'v1/groups/transfer-member',
  SWITCH_GROUP_BRANCH: 'v1/groups/switch-branch',
  SWITCH_SERVICE_COST: 'v1/groups/switch-cost-level',
  GET_UNPAID_SERVICES: 'v1/groups/unpaid-services',
  ADD_GROUP_SERVICE_PAYMENT: 'v1/groups/add-service-payment',
  EDIT_GROUP_SERVICE_PAYMENT: 'v1/groups/edit-service-payment',
  UPDATE_GROUP_RISK: 'v1/groups',
  GET_SERVICE_DATES: 'v1/groups/get-service-dates',
  GET_SERVICE_ADDED: 'v1/groups/get-service-added',
  PREVIEW_REPORT: 'v1/groups/preview-report',
  ADD_GROUP_PAYMENT: 'v1/groups/add-group-payment',
  CHECK_IF_MEMBER_EXIST: 'v1/groups/checkif-member-exist',
  ADD_GROUP_REMARK: 'v1/groups/add-group-remark',
  GET_GROUP_HISTORY: 'v1/groups/get-group-history',
  GET_GROUP_DOCUMENT_LOGS: 'v1/logs/get-group-document-logs',
  GET_GROUP_DOCUMENTS_ONHAND: 'v1/logs/get-group-documents-onhand',

  DISTRIBUTE_PAYMENT: 'v1/groups/distribute-old-payment',

  GET_FUND_LIST: 'v1/groups/get-fund-list',
  /** END GROUPS **/

  /** SERVICE MANAGER **/
  SERVICE: 'v1/services',
  ADD_SERVICE: 'v1/services',
  GET_SERVICE: 'v1/services',
  GET_SERVICE_RATE: 'v1/services/get-service-rate',
  DELETE_SERVICE: 'v1/services',
  GET_SERVICES: 'v1/services/manage-services',
  GET_PARENT_SERVICES: 'v1/services/manage-parent-services',
  GET_CLIENT_DOCUMENTS: 'v1/client-document-types',
  ADD_CLIENT_DOCUMENTS: 'v1/client-documents/add',
  UPLOAD_DOCUMENTS: 'v1/client-documents/upload-documents',
  GET_UPLOADED_CLIENT_DOCUMENTS: 'v1/client-documents',
  /** END SERVICE MANAGER **/

  /** SERVICE PROFILE **/
  SERVICE_PROFILE: 'v1/service-profiles',
  GET_CLIENTS_GROUPS: 'v1/service-profiles/get-users-groups',
  /** END SERVICE PROFILE **/

  /** ACTION **/
  GET_ACTIONS: 'v1/actions',
  /** END ACTION **/

  /** SERVICE PROCEDURES **/
  SERVICE_PROCEDURE: 'v1/service-procedures',
  /** END SERVICE PROCEDURES **/

  /** LOGS **/
  GET_TRANSACTION_LOGS: 'v1/logs/get-transaction-logs',
  GET_TRANSACTION_HISTORY: 'v1/logs/get-transaction-history',
  GET_OLD_TRANSACTION_LOGS: 'v1/logs/get-old-transaction-logs',
  GET_GROUP_TRANSACTION_LOGS: 'v1/logs/get-group-transaction-logs',
  GET_COMMISSION_LOGS: 'v1/logs/get-commission-logs',
  GET_ACTION_LOGS: 'v1/logs/get-action-logs',
  GET_DOCUMENT_LOGS: 'v1/logs/get-document-logs',
  GET_ALL_LOGS: 'v1/logs/get-all-logs',
  DELETE_LATEST_DOCUMENT_LOG: 'v1/logs/delete-latest-document-log',
  GET_SERVICE_HISTORY: 'v1/logs/get-service-history',
  /** END LOGS **/

  /** FINANCING **/
  ADD_FINANCE: 'v1/financing',
  GET_FINANCING: 'v1/financing/show',
  GET_BORROWED: 'v1/financing/get-borrowed',
  GET_REQ_USERS: 'v1/financing/get-req-users',
  EXPORT_FINANCIAL: 'v1/financing/export-financial',

  // Finaning delivery
  GET_FINANCING_DELIVERY: 'v1/financing/delivery/show',
  ADD_PURCHASING_BUDGET: 'v1/financing/add-purchasing-budget',
  ADD_DELIVERY_FINANCE: 'v1/financing/add-delivery-finance',
  UPDATE_DELIVERY_FINANCE: 'v1/financing/update-delivery-finance',
  UPDATE_DELIVERY_ROW: 'v1/financing/update-delivery-row',
  DELETE_DELIVERY_ROW: 'v1/financing/delete-delivery-row',
  GET_RETURN_LIST: 'v1/financing/get-return-list',

  /** END SERVICE PROCEDURES **/

  /** DOCUMENTS **/
  GET_ALL_DOCUMENTS: 'v1/documents',
  GET_DOCUMENT: 'v1/documents',
  ADD_SERVICE_DOCUMENTS: 'v1/documents',
  UPDATE_SERVICE_DOCUMENTS: 'v1/documents',
  DELETE_SERVICE_DOCUMENTS: 'v1/documents',
  /** END DOCUMENTS **/

  /** ACCOUNTS MANAGER **/
  GET_ALL_CPANEL_USERS: 'v1/accounts/get-cpanel-users',
  GET_CPANEL_USER: 'v1/accounts',
  ADD_CPANEL_USER: 'v1/accounts',
  UPDATE_CPANEL_USER: 'v1/accounts',
  DELETE_CPANEL_USER: 'v1/accounts',
  /** END ACCOUNTS MANAGER **/

  /** EMPLOYEE DOCUMENTS ON HAND **/
  GET_EMPLOYEE_ON_HAND_DOCUMENTS: 'v1/logs/get-employee-documents-onhand',
  GET_CLIENTS_ON_HAND_DOCUMENTS: 'v1/logs/get-clients-in-docs-onhand',
  EXPORT_EMPLOYEE_ON_HAND_DOCUMENTS: 'v1/logs/export-employee-documents-onhand',
  /** END EMPLOYEE DOCUMENTS ON HAND **/

  /** REPORTS MANAGER **/
  REPORTS: 'v1/reports',
  GET_REPORTS: 'v1/reports',
  GET_REPORTS_CLIENT_SERVICES: 'v1/reports/clients/services',
  GET_CLIENT_REPORTS: 'v1/reports/get-client-reports',
  GET_REPORTS_SERVICES: 'v1/reports/report-services',
  GET_REPORTS_BY_SERVICE: 'v1/reports/reports-by-service',
  REPORTS_GET_DOCUMENTS_BY_ID: 'v1/reports/documentsById',
  REPORTS_GET_DOCUMENTS: 'v1/reports/documents',
  REPORTS_GET_ON_HAND_DOCUMENTS: 'v1/reports/on-hand-documents',
  REPORTS_RECEIVED_DOCUMENTS: 'v1/reports/received-documents',
  REPORTS_RELEASED_DOCUMENTS: 'v1/reports/released-documents',
  REPORTS_TRANSFER_FILES: 'v1/reports/transfer-files',
  REPORTS_GET_RECEIVED_FILES: 'v1/reports/get-received-files',
  REPORTS_STORE_RECEIVED_FILES: 'v1/reports/store-received-files',
  REPORTS_GENERATE_PHOTOCOPIES: 'v1/reports/generate-photocopies',
  CHECK_UPDATE_COST: 'v1/reports/check-updated-cost',
  UPDATE_CLIENT_REPORT_SCORE: 'v1/reports/update-client-report-score',
  // REPORTS_DOCUMENT_LOGS: 'v1/reports/document-logs',
  GET_FILED_SERVICES: 'v1/reports/filed-reports',

  REPORTS_PREPARATION_FOR_FILING: 'v1/reports/preparation-for-filing',

  /** END REPORTS MANAGER **/

  /** BRANCH MANAGER **/
  ADD_BRANCH: 'v1/branches',
  /** END BRANCH MANAGER **/

  /** BREAKDOWNS **/
  SAVE_BREAKDOWNS: 'v1/breakdowns',
  UPDATE_PRICE: 'v1/breakdowns/update-price',
  PROFILE_SWITCH: 'v1/breakdowns/profile-switch',
  /** END BREAKDOWNS **/

  /** ATTENDANCE **/
  GET_ALL_ATTENDANCE: 'v1/attendance',
  TEST_KERNEL: 'v1/attendance/test-kernel',
  /** END ATTENDANCE **/

  /** DEPARTMENTS **/
  GET_ALL_DEPARTMENTS: 'v1/department',
  /** END DEPARTMENTS **/

  /** FORMS **/
  FORM: 'v1/forms',
  /** END FORMS **/

  /** ORDERS **/
  GET_ALL_ORDERS: 'v1/order/list',
  VIEW_ORDER: 'v1/order',
  VIEW_ORDER_LOG: 'v1/order/view-log',
  ADD_PRODUCT_CATEGORY: 'v1/order/add-product-category',
  UPDATE_PRODUCT_CATEGORY: 'v1/order/update-product-category',
  REMOVE_PRODUCT_CATEGORY: 'v1/order/remove-product-category',
  MOVE_PRODUCT_CATEGORY: 'v1/order/move-product-category',
  GET_PRODUCT_CATEGORIES: 'v1/order/product-category',
  GET_PRODUCT_CATEGORY_DETAILS: 'v1/order/get-category-details',
  GET_PRODUCT_CATEGORIES_BY_ID: 'v1/order/get-product-category',
  GET_CATEGORIES_AND_PRODUCT_BY_ID: 'v1/order/get-category-and-products',
  GET_ALL_CATEGORIES: 'v1/order/get-all-product-category',
  GET_PRODUCTS_BY_CAT_ID: 'v1/order/products',
  CHECK_PRODUCTS_IN_ORDER_DETAILS: 'v1/order/check-products-in-order-details',
  REMOVE_PRODUCT: 'v1/order/remove-product',
  MOVE_PRODUCT: 'v1/order/move-product',
  SAVE_ORDERS: 'v1/order',
  DELETE_ORDER: 'v1/order',
  MARK_COMPLETE: 'v1/order/mark-complete',
  UPDATE_PRODUCT: 'v1/order/update-product',
  ADD_PRODUCT: 'v1/order/add-product',
  UPDATE_ORDERS: 'v1/order',
  ORDER_SUMMARY: 'v1/order/summary',
  UPLOAD_PRODUCT: 'v1/order/product-upload',
  USER_ORDER_LIST: 'v1/order/order-list',
  /** END ORDERS **/

  /** INVENTORIES **/
  GET_ALL_INVENTORY_CATEGORY: 'v1/inventory/get-all-inventory-categories',
  GET_TREE_CATEGORY: 'v1/inventory/get-tree-category',
  GET_TAB_CATEGORY: 'v1/inventory/get-tab-category',
  GET_COMPANY_CATEGORY: 'v1/inventory/get-company-category',
  GET_PURCHASE_UNIT: 'v1/inventory/get-purchase-unit',
  GET_SELLING_UNIT: 'v1/inventory/get-selling-unit',
  GET_COMPANY_CATEGORY_INVENTORY: 'v1/inventory/get-company-category-inventory',
  GET_CATEGORY_INVENTORY: 'v1/inventory/get-category-inventory',
  DELETE_INVENTORY_CATEGORY: 'v1/inventory/delete-inventory-category',
  MOVE_INVENTORY_CATEGORY: 'v1/inventory/move-inventory-category',
  ADD_INVENTORY_CATEGORY: 'v1/inventory/add-inventory-category',
  ADD_INVENTORY_CONSUMABLE: 'v1/inventory/add-inventory-consumable',
  DELETE_INVENTORY_CONSUMABLE: 'v1/inventory/delete-inventory-consumable',
  EDIT_INVENTORY_CONSUMABLE: 'v1/inventory/edit-inventory-consumable',
  UPDATE_INVENTORY_CONSUMABLE: 'v1/inventory/update-inventory-consumable',
  ADD_INVENTORY_CONSUME: 'v1/inventory/add-inventory-consume',
  EDIT_INVENTORY_CATEGORY: 'v1/inventory/edit-inventory-category',
  ADD_INVENTORY: 'v1/inventory/add-inventory',
  EDIT_INVENTORY: 'v1/inventory/edit-inventory',
  UPDATE_ITEM_PROFILE_CONSUMABLE: 'v1/inventory/update-item-profile-consumable',
  DELETE_INVENTORY: 'v1/inventory/delete-inventory',
  DISPOSED_INVENTORY: 'v1/inventory/disposed-inventory',
  TRANSFER_INVENTORY: 'v1/inventory/transfer-inventory',
  RETRIEVE_INVENTORY: 'v1/inventory/retrieve-inventory',
  GET_NEWLY_ADDED: 'v1/inventory/get-newly-added',
  GET_NEWLY_MODIFIED: 'v1/inventory/get-modified',
  GET_INVENTORY_LIST: 'v1/inventory/list',
  GET_ITEM_PROFILE: 'v1/inventory/item',
  GET_INVENTORY: 'v1/inventory/get-inventory',
  GET_LOCATION_LIST: 'v1/inventory/list-location',
  DELETE_LOCATION: 'v1/inventory/delete-location',
  GET_INVENTORY_ASSIGNED: 'v1/inventory/list-assigned',
  EDIT_ASSIGNED_ITEM: 'v1/inventory/edit-assigned-item',
  GET_CONSUMED_LIST: 'v1/inventory/get-consumed',
  ASSIGN_INVENTORY: 'v1/inventory/assign-inventory',
  UPDATE_INVENTORY_IMAGE: 'v1/inventory/update-image',
  ADD_MORE_ITEM: 'v1/inventory/add-more-item',
  GET_INVENTORY_ACTION_LOGS: 'v1/inventory/get-action-log',
  GET_USERS_LIST: 'v1/inventory/get-users-list',
  GET_SUPPLIER: 'v1/inventory/get-supplier',
  GET_INVENTORY_CONSUMABLE: 'v1/inventory/list-inventory-consumable',
  GET_REMAINING_PER_LOCATION: 'v1/inventory/list-location-consumable',
  /** END INVENTORIES **/

  /** COMPANIES **/
  GET_COMPANY: 'v1/company/get-company',
  ADD_COMPANY: 'v1/company/add-company',
  EDIT_COMPANY: 'v1/company/edit-company',
  DELETE_COMPANY: 'v1/company/delete-company',
  /** END COMPANIES **/

  /** LOCATIONS**/
  GET_LOCATION: 'v1/location/get-location',
  GET_LOCATION_DETAIL: 'v1/location/get-location-detail',
  GET_LOCATION_CONSUMABLE: 'v1/location/get-location-consumable',

  /** RIDER EVALUATIONS **/
  UPDATE_QA: 'v1/rider-evaluation/update-qa',
  ADD_EVALUATION: 'v1/rider-evaluation/add-evaluation',
  UPDATE_EVALUATION: 'v1/rider-evaluation/update-evaluation',
  DELETE_EVALUATION: 'v1/rider-evaluation/delete-evaluation',
  GET_QA: 'v1/rider-evaluation/get-qa',
  GET_EVALUATION: 'v1/rider-evaluation/get-evaluation',
  GET_EVALUATION_DAY: 'v1/rider-evaluation/get-evaluation-day',
  GET_DAILY_EVALUATION_DETAILS: 'v1/rider-evaluation/get-daily-evaluation-details',
  GET_EVALUATION_MONTH: 'v1/rider-evaluation/get-evaluation-month',
  GET_SUMMARY_EVALUATION_HALF_MONTH: 'v1/rider-evaluation/get-summary-evaluation-half-month',

  /** END LOCATIONS**/
}
