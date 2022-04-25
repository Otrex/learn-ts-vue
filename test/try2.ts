const userEmails = ["p.shaddel@gmail.com", "test@gmail.com"];
function CheckDuplicateUser() {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    console.log(descriptor);

    const childFunction = descriptor.value;
    descriptor.value = (...args: any[]) => {
      const emails = userEmails;
      if (emails.indexOf(args[0].email) !== -1) {
        return null;
      } else {
        return childFunction.apply(this, args);
      }
    };
    return descriptor;
  };
}

class UserService {
  @CheckDuplicateUser()
  createUser(user: any): void {
    console.log("creating user in database:", user); // we have to insert user to the database.
  }
}

const userService: UserService = new UserService();
userService.createUser({ name: "Poorshad", email: "p.shaddel@gmail.com" });
userService.createUser({ name: "John", email: "John.smith@gmail.com" });
