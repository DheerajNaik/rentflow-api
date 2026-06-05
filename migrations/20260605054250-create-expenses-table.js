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
  return db.createTable('expenses', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
    building_id: { type: 'int', notNull: true },
    house_id: { type: 'int', notNull: false },
    amount_paid: { type: 'decimal', notNull: true },
    expense_date: { type: 'date', notNull: true },
    category:{type: 'string',notNull: false },
    description:{type: 'text',notNull: false },
    created_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
    updated_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
  }).then(() => {
    console.log('expenses table created successfully')
  }).catch((err) => {
    console.error('Error creating expenses table:', err)
  })

};

exports.down = function(db) {
  return db.dropTable("expenses")
};

exports._meta = {
  "version": 1
};
