//test stuff here
enum UserRoles {
  "admin" = "admin",
  "user" = "user",
}

interface UserDocument {
  id: number;
  login: string;
  password: string;
  type: UserRoles;
}

// Декоратор-защитник, "замораживающий" значения для полей класса
function frozen(constructor: Function) {
  console.log("замораживаю класс");
  Object.freeze(constructor); // заморозим функцию-конструктор
  Object.freeze(constructor.prototype); // а теперь - прототип
}

// Примените декоратор-защитник к классу AuthService
@frozen
export default class AuthService {
  public static async hash(password: string) {
    const msgUint8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // convert bytes to hex string
    return hashHex;
  }

  public static async compareHash(password: string, hash: string) {
    const passwordHash = await this.hash(password);
    return passwordHash === hash;
  }

  public static async signin(login: string, password: string) {
    //  Хранилище пользователей
    const users: UserDocument[] = [
      {
        id: 0,
        login: "admin",
        password:
          "8fafa3838403970298cc6c258d15058e7d1f9e2c9cbdea7e440abd99e06a1cfc", // пароль practicum
        type: UserRoles.admin,
      },
      {
        id: 1,
        login: "user",
        password:
          "04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb",
        type: UserRoles.user,
      },
    ];

    const user = users.find((u) => u.login === login);
    if (!user) {
      throw new Error("Пользователь не найден");
    }

    if (!(await this.compareHash(password, user.password))) {
      throw new Error("Некорректный логин или пароль");
    }
    return user;
  }
}
