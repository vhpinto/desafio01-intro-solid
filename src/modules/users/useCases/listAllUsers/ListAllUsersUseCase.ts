import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user: User = this.usersRepository.findById(user_id);
    if (!user.admin) {
      throw new Error("User not allowed!");
    } else {
      const allUsers: User[] = this.usersRepository.list();
      return allUsers;
    }
  }
}

export { ListAllUsersUseCase };
