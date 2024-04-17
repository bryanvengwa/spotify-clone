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