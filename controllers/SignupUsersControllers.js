import SignupUsers from "../models/SignupUserModel.js";

async function getUserSignup(req, res) {
  try {
    res.render("signUp");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while rendering the signup page");
  }
}

async function HandleUserSignup(req, res) {
  try {
    const { userName, userMobile, userPassword, role } = req.body;

    // Check for missing fields
    if (!userName || !userMobile || !userPassword || !role) {
      return res.status(400).render("signUp", {
        error: "All fields are required to sign up.",
      });
    }

    // Create and save the user details
    const alldetails = new SignupUsers({
      userName,
      userMobile,
      userPassword,
      role,
    });

    await alldetails.save();

    // Redirect to the home page
    res.status(201).redirect("/");
  } catch (error) {
    return res.status(500).render("signUp", {
      error: error,
    });
  }
}

export { getUserSignup, HandleUserSignup };
