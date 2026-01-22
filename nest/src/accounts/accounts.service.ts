import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account, AccountDocument } from './schemas/account.schema';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const hashedPassword = await this.authService.hashPassword(
      createAccountDto.password,
    );
    const account = new this.accountModel({
      ...createAccountDto,
      password: hashedPassword,
    });
    return account.save();
  }

  findAll(): Promise<Account[]> {
    return this.accountModel.find({ state: true }).populate('user').exec();
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.accountModel
      .findOne({ _id: id, state: true })
      .populate('user')
      .exec();
    if (!account) {
      throw new NotFoundException(`Account with ID "${id}" not found`);
    }
    return account;
  }
  
  async findOneByEmail(email: string): Promise<AccountDocument | null> {
    return this.accountModel.findOne({ email }).exec();
  }

  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    if (updateAccountDto.password) {
      updateAccountDto.password = await this.authService.hashPassword(
        updateAccountDto.password,
      );
    }

    const existingAccount = await this.accountModel.findOneAndUpdate(
        { _id: id, state: true },
        { $set: updateAccountDto },
        { new: true },
      )
      .exec();

    if (!existingAccount) {
      throw new NotFoundException(`Account with ID "${id}" not found`);
    }
    return existingAccount;
  }

  async remove(id: string): Promise<Account> {
    const account = await this.accountModel.findOneAndUpdate(
        { _id: id, state: true },
        { $set: { state: false } },
        { new: true },
      )
      .exec();

    if (!account) {
      throw new NotFoundException(`Account with ID "${id}" not found`);
    }
    return account;
  }
}
