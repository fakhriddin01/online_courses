import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
    try {
        const app = await NestFactory.create(AppModule)
        const PORT = process.env.PORT
        const config = new DocumentBuilder()
            .setTitle('NestJS TEST')
            .setDescription('REST API')
            .setVersion('1.0.0')
            .addTag('NodeJS, NestJS, Postgres, sequlize')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('/api/docs', app, document);
        app.setGlobalPrefix('api');
        app.useGlobalPipes(new ValidationPipe());
        app.use((req, res, next)=>{
            const startTime = Date.now();
            const start = new Date(startTime)
            res.on('finish', ()=>{
                const endTime = Date.now();
                const responseTime = endTime - startTime;
                console.log(`${req.method}; ${req.originalUrl}; ${res.statusCode}; ${responseTime}ms; at:${start.toString()}`);
            });
            next();
        })
        app.listen(PORT, ()=> {
        console.log(`Server is running on ${PORT}`);
        
    });
    } catch (error) {
        console.log(error);        
    }    
}

start();