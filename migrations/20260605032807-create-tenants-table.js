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
 return db.createTable('tenants', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
    name: { type: 'string', length: 500, notNull: true },
    phone_number: { type: 'string', length: 100, notNull: true },
    aadhar_number: { type: 'string', length: 100, notNull: true },
    emergency_contact_name: { type: 'string',  notNull: false },
    emergency_contact_number: { type: 'string', length: 100, notNull: false },

    notes:{type: 'text',notNull: false },
    is_active: { type: 'tinyint', length: 1, notNull: true, defaultValue: 1 },
    created_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
    updated_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
  }).then(() => {
    console.log('tenants table created successfully')
  }).catch((err) => {
    console.error('Error creating tenants table:', err)
  })
};

exports.down = function(db) {
   return db.dropTable('tenants')
};

exports._meta = {
  "version": 1
};
