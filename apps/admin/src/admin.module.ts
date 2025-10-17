import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';


import { AdminController } from './admin.controller';
import { ProductsModule } from './resources/products/products.module';
import { AdminService } from './admin.service';
import { AdminsModule } from './resources/admins/admins.module';
import { CategoryModule } from './resources/category/category.module';
import { OrdersModule } from './resources/orders/orders.module';
import { User,Product,Order,Category,SecretCode,MediaFiles,Ingredient,OrderItem } from '../../../libs/common/src/database/entities';
import { UsersModule } from './resources/users/users.module';
import { ZonesModule } from './resources/zone/zone.module';
import { Zone } from '../../../libs/common/src/database/entities/zones-entity';
import { validationScehma } from '../../../libs/common/src/validation';
import { jwtConfig } from '../../../libs/common/src/configs/jwt.config';
import { databaseConfig } from '../../../libs/common/src/configs/database.config';
import { IDatabseConfig } from '../../../libs/common/src/models';
import { LoggerMiddleware } from '../../../libs/common/src/middlewares';
import { Admins } from '@app/common/database/entities/admins';

@Module({
  imports: [
    AdminsModule,
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
            entities: [User,Product,Order,Category,SecretCode,MediaFiles,Ingredient,Order,OrderItem,Zone,Admins],
            synchronize: true,
          }
        }
      }),
  
    TypeOrmModule.forFeature([User,Product,Order,Category,SecretCode,MediaFiles,Ingredient,Order,OrderItem,Zone,Admins])
    

  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes
  }
}
