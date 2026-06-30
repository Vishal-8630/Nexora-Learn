import { DocContent } from "@/types/docs";

export const serviceBus: DocContent = {
  title: "Azure Service Bus",
  description:
    "Explore how to use Azure Service Bus to decouple Dynamics 365 from external systems using enterprise Publisher/Subscriber messaging patterns.",
  content: `
## Introduction

**Azure Service Bus** is a highly reliable enterprise message broker. It sits between applications and securely transfers data.

If Dynamics 365 needs to send data to an on-premise ERP system, establishing a direct connection (Point-to-Point) via a synchronous Plugin is dangerous. If the ERP server restarts for Windows Updates, the Plugin throws an error, the user cannot save their record, and data is permanently lost.

By placing Azure Service Bus in the middle, Dynamics 365 drops the message into a queue and walks away. The ERP system pulls the message from the queue when it is ready.

## Queues vs Topics

Service Bus offers two primary architectural patterns:

### 1. Queues (One-to-One)
A queue stores messages until the receiving application is available to receive and process them.
- **Pattern:** FIFO (First-In, First-Out).
- **Rule:** Each message is processed by exactly **one** receiver. If ERP Server A pulls the message, ERP Server B will never see it.

### 2. Topics (One-to-Many / Pub-Sub)
Topics provide a Publisher/Subscriber mechanism. 
- **Pattern:** Dynamics 365 publishes a single message to the Topic (e.g., "Account Created").
- **Rule:** You can attach multiple "Subscriptions" to the topic. 
  - The Billing System subscribes to receive the account.
  - The Marketing System subscribes to receive the account.
- Service Bus automatically creates a copy of the message for *every* subscriber.

## Native Dataverse Integration

Microsoft provides a native, out-of-the-box integration between Dataverse and Azure Service Bus. You do not need to write complex C# code to send messages to the bus.

### Configuration Steps:
1. Create a Service Bus Namespace and Queue in the Azure Portal.
2. Obtain a **Shared Access Signature (SAS)** connection string with 'Send' privileges.
3. Open the **Plugin Registration Tool (PRT)**.
4. Click **Register -> Register New Service Endpoint**.
5. Paste the SAS connection string. The PRT will automatically configure the endpoint in Dataverse.
6. **Register a Step:** Just like a standard plugin, you register a step (e.g., "Create of Account").
7. Dataverse will now natively serialize the \`RemoteExecutionContext\` (the exact same JSON payload a plugin receives) and push it to the queue asynchronously whenever an Account is created.

## Handling Dead-Letters (Real-World Perspective)

What happens if the ERP system pulls a message from the queue, attempts to process it, but fails due to a database error?

If the ERP system throws an error, Service Bus will make the message visible in the queue again for another attempt.
If the message fails 10 times in a row (Max Delivery Count), Service Bus automatically moves the message into a special sub-queue called the **Dead-Letter Queue (DLQ)**.

> [!TIP]
> The DLQ acts as a quarantine zone for poisonous messages. It ensures that a single bad message doesn't clog up the queue and block millions of healthy messages behind it. IT admins can inspect the DLQ, fix the root cause (e.g., fix a bad Zip Code format), and manually resubmit the messages.

## Things to Remember

- Service Bus prevents data loss by **decoupling** systems.
- **Queues** are for 1-to-1 delivery; **Topics** are for 1-to-many delivery.
- Dataverse can natively push messages to Service Bus via the **Plugin Registration Tool**.
- Failing messages are quarantined in the **Dead-Letter Queue** to protect pipeline health.

## What's Next

Service Bus handles data transit, but what about massive file storage? Next, we explore offloading heavy unstructured data to **Azure Storage**.
  `.trim(),
};
