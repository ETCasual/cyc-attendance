import { prisma } from "../src/server/db";

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: "locolucha@gmail.com",
    },
    update: {},
    create: {
      age: 30,
      email: "locolucha@gmail.com",
      cgRole: "Member",
      fullName: "locobabi",
      icNo: "913524-14-9637",
      status: "OM",
      phoneNumber: "0391352624",
      nickName: "locomcb",
      cluster: "Heart",
      gender: "Male",
      address: {
        create: {
          street: "jalan lemak manis",
          city: "koala lempur",
          state: "sellangor",
          country: "Muaklasia",
          postCode: "56999",
        },
      },

      cellGroup: {
        create: {
          id: "110J",
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
