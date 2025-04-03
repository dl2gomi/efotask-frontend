const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api`;

// task
export const taskListUrl = `${apiBaseUrl}/app/tasks`;

// user
export const userInfoUrl = `${apiBaseUrl}/app/users/me`;
export const selectRoleUrl = `${apiBaseUrl}/app/users/role`;

// credit
export const depositAckUrl = `${apiBaseUrl}/app/credits/deposit`;
export const creditsInfoUrl = `${apiBaseUrl}/app/credits/info`;
export const creditsHistoryUrl = `${apiBaseUrl}/app/credits/history`;

// ads channel
export const channelConfirmUrl = `${apiBaseUrl}/app/ads/confirmchannel`;
export const adsAddUrl = `${apiBaseUrl}/app/ads`;
export const adsListUrl = `${apiBaseUrl}/app/ads`;
export const adsDetailUrl = `${apiBaseUrl}/app/ads`;
