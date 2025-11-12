import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DB_URI||'mongodb+srv://1633640816_db_user:ReoNa520@cluster0.pfyd6o7.mongodb.net/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
