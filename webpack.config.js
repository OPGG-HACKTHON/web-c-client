const webpack = require('webpack');
const readline = require('readline');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const getAjeGag = require('./config/getAjeGag');
const aliasResolver = require('./aliasResolver.config');

const buildStartAndArzeGag = async () => {
  try {
    const { quiz, answer } = getAjeGag();

    console.info('빌드를 시작합니다.');
    console.info(quiz);
    console.info('');

    return answer;
  } catch (e) {
    console.error(`아재개그 출력 에러 - ${e.message}`);
    return null;
  }
};

module.exports = async (outSideEnv = {}) => {
  const env = {
    ...outSideEnv,
    ...process.env,
    SERVICE_MODE: outSideEnv.SERVICE_MODE || process.env.SERVICE_MODE || 'local',
    PUBLIC_URL: '',
  };

  const host = env.HOST || 'localhost';
  const port = env.PORT || 4000;
  let localOptions = {};

  switch (env.SERVICE_MODE.toLowerCase()) {
    case 'test':
      env.CLIENT_BASE_URL = 'https://URL';
      env.API_BASE_URL = 'https://URL';
      env.PUBLIC_PATH = `${env.CLIENT_BASE_URL}/`;
      env.SERVICE_MODE = 'test';
      localOptions = {
        devtool: 'eval-source-map',
      };
      break;

    case 'prod':
      env.CLIENT_BASE_URL = 'https://URL';
      env.API_BASE_URL = 'https://URL';
      env.PUBLIC_PATH = `${env.CLIENT_BASE_URL}/`;
      env.SERVICE_MODE = 'prod';
      break;

    default:
      env.CLIENT_BASE_URL = 'http://localhost:4000';
      env.API_BASE_URL = 'http://localhost:3000';
      env.PUBLIC_PATH = '/';
      env.SERVICE_MODE = 'local';
      localOptions = {
        devtool: 'eval-source-map',
      };
  }

  const answer = await buildStartAndArzeGag();

  return {
    ...localOptions,

    entry: ['react-hot-loader/patch', path.resolve(__dirname, './src/index.js')],
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: env.PUBLIC_PATH,
      filename: 'bundle.js',
      sourceMapFilename: '[name].js.map',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },

        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },

        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/images/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          include: path.resolve(__dirname, './src/global/fonts'),
          exclude: /node_modules/,
          loader: require.resolve('file-loader'),
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
        {
          test: /\.svg$/i,
          use: [{
            loader: 'url-loader',
            options: {
              generator: content => svgToMiniDataURI(content.toString()),
            },
          }],
        },

        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'resolve-url-loader',
            {
              loader: require.resolve('sass-loader'),
              options: {
                sassOptions: {
                  includePaths: [path.join(__dirname, './src/global/styles/stylesheets')],
                },
              },
            },
            {
              loader: require.resolve('sass-resources-loader'),
              options: {
                resources: path.join(__dirname, './src/global/styles/stylesheets/_all.scss'),
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  modifyVars: {
                    'primary-color': '#1890ff',
                    'danger-color': '#dc3545',
                    'info-color': '#2972ff',
                    'green-color': '#28a745',
                    'yellow-color': '#ffc107',
                    'cyan-color': '#1890ff',
                  },
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },

    ...aliasResolver(),

    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(env),
      }),

      new HtmlWebpackPlugin({
        inject: true,
        template: 'public/index.html',
        filename: `index.html?version=${new Date().getTime()}`,
      }),

      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env),

      new StylelintPlugin({
        fix: true,
        exclude: ['node_modules', '.history'],
      }),

      new webpack.ProgressPlugin({
        activeModules: false,
        entries: true,
        handler(percentage, message, ...args) {
          if (percentage === 0.05 || percentage === 0.1) {
            console.info('');
            return;
          }
          if (percentage <= 0.1) {
            return;
          }

          readline.moveCursor(process.stdout, 0, -1);
          readline.clearLine(process.stdout);
          console.info(`빌드 중... 잠시만 기다려 주세요. [${(percentage * 100).toFixed(0)}%]  `, message, ...args);

          if (percentage === 1) {
            console.info('');
            if (answer) {
              console.info(`정답: ${answer}!`);
              console.info('');
            }
          }
        },
        modules: true,
        modulesCount: 5000,
        profile: false,
        dependencies: true,
        dependenciesCount: 10000,
        percentBy: null,
      }),

      // new BundleAnalyzerPlugin(),
    ],
    devServer: {
      https: env.HTTPS,
      host,
      port,
      static: [{
        directory: path.resolve(__dirname, './public'),
        publicPath: env.PUBLIC_PATH,
      }],
      historyApiFallback: true,

      // react-hot 이 대체
      hot: false,
    },
  };
};
