meteor-backup
=============

```bash
$ npm install meteor-backup -g
$ meteor-backup -h myapp.meteor.com -o dump
```

Migration Free Meteor.com hosting to MongoLab
=============================================

```bash
$ meteor-backup -h myapp.meteor.com -o dump

$ mongorestore --host xxxxx.mlab.com \    # database informations from mLab
  --port 11399 \
  --db mongolab_dbname \
  --username mongolab_db_username \
  --password mongolab_db_password \
  dump/myapp_meteor_com                   # dumped directory, dots are replaced with underscore!
```
