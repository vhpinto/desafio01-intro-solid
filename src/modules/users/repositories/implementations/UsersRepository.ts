import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user: User = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
    });
    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    const user: User = this.users.find((user) => user.id === id);

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user: User = this.users.find((user) => user.email === email);

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const user: User = this.findById(receivedUser.id);
    const userIndex = this.users.indexOf(user);

    this.users[userIndex].admin = true;
    this.users[userIndex].updated_at = new Date();
    return this.users[userIndex];
  }

  list(): User[] {
    const allUsers: User[] = this.users;
    return allUsers;
  }
}

export { UsersRepository };
