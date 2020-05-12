import "@babel/polyfill";

import app from "./server";

app.listen(3333, () => {
  console.log(Date(), "Opa meu Bacano, porta 3333");
});

export default app;
