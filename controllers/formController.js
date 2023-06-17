const FormModel = require("../models/formModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const { sendMail } = require("../utils/nodemailer");
const { google } = require("googleapis");

// creating data into the database
exports.addFormData = catchAsyncError(async (req, res, next) => {
  const formData = await FormModel.create(req.body);

  if (!formData) {
    res.status(500).json({
      success: false,
      message: "Server Error Occured",
    });
  }

  const date = formData.createdAt;
  // function for sending mail
  sendMail(formData);

  // for updating the spreadsheet
  const auth = new google.auth.GoogleAuth({
    keyFile: "sheets-credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // client instance for auth
  const client = await auth.getClient();

  // instance for google sheet api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = process.env.SPREADSHEET_ID;

  //metadata about sheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // adding data to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Acros Lead Info",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        [
          formData.createdAt.toString().split("GMT")[0],
          formData.category,
          formData.name,
          formData.email,
          formData.phoneNumber,
          formData.city,
          formData.qualification,
          formData.position,
          formData.experience,
          formData.website,
          formData.description,
          formData.file,
        ],
      ],
    },
  });

  res.status(201).json({
    success: true,
    message: "Form Data uploaded successfully",
    formData,
    // spreadSheetsRows: getRows.data.values,
  });
});

// get the form data
exports.getFormData = catchAsyncError(async (req, res, next) => {
  const formData = await FormModel.find();

  if (!formData) {
    res.status(404).json({
      success: false,
      message: "No Forms Found",
    });
  }
  res.status(200).json({
    success: true,
    formData,
  });
});
