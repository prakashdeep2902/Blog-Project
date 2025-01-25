import SignupUsers, { matchPass } from "../models/UserModel.js";

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

    // Validate userMobile (check if it's a valid non-empty string)
    if (typeof userMobile !== "string" || userMobile.trim() === "") {
      return res.status(400).render("signUp", {
        error: "Invalid mobile number provided.",
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
    res.status(201).redirect("login");
  } catch (error) {
    // Handle duplicate key error (code 11000)

    console.log(error);
    if (error.code === 11000 && error.keyPattern?.userMobile) {
      return res.status(400).render("signUp", {
        error: "This mobile number is already registered.",
      });
    }

    // Handle other errors
    return res.status(500).render("signUp", {
      error: "An error occurred during signup. Please try again.",
    });
  }
}

async function getLoginPage(req, res) {
  try {
    res.render("login");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while rendering the signup page");
  }
}

async function HandleLoginUser(req, res) {
  try {
    const { userMobile, userPassword } = req.body;
    if (!userMobile || !userPassword) {
      const error = new Error("userMobile and userPassword are required");
      error.status = 400; // Use 400 for bad requests
      throw error;
    }
    const { token, isPassMatch } = await matchPass(userMobile, userPassword);

    if (!isPassMatch) {
      return res.status(401).render("login", { error: "Invalid credentials" });
    }

    res.cookie("token", token).redirect("/");
  } catch (error) {
    console.error(error);
    const statusCode = error.status || 500;
    res.status(statusCode).render("login", {
      error: error.message,
    });
  }
}

export { getUserSignup, HandleUserSignup, getLoginPage, HandleLoginUser };
