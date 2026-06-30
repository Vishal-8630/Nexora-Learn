import { DocContent } from "@/types/docs";

export const fieldService: DocContent = {
  title: "Dynamics 365 Field Service",
  description:
    "Dynamics 365 Field Service helps organizations intelligently dispatch technicians, manage physical assets, and resolve complex issues on-site.",
  content: `
## Introduction

Customer Service (the help desk) is great when an issue can be solved over the phone or via a remote session. But what if a hospital's MRI machine breaks? Or a city's power transformer blows? You cannot fix that with an email — you must dispatch a physical technician in a truck with the correct parts.

Managing that mobile workforce, optimizing their driving schedules, and tracking the physical equipment they are working on is the job of **Dynamics 365 Field Service**.

## What is it?

**Dynamics 365 Field Service** is a Model-Driven App built on Dataverse designed for managing complex on-site service operations. 

It provides tools for dispatchers to schedule technicians efficiently, a mobile app for technicians to see their daily jobs, and a system to track the lifecycle of physical equipment located at a customer's site.

## Why do we need it? (Architectural Problem)

Dispatching technicians manually (using whiteboards, legacy software, or spreadsheets) is highly inefficient and leads to massive operational losses:

- **Wasted Drive Time:** Technicians driving across the city back and forth unnecessarily, burning fuel and time.
- **First-Time Fix Failures:** Sending a technician who doesn't possess the right skills or the right parts in their truck to fix the specific machine.
- **Blind Spots:** Customers sitting at home wondering if the technician is actually going to show up during their frustrating "8 AM to 4 PM" window.

Field Service solves this by using intelligent scheduling algorithms, tracking technician inventory, and providing real-time geo-location visibility to both the dispatcher and the customer.

## How does it work?

The Field Service lifecycle revolves entirely around the **Work Order**.

1. **Demand Generation:** A customer calls with a problem, or a smart IoT sensor detects a machine is failing. A **Work Order** is created in Dataverse.
2. **Scheduling (RSO):** The dispatcher uses the visual Schedule Board, or relies on the **Resource Scheduling Optimization (RSO)** engine, to automatically find the closest technician who has the exact required skills and the necessary parts in their truck.
3. **Dispatch:** The scheduled Work Order is pushed to the technician's Field Service Mobile App.
4. **Execution:** The technician drives to the site, follows a digital checklist (Service Tasks), records the parts they consumed, and captures the customer's digital signature on their phone.
5. **Billing:** The completed Work Order is reviewed by the back office, and an invoice is generated.

## Key Concepts

| Term | Definition |
|---|---|
| **Work Order** | The core transactional record defining what work needs to be done, where, and for whom. |
| **Schedule Board** | A visual drag-and-drop interface dispatchers use to assign Work Orders. |
| **Bookable Resource** | Anything that can be scheduled (usually a human Technician, but could be a piece of heavy equipment like a crane). |
| **Customer Asset** | A physical piece of equipment located at the customer's site that you are maintaining (e.g., HVAC Unit #42). |
| **Connected Field Service** | Integration with Azure IoT (Internet of Things) devices so machines can automatically generate their own Work Orders when they detect a fault before they completely break. |

## Example Scenario

An elevator maintenance enterprise uses Field Service:

1. A hotel calls to report Elevator B is stuck on the 3rd floor.
2. A dispatcher creates a **Work Order** in Dynamics 365.
3. The dispatcher looks at the **Schedule Board**. The system highlights "John", who is only 2 miles away and has the mandatory "Elevator Repair Certification".
4. John receives a push notification on his **Mobile App**. He drives to the hotel.
5. John looks at the **Customer Asset** record for Elevator B on his phone to see its 10-year maintenance history.
6. He fixes the door, notes that he consumed one "Replacement Relay" (automatically reducing his truck's inventory count in the system), and gets the hotel manager's signature.

## Best Practices

- **Master Data is Critical:** Field Service algorithms fail if your underlying master data is bad. If you don't accurately track which technician has which skills, or what parts are currently in their truck, the scheduling engine cannot make smart decisions.
- **Embrace Mobility Limits:** Technicians will reject the system if the mobile app is too complex. Keep the mobile forms extremely simple so they can complete their work with one hand while holding a wrench in the other.
- **Move to Predictive:** Do not just wait for customers to call. Use **Connected Field Service (IoT)** to detect anomalies (like a motor running 10 degrees too hot) and dispatch a technician *before* the machine actually breaks.

## Things to Remember

- Customer Service is for remote support; **Field Service** is for complex on-site logistical support.
- The core transaction is the **Work Order**.
- Dispatchers use the **Schedule Board**; Technicians use the **Mobile App**.
- You track physical equipment at customer sites using **Customer Assets**.

## What's Next

We have covered selling (Sales), remote support (Customer Service), and on-site support (Field Service). But how do you get leads in the first place? Next, we will cover **Dynamics 365 Marketing**.
  `.trim(),
};
