/**
 * Google Apps Script for SRSMA Talk to Us Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1PRgrDDG1CEDbI63JlbVGkOYlqjzGxu0Z4-JQ0HCDlr4/edit
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Click on Deploy > New Deployment
 * 5. Choose "Web app" as deployment type
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy and authorize the app
 * 9. Copy the Web App URL
 * 10. Replace the scriptURL in talk-to-us.html with your Web App URL
 */

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Open the Google Sheet
    const sheetId = '1PRgrDDG1CEDbI63JlbVGkOYlqjzGxu0Z4-JQ0HCDlr4';
    const spreadsheet = SpreadsheetApp.openById(sheetId);
    const sheet = spreadsheet.getActiveSheet();

    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Student Name',
        'Parent Phone',
        'Interested Course',
        'Class',
        'Place',
        'Mode'
      ]);
    }

    // Append the new row with form data
    sheet.appendRow([
      data.timestamp,
      data.studentName,
      data.parentPhone,
      data.course,
      data.class,
      data.place,
      data.mode
    ]);

    // Send email notification
    sendEmailNotification(data);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(data) {
  const recipient = 'nayakgopal1998@gmail.com,amalmdas.connect@gmail.com,smartmindsacademy108@gmail.com';
  const subject = `New Inquiry from ${data.studentName} - SRSMA Talk to Us Form`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
      <div style="background-color: #0a192f; color: white; padding: 20px; border-radius: 10px 10px 0 0;">
        <h2 style="margin: 0; font-size: 24px;">🎓 New Student Inquiry - SRSMA</h2>
      </div>
      
      <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
          You have received a new inquiry from the Talk to Us form on your website.
        </p>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #0a192f; width: 40%;">
              📅 Timestamp:
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #555;">
              ${data.timestamp}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #0a192f;">
              👤 Student Name:
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #555;">
              ${data.studentName}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #0a192f;">
              📱 Parent's Phone:
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #555;">
              ${data.parentPhone}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #0a192f;">
              📚 Interested Course:
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #555;">
              ${data.course}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #0a192f;">
              🎓 Class:
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #555;">
              ${data.class}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #0a192f;">
              📍 Place:
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #555;">
              ${data.place}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; color: #0a192f;">
              💻 Mode:
            </td>
            <td style="padding: 12px; color: #555;">
              ${data.mode}
            </td>
          </tr>
        </table>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
          <p style="margin: 0; color: #856404; font-size: 14px;">
            <strong>⚡ Action Required:</strong> Please follow up with the parent at ${data.parentPhone} regarding their inquiry for ${data.course}.
          </p>
        </div>
        
        <div style="margin-top: 20px; text-align: center;">
          <a href="https://docs.google.com/spreadsheets/d/1PRgrDDG1CEDbI63JlbVGkOYlqjzGxu0Z4-JQ0HCDlr4/edit" 
             style="display: inline-block; padding: 12px 30px; background-color: #ffc107; color: #0a192f; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">
            View All Inquiries in Google Sheet
          </a>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
        <p>This is an automated notification from SRSMA Website Contact Form</p>
      </div>
    </div>
  `;

  const plainBody = `
New Student Inquiry - SRSMA

Timestamp: ${data.timestamp}
Student Name: ${data.studentName}
Parent's Phone: ${data.parentPhone}
Interested Course: ${data.course}
Class: ${data.class}
Place: ${data.place}
Mode: ${data.mode}

Please follow up with the parent regarding their inquiry.

View all inquiries: https://docs.google.com/spreadsheets/d/1PRgrDDG1CEDbI63JlbVGkOYlqjzGxu0Z4-JQ0HCDlr4/edit
  `;

  // Send the email
  GmailApp.sendEmail(recipient, subject, plainBody, {
    htmlBody: htmlBody,
    name: 'SRSMA Inquiry System'
  });
}

// Optional: Test function to verify email sending works
function testEmailNotification() {
  const testData = {
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    studentName: 'Test Student',
    parentPhone: '+91 9876543210',
    course: 'JEE',
    class: 'Class XI',
    place: 'Hyderabad',
    mode: 'Offline'
  };

  sendEmailNotification(testData);
  Logger.log('Test email sent successfully!');
}
