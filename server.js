const app = require('./index.js');
const db = require('./db.js');

const start = async () => {
  await db.authenticate().catch((err) => console.error(err));
  await db.sync().catch((err) => console.error(err));
  app.listen(PORT, () => console.log(`Server started at port:${PORT}`));
};

start();
