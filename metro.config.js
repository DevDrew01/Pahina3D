const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Register .onnx as bundled static asset
defaultConfig.resolver.assetExts.push('onnx');

module.exports = defaultConfig;