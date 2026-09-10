import { DatabaseHelper } from '../DatabaseHelper_V1';
import { UserQueries } from '../queries/user.queries';

export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

export class UserRepository {
  private db = new DatabaseHelper();

  async getUserById(id: number): Promise<User | undefined> {
    return this.db.getRecord<User>(UserQueries.GET_USER_BY_ID, [id]);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.getRecord<User>(UserQueries.GET_USER_BY_EMAIL, [email]);
  }

  async getActiveUsers(): Promise<User[]> {
    return this.db.getRecords<User>(UserQueries.GET_ACTIVE_USERS);
  }
}