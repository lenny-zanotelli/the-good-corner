import * as argon2 from "argon2";
import Cookies from "cookies";
import * as jwt from "jsonwebtoken";
import { JWTContext } from "src";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Message, User, UserInfo, UserInput, UserWithoutPassword } from "../entities/user.entity";
import UserService from "../services/user.service";

@Resolver()
export class UserResolver {

  @Authorized("admin", "manager")
  @Query(() => [User])
  async getAllUsers() {
    return await new UserService().list();
  }

  @Query(() => Message)
  async login(
    @Arg("infos") infos: UserInput,
    @Ctx() ctx: JWTContext
    ) {
    const user = await new UserService().find(infos.email);
    if (!user) {
      throw new Error('Verify your credentials');
    }

    const isPasswordValid = await argon2.verify(user.password, infos.password);  
    const m = new Message();
      if (isPasswordValid) {
        const token = jwt.sign({
          email: user.email,
          role: user.role,
          }, 
          `${process.env.JWT_SECRET_KEY}`,
          { 
          algorithm: 'HS256', 
          expiresIn: '1h'
          }
        );
        console.log("token", token);
        
        let cookies = new Cookies(ctx.req, ctx.res);
        cookies.set("token", token, { httpOnly: true })
        console.log("token user resolver", ctx.req.headers);
        m.message = "Welcome";
        m.success = true;
    } else {
      m.message = "Verify your credentials";
      m.success = false;
    }
    return m;
  }

  @Query(() => Message)
  async logout(@Ctx() ctx: JWTContext) {
    if (ctx.user) {
      let cookies = new Cookies(ctx.req, ctx.res);
      console.log("cookies:", cookies);
      cookies.set("token");
    }
    const m = new Message();
    m.message = "You are disconnected";
    m.success = true;
    return m;
  }
  
  @Mutation(() => UserWithoutPassword)
  async register(@Arg("infos") infos: UserInput) {
    console.log("Mes infos: ", infos);
    const user = await new UserService().find(infos.email);
    if (user) {
      throw new Error("This email is already taken");
    }
    const newUser = await new UserService().create(infos);
    return newUser;
  }

  @Query(() => UserInfo)
  async whoAmI(@Ctx() ctx: JWTContext) {
    if (ctx.user) {
      if (ctx.user.email !== undefined) {
        return { ...ctx.user, isLoggedIn: true };
      } else {
        return { isLoggedIn: false}
      }
    }
    return { isLoggedIn: false }
  }

  @Authorized("admin")
  @Mutation(() => User)
  async deleteUser(@Arg("email") email: string) {
    return await new UserService().delete(email);
  }
}