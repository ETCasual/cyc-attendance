import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

import * as bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getUserByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          fullName: true,
          cellId: true,

          address: {
            select: {
              street: true,
              country: true,
            },
          },
        },
      });
    }),

  registerUser: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user
        .findUnique({
          where: {
            email: input.email,
          },
          select: {
            uid: true,
            password: true,
          },
        })
        .then(async (data) => {
          if (!data?.uid) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "User not in database!",
            });
          } else if (data.password) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Password has been set!",
            });
          } else {
            const hash = bcrypt.hashSync(input.password, 11);

         await ctx.prisma.account.create({
              data: {
                provider: "credentials",
                providerAccountId: String(data.uid),
                type: "credentials",
                userId:  data.uid ,
              }
            })

             return await ctx.prisma.user.update({
              where: {
                email: input.email,
              },
              data: {
                password: hash,
              },
              select: {
                uid: true,
                email: true,
                fullName: true,
              },
            });

            
          }
        });
    }),

  verifyLogin: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.user
        .findUnique({
          where: { email: input.email },
          select: {
            password: true,
            fullName: true,
            email: true,
            uid: true
          },
        })
        .then((data) => {
          const verified = bcrypt.compareSync(
            input.password,
            data?.password as string
          );
          return {
            result: verified,
            data: verified ? data : null,
          };
        })

        .catch((err) => {
          throw new Error(err as string);
        });
    }),
 

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
