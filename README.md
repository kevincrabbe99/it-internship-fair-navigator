# it-internship-fair-navigator

### PROD URL:

https://it-internship-navigator.web.app/ \
https://it-internship-navigator.firebaseapp.com/

## Git Workflow

### Master Branch

Master branch is connected to https://it-internship-navigator.firebaseapp.com/
Any merge into to master branch will make changes to the production site.
Merges into master must pass react-scripts test and the docker container must fully build in Github Actions.

### Dev Branch

Use this branch to create new branches.
Once a branch is complete, create a PR into 'dev' branch.

### Preview Pull Requests

When a PR is created you can preview the changes in on Firebase -> Hosting -> Preview.

Setup node Environment on windows
https://www.tutorialsteacher.com/nodejs/setup-nodejs-development-environment
