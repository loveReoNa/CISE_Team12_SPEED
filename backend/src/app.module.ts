import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EvidenceModule } from './evidence/evidence.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI||'mongodb+srv://1633640816_db_user:ReoNa520@cluster0.pfyd6o7.mongodb.net/'),
    EvidenceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
