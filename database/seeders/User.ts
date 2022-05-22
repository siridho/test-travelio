import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'admin',
        email: 'admin@email.com',
        password: 'secret',
      },
      {
        name: 'admin1',
        email: 'admin1@email.com',
        password: 'supersecret',
      },
    ])
  }
}
