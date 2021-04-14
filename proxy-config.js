module.exports = [
    {
      context: ["/api","/backend"],
      target: "http://localhost:8080",
      secure: false,
      logLevel: "debug",
    },
  ];
  