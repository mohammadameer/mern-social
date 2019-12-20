import config from "../config/config";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddeware from "webpack-hot-middleware";
import webpackConfig from "../webpack.config.client";

const compile = app => {
  if (config.env == "development") {
    const compiler = webpack(webpackConfig);
    const middleware = webpackMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath
    });
    app.use(middleware);
    app.use(webpackHotMiddeware(compiler));
  }
};

export default {
  compile
};
