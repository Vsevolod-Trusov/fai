import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

import { FirebaseService } from '../firebase/firebase.service';
import { EmailService } from '../mail/mail.service';
import { Deal, DealDto, EnrollDto, UpdateDto } from './dto/deal.dto';

@Injectable()
export class DealService extends FirebaseService {
  public firestore: FirebaseFirestore.Firestore;

  constructor(
    private readonly mailService: EmailService,
    @Inject('FIREBASE_APP') private readonly firebaseApp: app.App,
  ) {
    super();
    this.firestore = this.firebaseApp.firestore();
  }

  async enrollDeal(enrollDto: EnrollDto): Promise<{ status: string }> {
    try {
      const { email } = enrollDto;

      this.mailService.sendEmail({
        to: email,
        data: enrollDto,
        subject: 'Deal Enrollment Confirmation',
      });

      return { status: 'sended' };
    } catch (error) {
      throw new Error(`Failed to send mail: ${error.message}`);
    }
  }

  async create(deal: Deal): Promise<Deal> {
    try {
      const dealDoc = await this.firestore.collection('deals').add({
        ...deal,
        date: new Date(),
      });

      return {
        id: dealDoc.id,
        ...deal,
        date: new Date(),
      };
    } catch (error) {
      throw new Error(`Failed to create deal: ${error.message}`);
    }
  }

  async getById(id: string): Promise<Deal | null> {
    try {
      const dealDoc = await this.firestore.collection('deals').doc(id).get();

      if (!dealDoc.exists) {
        throw new BadRequestException(`Incorrect id ${id}`);
      }

      return {
        id: dealDoc.id,
        ...dealDoc.data(),
      } as Deal;
    } catch (error) {
      throw new Error(`Failed to get deal by ID: ${error.message}`);
    }
  }

  async getAll(): Promise<Deal[]> {
    try {
      const dealSnapshot = await this.firestore.collection('deals').get();

      return dealSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Deal[];
    } catch (error) {
      throw new Error(`Failed to get all deals: ${error.message}`);
    }
  }

  async update(id: string, props: UpdateDto): Promise<DealDto> {
    try {
      this.firestore
        .collection('deals')
        .doc(id)
        .update({
          ...props,
        });

      return { ...props } as DealDto;
    } catch (error) {
      throw new Error(`Failed to update deal ${id}: ${error.message}`);
    }
  }

  async delete(uid: string): Promise<string> {
    try {
      this.firestore.collection('deals').doc(uid).delete();

      return `Deal deleted by id ${uid}`;
    } catch (error) {
      throw new Error(`Failed to delete deal ${uid}: ${error.message}`);
    }
  }
}
