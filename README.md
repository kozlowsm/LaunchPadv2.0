# LaunchPadv2.0

LaunchPad version 2.0 - site redesign

## Git workflow resources:

- https://help.github.com/
- https://guides.github.com/introduction/flow/
- https://services.github.com/on-demand/downloads/github-git-cheat-sheet/
- https://guides.github.com/introduction/git-handbook/

## Process for Git Merging

- Go to merging branch and call `git fetch` to ensure branch is up to date with receiving branch.
- Ensure that HEAD is pointing to the correct merge-receiving branch; execute `git checkout <receiving branch>` (`git checkout master`)
- Make sure the receiving branch and the merging branch are up-to-date with the latest remote changes; execute `git pull` on the receiving (master) branch.
- Execute `git merge <branch name>` where 'branch name' is the merging branch.
