# Doing development like a developer

Our first lecture today was on the various tools that are going to make up your toolkit for the time you are a student at Lighthouse Labs. The three tools we focused on today include:

* Vagrant
* Sublime / Atom
* git

We also went over an outline of the curriculum and talked about the various ways that Lighthouse will be evaluating your progress as a student. [Here is a link to those slides](https://www.dropbox.com/s/594thppzdquilkk/W1D1%20-%20Afternoon%20Web%20-%20Sept052016.pdf?dl=1)

## Tools

### [Vagrant](https://www.vagrantup.com/)

When it comes to [vagrant](https://www.vagrantup.com/), this is our development environment. It is the operating system, libraries, and encapsulated workspace in which we will work on projects for a particular company or for a particular piece of software. It is common to have many vagrant machines (virtual machines inside your OS) for various projects, and developers can be expected to have to set up a virtual machine when joining a new company.

### [Sublime Text](http://www.sublimetext.com/) / [Atom](https://atom.io/)
Sublime (or alternatively Atom) is our main code editor, that is going to do some important things for us, such as (but not limited to):

* Syntax highlighting
* Multiple file editing (tabbed editor)
* cmd-T/ctrl-p to find files in our projects
* Automatically update to reflect changes on disk

### git

The git utility was written by Linus Torvalds to support development of the Linux kernel. It is a Version Control System (VCS) which allows us to keep track of changes to our projects and efficiently collaborate with others on the work.

In git, a file will always be in one of *four* possible states:

- **Un-tracked**: The file was created and exists on your machine, but git is pretty much ignoring its existence at the moment.
- **Staged**: You've used `git add` to include the file on the next commit. You can also say staged files are in the _commit index_ or _staging area_.
- **Committed**: a commit has been created with the `add`ed files; this file is now actively under version control. Note that the file **hasn't been sent to Github (or other remote repository) yet!** It's committed only to your _local repository_. You can create as many commits as you want before pushing, and each commit is a point in time to where you can return and change things.
- **Pushed**: the file has been sent to the remote repository, also known as _upstream_.

[There's a pretty good interactive git cheatsheet here](http://www.ndpsoftware.com/git-cheatsheet.html), and another one ready for printing [here](https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf).

We went over a number of features of git, including:

* `git init`
* `git add`
* `git status`
* `git commit`
* `git checkout -b branchname`
* `git checkout master`
* `git merge branchname`
* `git branch`
* `git remote add origin`
* `git push origin master`
* `git pull origin master`

Another important thing to remember is that **you can't change files in a repository (or gist) you don't own**. This means you can only change the contents of a repo or gist if you either **fork it** or are invited by the owner to contribute.

---
*Breakout notes adapted from Dan Burks - thanks man!*
