import mongoose from "mongoose";

const { Schema } = mongoose;

const StudentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  studentID: {
    type: String,
    required: true,
    unique: true
  },
  schoolName: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  clubName: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  checkInTimes: {
    type: [
      {
        type: Date,
        required: true
      }
    ]
  }
});

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
