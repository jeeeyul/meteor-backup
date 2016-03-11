meteor-backup
=============

```bash
$ npm install meteor-backup -g
$ meteor-backup -h myapp.meteor.com -o dump
```

Migration Free Meteor.com hosting to MongoLab
=============================================

```bash
meteor-backup -h myapp.meteor.com -o dump

mongorestore --host xxxxx.mlab.com --port 11399 --db dbname --username username --password password dump/myapp_meteor_com
# the last argument, dumped directory, dots are replaced with underscore!
```
