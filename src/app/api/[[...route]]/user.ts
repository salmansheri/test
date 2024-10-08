import db from "@/lib/db";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono()
  .get("/", async (c) => {
    const users = await db.user.findMany();

    if (!users) {
      return c.json(
        {
          error: "Cannot find Users",
        },
        400,
      );
    }

    return c.json(
      {
        data: users,
      },
      200,
    );
  })
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const param = c.req.valid("param");

    const user = await db.user.findUnique({
      where: {
        id: param.id,
      },
    });

    if (!user) {
      return c.json(
        {
          error: "No User",
        },
        400,
      );
    }

    return c.json(
      {
        data: user,
      },
      200,
    );
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        address: z.string(),
        phoneNumber: z.string(),
      }),
    ),
    async (c) => {
      const values = c.req.valid("json");

      const user = await db.user.create({
        data: {
          ...values,
        },
      });

      if (!user) {
        return c.json(
          {
            error: "Cannot create User",
          },
          400,
        );
      }

      return c.json(
        {
          data: user,
        },
        200,
      );
    },
  )
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator(
      "json",
      z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        email: z.string().optional(),
        address: z.string().optional(),
        phoneNumber: z.string().optional(),
      }),
    ),
    async (c) => {
      const param = c.req.valid("param");
      const values = c.req.valid("json");

      const user = await db.user.update({
        where: {
          id: param.id,
        },
        data: {
          ...values,
        },
      });

      if (!user) {
        return c.json(
          {
            error: "Cannot Update User",
          },
          400,
        );
      }

      return c.json(
        {
          data: user,
        },
        200,
      );
    },
  )
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");

      const user = await db.user.delete({
        where: {
          id,
        },
      });

      if (!user) {
        return c.json(
          {
            error: "Cannot Delete the user",
          },
          400,
        );
      }

      return c.json(
        {
          data: user,
        },
        200,
      );
    },
  );

export default app;
