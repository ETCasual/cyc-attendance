import { prisma } from "../src/server/db";

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: "casualorient@gmail.com",
    },
    update: {},
    create: {
      age: 30,
      email: "casualorient@gmail.com",
      cgRole: "CGL",
      fullName: "Chin Jia Hao",
      icNo: "000106-14-1101",
      status: "CGL",
      phoneNumber: "0172412866",
      nickName: "ET",
      cluster: "Heart",
      gender: "Male",
      address: {
        create: {
          street: "J7, Jalan Cahaya 12",
          city: "Ampang",
          state: "Selangor",
          country: "Malaysia",
          postCode: "68000",
        },
      },

      cellGroup: {
        create: {
          id: "27T",
        },
      },
    },
  });
  console.log(user);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
