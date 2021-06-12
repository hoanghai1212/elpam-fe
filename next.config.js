const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  images: {
    domains: ['drive.google.com']
  },
  future: {
    webpack5: true,
  },
});
