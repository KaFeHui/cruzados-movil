import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { InitialSetupModule } from './initial-setup/initial-setup.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO_URI');
        Logger.log(`Initializing MongoDB connection to: ${mongoUri}`, 'AppModule');
        return { uri: mongoUri };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AccountsModule,
    AuthModule,
    InitialSetupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
