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
  return db.createTable('houses', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
    building_id: { type: 'int', notNull: true },
    house_name: { type: 'string', length: 500, notNull: true },
    electricity_meter_account_number: { type: 'string', length: 100, notNull: true },
    electricity_meter_rr_number: { type: 'string', length: 100, notNull: true },
    rent_amount: { type: 'decimal', notNull: true },
    is_active: { type: 'tinyint', length: 1, notNull: true, defaultValue: 1 },
    created_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
    updated_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
  }).then(() => {
    console.log('houses table created successfully')
  }).catch((err) => {
    console.error('Error creating houses table:', err)
  })
};

exports.down = function(db) {
  return db.dropTable('houses')
 
};

exports._meta = {
  "version": 1
};
