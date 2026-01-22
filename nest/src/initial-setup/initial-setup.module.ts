import { Module } from '@nestjs/common';
import { InitialSetupService } from './initial-setup.service';
import { UsersModule } from 'src/users/users.module';
import { AccountsModule } from 'src/accounts/accounts.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UsersModule, AccountsModule, AuthModule],
  providers: [InitialSetupService],
})
export class InitialSetupModule {}
