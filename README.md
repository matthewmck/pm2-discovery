# PM2 Quick Guide

## cmds cheat sheet
```
pm2 start       # start process
pm2 stop        # stop process
pm2 delete      # delete process
```
**args and flags**

* name of script or config file (i.e. `pm2 start index.js`)
* `--watch` to watch and Restart app when files change
* `--env` to set which environment to run on
* `--name` to give name to the process

```
pm2 status      # condensed overview of running processes
pm2 monit       # detailed overview of running processes
```

If deploying for first time
```
pm2 deploy <configuration_file> <environment> setup
pm2 deploy <configuration_file> <environment> update
```
When ready to push changes to server
```
pm2 deploy <configuration_file> <environment> env
```

## Setup pm2 so others can access the process


1. Create a new group called pm2 or whatever name works for you
```
$ groupadd pm2
```

2. Change the /var/www/ folder group owner to group pm2
```
$ chgrp -R pm2 /var/www
```

3. Add the users who need to access pm2 processes to pm2
```
$ usermod -aG pm2 bob
```

3. Now create an alias for all users. To do this create a script in /etc/profile.d/
```
touch /etc/profile.d/00-aliases.sh
```

**Some notes:**

* `/etc/profile` is a global file that gets run before ~/.profile.
* `/etc/profile.d/` is a folder that contains scripts called by `/etc/profile`
* When `/etc/profile` is called (when you start/login a shell), it searches for any files ending in `.sh` in `/etc/profile.d/` and runs them with one of these commands:
```
source /etc/profile.d/myfile.sh
```
```
. /etc/profile.d/myfile.sh
```
* I'm putting `00-` before the file name to make it execute before the rest of the scripts.
* You can also add your aliases in `/etc/profile`, but this isn't recommended.

4. Inside `00-aliases.sh` insert the following alias
```
alias pm2='env HOME=/var/www pm2'
```
5. Restart any open terminals to apply the changes.

## Startup Script
To create a startup script:

1. run pm2 startup
2. copy the output of that command and paste it back into the terminal. this configures pm2 to run as a daemon service.
3. start all the processes that you want to run automatically
4. run pm2 save.

At any point in the future, to update the list of process, just run pm2 save again.