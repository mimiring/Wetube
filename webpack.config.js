const path = require("path"); //Node.js에서 파일과 경로를 absolute로 만들어줌(컴퓨터나 서버의 전체 경로를 가짐)
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js" ) //_dirname: 현재 프로젝트의 디렉토리 이름(어디에서든 접근 가능한 Node.js 전역변수)
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ENTRY_FILE,
    mode: MODE,
    module: {
        rules: [
                {
                    test: /\.(scss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                plugin() {
                                    return [autoprefixer({ browsers: "cover 99.5" })];
                                }
                            }
                        },
                        "sass-loader"                    
                    ],
                  },
                ],
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
        })
    ]
};

module.exports = config; //export default 할 수 없으므로 옛날 문법으로 작성