
# infinito

An infinite photo gallery, using photos from unsplash and user submitted photos

View it live at [infinito.com](https://www.infinito.vercel.app)


## Features

- Masonry grid of photos
- User submitted content
- User Dashboard
- NSFW Detection of photos


## Tech Stack

**Client:** React, Chakra-UI

**Server:** NextJS, Firebase

**Hosting:** Vercel

## Contributing

Contributions are always welcome!

If you have an idea for a cool feature, or want to complain about some annoying UX choice, open a issue!


## Run Locally

Clone the project

```bash
  git clone https://github.com/MartyMcKnife/infinito.git
```

Go to the project directory

```bash
  cd infinito
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_FIREBASE_API_KEY`

`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`

`NEXT_PUBLIC_FIREBASE_PROJECT_ID`

`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`

`NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`

`NEXT_PUBLIC_FIREBASE_APP_ID`

`FIREBASE_ADMIN` <- This is just a string of a json file containing your Firebase admin details

`NEXT_PUBLIC_MEASUREMENT_ID`

`NEXT_PUBLIC_UNSPLASH_ACCESS`

`NEXT_PUBLIC_CLOUDINARY_NAME`
