# MAMBO.IN.UA

Source code for MAMBO.IN.UA.

Live version available at [https://mambo.in.ua](https://mambo.in.ua).

I am a huge fan of tacking minimalism to its extreme, so here is how my
home page looks like:

![Main Page](./docs/src/main_page.jpg)

That's right, there are no cluttered submenus, no useless footers and no
unnecessary information.

This site is primarily used as my portfolio, though it can also host
random JS projects (check out my [Tetris
Game](https://mambo.in.ua/projects/tetris)).

You are free to copy and/or modify this site without giving credit.

## Development

```zsh
npm i  # install dependencies
npm run dev  # start a development server
```

This would start the development server at
[http://locahlost:3000](http://locahlost:3000).

## Production

```zsh
npm i  # install dependencies
npm run build  # begin the build process
npm run start  # start production server
```

This would start the production server at
[http://locahlost:3000](http://locahlost:3000).

Afterward, you can deploy this site at
[https://vercel.com](https://vercel.com).

Alternatively, you can configure a reverse proxy (e.x Nginx)
that would handle the SSL certificate and forward the requests to
port 80, which should be made externally available.
