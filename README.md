# Calculus done right

This is the repository for [calculus-done-right.com](https://calculus-done-right.com), a project of mine to build a radical calculus course that aims to teach AP calculus in a few months (or a few weeks for the very dedicated).

I know this is possible since I taught myself AP calculus in ~2-3 months from khan academy, and if I had a time machine and were able to personally tutor my past self I'm sure I could have learned everything in \<1 month. CDR aims to be that tutor

## Contributing

I'm one person and I suck at web development! if you're interested in contributing code, advice or anything really join our [Discord](https://discord.gg/N7Ka6tPjeR) and read our [issues](https://github.com/UlisseMini/calculus-done-right/issues) :D

## Design

I'm taking inspiration (read: copying) [wanikani](https://wanikani.com/)'s approach but for math.
A typical workflow will look like

- Joe logs into CDR, checks his progress and sees how much work he'll need to do to meet his goals
- Joe goes through his reviews for past lessons, this ensures Joe doesn't forget what he's learned even if he's speedrunning. It also ensures he has a solid grasp of prerequisites before moving on
- Joe goes through the new lessons he's unlocked (ones where he has completed the prerequisites). After completing them CDR adds them to his review pile

On a technical level I'm using [nextjs](https://nextjs.org) for the frontend, [mdx](https://mdxjs.com) for content, [mafs](https://mafs.dev) for figures and animations (mafs is basically svg).
On the backend I'm using [fastapi](https://fastapi.tiangolo.com) with postgres for a database.
Authentication is done via oauth2 "Login with X" (currently Google but I plan on adding more).

I'll update this with details once the project is more stable, if I were to write too much now it would become outdated when I change things!

## Development

Add `NEXT_PUBLIC_API_URL="http://localhost:8000"` to `.env.local`

Run `yarn dev` to start the nextjs dev server for the frontend

In `./backend` run `poetry run uvicorn --reload app.main:app`
