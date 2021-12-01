# it-internship-fair-navigator

## PRODUCTION URL:

https://itfnavigator.com
<br><br>

# DEV ENVIRONMENTS AND IMAGES
## Development
### ReactJS Application
Runs on `localhost:3000`
```
$ cd fe
& npm start
```
### Python Backend Application
Runs on `localhost:8080`
```
$ cd ../be
& python3 -u app.py
```
### .env file for local environment <br>
`/be/.env` SCHEMA
```
DBUSER = u...r
DBPWD = E..o
DBNAMEDEV = I...V
DBNAMEPROD = I...B
```
https://drive.google.com/file/d/1zXI2bmEIGzMkHOlpznIr_HxLojGvs6O1/view?usp=sharing
<br><br>


## Production
### ReactJS Application
Statically Served on `https://itfnavigator.com`
```
$ build
    - '--no-cache'
    - '-t'
    - '$_GCR_HOSTNAME/$PROJECT_ID/$REPO_NAME/$_SERVICE_NAME:$COMMIT_SHA'
    - fe
    - '-f'
    - fe/Dockerfile
```
Automatically deployed by GCP Cloud Build Trigger
<br>
### Python Backend Application
Runs on `https://api.itfnavigator.com`
```
- build
    - '--no-cache'
    - '-t'
    - '$_GCR_HOSTNAME/$PROJECT_ID/$REPO_NAME/$_SERVICE_NAME:$COMMIT_SHA'
    - be
    - '-f'
    - be/Dockerfile
```
Automatically deployed by GCP Cloud Build Trigger

<br><br>

# Git Workflow

## Master Branch
Master branch is connected to https://itfnavigator.com
Any merge into to master branch will rebuild and redeploy all containers on the production site.

## Dev Branch
Use this branch to create new branches.
Once a branch is complete, create a PR into 'dev' branch.
<br><br>

# External Links
### Google Cloud Platform
https://console.cloud.google.com/home/dashboard?project=itifn-332516

### Google Domains DNS Settings
https://domains.google.com/registrar/itfnavigator.com

### MongoDB
https://mongodb.com

### Trello KanBan Dv Board
https://trello.com/b/eS1w2h00/kanban-dev-board

### Google Drive Resources
https://drive.google.com/drive/folders/1ImD_tsF3vkpQE9kT58JDhQ5ZK4rnBz7N


