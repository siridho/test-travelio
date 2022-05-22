import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Wishlists extends BaseSchema {
  protected tableName = 'wishlists'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('book_title').nullable()
      table.json('book_detail').nullable()
      table.integer('user_id').unsigned().references('id').inTable('users').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
