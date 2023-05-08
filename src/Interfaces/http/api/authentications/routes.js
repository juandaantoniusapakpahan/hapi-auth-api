const routes = (handler) => [
  {
    method: "POST",
    path: "/authentications",
    handler: handler.postAuthenticationHandler,
  },
  {
    method: "PUT",
    path: "/authentications",
    handler: handler.putAuthenticationHandler,
  },
  {
    method: "DELETE",
    path: "/authentications",
    handler: handler.deleteAuthenticationHandler,
  },
  {
    method: "GET",
    path: "/check",
    options: {
      auth: "forumapistarterproject_jwt",
    },
    handler: handler.getCheck,
  },
];

module.exports = routes;
