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
    type: String,
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
<<<<<<< HEAD
        type: String, // TODO: Change type to a Standardized Date Format
=======
        type: Date,
>>>>>>> f0ddb3eb81430c51c3bec715a12532b818eda965
        required: true
      }
    ]
  }
});

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
