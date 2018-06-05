import * as Mongoose from "mongoose";

const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");

export type UserModel = Mongoose.Document  & {
    email: string,
    password: string,
    passwordResetToken: string,
    passwordResetExpires: Date,

    facebook: string,
    tokens: AuthToken[],

    profile: {
      name: string,
      gender: string,
      location: string,
      website: string,
      picture: string
    },

    comparePassword: comparePasswordFunction,
    gravatar: (size: number) => string
  };

  type comparePasswordFunction = (user: UserModel,candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

  export type AuthToken = {
    accessToken: string,
    kind: string
  };

 const userSchema = new Mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,

    profile: {
      name: String,
      gender: String,
      location: String,
      website: String,
      picture: String
    }
  }, { timestamps: true });

  /**
   * Password hash middleware.
   */
  userSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err:any, salt:any) => {
      if (err) { return next(err); }
      bcrypt.hash(user.get('password'), salt, undefined, (err: any, hash:any) => {
        if (err) { return next(err); }
        user.set("password",hash);
        next();
      });
    });
  });

  const comparePassword: comparePasswordFunction = function (user:UserModel,candidatePassword, cb) {
    try {
      bcrypt.compare(candidatePassword, user.password, (err: Mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
      });
    } catch (err) {
      return cb("Internal Error",false)
    }
  };

  userSchema.methods.comparePassword = comparePassword;

  /**
   * Helper method for getting user's gravatar.
   */
  userSchema.methods.gravatar = function (size: number) {
    if (!size) {
      size = 200;
    }
    if (!this.email) {
      return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
  };

  // export const User: UserType = mongoose.model<UserType>('User', userSchema);
  const User = Mongoose.model("User", userSchema);
  export let UserSchema = userSchema;
  export default User;
