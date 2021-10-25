import app from './index.js';
import db from './db.js';

const PORT = process.env.PORT || 3000;

const start = async () => {
  await db.authenticate().catch((err) => console.error(err));
  await db.sync().catch((err) => console.error(err));
  app.listen(PORT, () => console.log(`Server started at port:${PORT}`));
};

start();
