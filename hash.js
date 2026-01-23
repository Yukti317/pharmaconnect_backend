import bcrypt from 'bcryptjs'

async function generateHash() {
  const users = [
    { name: "Admin User", password: "Admin@123" },
    { name: "Rohan Sharma", password: "Bde@123" },
    { name: "Priya Singh", password: "Manager@123" }
  ];

  for (let user of users) {
    const hash = await bcrypt.hash(user.password, 10);
    console.log(`${user.name} → ${hash}`);
  }
}

generateHash();
