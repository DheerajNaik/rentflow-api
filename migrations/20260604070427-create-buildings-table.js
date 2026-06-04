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
  return db.createTable('buildings', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
    name: { type: 'string', length: 255, notNull: true },
    address: { type: 'string', length: 500, notNull: true },
    city: { type: 'string', length: 100, notNull: true },
    yearly_tax: { type: 'decimal', notNull: true, defaultValue: 0 },
    is_active: { type: 'tinyint', length: 1, notNull: true, defaultValue: 1 },
    created_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
    updated_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
  }).then(() => {
    console.log('buildings table created successfully')
  }).catch((err) => {
    console.error('Error creating buildings table:', err)
  })
}

exports.down = function(db) {
  return db.dropTable('buildings')
}


exports._meta = {
  "version": 1
};
