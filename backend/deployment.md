## Deployment

The backend is deployed to my personal VPS via `git push server`, below I explain how to setup this kind of deployment, I've also written a [blog post](https://uli.rocks/p/git-deployment.html) explaining the main idea.

Put the following in `calculus-done-right/.git/hooks/post-receive` on the server

```bash
#!/bin/bash
set -e

git --work-tree=$HOME/calculus-done-right checkout main --force

cd $HOME/calculus-done-right/backend
source $HOME/.profile # get poetry in path
poetry install

systemctl daemon-reload --user
systemctl restart --user calculus-done-right.service
SYSTEMD_COLORS=true systemctl status --user calculus-done-right.service
```

Setup the unit file on the server

```bash
mkdir -p ~/.config/systemd/user
ln -s $(realpath ./calculus-done-right.service) ~/.config/systemd/user
```

Setup remote and push

```bash
git remote add server ssh://me@myserver/home/me/calculus-done-right/.git
git push server
```
