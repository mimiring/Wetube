const path = require("path"); //Node.js에서 파일과 경로를 absolute로 만들어줌(컴퓨터나 서버의 전체 경로를 가짐)

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js" ) //_dirname: 현재 프로젝트의 디렉토리 이름(어디에서든 접근 가능한 Node.js 전역변수)
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ENTRY_FILE,
    output: {
        path: OUTPUT_DIR,
        filename: "[name].[format]"
    }
};

module.exports = config; //export default 할 수 없으므로 옛날 문법으로 작성