import type { Program, TransformerFactory, SourceFile } from 'typescript'
import type { Configuration } from 'webpack'

import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import transcriptIsTransformer from 'typescript-is/lib/transform-inline/transformer'

const commonConfig: Configuration = {

}

const extensionConfig: Configuration = {
  target: 'node',
  entry: {
    extension: './src/extension/extension.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'extension'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../../[resource-path]'
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        extensions: ['.ts']
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/u,
        exclude: /node_modules/u,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: (program: Program): { before: TransformerFactory<SourceFile>[] } => ({
                before: [transcriptIsTransformer(program)]
              })
            }
          }
        ]
      }
    ]
  }
}

const viewConfig: Configuration = {
  target: 'web',
  entry: {
    view: './src/view/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'view'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../../[resource-path]'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    plugins: [
      new TsconfigPathsPlugin({
        extensions: ['.ts', '.vue']
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/u,
        exclude: /node_modules/u,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: (program: Program): { before: TransformerFactory<SourceFile>[] } => ({
                before: [transcriptIsTransformer(program)]
              }),
              appendTsSuffixTo: [/\.vue$/u]
            }
          }
        ]
      },
      {
        test: /\.vue$/u,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.scss$/u,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      scriptLoading: 'defer',
      title: 'Extension Prioritizer Webview View',
      template: 'src/view/assets/index.ejs'
    })
  ]
}

export default [
  extensionConfig,
  viewConfig
]
