# Final Project ***ChatSync*** 💬

<img width="450" alt="Screenshot 2023-07-05 at 16 10 17" src="https://github.com/butterfly-123/final-project/assets/58802893/16de6936-5b0d-4ab5-a627-1c8471d65576">

### How does the application work ❓

ChatSynk is a website where you can create an account, set up your profile, and add people you want to connect with to your contact list. Once you've added someone, you can start chatting with them on a special page. It's a simple and user-friendly way to communicate and connect with people who share your interests.

### Technologies ⚒️


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```txt

/register
- POST => user | error

/login
- POST => user | error

/users
- GET => users[] - list of the users to talk

/user/:id
- GET => user

/categories
- GET => categories[]
- POST => category

/sessions
- POST => session



```
