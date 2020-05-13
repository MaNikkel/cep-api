import { Schema, Document, Model, model } from "mongoose";
import { CepInterface } from "../interfaces";

const CepSchema = new Schema({
  cep: {
    type: String,
    required: true,
    unique: true
  },
  cep_data: {
    type: Object
  }
});

interface ICepSchema extends Document {
  cep: string;
  cep_data?: object;
}

CepSchema.methods.saveCep = function(cep: CepInterface) {
  this.cep = cep.cep.replace("-", "");
  this.cep_data = { ...cep };
  return this.save();
};

export interface ICep extends ICepSchema {
  saveCep(cep: CepInterface): void;
}

CepSchema.statics.findByCep = async function(cep: string): Promise<ICepSchema> {
  return this.findOne({ cep: cep });
};

export interface ICepModel extends Model<ICep> {
  findByCep(cep: string): Promise<ICep>;
}

export default model<ICep, ICepModel>("Cep", CepSchema);
