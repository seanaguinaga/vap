const { resolve } = require("path");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

const wasmFile = devMode
  ? resolve(
      __dirname,
      "node_modules",
      "mediainfo.js",
      "dist",
      "MediaInfoModule.wasm"
    )
  : resolve(__dirname, "node_modules", "mediainfo.js", "dist");
const dist = devMode ? "." : resolve("build", "static", "js");

// template from https://www.npmjs.com/package/react-app-rewired

module.exports = devMode
  ? function override(config, env) {
      config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: "workerize-loader" },
      });

      const wasmExtensionRegExp = /\.wasm$/;

      config.resolve.extensions.push(".wasm");

      config.module.rules.forEach((rule) => {
        (rule.oneOf || []).forEach((oneOf) => {
          if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
            // Make file-loader ignore WASM files
            oneOf.exclude.push(wasmExtensionRegExp);
          }
        });
      });

      // Add a dedicated loader for WASM
      config.module.rules.push({
        test: wasmExtensionRegExp,
        include: path.resolve(__dirname, "src"),
        use: [{ loader: require.resolve("wasm-loader"), options: {} }],
      });

      // template from https://www.npmjs.com/package/react-app-rewired
      config.plugins.push(
        new CopyPlugin({
          patterns: [{ from: wasmFile, to: dist }],
        })
      );

      return config;
    }
  : {
      webpack: function (config, env) {
        config.plugins.push(
          new CopyPlugin({
            patterns: [{ from: wasmFile, to: dist }],
          })
        );
        return config;
      },
    };
