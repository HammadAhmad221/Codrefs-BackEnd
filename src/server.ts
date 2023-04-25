import  app  from "./bootstrap/bootstrap";
const port = process.env.PORT || 3000;


app.listen(port, () =>
  console.log(`CodeRefs listening at http://localhost:${port}`)
);
