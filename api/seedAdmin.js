import User from "./models/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const makeSuperAdmin = async () => {
  try {
    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      process.env.SUPER_ADMIN_PASSWORD,
      salt
    );

    const user = await User.findOneAndUpdate(
      { email: process.env.SUPER_ADMIN_EMAIL },
      {
        name: process.env.SUPER_ADMIN_NAME,
        password: hashedPassword,
        role: "admin",
        status: "active",
      },
      { new: true, upsert: true }
    );

    if (!user) {
      console.log("❌ Superadmin user not found");
    } else {
      console.log("✅ Superadmin enforced");
    }
  } catch (error) {
    console.error("❌ Superadmin enforcement failed:", error.message);
  }
};

makeSuperAdmin();
