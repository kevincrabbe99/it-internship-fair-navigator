# it-internship-fair-navigator

### PROD URL:

https://it-internship-navigator.web.app/ \
https://it-internship-navigator.firebaseapp.com/

## Git Workflow

### Master Branch

Master branch is connected to https://itfnavigator.com & https://api.itfnavifator.com
Any merge into to master branch will make changes to the production site.
Merges into master must pass react-scripts test and the docker container must fully build in Github Actions.

### Dev Branch

Use this branch to create new branches.
Once a branch is complete, create a PR into 'dev' branch.


## Google Cloud Platform Environment
No .env file should be commited to the repository.
GCP Defines env vars. 

### /fe (Front end react app)
https://itfnavigator.com
### /be (Backend Python Flask API)
https://api.itfnavifator.com

## LocalHost Env
Set in local .env file within corresponding directory

### /fe (Front end react app)
http://localhost:3000
### /be (Backend Python Flask API)
http://localhost:8080


