export const generateEmailTemplate = ({
  username,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  daysLeft,
  accountSettingsLink,
  supportLink,
}) => {
  return `
        <html>
            <head>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        line-height: 1.6;
                        color: #333;
                        background-color: #f9f9f9;
                        margin: 0;
                        padding: 0;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    .email-header {
                        background-color: #4CAF50;
                        color: white;
                        padding: 20px;
                        text-align: center;
                    }
                    .email-header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .email-body {
                        padding: 20px;
                    }
                    .email-body h2 {
                        color: #4CAF50;
                    }
                    .email-body p {
                        margin: 10px 0;
                    }
                    .email-body ul {
                        list-style: none;
                        padding: 0;
                    }
                    .email-body ul li {
                        margin: 5px 0;
                        padding: 10px;
                        background: #f4f4f4;
                        border-radius: 4px;
                    }
                    .email-footer {
                        text-align: center;
                        padding: 20px;
                        background: #f4f4f4;
                        font-size: 14px;
                        color: #666;
                    }
                    .cta-button {
                        display: inline-block;
                        margin: 20px 0;
                        padding: 10px 20px;
                        background-color: #4CAF50;
                        color: white;
                        text-decoration: none;
                        border-radius: 4px;
                        font-weight: bold;
                    }
                    .cta-button:hover {
                        background-color: #45a049;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-header">
                        <h1>Subscription Renewal Reminder</h1>
                    </div>
                    <div class="email-body">
                        <h2>Hello ${username},</h2>
                        <p>We hope you're enjoying your <strong>${subscriptionName}</strong> subscription!</p>
                        <p>Here are the details of your upcoming renewal:</p>
                        <ul>
                            <li><strong>Renewal Date:</strong> ${renewalDate}</li>
                            <li><strong>Plan Name:</strong> ${planName}</li>
                            <li><strong>Price:</strong> $${price}</li>
                            <li><strong>Payment Method:</strong> ${paymentMethod}</li>
                        </ul>
                        <p style="font-size: 18px; color: #4CAF50; font-weight: bold;">
                            Your subscription will renew automatically in <strong>${daysLeft} days</strong>.
                        </p>
                        <p>If you'd like to make changes to your subscription, you can visit your 
                            <a href="${accountSettingsLink}" class="cta-button">Account Settings</a>.
                        </p>
                        <p>If you have any questions or need assistance, feel free to reach out to our 
                            <a href="${supportLink}" class="cta-button">Support Team</a>.
                        </p>
                        <p>Thank you for choosing us!</p>
                        <p>Best regards,</p>
                        <p>The Subscription Team</p>
                    </div>
                    <div class="email-footer">
                        &copy; ${new Date().getFullYear()} Subscription Service. All rights reserved.
                    </div>
                </div>
            </body>
        </html>
    `;
};

export const emailTemplates = [
  {
    label: "7 days before reminder",
    generateSubject: (data) =>
      `📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
  },
  {
    label: "5 days before reminder",
    generateSubject: (data) =>
      `⏳ ${data.subscriptionName} Renews in 5 Days – Stay Subscribed!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
  },
  {
    label: "2 days before reminder",
    generateSubject: (data) =>
      `🚀 2 Days Left!  ${data.subscriptionName} Subscription Renewal`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
  },
  {
    label: "1 days before reminder",
    generateSubject: (data) =>
      `⚡ Final Reminder: ${data.subscriptionName} Renews Tomorrow!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
  },
];
