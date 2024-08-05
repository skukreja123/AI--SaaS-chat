// connection and listener
import app from "./app.js";
import { connecttodatabase } from "./db/connection.js";
const PORT = process.env.PORT || 5000;
connecttodatabase()
    .then(() => {
    app.listen(PORT, () => console.log("Server Open and connected to database"));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map