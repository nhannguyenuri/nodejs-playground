import { mongoose } from '../config/mongo.js';

const MySchema = new mongoose.Schema({
  foo: String,
  bar: Number,
});

const MyModel = mongoose.model('my_collection', MySchema);

const test = async () => {
  const logs = await MyModel.find();
  console.log(logs);
};

export { MySchema, MyModel, test };
