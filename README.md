# Append BigQuery Data to Google Sheets - Step-by-Step Guide

Imagine you’re joining a long-term project that requires real-time data tracking to get the most updated insights and take quick actions, but what if you need to share those insights in such a user-friendly way, such as a Google Sheet link that your team or C-levels can easily access and collaborate on?

Google Sheets is perfect for lightweight, accessible data presentation, but manually copying data from BigQuery to Google Sheets can be cumbersome and time-consuming. Instead, wouldn’t it be great to automate this process, appending your BigQuery results directly to an existing Google Sheet? This guide will walk you through the exact steps needed to achieve that efficiently.

Whether you're automating reports, creating dashboards, or simply streamlining your data workflows, this guide will empower you to append data from your BigQuery results to any Google Sheet, with ease!

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Guide](#setup-guide)

---


## Prerequisites

Before starting, make sure you have:

- Access to a Google Cloud project with BigQuery enabled.
- Access to the Google Sheet you wish to append data to.
- Credentials for Google APIs with appropriate access to BigQuery and Google Sheets.
- Basic knowledge of Google Sheets, Google Apps Script, Google Bigquery.
- Familiarity with JavaScript or similar languages (helpful but not mandatory).

---

## Setup Guide

1. **Write queries to extract data you want** on Google Bigquery
2. **Run query**, **download** the dataset and **import CSV file** to a sheet in Google Sheets
3. **Paste query** to a specific cell in a new sheet in your existing Google Sheets file: You can name the sheet whatever you like, in my example, I name it "query" sheet.
5. Click **Extension** -> **Apps Script**
6. Paste the code in the **Code.js**
7. **Change important information** below:
- Name of the sheet containing your query
- The cell containing your query
- The final column number to clear data before displaying the result if you do not want to clear the whole sheet
- Name of the sheet that you want your data to be imported after running your query
8. Choose "**BigQuery API**" service in the **Services** section
9. Click "**Run**" to check if it can run successfully
10. If the code runs successfully, click "**Trigger**" to set up trigger events
11. **Select your options**:
  - For "selecting event source", choose "Time-driven" option
  - For "Select type of time based trigger", choose the frequency you desire to update your data
  - For "Select time of day", choose the time interval to let your query run
  - Click "Save" to create the trigger
 

**DONEEEEE!!!**
