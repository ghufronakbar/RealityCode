const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const validateAdmin = async () => {
  const admin = await prisma.admin.findMany();
  if (admin.length > 0) {
    console.log("Admin already exist");
    return false;
  }
  console.log("Admin not exist");
  return true;
};

const createAdmin = async () => {
  const admin = await prisma.admin.create({
    data: {
      email: "lanstheprodigy@gmail.com",
      password: await bcrypt.hash("Abogoboga.1919", 10),
    },
  });
  console.log("Admin created");
  return admin;
};

const seed = async () => {
  try {
    const validate = await validateAdmin();
    if (validate) {
      await createAdmin();
    }
    console.log("Seeded successfully");
  } catch (error) {
    console.log("Seeding failed");
    console.log(error);
  }
};

seed()
  .then(() => process.exit())
  .catch((err) => console.error(err));
