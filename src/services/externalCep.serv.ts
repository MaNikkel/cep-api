import axios from "axios";

export async function consultViaCep(cep: string) {
  try {
    const response = await axios.get(`${process.env.VIACEP_URL}/${cep}/json/`);
    console.log(response);
    return response;
  } catch (error) {
    // uses the app.ts error handler
    console.log(error);
    const err = new Error(error);
    throw {
      error: err
    };
  }
}
