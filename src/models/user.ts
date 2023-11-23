import { model, Schema } from "mongoose";

interface IUser {
  name: {
    type: string;
    default: "Жак-Ив Кусто";
  };
  about: {
    type: string;
    default: "Исследователь";
  };
  avatar: {
    type: string;
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png";
  };
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
  },
});

const User = model<IUser>("user", userSchema);
export default User;
