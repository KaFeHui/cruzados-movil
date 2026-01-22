import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountsService } from 'src/accounts/accounts.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InitialSetupService implements OnModuleInit {
  private readonly logger = new Logger(InitialSetupService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly accountsService: AccountsService,
    private readonly authService: AuthService,
  ) {}

  async onModuleInit() {
    this.logger.log('Starting initial setup check...');

    const email = this.configService.get<string>('INITIAL_USER_EMAIL');
    if (!email) {
      this.logger.warn(
        'INITIAL_USER_EMAIL not found in .env, skipping initial user setup.',
      );
      return;
    }

    const existingAccount = await this.accountsService.findOneByEmail(email);

    if (!existingAccount) {
      this.logger.log(`Initial user with email "${email}" not found. Creating...`);

      const name = this.configService.get<string>('INITIAL_USER_NAME');
      const lastName = this.configService.get<string>('INITIAL_USER_LASTNAME');
      const password = this.configService.get<string>('INITIAL_USER_PASSWORD');
      
      if(!name || !lastName || !password) {
        this.logger.error('Missing initial user details in .env file. Cannot create user.');
        return;
      }

      const newUser = await this.usersService.create({
        name,
        lastName,
        birthdate: new Date(), // Using a placeholder birthdate
      });

      const newAccount = await this.accountsService.create({
        userName: name, // Using name as username
        email,
        password,
        user: newUser._id.toString(),
      });
      
      this.logger.log(`Successfully created initial user and account for "${email}".`);

      // Log in and get token
      const loginResult = await this.authService.login(newAccount);
      this.logger.log('--- Initial User API Token ---');
      this.logger.log(`Bearer ${loginResult.access_token}`);
      this.logger.log('------------------------------');

    } else {
      this.logger.log(`Initial user with email "${email}" already exists. Skipping creation.`);
    }
  }
}
