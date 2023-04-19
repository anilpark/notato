import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { NotesController } from './notes/notes.controller';
import { TagsModule } from './tags/tags.module';
import { FoldersModule } from './folders/folders.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost/notato'),
    AuthModule,
    UsersModule,
    TagsModule,
    FoldersModule,
    NotesModule,
  ],
  controllers: [AppController, AuthController, UsersController, NotesController, ],
  providers: [AppService],
})
export class AppModule {
}