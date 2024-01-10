import bcrypt from "bcrypt";
const hash = await bcrypt.hash("password", 10);
console.table({ hash });
