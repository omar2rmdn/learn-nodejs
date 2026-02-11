import bcrypt from "bcrypt";

async function hashPass(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePass(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export { hashPass, comparePass };
