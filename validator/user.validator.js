import { z } from "zod";

const signupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "name should contain atleasst three characters" }),
  username: z
    .string()
    .min(3, { message: "username should contain atleasst three characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password should be atleast 8 characters long" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must not exceed 128 characters" }),
});

const userUpdateSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  username: z
    .string()
    .min(3, { message: "username must be atleast 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must not exceed 128 characters" }),
});

const validateSignup = (data) => {
  try {
    signupSchema.parse(data);
    return { error: null };
  } catch (error) {
    return { error };
  }
};

const validateLogin = (data) => {
  try {
    loginSchema.parse(data);
    return { error: null };
  } catch (error) {
    return { error };
  }
};

const validateuserUpdate = (data) => {
  try {
    userUpdateSchema.parse(data);
    return { error: null };
  } catch (error) {
    return { error };
  }
};

export { validateSignup, validateLogin, validateuserUpdate };
