import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    issueDate: {
      type: Date,
      default: Date.now
    },
    returnDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["issued", "returned"],
      default: "issued"
    },
    fine: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);
