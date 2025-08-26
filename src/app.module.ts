import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './resource/auth/auth.module';
import { CategoryModule } from './resource/category/category.module';
import { ProductsModule } from './resource/products/products.module';
import { OrdersModule } from './resource/orders/orders.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { User } from './entities/user';
import { Product } from './entities/product';
import { Order } from './entities/order';
import { Category } from './entities/category';
import { SecretCode } from './entities/secret-code';
import { MediaFiles } from './entities/media-files';
import { UsersModule } from './resource/users/users.module';
import { Ingredient } from './entities/ingredients';
import { OrderItem } from './entities/order-item';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    CategoryModule,
    OrdersModule,
    UsersModule,

    ConfigModule.forRoot({
      isGlobal:true
    }),

    ServeStaticModule.forRoot({
          rootPath: join (__dirname,'..','uploads/'),
          serveRoot: '/public/',
        }),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +(process.env.DATABASE_PORT as string),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User,Product,Order,Category,SecretCode,MediaFiles,Ingredient,Order,OrderItem],
      synchronize: true,
    }),
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
