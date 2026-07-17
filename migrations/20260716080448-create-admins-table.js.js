'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
   return db.createTable('admin', {
    id: { type: 'varchar(36)', primaryKey: true,  notNull: true },
    username: { type: 'string', length: 255, notNull: true },
    password: { type: 'string', length: 500, notNull: true },
    created_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
    updated_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
  }).then(() => {
    console.log('buildings table created successfully')
  }).catch((err) => {
    console.error('Error creating buildings table:', err)
  })
};

exports.down = function(db) {
  return db.dropTable('admin')
};

exports._meta = {
  "version": 1
};
