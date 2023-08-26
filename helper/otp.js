const twilio = require("twilio");
const accountSid = process.env.ACC_SID;
const authToken = process.env.AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

const sendOTP = async (phoneNumber, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: "923478553558",
      to: phoneNumber,
    });
    console.log("OTP message sent:", message.sid);
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

const phoneNumber = "+1234567890";
const otp = generateRandomOTP();
// sendOTP(phoneNumber, otp);

function generateRandomOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = { sendOTP, otp };
