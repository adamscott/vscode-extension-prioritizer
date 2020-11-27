import type { Program, TransformerFactory, SourceFile } from 'typescript'

import path from 'path'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import transcriptIsTransformer from 'typescript-is/lib/transform-inline/transformer'
import { VueLoaderPlugin } from 'vue-loader'
import { Configuration, DefinePlugin } from 'webpack'

const commonConfig: Configuration = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    plugins: [
      new TsconfigPathsPlugin({
        extensions: ['.ts', '.vue']
      })
    ]
  }
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
  externals: {
    vscode: 'commonjs vscode'
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
              getCustomTransformers: (program: Program): { before: Array<TransformerFactory<SourceFile>> } => ({
                before: [transcriptIsTransformer(program)]
              })
            }
          }
        ]
      }
    ]
  },
  ...commonConfig
}

const viewConfig: Configuration = {
  target: 'web',
  entry: {
    view: './src/view/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'view'),
    filename: '[name].js',
    libraryTarget: 'umd',
    devtoolModuleFilenameTemplate: '../../[resource-path]'
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
              getCustomTransformers: (program: Program): { before: Array<TransformerFactory<SourceFile>> } => ({
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
    new DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
    })
  ],
  ...commonConfig
}

export default [
  viewConfig,
  extensionConfig
]
