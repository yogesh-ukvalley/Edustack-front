export const API_BASE_URL = "http://localhost:4000";

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/api/contact`,
  GET_CONTACTS: `${API_BASE_URL}/api/admin/contacts`,
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  STAFF: `${API_BASE_URL}/api/admin/staff`,
  CONTACT_STATUS: (id: string) => `${API_BASE_URL}/api/admin/contacts/${id}/status`,
  FOLLOW_UPS: `${API_BASE_URL}/api/admin/contacts/follow-ups`,
};