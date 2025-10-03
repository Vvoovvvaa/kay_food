import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';


import { AppController } from './app.controller';
import { ProductsModule } from './resource/products/products.module';
import { AppService } from './app.service';
import { AuthModule } from './resource/auth/auth.module';
import { CategoryModule } from './resource/category/category.module';
import { OrdersModule } from './resource/orders/orders.module';
import { User,Product,Order,Category,SecretCode,MediaFiles,Ingredient,OrderItem } from './entities';
import { UsersModule } from './resource/users/users.module';
import { ZonesModule } from './resource/zone/zone.module';
import { Zone } from './entities/zones-entity';
import { validationScehma } from './validation';
import { jwtConfig } from './configs/jwt.config';
import { databaseConfig } from './configs/database.config';
import { IDatabseConfig } from './models';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    CategoryModule,
    OrdersModule,
    UsersModule,
    ZonesModule,

    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema: validationScehma,
      load: [jwtConfig,databaseConfig]
    }),

    ServeStaticModule.forRoot({
          rootPath: join (__dirname,'..','uploads/'),
          serveRoot: '/public/',
        }),
      TypeOrmModule.forRootAsync({
        imports:[ConfigModule],
        inject: [ConfigService],
        useFactory:(configService:ConfigService) => { 
          const dbconfig: IDatabseConfig = configService.get("DATABASE_CONFIG") as IDatabseConfig
          return{
            type: 'postgres',
            host: dbconfig.HOST,
            port: dbconfig.PORT,
            username: dbconfig.USER,
            password: dbconfig.PASSWORD,
            database: dbconfig.NAME,
            entities: [User,Product,Order,Category,SecretCode,MediaFiles,Ingredient,Order,OrderItem,Zone],
            synchronize: true,
          }
        }
      }),
  
    TypeOrmModule.forFeature([User,Product,Order,Category,SecretCode,MediaFiles,Ingredient,Order,OrderItem,Zone])
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
