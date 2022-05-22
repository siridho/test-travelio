import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Wishlist from 'App/Models/Wishlist'
import axios from 'axios'

export default class WishlistsController {
  public async index(ctx: HttpContextContract) {
    const wishlists = await Wishlist.all()
    return ctx.view.render('wishlists/index', { wishlists })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('wishlists/new', { wishlist: {} })
  }

  public async store({ request, response, session, auth }: HttpContextContract) {
    const data = await this.validateInput(request)

    await Wishlist.create({
      bookTitle: data.input('bookTitle'),
      bookDetail: request.input('content'),
      userId: auth.user.id,
    })
    // return response.redirect(`/wishlists/${wishlist.slug}`)
    session.flash('notification', 'Wishlist saved.')
    return response.redirect().back()
  }

  public async search({ request, response, session }: HttpContextContract) {
    // const { title } = request.body
    // const { data } = await axios(`https://www.googleapis.com/books/v1/volumes?q=${title}`).then(
    //   (response) => {
    //     return response
    //   }
    // )
    return response.redirect().back()
  }

  private async validateInput(request) {
    const valSchema = schema.create({
      bookTitle: schema.string({ trim: true }, [rules.maxLength(150), rules.required()]),
    })

    return await request.validate({
      schema: valSchema,
      messages: {
        'bookTitle.required': 'Book Title is required',
        'bookTitle.maxLength': 'Book Title allows upto 150 characters',
      },
    })
  }
}
