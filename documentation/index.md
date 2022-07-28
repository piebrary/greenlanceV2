# Say hello to PieBrary!

PieBrary let's you easily create, update and publish beautiful responsive websites out of the box, both frontend and backend. You can use this document for installation guides, update & customization guides, tip & tricks and much more.



# Table of contents
1. [Introduction](#introduction)
2. [VPS](#vps)
    1. [Setup](#vps-setup)
    2. [Firewall](#vps-firewall)
    3. [Nginx proxy server](#vps-nginx)
    4. [SSL](#vps-ssl)
    5. [Email](#vps-email)
3. [Git](#git) *a protocol to store and retrieve your repository from the cloud*
    1. [Cloning](#git-clone) *getting the repository on you computer to edit*
    2. [Pulling](#git-pull) *updating your local Git repository with changes made on other computers*
    3. [Committing](#git-commit) *updating your local Git registry with your changes*
    4. [Pushing](#git-publishing) *pushing your edited repository to the Git cloud*
    5. [Workflow](#git-workflow) *workflow of working with Git*
4. [Publishing](#publishing) *publishing your website to the web*
5. [PieBrary](#piebrary)
    1. [Frontend](#piebrary-frontend)
	    2. [Components](#piebrary-frontend-components)
	    3. [Themes](#piebrary-frontend-themes)
	    4. [Styles](#piebrary-frontend-styles)
    2. [Backend](#piebrary-backend)
	    1. [API Endpoints](#piebrary-backend-endpoints)


## This is the introduction <a name="introduction"></a>
This is the introduction



## VPS <a name="vps"></a>
VPS

### VPS-setup <a name="vps-setup"></a>
VPS-setup

### VPS-firewall<a name="vps-firewall"></a>
VPS-firewall

### VPS-ssl<a name="vps-ssl"></a>
*test test test*
VPS-ssl

### VPS-email<a name="vps-email"></a>
VPS-email



## Git<a name="git"></a>
Git is a protocol which securely stores your repository in the cloud. This way you always have a backup, you can browse the history of the changes made and even work with multiple people on the same project. In this documentation we use Github but there are many more Git clients.

### Git-cloning<a name="git-cloning"></a>
Cloning means you create a copy or so called clone of the repository on the current device (be it your computer or for example a VPS) to work on or to publish.

### Git-pulling<a name="git-pulling"></a>
With Git command Pull you retrieve an updated version of the repository you are in from the cloud. Always do this when you're starting to work on a repository that other people also work on.

### Git-committing<a name="git-committing"></a>
Committing is updating the registry of you local Git repository with the changes you have made. In this step you're not sending your changes to the cloud but you are just updating your registry.

### Git-pushing<a name="git-pushing"></a>
Pushing is the process of sending you new repository version to the Git cloud. This makes your version available to other people working on it, so called collaborators.

### Git-workflow<a name="git-workflow"></a>
When you've not worked on the Git repository you want to work it, you have to fetch a copy from the cloud with the following command:

Run `git clone https://github.com/[username]/[repository-name]`

- [username] = the username of the name of the organization who owns the repository
- [repository] = the name of the repository

Then install the NPM modules in both the frontend and backend folders.
Run `cd [repository-name]/frontend` and run `npm install`
When finished go to the backend folder with `cd ../backend` and run `npm install`

When you start working on you Git repository you need to get the last changes, so use Pull

`git pull`

After you've worked on the repository you want to update your local registry with the changes you've made
- First stage all changes: `git add .`
- Then commit them with a message with `git commit -m "my message i.e. short detail about the changes"`
- Then push them to the cloud with `git push`
- Lastly you want to publish the website to the web, follow the next section [Publishing](#publishing) for that workflow

## Publishing<a name="publishing"></a>
With publishing we mean downloading the updated repository with it's chances on the server, create a build package from that and copy the build files to the folder where your website is hosted. If we made backend changes we also need to restart our backend server.

- First navigate to the repository with the command line. When you are in the repositories top level folder we will fetch or pull the changes. Use `git pull`
- Then we want to create a build package of the repository. First navigate to the frontend folder with `cd frontend` and then build the source with `npm run build`
- When the process succeeded we copy the files to the location where our website is hosted. Normally this location is `/var/www/html`. Copy the files with `sudo cp -r build/* /var/www/html` and provide your password. The newly build website is now available to the web.
- When changes were made to the backend, we need to navigate there with `cd ../backend` and restart the process with `pm2 restart [repository-name]-api`
