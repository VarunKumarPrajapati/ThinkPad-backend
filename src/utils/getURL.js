const { FRONTEND_DOMAIN, DOMAIN, NODE_ENV } = process.env;

function getFrontendUrl() {
  const protocol = NODE_ENV === "production" ? "https://" : "http://";
  return `${protocol}${FRONTEND_DOMAIN}`;
}

function getBackendUrl() {
  const protocol = NODE_ENV === "production" ? "https://" : "http://";
  return `${protocol}${DOMAIN}`;
}

module.exports = { getFrontendUrl, getBackendUrl };
