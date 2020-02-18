import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
	fileUrl : {
		type : String,
		required : "File URL is required"
	},
	title : {
		type : String,
		required : "Title is required"
	},
	description : {
		type : String,
		required : "Description is required"
	},
	views : {
		type : Number,
		default : 0
	},
	createdAd : {
		type : Date,
		default : Date.now
	}
});

const model = mongoose.model("Video", VideoSchema);
export default model;
