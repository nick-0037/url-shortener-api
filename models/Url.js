const { Schema, model} = require('mongoose');

const urlSchema = new Schema({
  url: { type: String, unique: true, required: true },
  shortCode: { type: String, unique: true, required: true },
  accessCount: { type: Number, default: 0 }
}, { timestamps: true });

urlSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const URL = model("URL", urlSchema);

module.exports = URL;