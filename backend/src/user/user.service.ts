import { Inject, Injectable } from '@nestjs/common';
import { app, auth } from 'firebase-admin';
import {
  CreateRequest,
  UpdateRequest,
} from 'firebase-admin/lib/auth/auth-config';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { FirebaseService, User } from '../firebase/firebase.service';

@Injectable()
export class UserFirebaseService extends FirebaseService {
  private auth: auth.Auth;
  private firestore: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_APP') private readonly firebaseApp: app.App) {
    super();
    this.auth = this.firebaseApp.auth();
  }

  async create(userDto: CreateRequest): Promise<{ uid: string }> {
    try {
      const { uid } = await this.auth.createUser(userDto);
      return { uid };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user.');
    }
  }

  async getById(id: string): Promise<User | null> {
    try {
      const { uid, email, ...userRecord } = await this.auth.getUser(id);
      return {
        uid,
        email,
        role: userRecord.customClaims?.role,
        createdAt: new Date(userRecord.metadata.creationTime),
      };
    } catch (error) {
      console.error(`Error getting user by ID ${id}:`, error);
      return null;
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const users: User[] = [];
      const userRecords = await this.auth.listUsers();
      userRecords.users.forEach((user) => {
        users.push({
          uid: user.uid,
          email: user.email,
          role: user.customClaims?.role,
          createdAt: new Date(user.metadata.creationTime),
        });
      });
      return users;
    } catch (error) {
      console.error('Error getting all users:', error);
      throw new Error('Failed to get users.');
    }
  }

  async update(uid: string, props: UpdateRequest): Promise<UserRecord> {
    try {
      return this.auth.updateUser(uid, props);
    } catch (error) {
      console.error(`Error updating user ${uid}:`, error);
      throw new Error('Failed to update user.');
    }
  }

  async delete(uid: string): Promise<string> {
    try {
      this.auth.deleteUser(uid);

      return `Entity deleted by ${uid}`;
    } catch (error) {
      console.error(`Error deleting user ${uid}:`, error);
      throw new Error('Failed to delete user.');
    }
  }

  async setRole(id: string, role: string): Promise<User> {
    try {
      await this.auth.setCustomUserClaims(id, { role });

      const { uid, email, ...userRecord } = await this.auth.getUser(id);

      return {
        uid,
        email,
        role: userRecord.customClaims?.role,
        createdAt: new Date(userRecord.metadata.creationTime),
      };
    } catch (error) {
      console.error(`Error setting role for user ${id}:`, error);
      throw new Error('Failed to set user role.');
    }
  }
}
