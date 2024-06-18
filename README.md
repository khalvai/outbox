## a simple project to demonstrate how to use outbox pattern to my colleages

# rabbitmq used to deliver events to other services(our consumer now is a simple class that just logs)


 - use docker to run rabbit mq:
  > build -t my-rabbitmq .

  > docker run -d -p 5672:5672 -p 15672:15672 --name rabbitmq my-rabbitmq

- you must access the rabbit mq pannel by http://localhost:15672



# and setup rabbit config: 


- 1.create a queue called Event:queue 
- 2.create an exchanged Called: Event and a routing key name: event:published
and map to a queue
 
```script
 npm run start:dev
```

and you can now 

http://localhost:3000/order/issue

- you will insert a outbox to you databse.


- and this is the env you need in order to run:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"
RABBITMQ_URL=amqp://user:password@localhost:5672/
```
