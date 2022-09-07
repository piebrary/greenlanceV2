# Say hello to PieBrary!

PieBrary let's you easily create, update and publish beautiful responsive websites out of the box, both app (web, mobile and desktop) and api. You can use this document for installation guides, update & customization guides, tip & tricks and much more.



# Table of contents
1. [Introduction](#introduction)
2. [VPS](#vps)
    1. [Setup](#vps-setup)
    2. [Firewall](#vps-firewall)
    3. [Nginx proxy api](#vps-nginx)
    4. [SSL](#vps-ssl)
    5. [Email](#vps-email)
3. [Create repository](#create-repository) *creating a new repository from the PieBrary source repository*
4. [Git](#git) *a protocol to store and retrieve your repository from the cloud*
    1. [Connecting](#git-connect) *setting up a connection to Github*
    2. [Cloning](#git-clone) *getting the repository on you computer to edit*
    3. [Pulling](#git-pull) *updating your local Git repository with changes made on other computers*
    4. [Committing](#git-commit) *updating your local Git registry with your changes*
    5. [Pushing](#git-push) *pushing your edited repository to the Git cloud*
    6. [Workflow](#git-workflow) *workflow of working with Git*
5. [Publishing App](#publishing-app) *publishing your website to the web*
6. [Building and submitting Mobile Client](#building-mobile-client) *building your mobile app and submit it to Appstore or Google Play*
7. [Building Desktop Client](#building-desktop-client) *Building your desktop app to an executable*
8. [PieBrary](#piebrary)
    1. [App](#piebrary-app)
	    1. [Components](#piebrary-app-components)
	    2. [Themes](#piebrary-app-themes)
	    3. [Styles](#piebrary-app-styles)
    2. [Api](#piebrary-api)
	    1. [API Endpoints](#piebrary-api-endpoints)


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



### Create Repository<a name="create-repository"></a>
The PieBrary Github repository serves as a basis for any new PieBrary derived project. It can be used to easily jumpstart a new repository but requires some important steps.
- 1: Copy PieBrary to linux with `git clone git@github.com:piebrary/piebrary`
- 2: Create a new repository in target account on Github website
- 3: In local folder run `git remote set-url --push origin git@github.com/[account]/[repository]`
- 4: Run `git push` to push the repository contents to the new folder in Github


## Git<a name="git"></a>
Git is a protocol which securely stores your repository in the cloud. This way you always have a backup, you can browse the history of the changes made and even work with multiple people on the same project. In this documentation we use Github but there are many more Git clients.

## Connect<a name="git-connect"></a>
To communicate with Github we need to have a secure connection with Github. We will be using ssh to perform actions and thus need to create and register a ssh key.

### Clone<a name="git-clone"></a>
Cloning means you create a copy or so called clone of the repository on the current device (be it your computer or for example a VPS) to work on or to publish.

### Pull<a name="git-pull"></a>
With Git command Pull you retrieve an updated version of the repository you are in from the cloud. Always do this when you're starting to work on a repository that other people also work on.

### Commit<a name="git-commit"></a>
Committing is updating the registry of you local Git repository with the changes you have made. In this step you're not sending your changes to the cloud but you are just updating your registry.

### Push<a name="git-push"></a>
Pushing is the process of sending you new repository version to the Git cloud. This makes your version available to other people working on it, so called collaborators.

### Workflow<a name="git-workflow"></a>

> Only once

First you should connect to Github and register SSH key. This gives you access to the Repo you want to close and push to.
- Log in to your VPS and run the `ssh-keygen` command
- Just press enter to store the key in de default location with default name (probably id_rsa)
- Choose a password to protect the key. This password must be given on every action you make to Github
- Again enter password
- Now the key is created
- Copy the contents of the [keyname, probably id_rsa].pub to Github.com => settings => SSH and GPG keys => New SSH key
- The key is now stored on Github and you can connect to your repository from the VPS

When you've not worked on the Git repository you want to work it, you have to fetch a copy from the cloud with the following command:

Run `git clone https://github.com/[username]/[repository-name]`

- [username] = the username of the name of the organization who owns the repository
- [repository] = the name of the repository

Then install the NPM modules in both the app and api folders.
Run `cd [repository-name]/app` and run `npm install`
When finished go to the api folder with `cd ../api` and run `npm install`

> Every time you work on your repository

Every time you start working on you Git repository you need to get the last changes, so use Pull

`git pull`

After you've worked on the repository you want to update your local registry with the changes you've made
- First stage all changes: `git add .`
- Then commit them with a message with `git commit -m "my message i.e. short detail about the changes"`
- Then push them to the cloud with `git push`
- Lastly you want to publish the website to the web, follow the next section [Publishing](#publishing) for that workflow

## Publishing App<a name="publishing-app"></a>
With publishing we mean downloading the updated repository with it's chances on the api, create a build package from that and copy the build files to the folder where your website is hosted. If we made api changes we also need to restart our api api.

- First navigate to the repository with the command line. When you are in the repositories top level folder we will fetch or pull the changes. Use `git pull`
- Then we want to create a build package of the repository. First navigate to the app folder with `cd app` and then build the source with `npm run build`
- When the process succeeded we copy the files to the location where our website is hosted. Normally this location is `/var/www/html`. Copy the files with `sudo cp -r build/* /var/www/html` and provide your password. The newly build website is now available to the web.
- When changes were made to the api, we need to navigate there with `cd ../api` and restart the process with `pm2 restart [repository-name]-api`

## Building and submitting Mobile Client<a name="building-mobile-client"></a>
Submitting your app to the Appstore or Google Play makes it available on iOS and Android devices. The process is handled by expo to make it easy to build and submit without needing a macOS device.

- First navigate to the mobile-client repository in you main folder
- Increment the version number in package.json. If you don't, Apple will tell you you already have a build with that version number and won't accept the new build
- Run `eas build -p ios` to create an iOS binary or `eas build -p android` to create an Android binary
- To Submit run `eas submit -p ios` or `eas submit -p android`

## Building Desktop Client<a name="building-desktop-client"></a>
