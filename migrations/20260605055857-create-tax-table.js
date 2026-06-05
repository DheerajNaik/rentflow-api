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
  return db.createTable('tax', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
    building_id: { type: 'int', notNull: true },
    tax_amount_paid: { type: 'decimal', notNull: true },
    tax_paid_date: { type: 'date', notNull: true },
    tax_year: { type: 'string', notNull: true },
    bbmp_tax_account_number: { type: 'string', notNull: true },
    receipt_url: { type: 'string', notNull: false },
    notes:{type: 'text',notNull: false },
    created_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
    updated_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
  }).then(() => {
    console.log('tax table created successfully')
  }).catch((err) => {
    console.error('Error creating tax table:', err)
  })

};

exports.down = function(db) {
  return db.dropTable("tax")
};

exports._meta = {
  "version": 1
};
