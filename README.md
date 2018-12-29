# LaunchPadv2.0

LaunchPad version 2.0 - site redesign

## Git workflow resources:

- https://help.github.com/
- https://guides.github.com/introduction/flow/
- https://services.github.com/on-demand/downloads/github-git-cheat-sheet/
- https://guides.github.com/introduction/git-handbook/

## Process for Git Merging:

- Go to merging branch and call `git fetch` to ensure branch is up to date with receiving branch.
- Ensure that HEAD is pointing to the correct merge-receiving branch; execute `git checkout <receiving branch>` (`git checkout master`)
- Make sure the receiving branch and the merging branch are up-to-date with the latest remote changes; execute `git pull` on the receiving (master) branch.
- Execute `git merge <branch name>` where 'branch name' is the merging branch.

## Process for Keeping Fork Up to Date:
- Fetch all remote repos and delete any deleted remote branches: `git fetch --all --prune`
- Switch to master branch: `git checkout master`
- Reset local `master` branch to match `upstream` repo's `master` branch: `git reset --hard <original repo>/master`
- Push changes to your forked repo: `git push <your repo> master`

## CSS/HTML style guidelines:
- https://css-tricks.com/bem-101/ - **Naming convention**
- https://www.toptal.com/front-end/frontend-clean-code-guide - **clean front-end code**
- https://en.bem.info/methodology/quick-start/ - **BEM methodology**
- http://getbem.com/introduction/ - **Simple BEM Guide**


## JavaScript/Node.js guidelines:
- https://github.com/i0natan/nodebestpractices/blob/master/README.md - **Node best practices**
