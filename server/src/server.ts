import app from "./index";
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening at https://localhost:${port}`);
});
