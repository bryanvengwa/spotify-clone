what is the use of registering the validation pipe to the apps middleware
 what are pipes in nest json
 use cases of pipes 

 used to connect the database schema 
 @Module({
  imports: [SongsModule,

    TypeOrmModule.forRoot({
      database: 'spotify-clone',
      host: 'localhost',
      port: 5432,
      password:'password',
      entities:[],
      synchronize: true,



    })

    to check if the database is configured correctly add the constructor into the App module class
      constructor (private dataSource: DataSource){
    console.log(dataSource.driver.database)

  }

  after declaring an entity () import it in the module
  imports:[TypeOrmModule.forFeature([Song])],  
  after this inject the typeorm repository and use the name of the entity as the generic type and now peform crud operations in thte injected service

In TypeORM, a repository acts as a specialized layer to interact with a specific type of database entity.  Here's a breakdown of what a repository is and how it functions:

Purpose:

Provides a clean and convenient way to perform CRUD (Create, Read, Update, Delete) operations on your database entities.
Simplifies data access logic compared to directly using the underlying Entity Manager.

pagination in nest js is accomplished by using external packages :
npm install nestjs-typeorm-paginate

implemented pagination and sorting 
  
    async  paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releaseDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
 }

 Many to many relationship
 when creating this the entity must be registered in the module in which there are sharing the same relationship

 when creating a new module for example auth module:
 nest g module auth 
 nest g service auth  
 nest g controller auth


 to be able to use jwt there is need to install 
 npm install @nestjs/jwt jsonwebtoken passport-jwt
 and then dev dependencies:
 npm install --save-dev @types/passport
 npm i --save-dev @types/passport-jwt

