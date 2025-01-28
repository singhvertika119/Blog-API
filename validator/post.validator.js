import { z } from "zod";

const createPostSchema = z.object({
  title: z
    .string()
    .min(3, { messsage: "the title should be atleast 3 characters" })
    .max(100, { message: "the title should not exceed 100 characters" }),
  content: z
    .string()
    .min(10, { message: "the content must be atleast 10 characters long" }),
  category: z.string().min(1, { message: "Category ID is required" }),
});

const updatePostSchema = z.object({
  title: z
    .string()
    .min(3, { messsage: "the title should be atleast 3 characters" })
    .max(100, { message: "the title should not exceed 100 characters" }),
  content: z
    .string()
    .min(10, { message: "the content must be atleast 10 characters long" }),
});

const validatePost = (data) => {
  try {
    createPostSchema.parse(data);
    return { error: null };
  } catch (error) {
    return { error };
  }
};

const validatePostUpdate = (data) => {
  try {
    updatePostSchema.parse(data);
    return { error: null };
  } catch (error) {
    return { error };
  }
};

export { validatePost, validatePostUpdate };
