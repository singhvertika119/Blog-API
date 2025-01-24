import { z } from "zod";

const createCategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "the name should contain atleast 3 characters" }),
  description: z
    .string()
    .min(10, { message: "the description should be 10 characters long" }),
});

const updateCategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "the name should contain atleast 3 characters" }),
  description: z
    .string()
    .min(10, { message: "the description should be 10 characters long" }),
});

const validateCreate = (data) => {
  try {
    createCategorySchema.parse(data);
    return { error: null };
  } catch (error) {
    return { error };
  }
};

const validateUpdate = (data) => {
  try {
    updateCategorySchema.parse(data);
    return { error: null };
  } catch (error) {
    return { error };
  }
};

export { validateCreate, validateUpdate };
