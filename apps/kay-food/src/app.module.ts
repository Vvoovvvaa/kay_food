import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { User,Product,Order,Category,SecretCode,MediaFiles,Ingredient,OrderItem, Language, ProductTranslation, UserSecurity, CategoryTranslation,  } from '../../../libs/common/src/database/entities';
import { UsersModule } from './resource/users/users.module';
import { ZonesModule } from './resource/zone/zone.module';
import { Zone } from '../../../libs/common/src/database/entities/zones-entity';
import { validationScehma } from '../../../libs/common/src/validation';
import { jwtConfig } from '../../../libs/common/src/configs/jwt.config';
import { databaseConfig } from '../../../libs/common/src/configs/database.config';
import { IDatabseConfig } from '../../../libs/common/src/models';
import { LoggerMiddleware } from '../../../libs/common/src/middlewares';
import { faceboockClientConfig, googleconfig } from '@app/common/configs';
import { GoogleStrategy } from '@app/common/strategy/google';
import { FacebookStrategy } from '@app/common/strategy/facebook';
import { LanguageInterceptor } from '@app/common/interceptors/language.interceptor';

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
      load: [jwtConfig,databaseConfig,googleconfig,faceboockClientConfig]
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
            entities: [User,Product,Order,Category,SecretCode,MediaFiles,Ingredient,Order,OrderItem,Zone,Language,ProductTranslation,UserSecurity,CategoryTranslation],
            synchronize: true,
          }
        }
      }),
  
    TypeOrmModule.forFeature([User,Product,Order,Category,SecretCode,MediaFiles,Ingredient,Order,OrderItem,Zone,Language,ProductTranslation,UserSecurity,CategoryTranslation])
    

  ],
  controllers: [AppController],
  providers: [AppService,GoogleStrategy,FacebookStrategy,LanguageInterceptor],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes
  }
}
