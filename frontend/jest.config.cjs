module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc-node/jest",
  },
  moduleNameMapper: {
    "\\.svg$": "jest-transform-stub",
    "\\.css$": "identity-obj-proxy",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
