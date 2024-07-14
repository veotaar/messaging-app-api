import { TypeOf, object, string } from 'zod';

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: 'Name is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password must be at least 6 characters'),
    passwordConfirm: string({
      required_error: 'Password is required',
    }).min(6, 'Password confirmation must be at least 6 characters'),
    email: string({
      required_error: 'Email is required',
    }).email('Please enter a valid email'),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  }),
});

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Please enter a valid email'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password must be at least 6 characters'),
  })
});

export const friendsSchema = object({
  params: object({
    userId: string({
      required_error: 'user ID is required',
    }),
  })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type LoginInput = TypeOf<typeof loginSchema>;
export type FriendsInput = TypeOf<typeof friendsSchema>;