# What is Koop?

Basically it's a tool that lets you build your own **ETL** (**E**xtract **T**ransform **L**oad).

[Link to documentation](https://koopjs.github.io/docs/basics/what-is-koop)

# koop-cli

- [koop-cli](https://github.com/koopjs/koop-cli)


## Basic Example

Create a new Koop application with the name `my-koop-app`

``` bash
# create a project folder and initialize it
koop new app my-koop-app

# cd in the folder
cd my-koop-app
```

Add a provider [@koopjs/filesystem-s3](https://github.com/koopjs/koop-filesystem-s3) from npm

``` bash
# install the provider and register it to the koop app
koop add provider @koopjs/filesystem-s3
```

Add a custom provider that connects to a local database

``` bash
# add boilerplate provider files at src/providers/local-db and register it to
# the koop app (though you still need to implement the provider)
koop add provider providers/local-db --local
```

Test out your work

``` bash
# run the koop server
koop serve
```
