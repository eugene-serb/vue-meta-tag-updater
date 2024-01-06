'use strict';

const path = require('path');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  return {
    mode: argv.mode || 'development',
    context: path.resolve(__dirname, 'src'),
    entry: './index.ts',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'index.js',
      libraryTarget: 'commonjs',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      minimize: true,
      innerGraph: true,
      usedExports: true,
    },
    resolve: {
      extensions: ['.js', '.mjs', '.jsx', '.json', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [new ESLintWebpackPlugin(), new CleanWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };
};
